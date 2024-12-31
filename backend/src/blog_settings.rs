use serde::{Deserialize, Serialize};
use crate::author::Author;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Footer {
    pub admin: String,
    pub period: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Posts {
    pub heading: String,
    pub description: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct ExternalZenn {
    pub id: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct ExternalNote {
    pub id: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct External {
    pub heading: String,
    pub description: String,
    pub icon: String,
    pub zenn: ExternalZenn,
    pub note: ExternalNote,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Daily {
    pub heading: String,
    pub description: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Weekly {
    pub heading: String,
    pub description: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Monthly {
    pub heading: String,
    pub description: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Annual {
    pub heading: String,
    pub description: String,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct BlogSettings {
    pub title: String,
    pub description: String,
    pub comments: Vec<String>,
    pub footer: Footer,
    pub logo: String,
    pub posts: Posts,
    pub external: External,
    pub daily: Daily,
    pub weekly: Weekly,
    pub monthly: Monthly,
    pub annual: Annual,
    pub authors: Vec<Author>,
}
