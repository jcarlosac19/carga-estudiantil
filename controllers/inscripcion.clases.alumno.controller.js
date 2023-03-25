const inscripcionModel = require("../models/inscripcion.clases.alumno.model");
const ofertaAcademicaModel = require("../models/oferta.academica.model");
const materiasAprobadasModel = require("../models/materias.aprobadas.alumno.model");
const trismestresModel = require("../models/trismestres.model");

const userController =  require("../controllers/user.controller");

exports.crearInscripcion = async (req, res) => {
  const records = req.body;

  inscripcionModel
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

exports.obtenerInscripcionesTrimestreActual = async (req, res) => {
  const userId = userController.getUserIdFromToken(req);
  try {
    let materiasAlumno = [];
    let materias = [];

    let oferta = await ofertaAcademicaModel
      .find({})
      .populate("trimestre materia")
      .lean()
      .exec();

    let materiasInscritas = await inscripcionModel
      .find({ usuario: userId })
      .populate({
        path: "materia",
        populate: {
          path: "materia",
        },
      })
      .populate("trimestre")
      .lean()
      .exec();

    const materiasAprobadas = await materiasAprobadasModel
      .find({ usuario: userId })
      .populate("materia")
      .lean()
      .exec();

    materiasInscritas = materiasInscritas.filter(
      (docs) => docs.trimestre.puedeMatricular === true
    );
    oferta = oferta.filter(
      (docs) =>
        docs.trimestre.estaActivo === true &&
        docs.trimestre.puedeMatricular === false
    );

    materiasAprobadas.map((docs) => {
      materiasAlumno.push(docs.materia.codigoMateria);
    });

    materiasInscritas.map((docs) => {
      materiasAlumno.push(docs.materia.materia.codigoMateria);
    });

    oferta.forEach((oferta) => {
      let requisitos = [];

      if (oferta.materia.requisitoUno != "")
        requisitos.push(oferta.materia.requisitoUno);
      if (oferta.materia.requisitoDos != "")
        requisitos.push(oferta.materia.requisitoDos);

      materias.push({
        _id: oferta._id,
        idMateria: oferta.materia._id,
        materiaNombre: oferta.materia.nombreMateria,
        codigoMateria: oferta.materia.codigoMateria,
        ciudad: oferta.ciudad,
        sede: oferta.sede,
        tipoAsistencia: oferta.tipoDeAsistencia,
        nombreCarrera: oferta.nombreCarrera,
        requisitos: requisitos,
        duracion: oferta.duracion,
        dias: oferta.dias,
        horario: oferta.horario,
        area: oferta.area,
        seccion: oferta.seccionSistema,
        cupos: oferta.cupos,
        aprobada: false,
        cumpleRequisitos: false,
        puedeMatricular: false,
        trimestre: oferta.trimestre,
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

    let materiasOfertadasParaAlumno = materias.filter(
      (materia) => materia.puedeMatricular === true
    );

    res.status(200).send(materiasOfertadasParaAlumno);
  } catch (error) {
    res.status(500).send({ message: "No se pudieron obtener los registros." });
  }
};

exports.obtenerClasesOfertadasAlumnoTrimestresActivos = async (req, res) => {
  try {
    const userId = userController.getUserIdFromToken(req);
    let materiasAlumno = [];
    let materias = [];

    let oferta = await ofertaAcademicaModel
      .find({})
      .populate("trimestre materia")
      .lean()
      .exec();

    const materiasAprobadas = await materiasAprobadasModel
      .find({ usuario: userId })
      .populate("materia")
      .lean()
      .exec();
    oferta = oferta.filter(
      (docs) =>
        docs.trimestre.estaActivo === true &&
        docs.trimestre.puedeMatricular === true
    );

    materiasAprobadas.map((docs) => {
      materiasAlumno.push(docs.materia.codigoMateria);
    });

    oferta.forEach((oferta) => {
      let requisitos = [];

      if (oferta.materia.requisitoUno != "")
        requisitos.push(oferta.materia.requisitoUno);
      if (oferta.materia.requisitoDos != "")
        requisitos.push(oferta.materia.requisitoDos);

      materias.push({
        _id: oferta._id,
        idMateria: oferta.materia._id,
        materiaNombre: oferta.materia.nombreMateria,
        codigoMateria: oferta.materia.codigoMateria,
        ciudad: oferta.ciudad,
        sede: oferta.sede,
        tipoAsistencia: oferta.tipoDeAsistencia,
        nombreCarrera: oferta.nombreCarrera,
        requisitos: requisitos,
        duracion: oferta.duracion,
        dias: oferta.dias,
        horario: oferta.horario,
        area: oferta.area,
        seccion: oferta.seccionSistema,
        cupos: oferta.cupos,
        aprobada: false,
        cumpleRequisitos: false,
        puedeMatricular: false,
        trimestre: oferta.trimestre,
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

    let materiasOfertadasParaAlumno = materias.filter(
      (materia) => materia.puedeMatricular === true
    );

    res.status(200).send(materiasOfertadasParaAlumno);
  } catch (error) {
    res.status(500).send({ message: "No se pudieron obtener los registros." });
  }
};

exports.obtenerInscripcionActualAlumno = async (req, res) => {
  try {
    const userId = userController.getUserIdFromToken(req);
    const trimestrePuedeMatricular = await trismestresModel
      .findOne({ puedeMatricular: true })
      .exec();

    if (trimestrePuedeMatricular === null) return res.status(200).send([]);

    const inscripciones = await inscripcionModel
      .find({ trimestre: trimestrePuedeMatricular._id, usuario: userId })
      .populate({ path: "trimestre", select: "trimestre anio" })
      .populate({
        path: "materia",
        populate: {
          path: "materia",
        },
      })
      .lean();

    res.status(200).send(inscripciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Ocurrio un error al obtener la información." });
  }
};

exports.eliminarProyeccionTrimestreActual = async (req, res) => {
  const userId = userController.getUserIdFromToken(req);

  const trimestrePuedeMatricular = await trismestresModel.findOne({ puedeMatricular: true }).lean().exec();

  if (trimestrePuedeMatricular === undefined) res.status(400).send({ message: "No se pudo eliminar la proyeccion." });

  inscripcionModel
    .deleteMany({ trimestre: trimestrePuedeMatricular._id, usuario: userId })
    .then(() => {
      res
        .status(200)
        .send({ message: "Se elimno la proyeccion exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No se pudo eliminar la proyeccion." });
    });
};
