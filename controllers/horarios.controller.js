const horariosModel = require('../models/horarios.model');

exports.crearHorario = async(req, res)=>{
    horario = req.body.horario;
    record = {
        horario: horario
    }
    await horariosModel.create(record)
    .then(()=>{
        res.status(201).send("Se creo el horario exitosamente.")
    })
    .catch((err)=>{
        res.status(401).send("No pudo crear el horario.")
    });
}

exports.obtenerHorarios = async(req, res) => {
    await horariosModel.find({})
    .then((horarios)=>{
        res.status(201).send(horarios)
    })
    .catch((err)=>{
        res.status(401).send("No puedo obtener los harios.");
    });
}

exports.eliminarHorario = async(req, res) => {
    idHorario = req.params.id;
    await horariosModel.deleteOne({_id: idHorario})
    .then(()=>{
        res.status(201).send("Se elimino el horario exitosamente.");
    })
    .catch((err)=>{
        res.status(401).send("No pudo eliminar el horario.");
    });
}

exports.actualizarHorario = async(req, res) => {
    idHorario = req.params.id;
    horario = req.body.horario;

    if(!horario) return res.status(401).send("Hace falta el horario.");

    horario = {
        horario: horario
    }

    await horariosModel.updateOne({_id: idHorario}, horario, {
        new: true
    })
    .then(()=>{
        res.status(201).send("Se actualizo el horario exitosamente.");
    })
    .catch((err)=>{
        res.status(401).send("No se pudo actualizar el horario.");
    });

}