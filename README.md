# Employee Tracker

## Description

The Employee Management System is a command-line application that allows you to manage departments, roles and employees within your organization. With this application, you can view, add, update, and delete department, role, and employee records.

Promoted and demote with ease!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

You Have Two Options

## Use Live Application

Visit the live application on Heroku: [https://dashboard.heroku.com/apps/warm-sands-76108](https://warm-sands-76108-6993c4b7e4f4.herokuapp.com/)

## Run Locally

Before you begin, ensure you have met the following requirements:

```sh
- **Node.js**: Download and install [Node.js](https://nodejs.org/) (which includes [npm](http://npmjs.com)) on your computer.
```

1. Clone the repository:
```sh
git clone https://github.com/Julian-A-Mort/Employee_Tracker.git
```

2. Navigate to the directory

3. install the necessary dependencies 
```sh
npm install
```

4. create a MySQL database for the application and update the database configuration in the 'db/connection.js' file

5. Initialize the database schema

## Usage
To start the Employee Management System, run the following command:

```sh
node index.js
```

## Features
The Employee Management System offers the following features:

View all departments: Display a formatted table showing department names and IDs.
View all roles: Display job titles, role IDs, associated departments, and salaries.
View all employees: Display employee data, including IDs, first names, last names, job titles, departments, salaries, and managers.
Add a department: Add a new department to the database.
Add a role: Add a new role with a title, salary, and department association.
Add an employee: Add a new employee with first name, last name, role, and manager.
Update employee role: Change an employee's role to a different one, a better one or worse?
Delete department: Remove a department from the database.

## License
This project is not currently under any license. Feel free to clone and use for any purpose, giving credit where it's due. 

## Questions
If you have any questions about this repo, then please open an issue or contact me on GitHub at [Julian-A-Mort] (https://github.com/Julian-A-Mort) 