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
                // Iterar sobre los horarios y salones
                data.classSchedule.forEach((horario, indexHorario) => {
                    const row = tbody.insertRow();

                    if (horario && Array.isArray(horario)) {
                        // Agregar el horario en la primera columna
                        const horaCell = row.insertCell();
                        horaCell.textContent = `${horario[0].startTime} - ${horario[0].endTime}`;

                        // Iterar sobre los salones (a partir del segundo elemento de cada arreglo)
                        for (let indexSalon = 1; indexSalon < horario.length; indexSalon++) {
                            const clase = horario[indexSalon];
                            const cell = row.insertCell();

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
