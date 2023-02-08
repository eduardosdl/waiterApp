# Waiter App

- Waiter app is not just an app but a complete solution for a restaurant
- It has backend, frontend and mobile
- All done using Typescript with Node, React and React Native

## Project Operation
- Back-end create product and categories
- Mobile consumes these products and categories and create orders
- Back-end recive requets and send to front-end automatically by websocket
- Front-end generate a dashboard to manege this orders, changing status

## Back-end
- It's an API to connect on database mongo
- manages searching, creating and updating s and categories, products and orders in the database
### Technologies
- NodeJS
- Express
  - To crate server
- Mongoose
  - To connect on mongoDB
- Socket.io
  - To create a web socket connection
- Multer
  - To handle with images

### To use
- Envairoment variables
  ```
    MONGO_USERNAME=<mongodb_user>
    MONGO_PASSWORD=<mongodb_password>
    MONGO_HOSTNAME=<mongodb_host>
    MONGO_PORT=<mongodb_port>
    MONGO_DB=<database_name>
  ```
- The CORS_ORIGIN is equal *, accept all urls
- Run the commands
  ```
    $ yarn install

    $ yarn dev
  ```

## Front-end
- Communicates with the API through web socket
- Create a dashboard to manage orders
### Functions
- [X] Manage orders
- [ ] Create category
- [ ] Create products
### Technologies
- ReactJS
- React Router
- Styled Components
- Prop Types
- Vite
- Socket.io
- Axios
- toastify
### To use
- Open de folder web
- Run the commands
```
  $ yarn install

  $ yarn dev
```

## Mobile
- Create a interface to create orders on mobile device
- Communicates with the API to get category and products and create orders
### Technologies
- React Native
- Expo
- Styled Components
- Axios
### To use
- Open de folder web
- Run the commands
```
  $ yarn install

  $ yarn start
```
- And scanning qr code with expo go
