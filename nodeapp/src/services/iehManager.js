const db = require('../configs/database.config');

async function getIEH(classSchedule) {
    const conn = await db.getConnection();
    let allSections;

    let undefinedProfessors = 0;
    let countSections = 0;

    try {
        // Get sections by career
        const sections = await conn.query('SELECT m.codigo AS codigo_curso,s.letra,m.nombre AS nombre_curso,m.numero_semestre,mc.carrera,s.cantidad_estudiantes FROM Seccion AS s INNER JOIN Materia AS m ON s.materia=m.codigo LEFT JOIN Materia_Carrera AS mc ON m.codigo=mc.materia GROUP BY codigo_curso,letra ORDER BY carrera,numero_semestre;');
        
        for (let i = 0; i < classSchedule.length; i++) {
            for (let j = 0; j < classSchedule[i].length; j++) {
                // Si un slot tiene un curso, es porque fue colocado
                if (classSchedule[i][j].courseId !== undefined) {
                    countSections++;
                    // Si un curso fue colocado, pero no tiene profesor, hay un problema ahí
                    if (classSchedule[i][j].professorId === undefined) {
                        undefinedProfessors++;
                    }
                }   
                
            }
        }
        // Calculamos la eficiencia de los cursos
        allSections = sections.length;
        const sectionsEfficiency = (countSections * 100) / allSections;
        console.log(`Eficiencia de Secciones: ${sectionsEfficiency}`);

        // Calculamos la eficiencia de los profesores
        const sectionsWithProfessor = allSections - undefinedProfessors;
        const professorsEfficiency = (sectionsWithProfessor * 100) / allSections;
        console.log(`Eficiencia de Profesores: ${professorsEfficiency}`)

        // Calculamos el índice de eficiencia de horario haciendo un promedio:
        const IEH = (sectionsEfficiency + professorsEfficiency) / 2;
        console.log(`IEH: ${IEH}`)
        
        return IEH;

    } catch (error) {
        console.error(`Error: ${error}`)
        return 80;
    } finally {
        if (conn) conn.end();
    }


}

module.exports = {
    getIEH
}
