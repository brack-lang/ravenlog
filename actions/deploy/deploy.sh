set -eou pipefail

cd $WORKING_DIRECTORY
nix run "github:brack-lang/ravenlog?dir=backend" build
git clone https://github.com/brack-lang/ravenlog
mkdir -p workspace
mv ravenlog/frontend/* workspace/
cp .ravenlog/blog_settings.json workspace/src/app/_assets/
cp .ravenlog/posts.json workspace/src/app/_assets/
cp -r .ravenlog/assets/** workspace/public/

find . -mindepth 1 -maxdepth 1 ! -name 'workspace' ! -name '.git' -exec rm -rf {} +
mv workspace/* .
rm -rf workspace

REMOTE_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git init
git remote add origin "$REMOTE_URL"
git branch -m "$DEPLOY_BRANCH"
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add .
git commit -m "Deploy $GITHUB_SHA"
git push origin "$DEPLOY_BRANCH" --force
