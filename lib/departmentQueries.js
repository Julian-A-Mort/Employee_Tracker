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
    
}

module.exports = DepartmentQueries;
