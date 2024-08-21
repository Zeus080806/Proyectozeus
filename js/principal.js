const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('./bd');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

//manejar datos del formulario
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//configurar method-override como middleware
app.use(methodOverride('_method'));


// configurar express para servir archivos estaticos
app.use(express.static(path.join(__dirname, '../view')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../view'));


//metodo para mostrar la pagina
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../view', 'principalh.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('No se encuentra el archivo principalh.html');      
        }
    });
});

app.get('/funcionarios', (req, res) => {
    const filePath = path.join(__dirname, '../view', 'funcionarioh.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('Archivo no encontrado');

        }
    });
});

// Ruta para mostrar el formulario de registro de funcionarios (CREATE - FORM)
app.get('/registrar-funcionario', (req, res) => {
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

// Ruta para mostrar el formulario de edición de funcionario (UPDATE - FORM)
app.get('/editar-funcionario/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM funcionarios WHERE IDusuarios = ?', [id], (err, rows) => {
        if (err) {
            console.log('Error al consultar el funcionario:', err.stack);
            return res.status(500).send('Error al consultar el funcionario');
        }
        if (rows.length > 0) {
            res.render('editar', { funcionario: rows[0] });
        } else {
            return res.status(500).send('No se encontró el funcionario');
        }
    });
});

// Ruta para manejar la edición de funcionario (UPDATE - POST)
app.post('/editar-funcionario/:id', (req, res) => {
    const id = req.params.id;
    const { cedula, nombres, apellidos, correo, EPS, FP, hijos, estadocivil } = req.body;
    const empleado = { cedula, nombres, apellidos, correo, EPS, FP, hijos, estadocivil };

    conexion.query('UPDATE funcionarios SET ? WHERE IDusuarios = ?', [empleado, id], (err, result) => {
        if (err) {
            console.log('Error al actualizar el funcionario:', err.stack);
            return res.status(500).send('Error al actualizar el funcionario');
        }
        console.log('Funcionario actualizado con exito');
        return res.send('Funcionario actualizado con exito');
    });
});

// Ruta para manejar la eliminación de funcionario (DELETE)
app.delete('/funcionarios/:id', (req, res) => {
    const DELETE_FUNCIONARIO_QUERY = 'DELETE FROM funcionarios WHERE IDusuarios = ?';
    const usuarioid = req.params.id;

    console.log(`ID recibido para eliminación: ${usuarioid}`);

    conexion.query(DELETE_FUNCIONARIO_QUERY, [usuarioid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar el funcionario');
        }else if (result.affectedRows === 0) {
            res.status(400).send('Funcionario no encontrado');
        }else {
            res.status(200).send('Funcionario eliminado correctamente');
        }
        
    });
});

app.get('/listado-funcionarios', (req, res) => {
    // Realizar la consulta a la base de datos para obtener los funcionarios
    conexion.query('SELECT * FROM funcionarios', (err, rows) => {
        if (err) {
            console.log('Error al consultar los funcionarios:', err.stack);
            return res.status(500).send('Error al consultar los funcionarios');
        }

        if (rows.length > 0) {
            // Renderizar la vista 'listadoh.ejs' y pasar los datos de los funcionarios como variable
            res.render('listadoh', { funcionarios: rows });
        } else {
            return res.status(500).send('No hay registros de funcionarios');
        }
    });
});

//Iniciar el servidor 
//if (require.main === module) {
//app.listen(port, () => {
    //console.log(`Servidor escuchando en http://localhost:${port}`);
//});
//}

const server = app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

//exportar la aplicacion para las pruebas 
module.exports = {app, server};