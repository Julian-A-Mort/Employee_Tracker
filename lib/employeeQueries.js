const connection = require('../db/connection');

class EmployeeQueries {
    constructor() {
    }

    getAllEmployees() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    e.id,
                    e.first_name,
                    e.last_name,
                    r.title AS job_title,
                    d.name AS department,
                    r.salary,
                    CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employee e
                LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON e.manager_id = m.id
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
    

    addEmployee(firstName, lastName, roleId, managerId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    updateEmployeeRole(employeeId, newRoleId) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            connection.query(query, [newRoleId, employeeId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }    

    deleteEmployee(employeeId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM employee WHERE id = ?';
            connection.query(query, [employeeId], (err, result) => {
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
            const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
            connection.query(query, [newManagerId, employeeId], (err, result) => {
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
