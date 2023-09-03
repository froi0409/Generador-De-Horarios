const db = require('../../configs/database.config');

async function insertSalones(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

        try {
            const deleteData = await conn.query('DELETE FROM Salon');
            
            for (const classroom of data) {
                const result = await conn.query('INSERT INTO Salon VALUES (?,?)', [classroom.numero, classroom.cantidad_escritorios]);
                console.log(`Salon ${classroom.numero} fue ingresado con éxito`);
            }
            resolve('Inserción Exitosa');
        } catch (err) {
            reject(err);
        } finally {
            if (conn) conn.end();
        }
    });
}

async function insertCarreras(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

        try {
            const deleteData = await conn.query('DELETE FROM Carrera');
            
            for (const career of data) {
                const result = await conn.query('INSERT INTO Carrera VALUES (?,?,?)', [career.id, career.division, career.nombre]);
                console.log(`Carrera ${career.nombre} fue ingresada con éxito`);
            }
            resolve('Inserción de Carreras Exitosa');
        } catch (error) {
            reject(error);
        } finally {
            if (conn) conn.end();
        } 
    });
}

async function insertProfesores(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

        try {
            const deleteData = await conn.query('DELETE FROM Profesor');
            
            for (const professor of data) {
                const result = await conn.query('INSERT INTO Profesor VALUES (?,?,?,?,?)', [professor.id, professor.nombre, professor.apellido, professor.horario_entrada, professor.horario_salida]);
                console.log(`Profesor ${professor.nombre} ${professor.apellido} fue ingresado con éxito`);
            }
            resolve('Insercion de Profesores realizada con éxito')
        } catch (error) {
            reject(error);
        } finally {
            if (conn) conn.end();
        }
    });
}

async function insertMaterias(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

    try {
        const deleteData = await conn.query('DELETE FROM Materia');

        for (const course of data) {
            const result = await conn.query('INSERT INTO Materia VALUES (?,?,?,?)', [course.id_curso, course.nombre_curso, course.duracion_periodo, course.numero_semestre]);
            console.log(`Curso ${course.nombre_curso} fue ingresado con éxito`)
        }
        resolve('Inserción de Materias realizada con éxito\n');
    } catch (error) {
        reject(error)
    } finally {
        if (conn) conn.end();
    }
    });
}

async function insertCarreraCurso(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

        try {
            const result = await conn.query('DELETE FROM Materia_Carrera');

            for (const careerCourse of data) {
                const result = await conn.query('INSERT INTO Materia_Carrera VALUES (?,?)', [careerCourse.carrera, careerCourse.materia]);
                console.log(`El curso ${careerCourse.materia} fue vinculado con la carrera ${careerCourse.carrera}`);
            }
            resolve('Inserción de relación Carrera-Curso realizada con éxito');
        } catch (error) {
            reject(error)
        } finally {
            if (conn) conn.end();
        }
    });
}

async function insertProfessorCourse(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

        try {
            const result = await conn.query('DELETE FROM Profesor_Materia');

            for (const professorCourse of data) {
                const result = await conn.query('INSERT INTO Profesor_Materia VALUES (?,?,?)', [professorCourse.docente, professorCourse.curso, professorCourse.titular]);
                console.log(`El profesor ${professorCourse.docente} fue asignado con éxito al curso ${professorCourse.curso}`);
            }
            resolve('Inserción de relación Profesor-Materia realizada con éxito');
        } catch (error) {
            reject(error);
        } finally {
            if (conn) conn.end();
        }
    });
}

async function insertSection(data) {
    return new Promise(async (resolve, reject) => {
        const conn = await db.getConnection();

        try {
            const result = await conn.query('DELETE FROM Seccion');

            for (const section of data) {
                const result = await conn.query('INSERT INTO Seccion (materia, cantidad_estudiantes, letra, Semestre, Anio) VALUES (?,?,?,?,?)', [section.curso, section.cantidad_alumnos, section.letra, section.semestre, section.anio]);
                console.log(`Se creó la sección ${section.letra} del curso ${section.curso} con ${section.cantidad_alumnos} alumnos`);
            }
            resolve('Inserción de las Secciones realizada con éxito');
        } catch (error) {
            reject(error);
        } finally {
            if (conn) conn.end();
        }
    });
}

module.exports = {
    insertSalones,
    insertCarreras,
    insertProfesores,
    insertMaterias,
    insertCarreraCurso,
    insertProfessorCourse,
    insertSection
}