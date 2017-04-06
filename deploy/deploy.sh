# Deployment script for SOEN487-PROJECT backend
# Needs the Heroku CLI and NPM installed

# Get script dir & top dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TOP_DIR=${DIR}/../

# Push backend to Heroku
pushd ${TOP_DIR}
git subtree push --prefix backend heroku master
popd

# Build frontend & deploy to surge
pushd ${TOP_DIR}/frontend
npm install
npm run gulp deploy
popd

