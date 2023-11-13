// run node index.js to start application

const connection = require('./db/connection');
const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment, } = require('./lib/department');
const { viewAllEmployees, addEmployee, } = require('./lib/employee');
const { viewAllRoles, addRole, } = require('./lib/role');

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit'
            ]
        }
    ])
    .then(answers => {
        switch (answers.action) {
            case 'View all departments':
                viewAllDepartments()
                .then(departments => {
                    console.table(departments);
                    mainMenu();
                })
                .catch(err => {
                    console.error('Error viewing departments:', err);
                    mainMenu();
                });                
                break;
            case 'View all roles':
                viewAllRoles()
                .then(roles => {
                    console.table(roles);
                    mainMenu();
                })
                .catch(err => {
                    console.error('Error viewing roles:', err);
                    mainMenu();
                });
                break;
            case 'View all employees':
                viewAllEmployees()
                .then(employees => {
                    console.table(employees);
                    mainMenu();
                })
                .catch(err => {
                    console.error('Error viewing employees:', err);
                    mainMenu();
                });                
                break;
            case 'Add a department':
                promptForDepartment();
                break;
            case 'Add a role':
                promptForRole();
                break;
            case 'Add an employee':
                promptForEmployee();
                break;
            case 'Exit':
                process.exit();
        }
    });
};

const promptForDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department:'
        }
    ])
    .then(answer => {
        addDepartment(answer.departmentName)
            .then(() => {
                console.log(`Added ${answer.departmentName} to departments`);
                mainMenu();
            })
            .catch(err => console.error('Error adding department:', err));
    });
};

const promptForEmployee = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee\'s first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee\'s last name:'
            },
            {
                type: 'list',
                name: 'role_id',
                message: "Select the employee's role:",
                choices: roleChoices // Ensure this is an array of role options
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Select the employee's manager:",
                choices: managerChoices // Ensure this is an array of manager options
            }
        ]);

        await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
        console.log(`Added ${answers.first_name} ${answers.last_name} to employees`);
        mainMenu();

    } catch (err) {
        console.error('Error adding employee:', err);
    }
};


const promptForRole = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for this role:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: "Enter the department ID for this role:",
            }
        ]);

        await addRole(answers.title, answers.salary, answers.department_id);
        console.log(`Added ${answers.title} to roles`);
        mainMenu(); 

    } catch (err) {
        console.error('Error adding role:', err);
    }
};


mainMenu();