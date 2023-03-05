const inscripcionModel = require('../models/inscripcion.clases.alumno.model');
const ofertaAcademicaModel = require('../models/oferta.academica.model');
const materiasAprobadasModel = require('../models/materias.aprobadas.alumno.model');

exports.crearInscripcion= async(req, res)=>{
    
    const records = req.body;

    inscripcionModel.insertMany(records)
    .then(() => {
        res.status(201).send({message: "Se agregaron los registros exitosamente."});
    })
    .catch((err) => {
        res.status(400).send({message: "No se pudieron agregar los registros."});
    });
}

exports.obtenerInscripciones = async(req, res) => {
    const userId = req.params.id;
    inscripcionModel.find({usuario: userId})
    .populate('usuario materia')
    .exec((err, data) => {
        if(err) return res.status(400).send(err);
        res.status(201).send(data);
    })
}

exports.obtenerClasesOfertadasAlumnoTrimestresActivos = async(req, res) =>{
    try {
        const userId = req.params.id;
        let materiasAlumno = [];
        let materias = [];
    
        let oferta = await ofertaAcademicaModel.find({}).populate('trimestre materia').lean().exec();
        const materiasAprobadas = await materiasAprobadasModel.find({usuario: userId}).populate('materia').lean().exec();
        oferta = oferta.filter(docs => docs.trimestre.estaActivo === true);
    
        materiasAprobadas.map(docs => {
            materiasAlumno.push(docs.materia.codigoMateria);
        });
    
        oferta.forEach(oferta => {
    
            let requisitos = [];
    
            if(oferta.materia.requisitoUno != "") requisitos.push(oferta.materia.requisitoUno);
            if(oferta.materia.requisitoDos != "") requisitos.push(oferta.materia.requisitoDos);
    
            materias.push(
                {
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
                    hora: oferta.hora,
                    area: oferta.area,
                    aprobada: false,
                    cumpleRequisitos: false,
                    puedeMatricular: false
                }
            );
        });
    
        materias.map(materia=>{
            let requisitos = materia.requisitos;       
            let hasAllRequirements = requisitos.every(requisito => { return materiasAlumno.includes(requisito) });
    
            materia.cumpleRequisitos = hasAllRequirements;
    
            if(materiasAlumno.includes(materia.codigoMateria)) materia.aprobada = true;
            if(requisitos.length == 0) materia.cumpleRequisitos = true;
            if(materia.cumpleRequisitos == true && materia.aprobada == false) materia.puedeMatricular = true;
        });
    
        let materiasOfertadasParaAlumno = materias.filter( materia => materia.puedeMatricular === true);
    
        res.status(201).send(materiasOfertadasParaAlumno);
        
    } catch (error) {
        res.status(500).send({ message: "No se pudieron obtener los registros." });
      }
   
}

exports.eliminarInscripcion = async(req, res) => {
    const materiaId = req.params.id;

    inscripcionModel.deleteOne({_id: materiaId})
    .then(() => {
        res.status(201).send({message: "Se elimno el registros exitosamente."});
    })
    .catch((err) => {
        res.status(400).send({message: "No se pudo eliminar el registro."});
    });
}