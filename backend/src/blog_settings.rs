use serde::{Deserialize, Serialize};
use crate::author::Author;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Footer {
    pub admin: String,
    pub period: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Favicon {
    pub enable: bool,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Posts {
    pub heading: String,
    pub description: String,
    pub icon: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct ExternalZenn {
    pub enable: bool,
    pub id: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct ExternalNote {
    pub enable: bool,
    pub id: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct External {
    pub enable: bool,
    pub heading: String,
    pub description: String,
    pub icon: String,
    pub zenn: Option<ExternalZenn>,
    pub note: Option<ExternalNote>,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Daily {
    pub enable: bool,
    pub heading: String,
    pub description: String,
    pub icon: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Weekly {
    pub enable: bool,
    pub heading: String,
    pub description: String,
    pub icon: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Monthly {
    pub enable: bool,
    pub heading: String,
    pub description: String,
    pub icon: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Annual {
    pub enable: bool,
    pub heading: String,
    pub description: String,
    pub icon: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct BlogSettings {
    pub title: String,
    pub description: String,
    pub comments: Vec<String>,
    pub footer: Footer,
    pub logo: String,
    pub favicon: Favicon,
    pub posts: Posts,
    pub external: External,
    pub daily: Daily,
    pub weekly: Weekly,
    pub monthly: Monthly,
    pub annual: Annual,
    pub authors: Vec<Author>,
}
