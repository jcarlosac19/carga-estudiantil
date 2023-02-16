const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");
const auth = require("../middleware/jwt.auth");

exports.register = async (req, res) => {
  try {
    const { name, lastName, email, password, account, phone } = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Usuario.create({
      name,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      account,
      phone
    });

    const token = auth.createToken(user._id, email);

    res.status(201).send(
      {
        message: "Se creo la cuenta exitosamente.",
        token: token
      });

    } catch (err) {
      res.status(400).send("Hubo un error inesperado.")
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = auth.createToken(user._id, email);

      user.token = token;
      console.log(user);
      console.log(token);

      res.status(200).json({
        message: "Las credenciales han sido validadas.",
        token: token,
        userId: user._id
      });
    } else {
      res.status(400).send("Las credenciales son invalidas.");
    }
  } catch (err) {
    console.log(err);
  }
};
