set -e

echo "Deploying started..."
git pull origin development

echo "Installing dependencies..."
npm install --force

echo "Building..."
npm run build

echo "Finished..."