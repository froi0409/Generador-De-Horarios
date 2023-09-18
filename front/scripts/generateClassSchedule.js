const url = 'http://127.0.0.1:3000/api/classSchedule';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Request-Method': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    },
    mode: 'cors',
};

const divDinamico = document.getElementById('recibir_data');

async function generarHorario() {
    return await fetch(url, options) 
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const table = document.createElement("table");
            table.style.borderCollapse = "collapse"; // Agregar colapso de bordes
            const tbody = document.createElement("tbody");

            if (data.classSchedule && Array.isArray(data.classSchedule)) {
                // Crear la primera fila con los nombres de los salones
                const firstRow = tbody.insertRow();
                firstRow.insertCell(); // Celda vacía para la esquina superior izquierda

                // Obtener la lista de salones disponibles
                const salones = new Set();
                data.classSchedule.forEach(horario => {
                    horario.forEach(clase => {
                        if (clase.classroom) {
                            salones.add(clase.classroom);
                        }
                    });
                });

                // Ordenar los salones numéricamente
                const sortedSalones = [...salones].sort((a, b) => a - b);

                // Agregar los nombres de los salones a la primera fila
                sortedSalones.forEach(salon => {
                    const cell = firstRow.insertCell();
                    cell.textContent = `Salón ${salon}`;
                    cell.style.border = "1px solid #ddd"; // Aplicar borde a las celdas de nombres de salones
                });

                // Iterar sobre los horarios y salones
                data.classSchedule.forEach((horario, indexHorario) => {
                    const row = tbody.insertRow();

                    if (horario && Array.isArray(horario)) {
                        // Agregar el horario en la primera columna
                        const horaCell = row.insertCell();
                        horaCell.textContent = `${horario[0].startTime} - ${horario[0].endTime}`;
                        horaCell.style.border = "1px solid #ddd"; // Aplicar borde a la celda de encabezado

                        // Iterar sobre los salones (a partir del segundo elemento de cada arreglo)
                        for (let indexSalon = 0; indexSalon < sortedSalones.length; indexSalon++) {
                            const salon = sortedSalones[indexSalon];
                            const clase = horario.find(c => c.classroom === salon);
                            const cell = row.insertCell();
                            cell.style.border = "1px solid #ddd"; // Aplicar borde a las celdas regulares

                            if (clase && clase.courseName) {
                                cell.textContent = `${clase.courseName}\n${clase.professorFirstName} ${clase.professorLastName}`;
                            } else {
                                cell.textContent = "Disponible";
                            }
                        }
                    }
                });
            } else {
                console.log('El formato de los datos recibidos no es válido.');
            }

            table.appendChild(tbody);
            divDinamico.appendChild(table);
        })
        .catch(error => {
            console.log('error:', error);
        });
}
