const db = require('../configs/database.config');
const Slot = require('../services/Other/Slot');
const priorities = require('../services/priorities');

async function buildClassSchedule() {
    const conn = await db.getConnection();

    try {
        const classrooms = await conn.query('SELECT * FROM Salon');
        
        let classSchedule = await generateDefaultSchedule(conn, classrooms);
        classSchedule = await priorities.coursePriority(classSchedule);


        return classSchedule;
    } catch (error) {
        console.log(error)
    } finally {
        if (conn) conn.end();
    }
}

async function generateDefaultSchedule(conn, classrooms) {
    const classSchedule = [];
    
    try {
        // 12 and 21 - start time and end time
        for (let i = 14; i <= 21; i++) {
            const hour = [];
            const startTime = i + ':00';
            const endTime = (i + 1) + ':00';

            for (const classroom of classrooms) {
                const slot = new Slot(startTime, endTime, classroom.nombre, classroom.escritorios);
                hour.push(slot);
            }

            classSchedule.push(hour);
        }

        return classSchedule;
    } catch (error) {
        console.error(`Ocurrió un error al generar el horario ${error}`);
    } finally {
        if (conn) conn.end();
    }
}

async function verifyColorWarning(classSchedule) {
    for (let i = 0; i < classSchedule.length; i++) {
        for (let j = 0; j < classSchedule[i].length; j++) {
            if (classSchedule[i][j].courseId !== undefined && classSchedule[i][j].professorId === undefined) {
                classSchedule[i][j].warningPriority = 1;
                classSchedule[i][j].warningMessage = 'Horario sin Docente';
            }
        }
    }
    return classSchedule;
}

module.exports = {
    buildClassSchedule,
    verifyColorWarning
}

