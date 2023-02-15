// Get dependencies
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

//Routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require('./routes/user.routes');

//Middlewares
const verifyAccessLevel = require("./middleware/access.level");
const verifyToken = require("./middleware/jwt.auth");

const app = express();
const authURLPrefix = "/api/v1/auth";
const usersURLPrefix = '/api/v1/users';

require("./config/db.config").connect();

// General
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "La API esta corriendo..." });
});

// Auth
app.use(authURLPrefix, authRoutes);
app.use(authURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], []);

// Users
app.use(usersURLPrefix, usersRoutes);

// Port
const port = process.env.PORT || "3030";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
