// Required Dependencies
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'Elke!12162020',
        database: 'movies_db'
    },
    console.log(`Connected to the employee database.`)
);