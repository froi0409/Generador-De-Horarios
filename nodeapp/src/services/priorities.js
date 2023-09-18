const db = require('../configs/database.config');

async function coursePriority(classSchedule) {
    const conn = await db.getConnection();

    try {
        // Get course by career
        const sections = await conn.query('SELECT m.codigo AS codigo_curso,s.letra,m.nombre AS nombre_curso,m.numero_semestre,mc.carrera,s.cantidad_estudiantes FROM Seccion AS s INNER JOIN Materia AS m ON s.materia=m.codigo LEFT JOIN Materia_Carrera AS mc ON m.codigo=mc.materia GROUP BY codigo_curso,letra ORDER BY carrera,numero_semestre;');
        
        // Get professor by course
        const professorsCourses = await conn.query('SELECT p.id_profesor,p.nombre AS nombre_profesor,p.apellido,p.hora_entrada,p.hora_salida,pm.titular,pm.materia,m.nombre AS nombre_materia,m.numero_semestre FROM Profesor AS p INNER JOIN Profesor_Materia AS pm ON p.id_profesor=pm.profesor INNER JOIN Materia AS m ON pm.materia=m.codigo');

        classSchedule = await putSections(classSchedule, sections, professorsCourses);
        
        return classSchedule;
    } catch (error) {
        console.error(error);
    } finally {
        if (conn) conn.end();
    }
}

async function putSections (classSchedule, sections, professorsCourses) {
    const sectionsToRemove = [];
    let cont = 0;
    console.log(`Secciones: ${sections.length}`)
    
    for (let s = 0; s < sections.length; s++) {
        const section = sections[s];
        for (let i = 0; i < classSchedule.length; i++) {
            // Si el valor de s ya se encuentra en sectionsToRemove, quiere decir que la sección ya fue ingresada al horario, por lo que no es necesario volver a analizarla
            const iterator = sectionsToRemove.indexOf(s);
            if (iterator === -1) {
                // Comprobamos que no haya alguna sección con un curso diferente de la misma carrera en el mismo horario
                let overlap = false;
                for (let j = 0; j < classSchedule[i].length; j++) {
                    const slot = classSchedule[i][j];
                    if (slot.courseId !== section.codigo_curso && slot.semesterNumber === section.numero_semestre && slot.career == section.carrera) {
                        overlap = true;
                        break;
                    }
                }
                //if (overlap) break; // Para evitar hacer procesos de más
                
                //Si no traslapa, verificamos que exista algún docente que pueda dar el curso
                let availableProfessor = false;
                let selectedProfessor = {};
                
                for (const professor of professorsCourses) {
                    const idP = String(professor.id_profesor);
                    if (professor.materia === section.codigo_curso && professor.titular === 1) {
                        if (isFree(professor.id_profesor, classSchedule[i])) {
                            selectedProfessor.id_profesor = idP;
                            selectedProfessor.first_name = professor.nombre_profesor;
                            selectedProfessor.last_name = professor.apellido;
                            availableProfessor = true;
                            break;
                        }
                    }
                }

                // Si availableProfessor es falso, quiere decir que el profesor titular no está disponible, por lo que habrá que buscar a otro profesor
                if (!availableProfessor) {
                    for (const professor of professorsCourses) {
                        if (professor.titular === 0 && professor.materia === section.codigo_curso) {
                            if (isFree(professor.id_profesor, classSchedule[i])) {
                                selectedProfessor.id_profesor = String(professor.id_profesor);
                                selectedProfessor.first_name = professor.nombre_profesor;
                                selectedProfessor.last_name = professor.apellido;
                                availableProfessor = true;
                                break;
                            }
                        }
                    }
                }

                //Si no traslapa y hay docente disponible en el horario, lo colocamos en el salón disponible con el número más cercano a la cantidad de alumnos en la sección
                let nearestCapacity = 5000;
                let classroomPosition = 0;
                for (let j = 0; j < classSchedule[i].length; j++) {
                    if (classSchedule[i][j].courseId === undefined) {
                        const diff = classSchedule[i][j].classroomCapacity - section.cantidad_estudiantes;
                        const diffAbs = Math.abs(diff);
                        if (diffAbs < nearestCapacity) {
                            nearestCapacity = diffAbs;
                            // Si diff es menor que diffAbs, quiere decir que diff es negativo, por lo tanto, hacen falta estudiantes para llenar el salon, es mejor dejarlos en un salon donde sobren
                            classroomPosition = j;
                        }
                    }
                    
                }
                if (!overlap) {
                    classSchedule[i][classroomPosition].sectionLetter = section.letra;
                    classSchedule[i][classroomPosition].courseId = section.codigo_curso;
                    classSchedule[i][classroomPosition].courseName = section.nombre_curso;
                    classSchedule[i][classroomPosition].semesterNumber = section.numero_semestre;
                    classSchedule[i][classroomPosition].career = section.carrera;
                    classSchedule[i][classroomPosition].warningPriority = 0;
                    classSchedule[i][classroomPosition].professorId = selectedProfessor.id_profesor;
                    classSchedule[i][classroomPosition].professorFirstName = selectedProfessor.first_name;
                    classSchedule[i][classroomPosition].professorLastName = selectedProfessor.last_name;

                    sectionsToRemove.push(s);
                }
            }
        }
    }
    console.log(`Secciones removidas (a nivel de arreglo): ${sectionsToRemove}`);
    return classSchedule;
}



function isFree(idProfessor, hour) {
    for (const slot of hour) {
        const idP = String(idProfessor);
        const idPH = String(slot.professorId);
        if(idP === idPH) {
            return false;
        }
    } 
    return true;
}

module.exports = {
    coursePriority
}
