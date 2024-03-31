# PugdyPals API

this is the backend API of [PudgyPals](https://github.com/GrAgonBi/pudgypals)

## Installation

## Set up backend api

1. Clone or download this repo.
2. Create a new database in MySQL called `pudgypals`.
3. Install server dependencies:

   Run `npm install` from inside the pudgypals directory.

   ```bash
   $ npm install
   ```

4. Run migrations
   ```bash
   $ npm run migrate
   ```
5. Run seeds
   ```bash
   $ npm run seed
   ```
6. Set environment variables:

   Rename `.env_sample` to `.env` and change placeholder values with your own.

   ```shell
   SECRET_KEY = <SECRET KEY>
   PORT=<PORT_NUMER>
   DB_HOST=<HOST ADDRESS>
   DB_DATABASE=<>YOUR DB_NAME
   DB_USER=<YOUR DB USERNAME>
   DB_PASSWORD=<YOUR DB PASSWORD>

   ```

7. Start the server:
   ```bash
   $ node server.js
   ```

## Set up the frontend

[Click me](https://github.com/GrAgonBi/pudgypals#set-up-the-frontend) to continue the frontend setup
