const horariosModel = require("../models/horarios.model");

exports.crearHorario = async (req, res) => {
  const { horario, duracionMinutos } = req.body;
  record = {
    horario: horario,
    duracionMinutos: duracionMinutos,
  };
  await horariosModel
    .create(record)
    .then(() => {
      res.status(201).send({ message: "Se creo el horario exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No pudo crear el horario." });
    });
};

exports.obtenerHorarios = async (req, res) => {
  await horariosModel
    .find({})
    .then((horarios) => {
      res.status(200).send(horarios);
    })
    .catch((err) => {
      res.status(400).send({ message: "No puedo obtener los harios." });
    });
};

exports.eliminarHorario = async (req, res) => {
  idHorario = req.params.id;
  await horariosModel
    .deleteOne({ _id: idHorario })
    .then(() => {
      res.status(204).send({ message: "Se elimino el horario exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No pudo eliminar el horario." });
    });
};

exports.actualizarHorario = async (req, res) => {
  idHorario = req.params.id;
  horario = req.body.horario;

  if (!horario)
    return res.status(400).send({ message: "Hace falta el horario." });

  horario = {
    horario: horario,
  };

  await horariosModel
    .updateOne({ _id: idHorario }, horario, {
      new: true,
    })
    .then(() => {
      res
        .status(200)
        .send({ message: "Se actualizo el horario exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No se pudo actualizar el horario." });
    });
};
