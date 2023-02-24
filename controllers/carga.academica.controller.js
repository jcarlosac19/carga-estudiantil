
const cargaAcademicaModel = require('../models/carga.academica.model');
const cargaAcademicaVersion = require('../models/carga.version.model');
const mongoose = require('mongoose');

exports.crearCargaAcademica = async(req, res) => {
    creadoPor = req.user.user_id;
    records = req.body;

    await cargaAcademicaVersion.updateMany({},{estaActiva: false }, {new: true});

    cargaVersion = new cargaAcademicaVersion({
        _id: new mongoose.Types.ObjectId(),
        creadoPor: creadoPor,
        estaActiva: true
    });

    await cargaVersion.save(async function(err){
        if(err) return res.status(401).send("Hubo un error.");

        records.map(rec=>{
            rec.version = cargaVersion._id;
        });

        await cargaAcademicaModel.insertMany(records)
        .then(()=>{
            res.status(201).send("Se registro la carga academica exitosamente.");
        })
        .catch((err)=>{
            res.status(401).send("No pudo registrar la carga academica.");
            console.log(err)
        });


    })
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
    .populate('version')
    .then(carga=>{
        let dataFiltrada = carga.filter(doc => {
            return doc.version.estaActiva == true;
        });
        res.status(201).send(dataFiltrada);
    })
    .catch((err)=> {
        console.log(err);
        res.status(401).send("No se pudieron obtener los registros de la carga.")
    })        
}