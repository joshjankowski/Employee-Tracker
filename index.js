const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },);


const firstQuestion = {
    type: 'list',
    message: 'Please select what you would like to do:',
    name: 'choice',
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
}
const department = {
    type: 'input',
    message: 'Enter Department Name:',
    name: 'department',
}
// async function getDepartment() {
//     const sql = "SELECT name FROM department";
//     db.query(sql, (err, results) => {
//         db.end(function(err) {
//             if (err) {
//             }
//           }); 
//     return results;
//     })
// }

// console.log(getDepartment(), "DEPARTMENTS")

function viewDepartments() {
    const sql = "SELECT name FROM department";
    db.query(sql, (err, results) => {
        db.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
          }); 
        //   console.log(results)
          let department = results.forEach(e => console.log(e));
          console.log(department)      
    })
}

viewDepartments()
// let departmentChoices = []
// departmentChoices.push(viewDepartments())
// console.log(viewDepartments())

const role = [{
    type: 'input',
    message: 'Enter Title of Role:',
    name: 'title',
},
{
    type: 'input',
    message: 'Enter Salary for the Role:',
    name: 'salary',
},
{
    type: 'list',
    message: 'Select the Department for the Role:',
    name: 'department',
    choices: ["department", "Choices"]
}]

function addDepartment(d) {
    const string = JSON.stringify(d);
    const sql = `INSERT INTO department (name) VALUES (${string})`;
    db.query(sql, (err, results) => {
        db.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log("1 Department Added")
          }); 
    })

}

function addRole(t, s, d) {
    const title = JSON.stringify(t);
    const salary = JSON.stringify(s);
    const department = JSON.stringify(d);
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (${title}, ${salary}, ${department})`;
    db.query(sql, (err, results) => {
        db.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log("1 Role Added")
          }); 
    })
}

async function startApp() {
    inquirer.prompt(firstQuestion).then((response) => {
        if (response.choice == "View All Departments") {
            const viewAllDepartments = () => {
                const sql = "SELECT id, name FROM department";
                db.query(sql, (err, results) => {
                    console.table(results)
                    db.end(function(err) {
                        if (err) {
                          return console.log('error:' + err.message);
                        }
                      }); 
                })
            }
            viewAllDepartments();
            //THEN I am presented with a formatted table showing department names and department ids
        } else if (response.choice == "View All Roles") {
            const viewAllRoles = () => {
                const sql = "SELECT id, title, salary, department_id FROM role";
                db.query(sql, (err, results) => {
                    console.table(results)
                    db.end(function(err) {
                        if (err) {
                          return console.log('error:' + err.message);
                        }
                      }); 
                })
            }
            viewAllRoles();
            //THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        } else if (response.choice == "View All Employees") {
            const viewAllEmployees = () => {
                const sql = "SELECT id, first_name, last_name, role_id, manager_id FROM employee";
                db.query(sql, (err, results) => {
                    console.table(results)
                    db.end(function(err) {
                        if (err) {
                          return console.log('error:' + err.message);
                        }
                      }); 
                })
            }
            viewAllEmployees();
            //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        } else if (response.choice == "Add a Department") {
            inquirer.prompt(department).then((response) => {
                console.log("Department:", response.department)
            addDepartment(response.department);})
            //THEN I am prompted to enter the name of the department and that department is added to the database
        } else if (response.choice == "Add a Role") {
            inquirer.prompt(role).then((response) => {
                console.log("Title:", response.title)
                console.log("Salary:", response.salary)
                console.log("Department:", response.department)
            addRole(response.title, response.salary, response.department);})
            //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        } else if (response.choice == "Add an Employee") {
            //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        } else if (response.choice == "Update an Employee Role") {
            //THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
        }
    }

 
  );
}

// startApp()
