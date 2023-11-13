const connection = require('../db/connection');

class DepartmentQueries {
    constructor() {
    }

    getAllDepartments() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM department', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    addDepartment(departmentName) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO department (name) VALUES (?)';
            connection.query(query, [departmentName], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }

    deleteDepartment(departmentId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM department WHERE id = ?';
            connection.query(query, [departmentId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    
    getDepartmentBudget(departmentId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT d.name AS department, SUM(r.salary) AS total_budget
                FROM employee e
                JOIN role r ON e.role_id = r.id
                JOIN department d ON r.department_id = d.id
                WHERE d.id = ?
                GROUP BY d.name
            `;
            connection.query(query, [departmentId], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }
    
}

module.exports = DepartmentQueries;
