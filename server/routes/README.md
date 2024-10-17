# Routes

The routes in Cascarita's server are organized by entity, providing a clear and intuitive API structure. Each route file corresponds to a specific domain of the application.

Each route file uses the corresponding controller to handle the business logic for these operations. This structure allows for easy maintenance and scalability of the API.

The routes follow RESTful conventions, making the API intuitive to use and understand. They provide a comprehensive set of operations for managing the various entities in the Cascarita application.

## Table of Contents

- [account.routes.js](#accountroutesjs)
- [auth.routes.js](#authroutesjs)
- [division.routes.js](#divisionroutesjs)
- [field.routes.js](#fieldroutesjs)
- [form.routes.js](#formroutesjs)
- [group.routes.js](#grouproutesjs)
- [league.routes.js](#leagueroutesjs)
- [player.routes.js](#playerroutesjs)
- [role.routes.js](#roleroutesjs)
- [season.routes.js](#seasonroutesjs)
- [survey.routes.js](#surveyroutesjs)
- [team.routes.js](#teamroutesjs)
- [user.routes.js](#userroutesjs)

### account.routes.js

This file handles various operations related to Stripe account connections and payment intents.

| HTTP Verb | Route  | Description                |
| --------- | ------ | -------------------------- |
| GET       | `/`    | Retrieve all accounts      |
| GET       | `/:id` | Get a specific account     |
| POST      | `/`    | Create a new account       |
| PATCH     | `/:id` | Update an existing account |
| DELETE    | `/:id` | Delete an account          |

### auth.routes.js

This file contains routes related to user authentication and authorization.

| HTTP Verb | Route         | Description                        |
| --------- | ------------- | ---------------------------------- |
| GET       | `/csrf-token` | Generate and return a CSRF token   |
| POST      | `/login`      | Authenticate user and log them in  |
| GET       | `/user`       | Get authenticated user information |
| POST      | `/logout`     | Log out the current user           |

### division.routes.js

This file is responsible for handling operations related to divisions.

| HTTP Verb | Route  | Description                 |
| --------- | ------ | --------------------------- |
| POST      | `/`    | Create a new division       |
| PATCH     | `/:id` | Update an existing division |
| DELETE    | `/:id` | Delete a division           |

### field.routes.js

This file is responsible for handling operations related to fields.

| HTTP Verb | Route  | Description              |
| --------- | ------ | ------------------------ |
| POST      | `/`    | Create a new field       |
| PATCH     | `/:id` | Update an existing field |
| DELETE    | `/:id` | Delete a field           |

### form.routes.js

This file manages operations related to forms and their responses.

| HTTP Verb | Route                 | Description              |
| --------- | --------------------- | ------------------------ |
| POST      | `/:group_id/:user_id` | Create a new form        |
| POST      | `/responses`          | Create a response        |
| GET       | `/:form_id/responses` | Get responses by form ID |
| GET       | `/:document_id`       | Get form by document ID  |
| PATCH     | `/:form_id`           | Update a form            |
| DELETE    | `/:form_id`           | Delete a form            |

### group.routes.js

This file manages operations related to groups.

| HTTP Verb | Route            | Description               |
| --------- | ---------------- | ------------------------- |
| GET       | `/:id`           | Retrieve a specific group |
| GET       | `/:id/divisions` | Get divisions by group ID |
| GET       | `/:id/fields`    | Get fields by group ID    |
| GET       | `/:id/leagues`   | Get leagues by group ID   |
| GET       | `/:id/forms`     | Get all forms for a group |
| PATCH     | `/:id`           | Update a group            |

### league.routes.js

This file manages operations related to leagues.

| HTTP Verb | Route          | Description              |
| --------- | -------------- | ------------------------ |
| POST      | `/`            | Create a new league      |
| GET       | `/:id`         | Get a league by group ID |
| GET       | `/:id/seasons` | Get teams by league ID   |
| PATCH     | `/:id`         | Update a league          |
| DELETE    | `/:id`         | Delete a league          |

### player.routes.js

This file is focused on player management and related operations.

| HTTP Verb | Route     | Description         |
| --------- | --------- | ------------------- |
| POST      | `/create` | Create a new player |

### role.routes.js

This file is responsible for handling operations related to user roles.

| HTTP Verb | Route | Description       |
| --------- | ----- | ----------------- |
| POST      | `/`   | Create a new role |

### season.routes.js

This file is responsible for handling operations related to seasons.

| HTTP Verb | Route                 | Description                 |
| --------- | --------------------- | --------------------------- |
| GET       | `/`                   | Retrieve all seasons        |
| GET       | `/:id`                | Get a specific season       |
| GET       | `/:id/leagues`        | Get seasons by league ID    |
| GET       | `/:id/divisions`      | Get divisions by season ID  |
| GET       | `/:seasonId/seasonId` | Get all divisions by season |
| POST      | `/`                   | Create a new season         |
| PATCH     | `/:id`                | Update an existing season   |
| DELETE    | `/:id`                | Delete a season             |

### survey.routes.js

This file is responsible for handling operations related to surveys.

> [!IMPORTANT]
> Work in progress. These routes will be rerouted to MongoDB in the future.

| HTTP Verb | Route                   | Description                                    |
| --------- | ----------------------- | ---------------------------------------------- |
| GET       | `/survey/:id`           | Retrieve a specific survey                     |
| GET       | `/surveys`              | Get all surveys with optional query parameters |
| GET       | `/survey/:id/responses` | Get responses for a specific survey            |
| POST      | `/survey`               | Create a new survey                            |

### team.routes.js

This file is responsible for handling operations related to teams.

| HTTP Verb | Route                                      | Description                         |
| --------- | ------------------------------------------ | ----------------------------------- |
| GET       | `/seasons/:seasonId/divisions/:divisionId` | Get teams by season and division ID |
| GET       | `/groups/:id`                              | Get teams by group ID               |
| POST      | `/`                                        | Create a new team                   |
| PATCH     | `/:id`                                     | Update an existing team             |
| DELETE    | `/:id`                                     | Delete a team                       |

### user.routes.js

This file is responsible for handling operations related to users.

> [!IMPORTANT]
> Work in progress. The `/loginReactPageHere` appears to be a placeholder.

| HTTP Verb | Route                 | Description                  |
| --------- | --------------------- | ---------------------------- |
| GET       | `/loginReactPageHere` | --                           |
| GET       | `/:id`                | Get user by user ID          |
| PATCH     | `/:id`                | Update user by ID            |
| POST      | `/register`           | Register a new user          |
| POST      | `/login`              | Authenticate and log in user |
| POST      | `/otp/emails`         | Send OTP email               |
| POST      | `/forms/emails`       | Send form link email         |
| POST      | `/otp/verification`   | Verify OTP                   |
