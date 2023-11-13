const connection = require('../db/connection');

const viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employees', (err, employeeData) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(employeeData);
        });
    });
};

const addEmployee = (firstName, lastName, roleId, managerId) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)';
        connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { viewAllEmployees, addEmployee };
