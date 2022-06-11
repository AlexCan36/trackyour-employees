const { prompt } = require('inquirer')
const logo = require('asciiart-logo')
const connected = require('./db/connection')
const { changeUser } = require('./db/connection')

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

function viewAllDep(){
    //write code to display all the departments from the db
}

function viewAllRoles(){
    //write code to display all the departments from the db
}

function viewAllEmployees(){

}

function addDep(){
     
}

function addRole(){

}

function addEmployee(){
    
}

function addEmployeeRole(){
    
}