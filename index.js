// run node index.js to start application

const connection = require('./db/connection');
const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment, } = require('./lib/department');
const { viewAllEmployees, addEmployee, } = require('./lib/department');
const { viewAllRoles, addRole, } = require('./lib/department');

connection.query('SELECT * FROM departments', (error, results) => {
    if (error) throw error;
    console.log(results);
});

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', /* other options */]
        }
    ]);

    switch (action) {
        case 'View all departments':
            const departments = await viewAllDepartments();
            console.table(departments);
            break;
        // Handle other actions
    }

    mainMenu(); // Call the menu again to allow for more actions
};

mainMenu();