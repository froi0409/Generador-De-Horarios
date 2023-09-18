const csvFM = require('../services/csvFilesManagement/proccessFiles');
const inserts = require('../services/databaseManagement/inserts');


const proccessCsvFiles =  async ( req, res ) => { 
    const files = req.files; // Get files
    
    console.log(files);
    // Define a mapping of file names to insertion functions
    const insertFunctions = {
        'Salones.csv': inserts.insertSalones,
        'Carreras.csv': inserts.insertCarreras,
        'Profesores.csv': inserts.insertProfesores,
        'Materias.csv': inserts.insertMaterias,
        'Carrera_Cursos.csv': inserts.insertCarreraCurso,
        'Materias_Profesores.csv': inserts.insertProfessorCourse,
        'Secciones.csv': inserts.insertSection
    };

    

    const processQueue = [];

    for (const file of files) {
        const fileName = file.originalname;
        const insertFunction = insertFunctions[fileName];

        if (insertFunction) {
            // Crear una promesa que representa el procesamiento de este archivo
            const filePromise = async () => {
                try {
                    const jsonFile = await csvFM.parseCsvToJson(file);
                    const result = await insertFunction(jsonFile);
                    console.log(result);
                } catch (error) {
                    console.error(`Error al procesar ${fileName}:`, error);
                }
            };

            processQueue.push(filePromise);
        }
    }

    // Procesar las promesas en la cola secuencialmente
    for (const processPromise of processQueue) {
        await processPromise();
        console.log("\n")
    }

    res.json({
        message: "Funcionó con éxito"
    });
}

module.exports = {
    proccessCsvFiles
}
