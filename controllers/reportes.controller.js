const json2CSV = require('json-2-csv');

const cargaAcademicaModel = require('../models/carga.academica.model');

exports.reporte = async(req, res) => {

    let carga = await cargaAcademicaModel.find({}).populate('version').lean().exec(); 

    let dataFiltrada = carga.filter(doc => {
        return doc.version.estaActiva == true;
    });

    json2CSV.json2csv(dataFiltrada, (err, data)=> {
        if(err) return console.log({message: "No se pudo generar el CSV."});
        res.status(201).set({
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="users.csv"`,
        })
        .send(data);
    },
    {   excelBOM: true,
        unwindArrays: true,
        excludeKeys: [  '_id',
                        'version._id',
                        'version.creadoPor',
                        'version.estaActiva',
                        'version.createdAt',
                        'version.updatedAt',
                        'version.__v',
                        '__v',	
                        'createdAt',
                        'updatedAt'
                    ]
    }   
    );
};