const jwtActions = require("../middleware/jwt.auth");
const userSchema = require("../models/usuario.model");

const getUserIdFromToken = (req) => {
  let token = req.headers["authorization"];
  token = token.replace(/^Bearer\s+/, "");
  const { user_id } = jwtActions.decode(token);
  return user_id;
};

const findUserById = (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((user) =>
      res.json({
        uid: user.id,
        name: user.name,
        lastName: user.lastName,
        fullName: `${user.name} ${user.lastName}`,
        email: user.email,
        role: user.role,
        active: user.active,
        account: user.account,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    )
    .catch((error) => res.status(404).json({ message: error }));
};

const currentUser = (req, res) => {
  console.log(req.headers);
  const userId = getUserIdFromToken(req);
  userSchema
    .findById(userId)
    .then((user) =>
      res.json({
        uid: user.id,
        name: user.name,
        lastName: user.lastName,
        fullName: `${user.name} ${user.lastName}`,
        email: user.email,
        role: user.role,
        active: user.active,
        account: user.account,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    )
    .catch((error) => res.status(401).json({ message: error }));
};

module.exports = { getUserIdFromToken, currentUser, findUserById };
