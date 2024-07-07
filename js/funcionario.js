const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('./bd');

const app = express();
const port = 3000;

//configuracion de body-parser para procesar datos POST
app.use(bodyParser.urlencoded({ extended: true}));

// configurar express para servir archivos estaticos para procesar datos POST
app.use(express.static(path.join(__dirname, '../view')));

//registro funcionarios 

//ruta para mostrar el formulario de registro de funcionarios (GET)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../view', 'funcionarioh.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('Archivo no encontrado');

        }
    });
});

//ruta para manejar el registro de funcionarios (POST)
app.post('/fun', (req, res) => {
    const { IDusuarios, cedula, nombres, apellidos, correo, EPS, FP, hijos, estadocivil } = req.body;

    //verificar si ya existe una cedula
    conexion.query('SELECT * FROM funcionarios WHERE cedula = ?', cedula, (err, rows) => {
        if (err) {
            console.log('Error al verificar cedula:', err.stack);
            return res.status(500).send('Error al verificar cedula en la base de datos');
        }

        if (rows.length > 0) {
            return res.status(400).send('La cedula ya esta registrada');
        }else {
    

    //crear objeto de funcionarios para insertar en la base de datos
    const empleado = {IDusuarios, cedula, nombres, apellidos, correo, EPS, FP, hijos, estadocivil};
    console.log('Datos recibidos:', empleado);

    // insertar funcionario en la base de datos
    conexion.query('INSERT INTO funcionarios SET ?', empleado, (err, result) => {
        if (err) {
            console.log('Error al insertar funcionario:', err.stack);
            return res.status(500).send('Error al registrar el funcionario');
            
        }
        console.log('Funcionario registrado con exito');
        return res.send('Funcionario registrado con exito');
      });
     } 
  });
});

//Iniciar el servidor 
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});