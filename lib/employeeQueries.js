const connection = require('../db/connection');

class EmployeeQueries {
    constructor() {
    }

    getAllEmployees() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM employees', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

}

module.exports = EmployeeQueries;
