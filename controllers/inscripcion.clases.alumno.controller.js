const inscripcionModel = require('../models/inscripcion.clases.alumno.model');

exports.crearInscripcion= async(req, res)=>{
    
    const records = req.body;

    inscripcionModel.insertMany(records)
    .then(() => {
        res.status(201).send("Se agregaron los registros exitosamente.");
    })
    .catch((err) => {
        res.status(201).send("No se pudieron agregar los registros.");
    });
}

exports.obtenerInscripciones = async(req, res) => {
    const userId = req.params.id;
    inscripcionModel.find({usuario: userId})
    .populate('usuario materia')
    .exec((err, data) => {
        if(err) return res.status(401).send(err);
        res.status(201).send(data);
    })
}

exports.eliminarInscripcion = async(req, res) => {
    const materiaId = req.params.id;

    inscripcionModel.deleteOne({_id: materiaId})
    .then(() => {
        res.status(201).send("Se elimno el registros exitosamente.");
    })
    .catch((err) => {
        res.status(201).send("No se pudo eliminar el registro.");
    });
}