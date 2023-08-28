const csvFM = require('../services/csvFilesManagement/proccessFiles');

const proccessCsvFiles =  async ( req, res ) => { 
    const files = req.files; // Get files
    const dataSets = [];

    for (const file of files) {
        const jsonFile = await csvFM.parseCsvToJson(file);
        dataSets.push({
            filename: file.originalname,
            dataset: jsonFile
        });
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
