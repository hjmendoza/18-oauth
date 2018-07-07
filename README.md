![cf](http://i.imgur.com/7v5ASc8.png) OAuth - Haley Mendoza
===

## OAuth Server
  This lab adds Google OAuth to an express/mongo web app.  
  * The backend is created using Google's Dev Console. It supports a client app on `http://localhost` and supports a server redirect uri to `http://localhost:3000/oauth`.  A backend route in the auth server (`GET /oauth`) handles google oauth 
  * The frontend is a basic index.html with an anchor tag pointing to the google authorization page. 

## To Start Application
Clone down code. Install all necessary dependencies in each directory using `npm i`. Define enviornment variables (.env) such as PORT, MONGODB_URI, and SECRET in `auth-server` directory. Example of of .env vars: 
  ```
  PORT = 3000
  MONGODB_URI = 'mongodb://localhost:<PORT>/lab-18'
  SECRET=somesecret

  ``` 
Start up servers in terminal, beginning with mongodb. In `auth-server` directory, run `npm run watch`. In `web-server` directory, run `npm start`. View client on `http://localhost:<PORT>`.

Login by clicking on  `Login With Google`. After authorization, you should see all the cash...

You may test routes using Postman or hhttpie. `GET localhost:3000/showMeTheMoney` and the access token will also show you all the cash.
