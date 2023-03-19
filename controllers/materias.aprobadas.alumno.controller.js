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
    const userId = userController.getUserIdFromToken(req);

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

// exports.obtenerMateriasAprobadas = async (req, res) => {
//   const userId = req.params.id;

//   const materiasAprobadas = await materiasAprobadasModel
//     .find({ usuario: userId })
//     .populate("materia")
//     .exec();
//   const cargaAcademica = await cargaAcademicaModel
//     .find({})
//     .populate("version")
//     .exec();
//   const activeCargaAcademica = cargaAcademica.filter(
//     (doc) => doc.version.estaActiva === true
//   );

//   const materiasAlumno = {};
//   materiasAprobadas.forEach(({ materia }) => {
//     materiasAlumno[materia.codigoMateria] = true;
//   });

//   const materias = activeCargaAcademica.map(
//     ({
//       _id,
//       nombreMateria,
//       codigoMateria,
//       nombreCarrera,
//       anio,
//       requisitoUno,
//       requisitoDos,
//     }) => {
//       const requisitos = [];
//       if (requisitoUno) requisitos.push(requisitoUno);
//       if (requisitoDos) requisitos.push(requisitoDos);
//       return {
//         _id,
//         materiaNombre: nombreMateria,
//         codigoMateria,
//         nombreCarrera,
//         anio,
//         requisitos,
//         aprobada: materiasAlumno[codigoMateria] || false,
//         cumpleRequisitos:
//           !requisitos ||
//           requisitos.every((requisito) => materiasAlumno[requisito]),
//         puedeMatricular:
//           requisitos.every((requisito) => materiasAlumno[requisito]) &&
//           !materiasAlumno[codigoMateria],
//       };
//     }
//   );

//   res.status(200).send(materias);
// };

exports.eliminarMateriaAprobada = async (req, res) => {
  const materiaId = req.params.id;

  materiasAprobadasModel
    .deleteOne({ _id: materiaId })
    .then(() => {
      res.status(204).send({ message: "Se elimno el registros exitosamente." });
    })
    .catch((err) => {
      res.status(400).send({ message: "No se pudo eliminar el registro." });
    });
};
