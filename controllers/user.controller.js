const jwtActions = require("../middleware/jwt.auth");
const userSchema = require("../models/usuario.model");


exports.findUserById = (req, res) => {
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

exports.currentUser = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  token = token.replace(/^Bearer\s+/, "");
  const {user_id} = jwtActions.decode(token);

  userSchema
  .findById(user_id)
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
  .catch((error) => res.status(500).json({ message: error }));
};

