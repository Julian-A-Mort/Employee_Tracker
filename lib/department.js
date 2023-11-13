const connection = require('../db/connection');

const viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM department', (err, deptData) => {
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
        const query = 'INSERT INTO department (name) VALUES (?)';
        connection.query(query, department_id, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { viewAllDepartments, addDepartment };
