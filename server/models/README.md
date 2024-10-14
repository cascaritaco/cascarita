# Models

This directory contains the data models for Cascarita. These models define the structure and relationships of the data stored in the databases.

> [!WARNING]
> When making changes to these models, be sure to update any corresponding migrations to keep the database schema in sync with the model definitions.

## Database Technologies

Cascarita uses both MySQL (via Sequelize ORM) and MongoDB for data storage

- Sequelize models handle SQL database interactions.
- MongoDB models (in `../mongoModels/`) manage NoSQL data structures.

## Associations

The models define associations between different entities, creating relationships in the database. For example:

- Games are associated with Sessions, Teams, GameStatus, and Fields.
- Divisions, Teams, and Fields are associated with Groups.

## Usage

These models are used throughout the application to interact with the database, ensuring data integrity and providing a structured way to work with our application's data.
