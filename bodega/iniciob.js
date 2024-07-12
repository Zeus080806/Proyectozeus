const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const path = require('path');


const app = express();
const port = 3000;

// Configurar body-parser para procesar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar express para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../page'));


// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestionh'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para mostrar el formulario de inicio de sesión (GET)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../page', 'iniciob.html'));
});


// Ruta para manejar el inicio de sesión (POST)
app.post('/log', (req, res) => {
    const { nombre, contrasena } = req.body;

    // Buscar el usuario en la base de datos
    conexion.query('SELECT * FROM registro WHERE nombre = ?', [nombre], async (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err.stack);
            res.status(500).send('Error al buscar el usuario');
            return;
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const usuario = results[0];

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta');
        }

        res.send('Inicio de sesión exitoso');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});