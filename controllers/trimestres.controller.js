const trismestresModel = require('../models/trismestres.model');
const inscripcionModel = require('../models/inscripcion.clases.alumno.model');
const ofertaAcademicaModel = require('../models/oferta.academica.model');

exports.crearTrimestre = async(req, res) => {
    const { anio, trimestre } = req.body;

    if(!anio) return res.status(500).send({message: "Debe de especificar un año."});
    if(!trimestre) return res.status(500).send({message: "Debe de especificar un trimestre."});

    record = {
        anio: anio,
        trimestre: trimestre,
        estaActivo: false,
        puedeMatricular: false
        
    }

    await trismestresModel.create(record)
    .then(()=>{
        res.status(201).send({message: "Se creo el trimestre exitosamente."})
    })
    .catch((err)=>{
        res.status(400).send({message: "No pudo crear el trimestre."})
    });
}

exports.obtenerTrimestres = async(req, res) => {

    await trismestresModel.find({})
    .then((trimestres)=>{
        res.status(201).send(trimestres)
    })
    .catch((err)=> {
        res.status(400).send({message: "No se pudieron obtener los trimestres."});
    })   
}

exports.eliminarTrimestre = async(req, res) => {
    try {

    id = req.params.id;
    let materiasOferta = []

    if(!id) return res.status(500).send({message: "Debe de especificar el trimestre que desea eliminar."});
    
    let ofertaAcademica = await ofertaAcademicaModel.find({trimestre: id}).select('_id').lean().exec();
    ofertaAcademica.map(doc => materiasOferta.push(doc._id));
    await inscripcionModel.deleteMany({ materia: { $in: materiasOferta }});
    await ofertaAcademicaModel.deleteMany({ trimestre: id });
    await trismestresModel.deleteOne({_id: id});

    res.status(201).send({message: "Se elimino el trimestra y toda la informacion relacionada a esta, de manera exitosa."});
    } catch(err){
        res.status(500).send({message: "No se pudo eliminar el trimestre."})
    }
}

exports.actualizarTrimestre = async(req, res) => {
    id = req.params.id;
    const { anio, trimestre, estaActivo, puedeMatricular } = req.body;
    if(!id) return res.status(400).send({message: "Debe de especificar el trimestre que desea actualizar."});
    let trimestreLista = await trismestresModel.find({ puedeMatricular: true }).lean().exec();
    const hasActiveEnrollment = trimestreLista.length > 0 && puedeMatricular;
    if(hasActiveEnrollment === true) return res.status(500).send({message: "Debe desactivar todos los trimestres con pre-matricula abierta antes de poder realizar esta accion."})

    let update = {
        ...( anio && { anio }),
        ...( trimestre  && { trimestre  }),
        ...((estaActivo !== undefined) && { estaActivo  }),
        ...((puedeMatricular !== undefined) && { puedeMatricular  })
    }

    // const body = {estaActivo: estaActivo}

    await trismestresModel.findOneAndUpdate({_id: id}, update, {
        new: true
    })
    .then(()=>{
        res.status(201).send({message: "Se actualizo el trimestre exitosamente."});
    })
    .catch((err)=>{
        res.status(400).send({message: "No se pudo actualizar el trimestre."});
    });
}