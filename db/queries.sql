-- Obtención de Secciones
SELECT m.nombre,m.duracion,m.numero_semestre,s.letra,s.cantidad_estudiantes,s.materia FROM Seccion AS s INNER JOIN Materia AS m ON s.materia=m.codigo WHERE s.Anio='2023' AND s.Semestre=1 ORDER BY m.numero_semestre;

-- Obtención de Profesores disponibles
SELECT p.id_profesor,p.nombre AS nombre_profesor,p.apellido,p.hora_entrada,p.hora_salida,pm.titular,pm.materia,m.nombre AS nombre_materia,m.numero_semestre FROM Profesor AS p INNER JOIN Profesor_Materia AS pm ON p.id_profesor=pm.profesor INNER JOIN Materia AS m ON pm.materia=m.codigo;

-- Verificando si un profesor se encuentra disponible en un horario
SELECT COUNT(*) FROM Profesor WHERE id_profesor='35000' AND '14:00' >= hora_entrada AND '15:00' <= hora_salida;

-- Obtenemos Materias con su información de carrera
SELECT m.codigo AS codigo_curso,s.letra,m.nombre AS nombre_curso,m.numero_semestre,mc.carrera,s.cantidad_estudiantes FROM Seccion AS s INNER JOIN Materia AS m ON s.materia=m.codigo INNER JOIN Materia_Carrera AS mc ON m.codigo=mc.materia ORDER BY carrera,numero_semestre;
