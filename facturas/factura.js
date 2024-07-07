const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const conectar = require('./conexion');

const app = express();
const port = 3000;

//manejar datos del formulario
app.use(bodyParser.urlencoded ({extended:false}));
app.use(bodyParser.json());

// configurar express para servir archivos estaticos para procesar datos POST
app.use(express.static(path.join(__dirname, '../views')));

//ruta para mostrar el formulario de registro de facturas (GET)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../views', 'factura.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('Archivo no encontrado');

        }
    });
});


//ruta para procesar el formulario de factura (insercion en la base de datos)
app.post('/fac', (req, res) => {
    const {IDfacturas, Nombrep, Descripción_factura, Total_factura} = req.body;
    const INSERT_FACTURA_QUERY = `INSERT INTO facturas (IDfacturas, Nombrep, Descripción_factura, Total_factura) VALUES (?, ?, ?, ?)`;

    conectar.query(INSERT_FACTURA_QUERY, [IDfacturas, Nombrep, Descripción_factura, Total_factura], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al crear la factura');
        } else {
            console.log('Factura creada correctamente');
            res.status(200).send('Factura creada correctamente');
        }
    });
});


//Puerto donde correra el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

