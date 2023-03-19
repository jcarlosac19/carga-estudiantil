const diasModel = require("../models/dias.model");

exports.crearDia = async (req, res) => {
  const { dias, numeroDias } = req.body;
  record = {
    dias: dias,
    numeroDias: numeroDias,
  };
  await diasModel
    .create(record)
    .then(() => {
      res.status(201).send({ message: "Se creo el dia exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No pudo crear el dia." });
    });
};

exports.obtenerDias = async (req, res) => {
  await diasModel
    .find({})
    .then((dias) => {
      res.status(200).send(dias);
    })
    .catch((err) => {
      res.status(400).send({ message: "No puedo obtener los harios." });
    });
};

exports.eliminarDia = async (req, res) => {
  idDia = req.params.id;
  await diasModel
    .deleteOne({ _id: idDia })
    .then(() => {
      res.status(200).send({ message: "Se elimino el dia exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No pudo eliminar el dia." });
    });
};

exports.actualizarDia = async (req, res) => {
  idDia = req.params.id;
  dia = req.body.dia;

  if (!dia) return res.status(400).send({ message: "Hace falta el dia." });

  dia = {
    dia: dia,
  };

  await diasModel
    .updateOne({ _id: idDia }, dia, {
      new: true,
    })
    .then(() => {
      res.status(200).send({ message: "Se actualizo el dia exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No se pudo actualizar el dia." });
    });
};
