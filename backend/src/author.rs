use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Author {
    pub id: String,
    pub name: String,
    pub icon: String,
    pub email: Option<String>,
    pub website: Option<String>,
    pub github_id: Option<String>,
    pub x_id: Option<String>,
    pub admin: Option<bool>,
}
