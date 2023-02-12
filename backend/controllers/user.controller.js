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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    )
    .catch((error) => res.json({ message: error }));
};
