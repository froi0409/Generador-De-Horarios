const csv = require('csv-parser');

async function parseCsvToJson(file) {
    const fileData = [];

    const csvData = file.buffer.toString();
    const parsedData = await new Promise((resolve, reject) => {
        const dataArray = [];

        const parser = csv();
        parser.write(csvData);
        parser.end();

        parser
            .on('data', data => {
                dataArray.push(data);
            })
            .on('end', () => {
                resolve(dataArray);
            })
            .on('error', error => {
                reject(error);
            });
    });

    fileData.push(...parsedData);

    return fileData;

}

async function parseCsvToJson2(files) {
    const results = [];

    // Procesa cada archivo en el array
    for (const file of files) {
        const fileData = [];

        const csvData = file.buffer.toString(); // Convertir el búfer a texto CSV
        const parsedData = await new Promise((resolve, reject) => {
            const dataArray = [];

            // Procesa el texto CSV
            const parser = csv();
            parser.write(csvData);
            parser.end();

            parser
                .on('data', data => {
                    dataArray.push(data);
                })
                .on('end', () => {
                    resolve(dataArray);
                })
                .on('error', error => {
                    reject(error);
                });
        });

        fileData.push(...parsedData);
        results.push(...fileData);
    }

    return results;
}

module.exports = {
    parseCsvToJson
};
