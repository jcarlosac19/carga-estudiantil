const json2CSV = require('json-2-csv');


    const convertJSONtoCSV = (dataInJsonFormat, columnsToBeExcluded) => {

    const converter = new Promise((resolve, reject)=>{
        json2CSV.json2csv(dataInJsonFormat, (err, data) => {
            if (err) reject(new Error("No se puedo convertir el archivo."));
            resolve(data);
        },
            {
                excelBOM: true,
                unwindArrays: true,
                excludeKeys: columnsToBeExcluded
            }
        );
    })

    return converter;
    }

module.exports = { convertJSONtoCSV }


