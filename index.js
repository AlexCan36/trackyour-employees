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
            'view all departments', 'view all roles', 'view all employees', 'add department', 'add role', 'add  employee', 'update an employee role'
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
            addEmployeeRole()
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
    connection.query("SELECT first_name, last_name FROM employee", function (err, results) {
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
            db.query("INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)" , [data.role, depID.id, data.salary],
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
    // db.query("SELECT * FROM department", (err, res) => {
    //     if (err)
    //         throw err;
            
    //     prompt([
    //         {
    //             type: 'input',
    //             name: 'first_name',
    //             message: 'Insert name of new role',
    //         },
    //         {
    //             type: 'input',
    //             name: 'last_name',
    //             message: 'Whats the role salary',
    //         },
    //         {
    //             type: 'list',
    //             name: 'role_id',
    //             message: 'Select role ID',
    //             choices: res.map(department => department.name)
    //         },
    //         {
    //             type: 'input',
    //             name: 'manager_id',
    //             message: 'Select manager ID',
    //         }
    //     ]).then(data => {
    //         const depID = res.find(department => department.name === data.depID)
    //         console.log(employee)
    //         db.query("INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)" , [data.role, depID.id, data.salary],
    //             err => {
    //                 if (err)
    //                     throw err;

    //                 console.log("Employee added")
    //                 promptUser();
    //             })
    //     })
    // });
}

function addEmployeeRole() {
    // db.query('SELECT CONCAT(employees.first_name,'', employee.last_name) AS Employee_Name FROM employees;',
    //  const (err, res) {
    //     if (err)
    //         throw err;
    //     for (let i = 0; < res.lenght; i++) {
    //         let name = res(i).Employee_Name;
    //         name.push(name);
    //     }

    //     inquirer.prompt([
    //         {
    //             type: 'list',
    //             name: 'Select employee',
    //             message: ''
    //         }
    //     ])
    // }
}

startApp()