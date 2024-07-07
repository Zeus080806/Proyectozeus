const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const conect = require('./conectar');

const app = express();
const port = 3000;

//manejar datos del formulario
app.use(bodyParser.urlencoded ({extended:false}));
app.use(bodyParser.json());

// configurar express para servir archivos estaticos para procesar datos POST
app.use(express.static(path.join(__dirname, '../page')));

//ruta para mostrar el formulario de registro de facturas (GET)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../page', 'facturab.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('Archivo no encontrado');

        }
    });
});


//ruta para procesar el formulario de factura (insercion en la base de datos)
app.post('/fact', (req, res) => {
    const {idfactura, marca, descripcion, cantidad, precio,} = req.body;
    const INSERT_FACTURA_QUERY = `INSERT INTO registrop (idproducto, marca, descripcion, cantidad, precio) VALUES (?, ?, ?, ?, ?)`;

    conect.query(INSERT_FACTURA_QUERY, [idfactura, marca, descripcion, cantidad, precio], (err, result) => {
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