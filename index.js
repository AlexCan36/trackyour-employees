const { prompt } = require('inquirer')
const logo = require('asciiart-logo')
const db = require('./db/connection')
const connection = require('./db/connection')
const { eventNames } = require('./db/connection')

function startApp() {
    const myLogo = logo({ name: 'Employee Manager' }).render()
    console.log(myLogo)
    promptUser()
}
async function promptUser() {
    const question = await prompt({
        type: 'list',
        name: 'starter',
        message: 'What would you like to do?',
        choices: [
            'view all departments', 'view all roles', 'view all employees', 'add department', 'add role', 'add employee', 'update an employee role'
        ]
    })

    switch (question.starter) {
        case 'view all departments':
            // Do something if they select this option
            viewAllDep()
            break;


        case 'view all roles':
            // Do something if they select this option
            viewAllRoles()
            break;

        case 'view all employees':
            // Do something if they select this option
            viewAllEmployees()
            break;
        case 'add department':
            // Do something if they select this option
            addDep()
            break;
        case 'add role':
            // Do something if they select this option
            addRole()
            break;
        case 'add employee':
            // Do something if they select this option
            addEmployee()
            break;
        case 'update an employee role':
            // Do something if they select this option
            updateEmployeerole()
            break;
    }
}

function viewAllDep() {
    //write code to display all the departments from the db
    const sql = `SELECT * 
    FROM Department `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message)
            return;
        }
        console.table(rows)
        promptUser()
    });
}

function viewAllRoles() {
    //write code to display all the departments from the db
    const sql = `SELECT * 
    FROM Roles `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message)
            return;
        }
        console.table(rows)
        promptUser()
    });
}

function viewAllEmployees() {
    connection.query("SELECT first_name, last_name, title FROM employee JOIN roles on employee.role_id = roles.id", function (err, results) {
        if (err) throw err;
        console.table(results);
        promptUser();
    });
}

function addDep() {
    prompt(
        {
            type: 'input',
            name: 'department',
            message: 'Add new department',
        })
        .then(res => {
            db.query("INSERT INTO department(name) VALUES (?)", [
                res.department
            ],
                (err, res) => {
                    if (err)
                        throw err;
                    console.log('Department added');
                    promptUser();
                })
        });
}


function addRole() {
    db.query("SELECT * FROM department", (err, res) => {
        if (err)
            throw err;

        prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Insert name of new role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Whats the role salary',
            },
            {
                type: 'list',
                name: 'depID',
                message: 'Select department ID',
                choices: res.map(department => department.name)
            }
        ]).then(data => {
            const depID = res.find(department => department.name === data.depID)
            console.log(depID)
            db.query("INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)", [data.role, depID.id, data.salary],
                err => {
                    if (err)
                        throw err;

                    console.log("Role added")
                    promptUser();
                })
        })
    });
}

function addEmployee() {
    db.query("SELECT * FROM roles", (err, rolesRes) => {
        if (err)
            throw err;
        db.query("SELECT * FROM employee", (err, employeeRes) => {
            if (err)
                throw err;
            prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Insert first name'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Insert last name'
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: 'Select role ID',
                    choices: rolesRes.map(role => role.title)
                },
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select manager ID',
                    choices: employeeRes.map(employee => employee.first_name + ' ' + employee.last_name)
                },
            ]).then(res => {
                const roleID = rolesRes.find(role => role.title === res.roleID)
                const employeeId = employeeRes.find(employee => (employee.first_name + ' ' + employee.last_name) === res.employeeId)
                db.query("INSERT INTO employee (first_name , last_name, role_id, manager_id)  VALUES (?, ?, ?, ?)",
                    [res.firstName, res.lastName, roleID.id, employeeId.id],

                    (err, res) => {
                        if (err)
                            throw err;
                        console.log('New employee added');
                        promptUser();
                    })
            })
        })
    })
}

function updateEmployeerole() {
    connection.query("SELECT * FROM roles", (err, rolesRes) => {
        if (err)
            throw err;
        connection.query("SELECT * FROM employee", (err, employeeRes) => {
            if (err)
                throw err;
            prompt([
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Select employee you want to update',
                    choices: employeeRes.map(employee => employee.first_name + ' ' + employee.last_name)
                },
                {
                    name: 'roleID',
                    type: 'list',
                    message: 'Select new role ID',
                    choices: rolesRes.map(role => role.title)
                },
            ]).then(res => {
                const roleID = rolesRes.find(role => role.title === res.roleID)
                const employeeId = employeeRes.find(employee => (employee.first_name + ' ' + employee.last_name) === res.employeeId)
                db.query("UPDATE employee SET role_id = ? WHERE id = ? ", [roleID.id, employeeId.id],
                    (err, res) => {
                        if (err)
                            throw err;
                        console.log('Role updated');
                        promptUser();
                    })
            })
        })
    })
}


startApp()