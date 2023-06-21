
# liftBook

liftBook is both a personal project of mine and my capstone project for BrainStation's Web Development bootcamp! It is a fullstack application using React and SASS on the front end and Express and Knex (communicating with a MySQL database) on the backend. The application is a semi-customizable user account based strength tracking app!


## Tech Stack

### Front End
![Logo](https://skillicons.dev/icons?i=html,css,scss,js,react,nodejs)
HTML5, CSS3, SASS, JavaScript(ES6), React, NodeJS
### Back End
![Logo](https://skillicons.dev/icons?i=nodejs,express,mysql)
NodeJS, Express, MySQL
### Deployment
![Logo](https://skillicons.dev/icons?i=aws,nginx,linux)
AWS (EC2, RDS, Route 53), Nginx, Linux (Ubuntu)

## Run Locally

Clone the project

```bash
git clone https://github.com/keithryanorourke/liftbook
```

Before launching the website, you will need to install all dependencies on the server side and the client side. This can be done by running the following terminal command (assuming your present working directory is the parent directory/folder for this repo, called liftbook by default):

```bash 
npx concurrently "cd ./client && npm i" "cd ./server && npm i"
```

Next you will need to run knex migrations and seeds to setup and populate the MySQL database. In your terminal, cd into the server folder and run the following commands: 
```bash
npx knex migrate:latest
npx knex seed:run
```

Finally, in order to launch the server and the front end, cd back into the root directory of this repo and run the following command: 
```bash
npx concurrently "cd ./client && npm start" "cd ./server && npx nodemon server.js".
```

And now you have liftbook running locally on your machine!

If you already have knex or nodemon installed globally on your machine, you can omit the "npx" argument which proceeds "knex" or "nodemon" in the above terminal commands.

Side note that liftBook is a personal project and not open source. These setup instructions are only intended for anybody who is inteerested in how liftBook was made and would like to be able to play around with the code on their own machines.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Client Side
`REACT_APP_BACKEND_URL`: A url path for requesting data from the express server. When running on your local machine, this should be http://localhost:8080 UNLESS you are choosing a different port to run the server on, in which case you should replace "8080" with whichever port you have chosen.

### Server Side
`PORT`: The port on your local machine on which you want to run the server. If you're not sure which port to use, a good default is 8080.

`KEY`: A random string of characters that will be used to encrypt the JWT token which is used to log users in and then authenticate them on each request.

