liftBook is both a personal project of mine and my capstone project for BrainStation's Web Development bootcamp!

To install this repo on your machine, choose a folder where you would like to copy the repo into and run the following command:
git clone https://github.com/keithryanorourke/liftBook

To run this project on your machine, you will need to have MySQL installed on your system and you will need to create a database called "liftbookdb", or, if you prefer, name the database whatever you want and change the value of "database" in knexfile.js (in the server folder). You may also wish to change the user and password fields if you have already setup your MySQL user and password on your machine. 

The server requires the following environment variables to function: 
  - PORT: the port on your local machine on which you want to run the server. If you're not sure which port to use, a good default is 8080
  - KEY: A random string of characters that will be used to encrypt the JWT token which is used to log users in and then authenticate them on each request.

Before launching the website, you will need to install all dependencies on the server side and the client side. This can be done by running the following terminal command (assuming your present working directory is the parent directory/folder for this repo, called liftbook by default):
npx concurrently "cd ./client && npm i" "cd ./server && npm i"

next you will need to run knex migrations and seeds to setup and populate the MySQL database.
In your terminal, cd into the server folder and run the following commands:
"npx knex migrate:latest"
"npx knex seed:run"

Finally, in order to launch the server and the front end, cd back into the root directory of this repo and run the following command:
npx concurrently "cd ./client && npm start" "cd ./server && npx nodemon server.js".

And now you have liftbook running locally on your machine!

If you already have knex or nodemon installed globally on your machine, you can omit the "npx" argument which proceeds "knex" or "nodemon" in the above terminal commands.

I may potentially add npm scripts to simplify the terminal commands in the future.

While this is a public repo, liftbook is not an open source project.