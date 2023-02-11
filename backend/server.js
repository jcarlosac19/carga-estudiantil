// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')

const dotenv = require('dotenv');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

//Routes
const authRoutes = require('./routes/auth.routes');

//Middlewares
const verifyAccessLevel = require('./middleware/access.level');
const verifyToken = require('./middleware/jwt.auth');

const app = express();
const urlPrefix = '/api/v1';

require("./config/db.config").connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({ message: "La API esta corriendo..." });
  });

app.use(urlPrefix,authRoutes);

app.use(urlPrefix,
    [
      verifyToken.verifyToken,
      verifyAccessLevel.isActive
    ],
      [

      ]
);

const port = process.env.PORT || '3030';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));