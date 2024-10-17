# Controllers

The controllers folder contains the business logic for the Cascarita application. Each controller is responsible for handling specific entity-related operations.

- **AccountController**: Stripe account connections and payment processing
- **DivisionController**: Division-related operations
- **FieldController**: Field management and retrieval
- **FormController**: Form operations and response handling
- **GroupController**: Group management and associated entity retrieval
- **LeagueController**: League operations and associated entity retrieval
- **PlayerController**: Player management and retrieval
- **RoleController**: Role management and retrieval
- **SeasonController**: Season operations and associated entity retrieval
- **SessionController**: Session management and retrieval
- **TeamController**: Team management and retrieval
- **TeamSessionController**: Team session management and retrieval
- **UserController**: User management and retrieval

## Purpose

These controllers serve as intermediaries between routes and data models, processing requests, interacting with the database, and formulating responses. They implement the core business logic of the application, ensuring proper data handling, validation, and model interactions.

## Architecture

The controller structure supports the separation of concerns principle, allowing for modular and maintainable code organization within the Cascarita.
