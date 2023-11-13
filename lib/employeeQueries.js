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

    getEmployeesByManager(managerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employees WHERE manager_id = ?';
            connection.query(query, [managerId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    updateEmployeeManager(employeeId, newManagerId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE employees SET manager_id = ? WHERE id = ?';
            connection.query(query, [newManagerId, employeeId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    getAllManagers() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT DISTINCT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name
                FROM employees e
                INNER JOIN employees m ON e.id = m.manager_id
            `;
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }

}

module.exports = EmployeeQueries;
