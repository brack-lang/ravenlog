use anyhow::Result;
use clap::{Parser, Subcommand};
use std::fs::read_to_string;
use std::path::Path;
use rl::author::Author;
use rl::post::{Post, Posts};
use rl::blog_settings::BlogSettings;
use std::collections::HashMap;

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

fn build_post_from_toml<P1: AsRef<Path>, P2: AsRef<Path>>(settings_path: P1, brack_file_path: P2, authors: HashMap<String, Author>) -> Result<Post> {
    let post = Post::new(settings_path, brack_file_path, authors)?;
    Ok(post)
}

async fn build(project_path: String) -> Result<()> {
    std::fs::create_dir_all(format!("{}/plugins", project_path))?;
    let mut project = brack_project_manager::project::Project::new(&project_path);
    project.load_brack_toml()?;
    project.download_plugins_using_config().await?;
    project.build()?;

    let blog_settings = build_blog_settings_from_toml(format!("{}/Ravenlog.toml", project_path))?;
    let id_to_authors: HashMap<String, Author> = blog_settings.authors.iter().map(|author| (author.id.clone(), author.clone())).collect();

    let jsx = walkdir::WalkDir::new(format!("{}/out", project_path))
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.path().extension().map_or(false, |e| e == "jsx"));

    let mut posts = Vec::new();
    for entry in jsx {
        let path = entry.path();
        let date_slug_path = path.strip_prefix(format!("{}/out/", project_path))?.parent().unwrap();
        let ravenlog_toml_path = format!("{}/docs/{}/settings.toml", project_path, date_slug_path.display());
        if !std::path::Path::new(&ravenlog_toml_path).exists() {
            eprintln!("{} not found", ravenlog_toml_path);
            std::process::exit(1);
        }
        posts.push(build_post_from_toml(ravenlog_toml_path, path, id_to_authors.clone())?);
    }
    posts.sort_by(|a, b| b.date.cmp(&a.date));
    let posts = Posts { posts };
    let posts = serde_json::to_string_pretty(&posts)?;
    std::fs::create_dir_all(format!("{}/.ravenlog", project_path))?;
    std::fs::write(format!("{}/.ravenlog/posts.json", project_path), posts)?;
    std::fs::write(format!("{}/.ravenlog/blog_settings.json", project_path), serde_json::to_string_pretty(&blog_settings)?)?;
    let assets = walkdir::WalkDir::new(format!("{}/assets", project_path))
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.path().is_file());
    for entry in assets {
        let path = entry.path();
        let dest = format!("{}/.ravenlog/assets/{}", project_path, path.strip_prefix(format!("{}/assets/", project_path))?.display());
        std::fs::create_dir_all(std::path::Path::new(&dest).parent().unwrap())?;
        std::fs::copy(path, dest)?;
    }
    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();
    match args.subcommand {
        SubCommands::Build { path } => build(path).await?,
        SubCommands::Preview { .. } => unimplemented!(),
    }
    Ok(())
}
