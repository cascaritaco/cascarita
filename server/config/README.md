# Configuration

## Overview

The `config.js` file in the server's config directory is responsible for managing environment-specific database configurations. It uses the `dotenv` package to load environment variables, ensuring sensitive information is kept secure and separate from the codebase.

## Configuration Structure

The configuration is divided into two environments:

1. Development
2. Testing

Each environment has its own set of database connection parameters.

## Environment Variables

> [!IMPORTANT]
> Ensure you have a `.env` file in the root directory of the project before running the application in any environment.

### Development

The development environment uses the following variables:

- `DB_USERNAME`: The username for the MySQL database.
- `DB_PASSWORD`: The password for the MySQL database.
- `DB_NAME`: The name of the MySQL database.
- `DB_HOST`: The host of the MySQL database. If you are using Docker, this should be `host.docker.internal`.
- `DB_DIALECT`: The dialect of the MySQL database.
- `DB_PORT`: The port of the MySQL database.
- `DB_LOGGING`: A boolean value indicating whether to log database queries.

### Testing

The testing environment uses the same variables as the development environment, but with the prefix `TEST_`. This is to avoid conflicts with the development environment variables.

- `TEST_DB_USERNAME`
- `TEST_DB_PASSWORD`
- `TEST_DB_NAME`
- `TEST_DB_HOST`
- `TEST_DB_DIALECT`
- `TEST_DB_PORT`
- `TEST_DB_LOGGING`

## Usage

This configuration file is used by Sequelize ORM to establish database connections based on the current environment.

The separation of development and testing configurations allows for isolated testing without affecting the development database.
