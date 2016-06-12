# Hashline - Back-End
Realtime discussions

## Technologies
* Redux
* React
* Webpack
* SCSS
* Babel
* Immutable
* Koa
* Bootstrap
* Socket.io
* Knex
* PostgreSQL

## API List
- Authenticate : /authenticate : POST
  - Input:
  ```json
  {
      "name": "string",
      "password": "string"
  }
  ```
  - Output:
  ```json
  {
      "id_token": "string"
  }
  ```
  - Errors:
  ```json
      status: 404
      message: "User is not found"
  ```
  ```json
      status: 404
      message: "Password is not correct"
  ```
- Registration : /registration : POST
  - Input:
  ```json
  {
      "name": "string",
      "password": "string",
      "username": "string"
  }
  ```
  - Output:
  ```json
  {
      "id_token": "string"
  }
  ```
  - Errors:
  ```json
      status: 409
      message: "Username and email should be unique"
  ```
- Get User Data : /api/user : GET
  - Output:
  ```json
  {
      "username": "string",
      "email": "string"
  }
  ```
