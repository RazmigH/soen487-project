# Deployment script for SOEN487-PROJECT backend
# Needs the Heroku CLI installed

# Get script dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

TOP_DIR=${DIR}/../
pushd ${TOP_DIR}

# Push backend to heroku
git subtree push --prefix backend heroku heroku-push

popd

