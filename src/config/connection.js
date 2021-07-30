const mysql = require('mysql');

const objectConnection = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "1234",
    "database": "proyectonode",
    insecureAuth : true //Tenia problemas para los permisos del usuario y encontré esta solución.
}

const myConn = mysql.createConnection(objectConnection);

myConn.connect((error) => {
    if(error) {
        console.log("Ha ocurrido un error: ", error);
    } else {
        console.log("Base de datos conectada");
    }
});

module.exports = myConn;