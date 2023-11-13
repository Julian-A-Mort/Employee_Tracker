const connection = require('../db/connection');

const viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM departments', (err, deptData) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(deptData);
        });
    });
};

const addDepartment = (departmentName) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO departments (name) VALUES (?)';
        connection.query(query, departmentName, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { viewAllDepartments, addDepartment };
