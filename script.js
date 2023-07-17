// bringing in inquirer package
const inquirer = require("inquirer");

// get the client
const mysql = require("mysql2");
// to add header illustration
// const cfonts = require("cfonts");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ch2nch2lla!",
  database: "employeeList_db",
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database!");
  // start the application
  start();
});

// Function to start CFONT
// cfonts.say("Joshua Vaneps \nEmployee Tracker", {
//   font: "block",
//   align: "left",
//   colors: ["red"],
//   background: "transparent",
//   letterSpacing: 1,
//   lineHeight: 1,
//   space: true,
//   maxLength: "0",
//   gradient: false,
//   independentGradient: false,
//   transitionGradient: false,
//   env: "node",
// });

// function to run inquirer
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "what would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      // switch case to run each function based on the answers given
      switch (answer.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("Goodbye!");
          break;
      }
    });
}

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message:
        "what is the name of the department you would like to add?(max: 30 characters)",
    })
    .then((answer) => {
      const query = `INSERT INTO department (department_name) VALUES ('${answer.name}')`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log(`Added department ${answer.name} to the database!`);
        start();
      });
    });
}

function addRole() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary of the new role:",
        },
        {
          type: "list",
          name: "department",
          message: "Select the department for the new role:",
          choices: res.map((department) => department.department_name),
        },
      ])
      .then((answers) => {
        const department = res.find(
          (department) => department.name === answers.department
        );
        const query = "INSERT INTO role SET ?";
        connection.query(
          query,
          {
            title: answers.title,
            salary: answers.salary,
            department_id: department,
          },
          (err, res) => {
            if (err) throw err;
            console.log(
              `Added role ${answers.title} with salary ${answers.salary} to the ${answers.department} department in the database!`
            );
            // restart the application
            start();
          }
        );
      });
  });
}

function addEmployee() {
  // Retrieve list of roles from the database
  connection.query("SELECT id, title FROM role", (error, results) => {
    if (error) {
      console.error(error);
      return;
    }

    const role = results.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    // Retrieve list of employees from the database to use as managers
    connection.query(
      'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
      (error, results) => {
        if (error) {
          console.error(error);
          return;
        }

        const managers = results.map(({ id, name }) => ({
          name,
          value: id,
        }));

        // Prompt the user for employee information
        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "Enter the employee's first name:",
            },
            {
              type: "input",
              name: "lastName",
              message: "Enter the employee's last name:",
            },
            {
              type: "list",
              name: "roleId",
              message: "Select the employee role:",
              choices: role,
            },
            {
              type: "list",
              name: "managerId",
              message: "Select the employee manager:",
              choices: [{ name: "None", value: null }, ...managers],
            },
          ])
          .then((answers) => {
            // Insert the employee into the database
            const sql =
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            const values = [
              answers.firstName,
              answers.lastName,
              answers.roleId,
              answers.managerId,
            ];
            connection.query(sql, values, (error) => {
              if (error) {
                console.error(error);
                return;
              }

              console.log("Employee added successfully");
              start();
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  });
}

function updateEmployeeRole() {
  const queryEmployee =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";
  const queryRole = "SELECT * FROM role";
  connection.query(queryEmployee, (err, resEmployee) => {
    if (err) throw err;
    connection.query(queryRole, (err, resRole) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select the employee to update:",
            choices: resEmployee.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
          },
          {
            type: "list",
            name: "role",
            message: "Select the new role:",
            choices: resRole.map((role) => role.title),
          },
        ])
        .then((answers) => {
          const employee = resEmployee.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );
          const role = resRole.find((role) => role.title === answers.role);
          const query = "UPDATE employee SET role_id = ? WHERE id = ?";
          connection.query(query, [role.id, employee.id], (err, res) => {
            if (err) throw err;
            console.log(
              `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
            );
            // restart the application
            start();
          });
        });
    });
  });
}

// close the connection when the application exits
process.on("exit", () => {
  connection.end();
});
