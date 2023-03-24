const json2CSV = require("json-2-csv");
const utils = require("../services/utility");
const solicitudesModel = require("../models/solicitud.clases.alumno.model");
const inscripcionesModel = require("../models/inscripcion.clases.alumno.model");

const solicitudesAcademicasReporte = async function (quarter, callback) {
  const filter = {
    trimestre: quarter,
  };

  const solicitudes = await solicitudesModel
    .find(filter)
    .populate({ path: "materia",   select: "codigoMateria nombreMateria nombreCarrera requisitoUno requisitoDos"})
    .populate({ path: "usuario",   select: "name lastName email account phone"})
    .populate({ path: "trimestre", select: "anio trimestre"})
    .populate({ path: "horario",   select: "horario duracionMinutos"})
    .populate({ path: "dias",      select: "numeroDias dias"})
    .lean()
    .exec();
  const columnsToExclude = ["_id","materia._id","usuario._id","horario._id","dias._id","updatedAt","__v"];
  utils
    .convertJSONtoCSV(solicitudes, columnsToExclude)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    });
  return;
};

async function proyeccionOfertaAcademicaReporte(quarter, callback) {

  const filter = {
    trimestre: quarter,
  };

  const inscripciones = await inscripcionesModel
    .find(filter)
    .populate({ path: "materia",
                select: "horario ciudad sede tipoDeAsistencia dias duracion cupos",
                populate: {
                            path: "materia",
                            select: "codigoMateria nombreMateria codigoCarrera nombreCarrera requisitoUno requisitoDos"
                          }
    })
    .populate({path: "trimestre", select: "anio trimestre"})
    .populate({path: "usuario", select: "name lastName email account phone"})
    .lean()
    .exec();
  const columnsToExclude = ["_id","trimestre._id","materia._id","materia.materia._id","usuario._id","__v","updatedAt"]
  utils
    .convertJSONtoCSV(inscripciones, columnsToExclude)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    });
  return;
}

exports.reporte = async (req, res) => {
  const quarterId = req.query.quarter;
  const report = req.params.id;
  const listOfReports = {
    classRequest: "Solicitudes",
    offertRequest: "Ofertas",
  };
  switch (report) {
    case listOfReports.classRequest:
      solicitudesAcademicasReporte(quarterId, (err, data) => {
        if (err)
          res
            .status(500)
            .send({
              error: err,
              message: "Hubo un error descargando el reporte de solicitudes.",
            });
        res
          .status(201)
          .send({
            message: "Se descargo el reporte de manera exitosa.",
            blob: data,
          });
      });
      break;
    case listOfReports.offertRequest:
      proyeccionOfertaAcademicaReporte(quarterId, (err, data) => {
        if (err)
          res
            .status(500)
            .send({
              error: err,
              message:
                "Hubo un error descargando el reporte de la oferta academica seleccionada.",
            });
        res
          .status(200)
          .send({
            message: "Se descargo el reporte de manera exitosa.",
            blob: data,
          });
      });
      break;
    default:
      res
        .status(500)
        .send({ message: "No se encontro el reporte seleccionado." });
  }
};
