
const cargaAcademicaModel = require('../models/carga.academica.model');
const cargaAcademicaVersion = require('../models/carga.version.model');
const mongoose = require('mongoose');

exports.crearCargaAcademica = async(req, res) => {
    creadoPor = req.user.user_id;
    records = req.body;

    const {codigoMateria, nombreMateria, codigoCarrera, nombreCarrera, requisitoUno, requisitoDos, anio, requisitoUnidadesValorativas, unidadesValorativas, plan, requerimientoIndiceGraduacion } = req.body[0];

    if(!codigoMateria) return res.status(400).send({message: "Falta el codigo de la materia."});
    if(!nombreMateria) return res.status(400).send({message: "Falta el nombre de la materia."});
    if(!codigoCarrera) return res.status(400).send({message: "Falta el codigo de la carrera."});
    if(!nombreCarrera) return res.status(400).send({message: "Falta el nombre de la materia."});
    if(!requisitoUno) return res.status(400).send({message: "Falta el requisito uno."});
    if(!requisitoDos) return res.status(400).send({message: "Falta el requisito dos."});
    if(!anio) return res.status(400).send({message: "Falta el año de la carga."});
    if(!unidadesValorativas) return res.status(400).send({message: "Falta las unidades valorativas."});
    if(!requisitoUnidadesValorativas) return res.status(400).send({message: "Falta el requisito de las unidades valorativas."});
    if(!plan) return res.status(400).send({message: "Falta plan de la carga."});
    if(!requerimientoIndiceGraduacion) return res.status(400).send({message: "Falta el requisito de indice de graduacion."});
    
    await cargaAcademicaVersion.updateMany({},{estaActiva: false }, {new: true});

    cargaVersion = new cargaAcademicaVersion({
        _id: new mongoose.Types.ObjectId(),
        creadoPor: creadoPor,
        estaActiva: true
    });

    await cargaVersion.save(async function(err){
        if(err) return res.status(400).send("Hubo un error.");

        records.map(rec=>{
            rec.version = cargaVersion._id;
        });

        await cargaAcademicaModel.insertMany(records)
        .then(()=>{
            res.status(201).send({message: "Se registro la carga academica exitosamente."});
        })
        .catch((err)=>{
            res.status(400).send("No pudo registrar la carga academica.");
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
        res.status(400).send("No se pudo eliminar la carga academica.")
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
        res.status(400).send("No se pudieron obtener los registros de la carga.")
    })        
}