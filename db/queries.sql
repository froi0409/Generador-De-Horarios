-- Obtención de Secciones
SELECT m.nombre,m.duracion,m.numero_semestre,s.letra,s.cantidad_estudiantes,s.materia FROM Seccion AS s INNER JOIN Materia AS m ON s.materia=m.codigo WHERE s.Anio='2023' AND s.Semestre=1 ORDER BY m.numero_semestre;
