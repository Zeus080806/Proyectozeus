const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conect = require('./conectar'); 

const app = express();
const port = 3000;

// Configuración de body-parser para procesar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Express para servir archivos estáticos (como CSS, JS) desde el directorio 'view'
app.use(express.static(path.join(__dirname, '../public')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../page')); 

// Ruta para obtener el listado de funcionarios
app.get('/', (req, res) => {
    // Realizar la consulta a la base de datos para obtener los funcionarios
    conect.query('SELECT * FROM registrop', (err, rows) => {
        if (err) {
            console.log('Error al consultar las facturas:', err.stack);
            return res.status(500).send('Error al consultar las facturas');
        }

        if (rows.length > 0) {
            
            res.render('listadob', { registrop: rows });
        } else {
            return res.status(500).send('No hay registros de facturas');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});