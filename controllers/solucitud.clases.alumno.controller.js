const solicitudClasesModel = require('../models/solicitud.clases.alumno.model');

exports.crearSolicitudClase = async(req, res)=>{
    
    const {materia, usuario, horario, dias, trimestre} = req.body;

    if(!materia) return res.status(400).res({message: "La materia es requerida."});
    if(!usuario) return res.status(400).res({message: "El usuario es requerido"});
    if(!horario) return res.status(400).res({message: "El horario es requerido"});
    if(!dias) return res.status(400).res({message: "Los dias son requeridos."});
    if(!trimestre) return res.status(400).res({message: "El trimestre es requerido."});

    record = {
        materia: materia,
        usuario: usuario,
        horario: horario, 
        dias: dias,
        trimestre: trimestre
    }

    solicitudClasesModel.create(record)
    .then(() => {
        res.status(201).send({message: "Se agregaron los registros exitosamente."});
    })
    .catch((err) => {
        res.status(400).send({message: "No se pudieron agregar los registros."});
    });
}

exports.obtenerSolicitudesUsuario = async(req, res) => {
    const userId = req.params.id;
    solicitudClasesModel.find({usuario: userId})
    .populate('materia usuario trimestre horario dias')
    .exec((err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(data);
    })
}

exports.eliminarSolicitud = async(req, res) => {
    const materiaId = req.params.id;

    solicitudClasesModel.deleteOne({_id: materiaId})
    .then(() => {
        res.status(200).send({message: "Se elimno el registros exitosamente."});
    })
    .catch((err) => {
        res.status(400).send({message: "No se pudo eliminar el registro."});
    });
}