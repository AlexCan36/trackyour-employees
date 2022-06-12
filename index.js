const { prompt } = require('inquirer')
const logo = require('asciiart-logo')
const db = require('./db/connection')
const connection = require('./db/connection')

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
            'view all departments', 'view all roles', 'view all employees', 'add  department', 'add role', 'add  employee', 'update an employee role'
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
    // inquirer.prompt(
    //     {
    //         type: 'input',
    //         name: 'department',
    //         message: 'Add new department',
    //     })
    //     .then(res => {
    //     db.query("INSERT INTO department SET?",
    //         {
    //             dep_name: res.department
    //         },
    //         (err, res) => {
    //             if (err)
    //             throw err;
    //             console.log('Department added');
    //             promptUser();
    //         })
    // });
}


function addRole() {
    // db.query("SELECT * FROM department", (err, res) => {
    //     if (err)
    //         throw err;
    //     inquirer.prompt([
    //         {
    //             type: 'input',
    //             name: 'role',
    //             message: 'Insert name of new role',
    //         },
    //         {
    //             type: 'input',
    //             name: 'salary',
    //             message: 'Whats the role salary',
    //         },
    //         {
    //             type: 'list',
    //             name: 'depID',
    //             message: 'Select department ID',
    //             res.map(department = > department.dep_name)
    //         }
    //     ]).then(data => {
    //         const depID = res.find(department => department.dep_name = data.depID)
    //         db.query("INSERT INTO role_table SET", {
    //             title: data.role, salary: salary.role, department_id: depID.id
    //         },
    //             err => {
    //                 if (err)
    //                     throw err;

    //                 console.log("Role added")
    //                 promptUser();
    //             })
    //         })
    // });
}

function addEmployee() {
    // inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'firstName',
    //         message: 'Insert new employee first name'
    //     },
    //     {
    //         type: 'input',
    //         name: 'lastName',
    //         message: 'Insert new employee last name'
    //     },
    //     {
    //         type: 'input',
    //         name: 'roleID',
    //         message: 'Insert new employee ID'
    //     },
    //     {
    //         type: 'input',
    //         name: 'managerID',
    //         message: 'Insert new manager ID'
    //     }
    // ])
    //     .then(res => {
    //         db.query("INSERT INTO employees SET",
    //             {
    //                 firstName: res.firstName,
    //                 last_name: res.lastName,
    //                 role_id: res.roleID,
    //                 manager_id: res.managerID,
    //             },
    //             (err, res) => {
    //                 if (err)
    //                     throw err;
    //                 console.log('New employee added');
    //                 promptUser();
    //             }
    //     });
}

function addEmployeeRole() {

}

startApp()