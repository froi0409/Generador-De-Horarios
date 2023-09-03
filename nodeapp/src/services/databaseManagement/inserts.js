const db = require('../../configs/database.config');

async function insertSalones(data) {
    const conn = await db.getConnection();

    try {
        const deleteData = await conn.query('DELETE FROM Salon');
        
        for (const classroom of data.dataset) {
            const result = await conn.query('INSERT INTO Salon VALUES (?,?)', [classroom.numero, classroom.cantidad_escritorios]);
            console.log(`Salon ${classroom.numero} fue ingresado con éxito`);
        }
        return;
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.end();
    }
}

async function insertCarreras(data) {
    const conn = await db.getConnection();

    try {
        const deleteData = await conn.query('DELETE FROM Carrera');
        
        for (const career of data.dataset) {
            const result = await conn.query('INSERT INTO Carrera VALUES (?,?,?)', [career.id, career.division, career.nombre]);
            console.log(`Carrera ${career.nombre} fue ingresada con éxito`);
        }
        return;
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        if (conn) conn.end();
    }
}

async function insertProfesores(data) {
    const conn = await db.getConnection();

    try {
        const deleteData = await conn.query('DELETE FROM Profesor');
        
        for (const professor of data.dataset) {
            const result = await conn.query('INSERT INTO Profesor VALUES (?,?,?,?,?)', [professor.id, professor.nombre, professor.apellido, professor.horario_entrada, professor.horario_salida]);
            console.log(`Profesor ${professor.nombre} ${professor.apellido} fue ingresado con éxito`);
        }
        return;
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    insertSalones,
    insertCarreras,
    insertProfesores
}