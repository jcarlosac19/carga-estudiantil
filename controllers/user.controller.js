const jwtActions = require("../middleware/jwt.auth");
const userSchema = require("../models/usuario.model");
const bcrypt = require("bcryptjs");

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

const getAllUsers = (req, res) => {
  userSchema.find({})
  .select(["-password"])
  .then(data =>{
    res.status(201).send(data);
  })
  .catch(err=>{
    res.status(500).send({message: "No se obtuvieron los registros."})
  })
}

const updateUserById = async(req, res) => {
  const id = req.params.id;
  const {name, lastName, email, role, active, account, phone } = req.body;
  let { password } = req.body;

  if(password) {
    password = await bcrypt.hash(password, 10);
  }

  update = {
    ...(name                 && { name }),
    ...(lastName             && { lastName }),
    ...(email                && { email }),
    ...(role                 && { role }),
    ...(active !== undefined && { active }),
    ...(account              && { account }),
    ...(phone                && { phone }),
    ...(password             && { password })
  }

  userSchema.findOneAndUpdate({_id: id}, update, {
    new: true
  })
  .then(()=>{
    res.status(201).send({message: "Se actualizo el registro exitosamente."});
  })
  .catch(err=>{
    res.status(500).send({message: "No se pudo actualizar el registro."})
  })
}


module.exports = { getUserIdFromToken, currentUser, findUserById, getAllUsers, updateUserById };
