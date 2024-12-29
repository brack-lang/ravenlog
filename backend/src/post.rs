use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};
use crate::author::Author;
use std::collections::HashMap;
use std::fs::read_to_string;
use std::path::Path;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Post {
    pub title: String,
    pub description: String,
    pub tags: Vec<String>,
    pub author: Author,
    pub slug: String,
    pub date: String,
    pub body: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct RawPost {
    pub title: String,
    pub description: String,
    pub tags: Vec<String>,
    pub author_id: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Posts {
    pub posts: Vec<Post>,
}

impl Post {
    pub fn new<P1: AsRef<Path>, P2: AsRef<Path>>(settings_path: P1, brack_file_path: P2, authors: HashMap<String, Author>) -> Result<Self> {
        let parts: Vec<&str> = settings_path.as_ref().to_str().ok_or_else(|| anyhow!("Invalid file name"))?.split('/').collect();
        println!("{:?}", parts);
        let date = format!("{}/{}/{}", parts[2], parts[3], parts[4]);
        let slug = parts[5];
        let settings = read_to_string(&settings_path)?;
        let raw_post: RawPost = toml::from_str(&settings)?;
        let author = authors.get(&raw_post.author_id).ok_or_else(|| anyhow!("Author not found"))?;
        let body = read_to_string(&brack_file_path)?;
        Ok(Self {
            title: raw_post.title,
            description: raw_post.description,
            tags: raw_post.tags,
            author: author.clone(),
            slug: slug.to_string(),
            date,
            body,
        })
    }
}
