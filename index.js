// mysql -u MrMort -p 
// node index.js to start application

const inquirer = require('inquirer');
const DepartmentQueries = require('./lib/departmentQueries');
const EmployeeQueries = require('./lib/employeeQueries');
const RoleQueries = require('./lib/roleQueries');

const departmentQueries = new DepartmentQueries();
const employeeQueries = new EmployeeQueries();
const roleQueries = new RoleQueries();


//ask questions
const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])  
    .then(answers => {
        switch (answers.action) {
            case 'View All Departments':
                departmentQueries.getAllDepartments()
                    .then(departments => {
                        console.table(departments);
                        mainMenu();
                    })
                    .catch(err => console.error('Error viewing departments:', err));
                break;
            case 'View All Roles':
                roleQueries.getAllRoles()
                    .then(roles => {
                        console.table(roles);
                        mainMenu();
                    })
                    .catch(err => console.error('Error viewing roles:', err));
                break;
            case 'View All Employees':
                employeeQueries.getAllEmployees()
                    .then(employees => {
                        console.table(employees);
                        mainMenu();
                    })
                    .catch(err => console.error('Error viewing employees:', err));
                break;
            case 'Add a Department':
                promptForDepartment();
                break;
            case 'Add a Role':
                promptForRole();
                break;
            case 'Add an Employee':
                promptForEmployee();
                break;
            case 'Update Employee Role':
                promptUpdateEmployeeRole();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
    });
};

//answer functionality
const promptForDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new department:'
        }
    ])
    .then(answer => {
        departmentQueries.addDepartment(answer.departmentName)
            .then(() => {
                console.log(`Added ${answer.departmentName} to departments`);
                mainMenu();
            })
            .catch(err => console.error('Error adding department:', err));
    });
};

const promptForEmployee = async () => {
    try {
        const roles = await roleQueries.getAllRoles();
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

        const employees = await employeeQueries.getAllEmployees();
        const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

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
                choices: roleChoices 
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Select the employee's manager:",
                choices: employeeChoices
            }
        ]);

        await employeeQueries.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
        console.log(`Added ${answers.first_name} ${answers.last_name} to employees`);
        mainMenu();

    } catch (err) {
        console.error('Error adding employee:', err);
    }
};


const promptForRole = async () => {
    try {
        const roles = await roleQueries.getAllRoles();
        const departments = await departmentQueries.getAllDepartments();

        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
        const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

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
                type: 'list',
                name: 'department_id',
                message: "Select the department for this role:",
                choices: departmentChoices
            }
        ]);

        await roleQueries.addRole(answers.title, answers.salary, answers.department_id);
        console.log(`Added ${answers.title} to roles`);
        mainMenu(); 

    } catch (err) {
        console.error('Error adding role:', err);
    }
};

const promptUpdateEmployeeRole = async () => {
    try {
        const employees = await employeeQueries.getAllEmployees();
        const roles = await roleQueries.getAllRoles();

        const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee whose role you want to update:',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role for the employee:',
                choices: roleChoices
            }
        ]);

        await employeeQueries.updateEmployeeRole(answers.employeeId, answers.roleId);
        console.log('Employee role updated successfully.');
        mainMenu();
    } catch (err) {
        console.error('Error:', err);
    }
};

mainMenu();