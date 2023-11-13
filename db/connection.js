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
    if (error) throw error;
    console.log("Boop beep boop database connected");
});

module.exports = connection;
