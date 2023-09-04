const db = require('../configs/database.config');

async function buildClassSchedule() {
    const conn = await db.getConnection();

    try {
        const result = await conn.query('SELECT * FROM Carrera');
        for (const career of result) {
            console.log(career);
        }

    } catch (error) {
        console.log(error)
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    buildClassSchedule
}

