const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const conexion = require('./bd');

const app = express();
const port = 3000;


//configuracion de body-parser para procesar datos POST
app.use(bodyParser.urlencoded({ extended: true}));

// configurar express para servir archivos estaticos para procesar datos POST
app.use(express.static(path.join(__dirname, '../view')));

// ruta para mostrar el formulario de registro (GET)
app.get('/',(req, res) => {
    //res.sendFile (path.join(__dirname, + '../view', 'registroh.html'));
    const filePath = path.join(__dirname, '../view', 'registroh.html');
    console.log(`Sending file: ${filePath}`);
    res.sendFile(filePath);
});

// ruta para mostrar el formulario de inicio de sesion (GET)
app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../view', 'inicioh.html')
    console.log(`Sending file: ${filePath}`);
    res.sendFile(filePath);
});


// Ruta para manejar el registro de usuario
app.post('/registro', async (req, res) => {
    const { cedula, nombre, correo, contrasena, ccontrasena} = req.body;

    // Verificar que las contraseñas coincidan 
    if (contrasena !== ccontrasena){
        return res.status(400).send('Las contraseñas no coinciden');
    }

    //Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    //crear objeto de usuario para insertar en la base de datos

    const usuario = { cedula, nombre, correo, contrasena: hashedPassword};

    //insertar usuario en la base de datos
    conexion.query('INSERT INTO registro SET ?', usuario, (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err.stack);
            res.status(500).send('Error al registrar el usuario verifica si esta registrado');
            return;
        }
        console.log('Usuario resgitrado con exito');
        res.redirect('/login');

    });
});

// ruta para manejar el inicio de sesion (POST)
app.post('/login', (req, res) => {
    const{nombre, contrasena} = req.body;

    //Buscar el usuario en la base de datos
    conexion.query('SELCT * FROM registro WHERE  nombre = ?', [nombre], async (err, results) =>{
        if (err) {
            console.error('Error al buscar el usuario:', err.stack);
            res.status(500).send('Error al buscar el usuario');
            return;
        }

        if(results.length === 0){
            return res.status(400).send('Usuario no encontrado');
        }

        const usuario = results[0];

        //comparar la contraseña ingresada con la almacenada 
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta');
        }
        res.redirect('/principal');

    });
});

//Iniciar el servidor 
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
