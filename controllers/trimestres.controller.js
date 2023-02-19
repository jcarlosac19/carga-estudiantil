const trismestresModel = require('../models/trismestres.model');


exports.crearTrimestre = async(req, res) => {
    const { anio, trimestre } = req.body;

    if(!anio) return res.status(401).send("Debe de especificar un año.");
    if(!trimestre) return res.status(401).send("Debe de especificar un trimestre.");

    record = {
        anio: anio,
        trimestre: trimestre
    }
    await trismestresModel.create(record)
    .then(()=>{
        res.status(201).send("Se creo el trimestre exitosamente.")
    })
    .catch((err)=>{
        res.status(401).send("No pudo crear el trimestre.")
    });
}

exports.obtenerTrimestres = async(req, res) => {

    await trismestresModel.find({})
    .then((trimestres)=>{
        res.status(201).send(trimestres)
    })
    .catch((err)=> {
        res.status(401).send("No se pudieron obtener los trimestres.");
    })   
}

exports.eliminarTrimestre = async(req, res) => {
    id = req.params.id;

    if(!id) return res.status(401).send("Debe de especificar el trimestre que desea eliminar.");

    await trismestresModel.deleteOne({_id: id})
    .then(()=>{
        res.status(401).send("Se elimino el trimestre de manera exitosa.");
    })
    .catch((err)=> {
        res.status(401).send("No se pudo eliminar el trimestre");
    })  
}

exports.actualizarTrimestre = async(req, res) => {
    id = req.params.id;
    const { anio, trimestre } = req.body;

    if(!id) return res.status(401).send("Debe de especificar el trimestre que desea actualizar.");
    if(!anio) return res.status(401).send("Debe de especificar un año.");
    if(!trimestre) return res.status(401).send("Debe de especificar un trimestre.");
  
    record = {
        anio: anio,
        trimestre: trimestre
    }

    await trismestresModel.updateOne({_id: id}, record, {
        new: true
    })
    .then(()=>{
        res.status(201).send("Se actualizo el trimestre exitosamente.");
    })
    .catch((err)=>{
        res.status(401).send("No se pudo actualizar el trimestre.");
    });
}