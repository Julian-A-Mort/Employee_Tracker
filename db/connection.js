const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'MrMort',  // newly created 
    password: 'fakepassword',  // newly created
    database: 'employeetracker'  // newly created
});

// Open the MySQL connection
connection.connect(error => {
    if (error) {
        console.error('Error connecting: ' + error.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;
