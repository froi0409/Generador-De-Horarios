from app import app

@app.route('/')
def index():
    return 'Hola desde el backend'

@app.route('/prueba')
def prueba():
    return 'Adios a todos'
