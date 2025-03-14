use anyhow::Result;
use anyhow::Context;
use clap::{Parser, Subcommand};
use std::collections::HashMap;
use std::fs::read_to_string;
use std::path::Path;
use std::process::Command;
use rl::author::Author;
use rl::blog_settings::BlogSettings;
use rl::post::{Post, Posts};
use notify::{
    recommended_watcher, Config, EventKind, RecursiveMode, Watcher,
};
use std::sync::mpsc::channel;
use std::time::Duration;

#[derive(Parser, Debug)]
struct Args {
    #[clap(subcommand)]
    subcommand: SubCommands,
}

#[derive(Debug, Subcommand)]
pub enum SubCommands {
    Build {
        #[clap(default_value = ".")]
        path: String,
    },
    Preview {
        #[clap(default_value = ".")]
        path: String,
    },
}

fn build_blog_settings_from_toml<P: AsRef<Path>>(path: P) -> Result<BlogSettings> {
    let content = read_to_string(path)?;
    let blog_settings: BlogSettings = toml::from_str(&content)?;
    Ok(blog_settings)
}

fn build_post_from_toml<P1: AsRef<Path>, P2: AsRef<Path>>(
    settings_path: P1,
    brack_file_path: P2,
    authors: HashMap<String, Author>,
) -> Result<Post> {
    let post = Post::new(settings_path, brack_file_path, authors)?;
    Ok(post)
}

async fn build(project_path: String) -> Result<()> {
    let mut project = brack_project_manager::project::Project::new(&project_path);
    project.load_brack_toml()
        .with_context(|| format!("Failed to load Brack.toml"))?;
    project.download_plugins_using_config().await
        .with_context(|| format!("Failed to download plugins"))?;
    Command::new("rm")
        .arg("-rf")
        .arg(format!("{}/out", project_path))
        .status()
        .with_context(|| format!("Failed to remove out directory"))?;
    project.build()
        .with_context(|| format!("Failed to build project"))?;
    let blog_settings =
        build_blog_settings_from_toml(format!("{}/Ravenlog.toml", project_path))
            .with_context(|| format!("Failed to build blog settings"))?;
    let id_to_authors: HashMap<String, Author> = blog_settings
        .authors
        .iter()
        .map(|author| (author.id.clone(), author.clone()))
        .collect();
    let jsx = walkdir::WalkDir::new(format!("{}/out", project_path.clone()))
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().map_or(false, |e| e == "jsx"));
    let mut posts = Vec::new();
    let mut daily = Vec::new();
    let mut weekly = Vec::new();
    let mut monthly = Vec::new();
    let mut annual = Vec::new();
    for entry in jsx {
        let path = entry.path();
        let date_slug_path = path
            .strip_prefix(format!("{}/out/", project_path))?
            .parent()
            .unwrap();
        let ravenlog_toml_path = format!(
            "{}/docs/{}/settings.toml",
            project_path,
            date_slug_path.display()
        );
        if !std::path::Path::new(&ravenlog_toml_path).exists() {
            eprintln!("{} not found", ravenlog_toml_path);
            std::process::exit(1);
        }
        let post = build_post_from_toml(
            &ravenlog_toml_path,
            path,
            id_to_authors.clone(),
        )
        .with_context(|| format!("Failed to build post"))?;
        match post.post_type {
            rl::post::PostType::Daily => daily.push(post),
            rl::post::PostType::Weekly => weekly.push(post),
            rl::post::PostType::Monthly => monthly.push(post),
            rl::post::PostType::Annual => annual.push(post),
            _ => posts.push(post),
        }
    }
    posts.sort_by(|a, b| b.date.cmp(&a.date));
    daily.sort_by(|a, b| b.date.cmp(&a.date));
    weekly.sort_by(|a, b| b.date.cmp(&a.date));
    monthly.sort_by(|a, b| b.date.cmp(&a.date));
    annual.sort_by(|a, b| b.date.cmp(&a.date));
    let posts = Posts {
        posts,
        daily,
        weekly,
        monthly,
        annual,
    };
    let posts = serde_json::to_string_pretty(&posts).with_context(|| format!("Failed to serialize posts"))?;
    std::fs::create_dir_all(format!("{}/.ravenlog", project_path))
        .with_context(|| format!("Failed to create .ravenlog directory"))?;
    std::fs::write(
        format!("{}/.ravenlog/posts.json", project_path),
        posts,
    ).with_context(|| format!("Failed to write posts.json"))?;
    std::fs::write(
        format!("{}/.ravenlog/blog_settings.json", project_path),
        serde_json::to_string_pretty(&blog_settings)?,
    ).with_context(|| format!("Failed to write blog_settings.json"))?;
    let assets = walkdir::WalkDir::new(format!("{}/assets", project_path.clone()))
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.path().is_file());
    for entry in assets {
        let path = entry.path();
        let dest = format!(
            "{}/.ravenlog/assets/{}",
            project_path,
            path.strip_prefix(format!("{}/assets/", project_path))?.display()
        );
        std::fs::create_dir_all(std::path::Path::new(&dest).parent().unwrap())
            .with_context(|| format!("Failed to create directory"))?;
        std::fs::copy(path, dest)
            .with_context(|| format!("Failed to copy asset"))?;
    }
    Ok(())
}

async fn preview_reload(project_path: String) -> Result<()> {
    let status = Command::new("rm")
        .arg("-rf")
        .arg(format!("{}/plugins", project_path))
        .status()?;
    if !status.success() {
        eprintln!("Failed to remove plugins");
        std::process::exit(1);
    }
    build(project_path.clone()).await?;
    let status = Command::new("cp")
        .arg(format!("{}/.ravenlog/blog_settings.json", project_path))
        .arg(format!("{}/.ravenlog-server/frontend/src/app/_assets", project_path))
        .status()?;
    if !status.success() {
        eprintln!("Failed to copy blog_settings.json");
        std::process::exit(1);
    }
    let status = Command::new("cp")
        .arg(format!("{}/.ravenlog/posts.json", project_path))
        .arg(format!("{}/.ravenlog-server/frontend/src/app/_assets", project_path))
        .status()?;
    if !status.success() {
        eprintln!("Failed to copy posts.json");
        std::process::exit(1);
    }
    let status = Command::new("sh")
        .arg("-c")
        .arg(format!(
            "cp -r {}/.ravenlog/assets/* {}/.ravenlog-server/frontend/public",
            project_path, project_path
        ))
        .status()?;
    if !status.success() {
        eprintln!("Failed to copy assets");
        std::process::exit(1);
    }
    Ok(())
}

async fn preview(project_path: String) -> Result<()> {
    println!("Building project...");
    
    println!("Initializing ravenlog... (1/6)");
    let status = Command::new("rm")
        .arg("-rf")
        .arg(format!("{}/.ravenlog-server", project_path))
        .output()?;
    if !status.status.success() {
        eprintln!("Failed to remove .ravenlog-server");
        std::process::exit(1);
    }

    println!("Cloning ravenlog... (2/6)");
    if std::path::Path::new("ravenlog-git").exists() {
        println!("ravenlog-git already exists! Skipping...");
    } else {
        let status = Command::new("git")
            .arg("clone")
            .arg("https://github.com/brack-lang/ravenlog")
            .arg("ravenlog-git")
            .output()?;
        if !status.status.success() {
            eprintln!("Failed to clone ravenlog-git");
            std::process::exit(1);
        }
    }

    println!("Preparing ravenlog... (3/6)");
    let status = Command::new("mkdir")
        .arg("-p")
        .arg(format!("{}/.ravenlog-server", project_path))
        .output()?;
    if !status.status.success() {
        eprintln!("Failed to create .ravenlog-server");
        std::process::exit(1);
    }
    let status = Command::new("cp")
        .arg("-r")
        .arg("ravenlog-git/frontend")
        .arg(".ravenlog-server")
        .output()?;
    if !status.status.success() {
        eprintln!("Failed to copy ravenlog-git/frontend to .ravenlog-server");
        std::process::exit(1);
    }   

    println!("Building Brack project... (4/6)");
    preview_reload(project_path.clone()).await?;

    println!("Installing pnpm dependencies... (5/6)");
    let status = Command::new("pnpm")
        .arg("install")
        .current_dir(".ravenlog-server/frontend")
        .output()?;
    if !status.status.success() {
        eprintln!("Failed to install pnpm dependencies");
        std::process::exit(1);
    }

    println!("Starting ravenlog server... (6/6)");
    let mut child = Command::new("pnpm")
        .args(["run", "dev"])
        .current_dir(".ravenlog-server/frontend")
        .spawn()?;

    let server_url = "http://localhost:3000";
    println!("🎉 Success! Your blog is now running at {}", server_url);
    {
        let (tx, rx) = channel();
        let mut watcher = recommended_watcher(move |res| {
            tx.send(res).unwrap();
        })?;
        watcher.configure(Config::default().with_poll_interval(Duration::from_secs(1)))?;
        watcher.watch(Path::new("."), RecursiveMode::Recursive)?;

        loop {
            match rx.recv() {
                Ok(Ok(event)) => {
                    let should_ignore = event.paths.iter().any(|path| {
                        let s = path.to_string_lossy();
                        s.contains(".ravenlog")
                        || s.contains(".ravenlog-server")
                        || s.contains("plugins")
                        || s.contains("out")
                    });
                    if should_ignore {
                        continue;
                    }
                    match event.kind {
                        EventKind::Create(_) | EventKind::Modify(_) | EventKind::Remove(_) => {
                            eprintln!("File changed: {:?}", event.paths);
                            preview_reload(project_path.clone()).await?;
                        }
                        _ => {}
                    }
                }
                Ok(Err(e)) => {
                    eprintln!("watch error: {:?}", e);
                    break;
                }
                Err(e) => {
                    eprintln!("channel error: {:?}", e);
                    break;
                }
            }
        }
    }
    child.wait()?;
    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();
    match args.subcommand {
        SubCommands::Build { path } => build(path).await?,
        SubCommands::Preview { path } => preview(path).await?,
    }
    Ok(())
}
