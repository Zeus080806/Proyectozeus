const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('./bd'); 

const app = express();
const port = 3000;

// Configuración de body-parser para procesar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Express para servir archivos estáticos (como CSS, JS) desde el directorio 'view'
app.use(express.static(path.join(__dirname, '../view')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../view'));

// Ruta para obtener el listado de funcionarios
app.get('/', (req, res) => {
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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
