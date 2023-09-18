const apiLink = document.getElementById('api-generate');

const url = 'localhost:3000/api/classSchedule';


apiLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Realizamos la solicitud a la API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error(`Error: ${error}`)
        });
});
