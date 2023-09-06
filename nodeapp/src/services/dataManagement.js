const db = require('../configs/database.config');
const Slot = require('../services/Other/Slot');

async function buildClassSchedule() {
    const conn = await db.getConnection();

    try {
        const careers = await conn.query('SELECT * FROM Carrera');
        const courses = await conn.query('SELECT * FROM Materia');
        const coursesCareers = await conn.query('SELECT * FROM Materia_Carrera');
        const professors = await conn.query('SELECT * FROM Profesor');
        const professorsCourses = await conn.query('SELECT * FROM Profesor_Materia');
        const classrooms = await conn.query('SELECT * FROM Salon');
        const sections = await conn.query('SELECT * FROM Seccion');
        
        const classSchedule = generateDefaultSchedule(classrooms);
        
        console.log(classSchedule);

    } catch (error) {
        console.log(error)
    } finally {
        if (conn) conn.end();
    }
}

function generateDefaultSchedule(classrooms) {
    const classSchedule = [];

    try {
        for (let i = 13; i <= 21; i++) {
            const hour = [];
            const startTime = i + ':00';
            const endTime = (i + 1) + ':00';

            for (const classroom of classrooms) {
                const slot = new Slot(startTime, endTime, eachClassroom.nombre);
                hour.push(slot);
            }

            classSchedule.push(hour);
        }
    } catch (error) {
        console.error('Ocurrió un error al generar horario');
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    buildClassSchedule
}

