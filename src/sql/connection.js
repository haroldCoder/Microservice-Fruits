import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2364144",
    database: "fruit"
});

export default connection;

