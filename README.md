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

2. Setup Local MySQL Database

```bash
# install and activate mysql service
brew install mysql
brew services start mysql

# This will log you into SQL CLI (ie. mysql>)
mysql -u root

# Lastly create the following database
CREATE DATABASE test_db;
```

3. Clone the repository to your local machine

```
git clone git@github.com:cascaritaco/cascarita.git
```

4. Change into the project directory:

```
cd cascarita
```

5. Install project dependencies:

```bash
npm install
```

### Running Commands

#### 1. Start the Development Server

To run the project locally, use the following command:

```bash
# runs react frontend on port 3000 and backend node server on port 80
npm run dev
```

#### 2. Start the Production Server

To run the project as in production:

```bash
# builds the `dist` directory used to serve frontend
npm run build
# starts the node server
npm run start
```

#### 3. Running Tests

To run the Jest tests:

```
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
