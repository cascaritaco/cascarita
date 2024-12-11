# Cascarita

Welcome to Cascarita! This file provides instructions on how to run important commands and navigate through the project.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- [brew](https://brew.sh/) - Make sure brew is installed

### Installation

1. Install Node

```bash
brew install node
```

2. Setup the MySQL database

```bash
# install and activate mysql service
brew install mysql
brew services start mysql

# This will log you into SQL CLI (ie. mysql>)
mysql -u root

# Lastly create the following database
CREATE DATABASE test_db;
```

3. Setup the MongoDB database

```bash
# Download the official Homebrew formula for MongoDB
brew tap mongodb/brew
# Install MongoDB
brew install mongodb-community@7.0
# Start the MongoDB service
brew services start mongodb-community@7.0
```

4. Clone the repository to your local machine

```bash
git clone git@github.com:cascaritaco/cascarita.git
```

5. Change into the project directory:

```bash
cd cascarita
```

6. Install project dependencies:

```bash
npm install
```

7. Create a free MongoDB Atlas cluster [here](https://www.mongodb.com/docs/atlas/getting-started/).

8. Once your cluster is created, get your connection string to extract the username, password, url, and app name.

```txt
mongodb+srv://USERNAME:PASSWORD@$URL/?retryWrites=true&w=majority&appName=$APPNAME
```

9. Copy `.env.example` into a new file named `.env`. Populate the `MONGO_*` environment variables from `.env` with the data extracted from the connection string.

```bash
# MongoDB cluster configuration
MONGO_CLUSTER_USERNAME=
MONGO_CLUSTER_PASSWORD=
MONGO_CLUSTER_DB_NAME=
MONGO_CLUSTER_URL=
MONGO_CLUSTER_APP_NAME=
```

10. If your MySQL database requires a password, make sure you set that password in the `.env` as well.

```bash
DB_NAME=test_db
DB_PASSWORD=your-password
```

### Using Docker

If you haven't done so, please download [Docker Desktop](https://www.docker.com/products/docker-desktop/), and start the Docker daemon, then run:

```bash
# load the environment variables
cp .env.example .env
# build the images
docker-compose build
# start the client and server container
docker-compose up
```

**NOTE**: It's important to ensure that for local connections to database from the server container, specify within the `.env` `DB_HOST=host.docker.internal`. This will be the way we are planning on deploying our applicaton to the cloud!

#### 1. Start the Development Server

To run the project locally, use the following command:

```bash
# load the environment variables
cp .env.example .env
# runs react frontend on port 3000 and backend node server on port 3001
npm run dev
```

**NOTE**: In order for this to work you will need to ensure that `.env` `DB_HOST=127.0.0.1`.

#### 2. Start the Production Server

To run the project as in production:

```bash
# load the environment variables
cp .env.example .env
# builds the `dist` directory used to serve frontend
npm run build
# starts the node server
npm run start
```

#### 3. Running Tests

To run the Jest tests:

```bash
npm run test
```

#### 4. Running Coverage

To see total testing coverage:

```bash
npm run coverage
```

#### 5. Running ESlint

To identify and fixing problems in our code:

```bash
npm run eslint
```

#### 6. Running DB Migrations

To run any Sequalize migrations:

```bash
npm run sequelize:migrate
```
###  Copyright
Copyright (c) 2024 Cascarita.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the Software for personal or academic purposes only, subject to the following conditions:

1. **Non-Commercial Use Only**:
   The Software may not be used, copied, modified, merged, published, distributed, sublicensed, or sold for commercial purposes or financial gain.

2. **No Redistribution for Sale**:
   The Software and its derivatives may not be sold, sublicensed, or otherwise distributed in exchange for any monetary or non-monetary compensation.

3. **Ownership**:
   The copyright holders retain all ownership and intellectual property rights of the Software. Any unauthorized use, duplication, or modification of the Software that violates this license will constitute a breach of copyright.

4. **Attribution**:
   The above copyright notice and this license must be included in all copies or substantial portions of the Software.

5. **Warranty Disclaimer**:
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

By using this Software, you agree to the terms and conditions stated herein. If you do not agree, you may not use, modify, or distribute this Software.
