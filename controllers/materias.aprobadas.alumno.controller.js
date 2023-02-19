const materiasAprobadasModel = require('../models/materias.aprobadas.alumno.model');

exports.agregarMateriasAprobadas = async(req, res)=>{
    
    const records = req.body;

    materiasAprobadasModel.insertMany(records)
    .then(() => {
        res.status(201).send("Se agregaron los registros exitosamente.");
    })
    .catch((err) => {
        res.status(201).send("No se pudieron agregar los registros.");
    });
}

exports.obtenerMateriasAprobadas = async(req, res) => {
    const userId = req.params.id;

    materiasAprobadasModel.find({usuario: userId})
    .populate('materia usuarios')
    .exec((err, data) => {
        if(err) return res.status(401).send(err);
        res.status(201).send(data);
    })
}

exports.eliminarMateriaAprobada = async(req, res) => {
    const materiaId = req.params.id;

    materiasAprobadasModel.deleteOne({_id: materiaId})
    .then(() => {
        res.status(201).send("Se elimno el registros exitosamente.");
    })
    .catch((err) => {
        res.status(201).send("No se pudo eliminar el registro.");
    });
}