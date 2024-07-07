const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conectar = require('./conexion'); 

const app = express();
const port = 3000;

// Configuración de body-parser para procesar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Express para servir archivos estáticos (como CSS, JS) desde el directorio 'view'
app.use(express.static(path.join(__dirname, '../views')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); 

// Ruta para obtener el listado de funcionarios
app.get('/', (req, res) => {
    // Realizar la consulta a la base de datos para obtener los funcionarios
    conectar.query('SELECT * FROM facturas', (err, rows) => {
        if (err) {
            console.log('Error al consultar las facturas:', err.stack);
            return res.status(500).send('Error al consultar las facturas');
        }

        if (rows.length > 0) {
            
            res.render('listadof', { facturas: rows });
        } else {
            return res.status(500).send('No hay registros de facturas');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});