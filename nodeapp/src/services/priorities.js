const db = require('../configs/database.config');

async function coursePriority(classSchedule) {
    const conn = await db.getConnection();

    try {
        // Get course by career
        const sections = await conn.query('SELECT m.codigo AS codigo_curso,s.letra,m.nombre AS nombre_curso,m.numero_semestre,mc.carrera,s.cantidad_estudiantes FROM Seccion AS s INNER JOIN Materia AS m ON s.materia=m.codigo INNER JOIN Materia_Carrera AS mc ON m.codigo=mc.materia ORDER BY carrera,numero_semestre;');
        
        // Get professor by course
        const professorsCourses = await conn.query('SELECT p.id_profesor,p.nombre AS nombre_profesor,p.apellido,p.hora_entrada,p.hora_salida,pm.titular,pm.materia,m.nombre AS nombre_materia,m.numero_semestre FROM Profesor AS p INNER JOIN Profesor_Materia AS pm ON p.id_profesor=pm.profesor INNER JOIN Materia AS m ON pm.materia=m.codigo');

        for (let i = 0; i < classSchedule.length; i++) {
            console.log(`---------------------------Hora ${(i+1)}--------------------------`);
            for (let j = 0; j < classSchedule[i].length; j++) {
                console.log('------------------');
                console.log(classSchedule[i][j]);

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
    coursePriority
}
