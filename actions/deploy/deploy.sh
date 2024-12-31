set -eou pipefail

cd $WORKING_DIRECTORY
nix run "github:brack-lang/ravenlog?dir=backend" build
git clone https://github.com/brack-lang/ravenlog
mkdir -p workspace
mv ravenlog/frontend/* workspace/
cp .ravenlog/blog_settings.json workspace/src/app/_assets/
cp .ravenlog/posts.json workspace/src/app/_assets/
cp -r .ravenlog/assets/** workspace/public/

grep -v '^workspace/$' | grep -v '^\.git$' | xargs rm -rf
mv workspace/* .
rm -rf workspace
git switch -c $DEPLOY_BRANCH
git add *
git commit -m "Deploy"
git push origin $DEPLOY_BRANCH --force
