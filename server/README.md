# Server

## Overview

The server-side of Cascarita is built using Node.js with Express.js as the web application framework. It provides a robust backend for managing sports-related data and operations.

Key features of the server include:

- RESTful API endpoints for various entities (seasons, leagues, teams, etc.)
- Integration with both SQL (via Sequelize ORM) and MongoDB databases
- Authentication and authorization system
- Payment processing integration with Stripe
- Multilingual support

The server is structured into several key components:

1. [Configuration](#configuration): Set up environment variables and configure the server
2. [Routes](#routes): Define API endpoints and map them to controller functions
3. [Controllers](#controllers): Contain the business logic for handling requests
4. [Models](#models): Define data structures for both SQL and MongoDB databases
5. [Middleware](#middleware): Handle cross-cutting concerns like authentication

This structure allows for a clean separation of concerns and makes the codebase more maintainable and scalable.

## Configuration

The server's configuration is managed through environment variables. These variables are loaded from a `.env` file and are used to configure the server's behavior.

View the [configuration documentation](./config/README.md) for a detailed overview of the available configuration options.

## Routes

The routes in the server are organized by entity, providing a clear and intuitive API structure. Each route file corresponds to a specific domain of the application.

View the [routes documentation](./routes/README.md) for a detailed overview of the available routes.

## Controllers

The controllers handle the business logic for the server's routes. They receive requests from the routes, process the data, and interact with the models and services to perform the necessary operations.

View the [controllers documentation](./controllers/README.md) for a detailed overview of the available controllers.

## Models

The models define the structure and relationships of the data stored in the databases. They are used by the controllers to interact with the database.

View the [models documentation](./models/README.md) for a detailed overview of the available models.

## Middleware

The `middleware.js` file contains middleware functions that are applied to specific routes or groups of routes. These middleware functions can be used for authentication, logging, or any other cross-cutting concern.
