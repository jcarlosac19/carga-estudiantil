const Usuario = require("../models/usuario.model");

let accessLevelOptions = {}

accessLevelOptions.isAdmin = async (req, res, next) =>{
    const { user_id } = req.user.user_id;
    await Usuario.findOne({ user_id })
    .then(user =>{
      if(!user.es_administrador) {
        res.status(409).send("Solo un administrador puede ejecutar esta accion.");
        return;
      }
      next();
    })
    .catch(err => {
         res.status(500).send({message: err.message})
    });
};

accessLevelOptions.isUser = async (req, res, next) =>{
    const { user_id } = req.user.user_id;
    await Usuario.findOne({ user_id })
    .then(user =>{
      if(!user.es_usuario) {
        res.status(409).send("Solo un usuario puede realizar esta accion.");
        return;
      }
      next();
    })
    .catch(err => {
         res.status(500).send({message: err.message})
    });
};

accessLevelOptions.isActive = RequestHandler = async (req, res, next) => {
  const user = await Usuario.findOne({ _id: req.user.user_id });

  if (!user || !user.active) {
    return res.status(500).send({message: 'Tu usuario fue inactivado, comunicate con el coordinador de tu carrera'});
  }

  next();
};

module.exports = accessLevelOptions