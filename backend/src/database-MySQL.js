var mysql = require('mysql');

//Configuración
var mysqlConn = mysql.createConnection({
    host: 'localhost',
    port: 33060,
    database: 'pruebainfodesign',
    user: 'root',
    password: 'admin'
});

//Conexión
mysqlConn.connect( (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexión a DB MYSQL exitosa');
    }
});

//Exportación
module.exports = mysqlConn;