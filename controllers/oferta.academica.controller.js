const ofertaAcademicaModel = require('../models/oferta.academica.model');

exports.crearOfertaAcademica = async(req, res) => {
    currentUserId = req.user._id;
    records = req.body;

    records.creadoPor = currentUserId;

    await ofertaAcademicaModel.insertMany(records)
    .then(()=>{
        res.status(201).send("Se registro la oferta academica exitosamente.");
    })
    .catch((err)=>{
        res.status(401).send({error: err, message: "No pudo registrar la oferta academica."});
    });
}

exports.eliminarOfertaAcademica = async(req, res) => {
    await ofertaAcademicaModel.deleteMany({})
    .then(()=>{
        res.status(201).send("Se elimino la oferta academica exitosamente.")
    })
    .catch((err)=> {
        res.status(401).send("No se pudo eliminar la oferta academica.")
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
        console.log(err)
        if(err) return res.status(401).send(err);
        res.status(201).send(oferta);
    })    
}