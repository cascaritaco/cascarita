#!/bin/bash

# Install Homebrew
if ! command -v brew &> /dev/null
then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Homebrew is already installed."
fi

# Installing node and nvm
echo "Installing node, nvm, and pnpm..."
brew install node
brew install nvm
if ! command -v pnpm &> /dev/null
then
    echo "Installing pnpm..."
    curl -fsSL https://get.pnpm.io/install.sh | sh -
else
    echo "pnpm is already installed."
fi

# Install MySQL using Homebrew
echo "Installing MySQL..."
brew install mysql

# Start MySQL as a background service
echo "Starting MySQL service..."
brew services start mysql

# Wait for MySQL service to start
echo "Waiting for MySQL service to start..."
sleep 3

# Log into MySQL CLI and create the database
echo "Logging into MySQL CLI and creating database 'test_db'..."
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS test_db;
EOF

# Confirmation
echo "Database 'test_db' created successfully."

# Next we are going to install dependencies within server
echo "Fetching environment variables from AWS Secrets Manager...."

cd server
source $(brew --prefix nvm)/nvm.sh
nvm use
npm install
npm run create-dev-env

cd ../client
source $(brew --prefix nvm)/nvm.sh
nvm use
pnpm install
pnpm run create-dev-env

cd ..
# Check if .env file exists in server directory
if [ -f server/.env ]; then
    echo ".env file exists in server directory."
else
    echo ".env file does not exist in server directory."
    exit 1
fi

if [ -f client/.env ]; then
    echo ".env file exists in server directory."
else
    echo ".env file does not exist in server directory."
    exit 1
fi

cd server
echo "Migrating database..."
npm run migrate

cd ..

echo "Building docker containers"
docker-compose up --build -d
