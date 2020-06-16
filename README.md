# Mofie - your movies & shows collection

[Mofie](https://eloquent-tereshkova-4a92e4.netlify.app/) is an application that lets you search for movies and shows and add them to your collection. Adding elements to the collection is really simple - just create your category or select it from the list, add a rating on a scale of 1 to 10 and if you want add you own comment. That's all. Now you can search your favorite movies in the collection.

## Motivation

Maybe you are a person who wanted to watch something but didn't know what? And so you started the endless search until the evening was over? Or maybe you forgot that you watched the movie, which has already turned out to be an unsuccessful choice? That is why this application was created, to save all productions in the appropriate categories, e.g.: TOP 10, TOP 100, LOVE IT, NEVER AGAIN, TO WATCH, WORST 100, e.t.c.

## Features

### MAIN

- login
- account creation
- searching movies and shows
- adding, removing and modifying own categories
- adding, removing and updating production in the collection
- adding categories, ratings and comments to production
- related movies/shows with the movie/show or actors
- sorting and filtering collections

### OTHER

- pagination of the production list
- own form validation
- displaying errors
- loading

## Tech

- React (render props, hooks)
- own state based on React Context and useReducer
- SCSS modules Stylesheet
- Express
- MongoDB

## Installation

### CLIENT

To install the frontend application enter in terminal:

```
cd client
```

Now, you need to create an account on [The Movie Database API](https://developers.themoviedb.org/3). After that, create a `config` folder with `index.js` file in the `src` folder. In this file put the API key like below:

```
// src/config/index.js

export const API_KEY = 'your-moviedatabase-api-key';
```

and enter in terminal:

```
yarn
```

now you can run the application:

```
yarn start
```

### API

To install the backend application enter in the terminal:

```
cd api
```

Now you need to create MongoDB database collection, then create user and password. In `nodemon.json` put code, like below:

```
// <userName> - your userName instead of this
// <password> - your password instead of this
// <key> - create a unique key, e.g.: 4fgerft345cdsfrvy45gef

{
  "env": {
    "MONGO_DB": "mongodb+srv://<userName>:<password>@cluster-hzkgu.mongodb.net/test?retryWrites=true&w=majority",
    "JWT_KEY": "<key>"
  }
}

```

after that, run in the terminal:

```
npm install
```

now you can run the application:

```
npm start
```

## License

For personal use only.
