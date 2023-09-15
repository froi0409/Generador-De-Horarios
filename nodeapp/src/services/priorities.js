const db = require('../configs/database.config');

async function professorPriority(classSchedule, data) {
    const conn = await db.getConnection();

    try {
        const professorsCoursess = await conn.query('SELECT p.id_profesor,p.nombre AS nombre_profesor,p.apellido,p.hora_entrada,p.hora_salida,pm.titular,pm.materia,m.nombre AS nombre_materia,m.numero_semestre FROM Profesor AS p INNER JOIN Profesor_Materia AS pm ON p.id_profesor=pm.profesor INNER JOIN Materia AS m ON pm.materia=m.codigo');

        let currentProfessor = '';  // Se usara como puntero para verificar a qué profesor se está evaluando
        let currentHour = '15:00';
        let i = 0;
        for (const currentData of professorsCoursess) {
            
            // Si el profesor a evaluarse cambia, se reemplazará
            const idProfesor = Number(currentData.id_profesor)
            const currentProfessorId = Number(currentProfessor);
            if (idProfesor !== currentProfessorId) {
                currentProfessor = currentData.id_profesor;
                currentHour = '15:00';
                i = 0;
            } 
            let count;
            do {
                const queryValues = [currentData.id_profesor, classSchedule[i][0].startTime, classSchedule[i][0].endTime];
                const inWorkTime = await conn.query('SELECT COUNT(*) AS no FROM Profesor WHERE id_profesor=? AND ? >= hora_entrada AND ? <= hora_salida', queryValues);
                count = Number(inWorkTime[0].no);
                
                if(count < 1) {
                    i++;
                } else if (!isFree(idProfesor, classSchedule[i])) {
                    count = 0;
                }
            } while (count < 1);
            // Si el docente es títular de un curso, lo asignamos de una vez, porque al menos debería dar el curso en una sección
            if (currentData.titular === 1) {
                // Recorre todos los salones en una hora en específico (ej. para ver qué salones están desocupados  las 13:00)
                for (let index = 0; index < classSchedule[i].length; index++) {
                    

                    if (classSchedule[i][index].idProfessor === undefined) {
                        classSchedule[i][index].idProfessor = currentProfessor;
                        break;
                    }
                }
            }
        }
        
        return classSchedule;
    } catch (error) {
        console.error(error);
    } finally {
        if (conn) conn.end();
    }
}

async function putProfessors () {
    
}

function isFree(idProfessor, hour) {
    for (const slot of hour) {
        const idP = Number(idProfessor);
        const idPH = Number(hour.idProfesor);
        if(idP === idPH) {
            return false;
        }
    } 
    return true;
}

module.exports = {
    professorPriority
}
