const mysql = require('mysql');



//configurar la conexion a la base de datos

const conect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bodega"

});

// conexion a la base de datos
conect.connect((err) =>{
    if (err){
        console.error('No se conecto a la base de datos:', err.stack);
        return;
    }
    console.log('Conexion exitosa a la base de datos');
});

module.exports = conect;