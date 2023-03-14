const json2CSV = require('json-2-csv');
const utils = require('../services/utility');
const solicitudesModel = require('../models/solicitud.clases.alumno.model');
const inscripcionesModel = require('../models/inscripcion.clases.alumno.model');

const solicitudesAcademicasReporte = async function(quarter, callback) {
    const filter = {
        trimestre: quarter
    };
    const solicitudes = await solicitudesModel
        .find(filter)
        .populate('materia usuario trimestre horario dias')
        .lean()
        .exec();
    utils.convertJSONtoCSV(solicitudes, [])
    .then(data =>{
        callback(null, data);
    })
    .catch(err => {
        callback(err, null);
    });
    return;
  }

async function proyeccionOfertaAcademicaReporte(quarter, callback){
    const inscripciones = await inscripcionesModel
    .find({})
    .populate({path: 'materia', populate: {
        path: 'trimestre', 
        match: {
            trimestre: {
                $eq: quarter
            }
        }
    }})
    .lean()
    .exec();
    utils.convertJSONtoCSV(inscripciones, [])
    .then(data =>{
        callback(null, data);
    })
    .catch(err => {
        callback(err, null);
    });
    return;
}

exports.reporte = async (req, res) => {
    const quarterId = req.query.quarter;
    const report = req.params.id;
    const listOfReports = {
        classRequest: 'Solicitudes',
        offertRequest: 'Ofertas'
    }
    switch(report){
        case listOfReports.classRequest:
            solicitudesAcademicasReporte(quarterId, (err, data)=>{
                if(err) res.status(500).send({error: err, message: "Hubo un error descargando el reporte de solicitudes."});
                res.status(201).send({message: "Se descargo el reporte de manera exitosa.", blob: data});
            });
            break;
        case listOfReports.offertRequest:
            proyeccionOfertaAcademicaReporte(quarterId, (err, data)=>{
                if(err) res.status(500).send({error: err, message: "Hubo un error descargando el reporte de la oferta academica seleccionada."});
                res.status(201).send({message: "Se descargo el reporte de manera exitosa.", blob: data});
            });
            break;
        default:
            res.status(500).send({message: "No se encontro el reporte seleccionado."})
    }
};