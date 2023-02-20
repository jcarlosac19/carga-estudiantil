const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

let jwtActions = {};

//JSON Web Tokens
jwtActions.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace(/^Bearer\s+/, "");
  } else {
    res.status(401).send("Un token es requerido para esta solicitud.");
    return;
  }

  try {
    const decoded = jwt.verify(token, config.keys.secret);
    req.user = decoded;
  } catch (err) {
    res.status(401).send("El token es invalido.");
    return;
  }

  next();
  return;
};

jwtActions.createToken = (id, email) => {
  return jwt.sign(
    {
      user_id: id,
      email,
    },
    config.keys.secret,
    {
      expiresIn: config.keys.expiresIn,
    }
  );
};

jwtActions.decode = (token) => {
  return jwt.decode(token);
}

module.exports = jwtActions;
