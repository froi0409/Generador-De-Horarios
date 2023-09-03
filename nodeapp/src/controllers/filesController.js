const csvFM = require('../services/csvFilesManagement/proccessFiles');
const inserts = require('../services/databaseManagement/inserts');


const proccessCsvFiles =  async ( req, res ) => { 
    const files = req.files; // Get files
    const dataSets = [];
    // Define a mapping of file names to insertion functions
    const insertFunctions = {
        'Salones.csv': inserts.insertSalones,
        'Carreras.csv': inserts.insertCarreras,
        'Profesores.csv': inserts.insertProfesores,
    };


    for (const file of files) {
        const jsonFile = await csvFM.parseCsvToJson(file);
        dataSets.push({
            filename: file.originalname,
            dataset: jsonFile
        });
    }

    for (const dataset of dataSets) {
        const insertFunction = insertFunctions[dataset.filename];
        if (insertFunction) {
            insertFunction(dataset);
        }
    }

    // dataSets.forEach(element => {
    //     console.log(element.filename, ': ');
    //     element.dataset.forEach(data => {
    //         console.log('nombre: ', data.numero, ' - cant escritorios: ', data.cantidad_escritorios);
    //     });
    // });

    res.json({
        message: "Funcionó con éxito"
    });
}

module.exports = {
    proccessCsvFiles
}
