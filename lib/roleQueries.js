const connection = require('../db/connection');

class RoleQueries {
    constructor() {
    }

    getAllRoles() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM role', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    addRole(title, salary, departmentId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(query, [title, salary, departmentId], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    
}

module.exports = RoleQueries;
