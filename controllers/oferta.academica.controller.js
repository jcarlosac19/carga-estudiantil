const ofertaAcademicaModel = require('../models/oferta.academica.model');

exports.crearOfertaAcademica = async(req, res) => {
    currentUserId = req.user._id;
    records = req.body;

    const firstObject = req.body[0];
    const keys = Object.keys(firstObject).sort();

    let modelKeys = [];

    let excludedFields = {
        _id: '_id',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        creadoPor: 'creadoPor',
        __v: '__v'
    }

    ofertaAcademicaModel.schema.eachPath((path)=>{
        if(!( path in excludedFields))
        modelKeys.push(path);
    });

    modelKeys = modelKeys.sort();

    if(JSON.stringify(modelKeys) != JSON.stringify(keys)) return res.status(400).send({message: 'La oferta no cuenta con todos los campos requeridos.'});

    records.creadoPor = currentUserId;
    
    await ofertaAcademicaModel.insertMany(records)
    .then(()=>{
        res.status(201).send({message: "Se registro la oferta academica exitosamente."});
    })
    .catch((err)=>{
        console.log(err);
        if(err.code === 11000) {
            res.status(400).send({message: "No se permite clases ofertadas duplicadas, valide y corriga el archivo."});
        } else {
            res.status(400).send({message: "No pudo registrar la oferta academica."});
        }
        
    });
}

exports.eliminarOfertaAcademica = async(req, res) => {
    await ofertaAcademicaModel.deleteMany({})
    .then(()=>{
        res.status(201).send({message: "Se elimino la oferta academica exitosamente."})
    })
    .catch((err)=> {
        res.status(400).send({message: "No se pudo eliminar la oferta academica."})
    })
}
//['idHorario', 'idMateria', 'idTrimestre']
exports.obtenerOfertaAcademica = async(req, res) => {
    ofertaAcademicaModel.find({})
    .populate(
        [
            {
                path: 'trimestre',
                model: 'trimestres',
                select : {
                    _id: 1,
                    anio: 1,
                    trimestre: 1
                }
            },
            {
                path: 'materia',
                model: 'cargaAcademica',
                select: {
                    _id: 1,
                    codigoMateria: 1,
                    nombreMateria: 1,
                    codigoCarrera: 1,
                    nombreCarrera: 1,
                    requisitoUno: 1,
                    requisitoDos: 1,
                    anio: 1,
                    requisitoUnidadesValorativas: 1,
                    unidadesValorativas: 1,
                    plan: 1,
                    requerimientoIndiceGraduacion: 1,
                }
            }
        ]
        )
    .exec((err, oferta)=>{
        if(err) return res.status(500).send(err);
        res.status(201).send(oferta);
    })    
}