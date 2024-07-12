const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const conectar = require('./conexion');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

//manejar datos del formulario
app.use(bodyParser.urlencoded ({extended:false}));
app.use(bodyParser.json());

//configurar method-override como middleware
app.use(methodOverride('_method'));

// configurar express para servir archivos estaticos para procesar datos POST
app.use(express.static(path.join(__dirname, '../views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// metodo para mostrar la pagina 
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../views', 'pinicial.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('No se encuentra el archivo pinicial.html');      
        }
    });
});

//ruta para mostrar el formulario de registro de facturas (GET)
app.get('/registrar-factura', (req, res) => {
    const filePath = path.join(__dirname, '../views', 'factura.html');
    console.log(`Ruta absoluta del archivo: ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al enviar el archivo:', err);
            res.status(404).send('pagina no encontrada (factura.html)');

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

//Ruta para obtener el listado de facturas (READ)

app.get('/listado-facturas', (req, res) => {
    const SELECT_FACTURA_BY_ID_QUERY = 'SELECT * FROM facturas';

    conectar.query(SELECT_FACTURA_BY_ID_QUERY, (err, rows) => {
        if (err) {
            console.log('Error al consultar las facturas:', err.stack);
        }

        if (rows.length > 0) {
            res.render('listadof', {facturas: rows});
        } else {
            return res.status(500).send('No hay regsitros de facturas');
        }
    });
});

//ruta para obtener una factura por ID (READ)
app.get('/facturas/:id', (req, res) => {
    const SELECT_FACTURA_BY_ID_QUERY = 'SELECT * FROM facturas WHERE IDfacturas = ?';
    const facturaid = req.params.id;

    conectar.query (SELECT_FACTURA_BY_ID_QUERY, [facturaid], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener la factura');
        } else if (row.length === 0) {
            res.status(404).send('Factura no encontrada');
        } else {
            res.status(200).json(row[0]);
        }
    });
});

// Ruta para mostrar el formulario de edición de una factura por ID
app.get('/actualizar-factura/:id', (req, res) => {
    const SELECT_FACTURA_BY_ID_QUERY = 'SELECT * FROM facturas WHERE IDfacturas = ?';
    const facturaid = req.params.id;

    conectar.query(SELECT_FACTURA_BY_ID_QUERY, [facturaid], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener la factura');
        } else if (row.length === 0) {
            res.status(404).send('Factura no encontrada');
        } else {
            // Renderizar la plantilla 'factura-edit' y pasar los datos de la factura
            res.render('editarf', { factura: row[0] });
        }
    });
});
app.put('/actualizar-factura/:id', (req, res) => {
    const { Nombrep, Descripción_factura, Total_factura } = req.body;
    const UPDATE_FACTURA_QUERY = 'UPDATE facturas SET Nombrep = ?, Descripción_factura = ?, Total_factura = ? WHERE IDfacturas = ?';
    const facturaid = req.params.id;

    conectar.query(UPDATE_FACTURA_QUERY, [Nombrep, Descripción_factura, Total_factura, facturaid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar la factura');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Factura no encontrada');
        } else {
            res.status(200).send('Factura actualizada correctamente');
        }
    });
})


//Ruta para eliminar una factura por ID (DELETE)
app.delete('/facturas/:id', (req, res) => {
    const DELETE_FACTURA_QUERY = 'DELETE FROM facturas WHERE IDfacturas = ?';
    const facturaid = req.params.id;

    conectar.query(DELETE_FACTURA_QUERY, [facturaid], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar la fcatura');
        }else if (result.affectedRows === 0) {
            res.status(404).send('Factura no enocntrada');
        } else {
            res.status(200).send('Factura eliminada correctamente');
        }
    });
});

//Iniciar el servidor 
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});