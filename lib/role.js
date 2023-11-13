const connection = require('../db/connection');

const viewAllRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM role', (err, roleData) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(roleData);
        });
    });
};

const addRole = (title, salary, departmentId) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO role (title, salary, name) VALUES (?, ?, ?)';
        connection.query(query, [title, salary, department_name], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { viewAllRoles, addRole };
