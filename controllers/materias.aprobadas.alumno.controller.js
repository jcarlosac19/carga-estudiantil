const materiasAprobadasModel = require("../models/materias.aprobadas.alumno.model");
const cargaAcademicaModel = require("../models/carga.academica.model");
const userController =  require("../controllers/user.controller");

exports.agregarMateriasAprobadas = async (req, res) => {
  const records = req.body;

  materiasAprobadasModel
    .insertMany(records)
    .then(() => {
      res
        .status(201)
        .send({ message: "Se agregaron los registros exitosamente." });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "No se pudieron agregar los registros." });
    });
};

exports.obtenerMateriasAprobadas = async (req, res) => {
  try {
    const userId = req.user.user_id;

    let materias = [];
    let materiasAlumno = [];

    let materiasAprobadas = await materiasAprobadasModel
      .find({ usuario: userId })
      .populate("materia")
      .exec();

    let cargaAcademica = await cargaAcademicaModel
      .find({})
      .populate("version")
      .exec();

    cargaAcademica = cargaAcademica.filter(
      (docs) => docs.version.estaActiva === true
    );

    materiasAprobadas.forEach((aprobadas) => {
      materiasAlumno.push(aprobadas.materia.codigoMateria);
    });

    cargaAcademica.forEach((materia) => {
      let requisitos = [];

      if (materia.requisitoUno != "") requisitos.push(materia.requisitoUno);
      if (materia.requisitoDos != "") requisitos.push(materia.requisitoDos);

      materias.push({
        _id: materia._id,
        materiaNombre: materia.nombreMateria,
        codigoMateria: materia.codigoMateria,
        nombreCarrera: materia.nombreCarrera,
        anio: materia.anio,
        requisitos: requisitos,
        duracionSemanal: materia.duracionSemanal,
        aprobada: false,
        cumpleRequisitos: false,
        puedeMatricular: false,
      });
    });

    materias.map((materia) => {
      let requisitos = materia.requisitos;
      let hasAllRequirements = requisitos.every((requisito) => {
        return materiasAlumno.includes(requisito);
      });

      materia.cumpleRequisitos = hasAllRequirements;

      if (materiasAlumno.includes(materia.codigoMateria))
        materia.aprobada = true;
      if (requisitos.length == 0) materia.cumpleRequisitos = true;
      if (materia.cumpleRequisitos == true && materia.aprobada == false)
        materia.puedeMatricular = true;
    });

    res.status(200).send(materias);
  } catch (error) {
    res.status(500).send({ message: "No se pudieron obtener los registros." });
  }
};

exports.eliminarMateriaAprobada = async (req, res) => {
  const materiaId = req.params.id;

  materiasAprobadasModel
    .deleteOne({ _id: materiaId })
    .then(() => {
      res.status(200).send({ message: "Se elimno el registros exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No se pudo eliminar el registro." });
    });
};
