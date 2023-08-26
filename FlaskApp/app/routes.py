from app import app
from flask import request

@app.route('/')
def index():
    return 'Hola desde el backend'

@app.route('/prueba', methods = ['POST'])
def prueba():
    return 'Adios a todos'

@app.route('/prueba/<variable>')
def prueba_variable(variable):
    return 'Hola' + variable

@app.post('/pruebapost')
def prueba_post():
    message = request.form['message']
    return 'prueba del post ' + message


