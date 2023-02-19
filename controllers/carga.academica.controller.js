
const cargaAcademicaModel = require('../models/carga.academica.model');

exports.crearCargaAcademica = async(req, res) => {
    currentUserId = req.user.user_id;
    records = req.body;

    await cargaAcademicaModel.insertMany(records)
    .then(()=>{
        res.status(201).send("Se registro la carga academica exitosamente.");
    })
    .catch((err)=>{
        res.status(401).send("No pudo registrar la carga academica.");
    });
}

exports.eliminarCargaAcademica = async(req, res) => {
    await cargaAcademicaModel.deleteMany({})
    .then(()=>{
        res.status(201).send("Se elimino la carga academica exitosamente.")
    })
    .catch((err)=> {
        res.status(401).send("No se pudo eliminar la carga academica.")
    })
}

exports.obtenerCargaAcademica = async(req, res) => {
    await cargaAcademicaModel.find({})
    .then((carga)=>{
        res.status(201).send(carga)
    })
    .catch((err)=> {
        res.status(401).send("No se pudieron obtener los registros de la carga.")
    })        
}