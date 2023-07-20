const inquirer = require("inquirer");
const db = require("./connection");
const cTable = require("console.table");

function run() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "makeChoice",
        message: "Choose and Option",
        choices: [
          "View All Employees",
          "View Employee Roles",
          "Add Employee",
          "Update Employee Roles",
          "Add Role",
          "View Departments",
          "Add Departments",
          "Quit",
        ],
      },
    ])
    .then(({ makeChoice }) => {
      if (makeChoice === "View All Employees") {
        viewEmp();
      } else if (makeChoice === "View Employee Roles") {
        viewRole();
      } else if (makeChoice === "Add Employee") {
        addEmp();
      } else if (makeChoice === "Update Employee Roles") {
        updateRole();
      } else if (makeChoice === "Add Role") {
        addRole();
      } else if (makeChoice === "View Departments") {
        viewDept();
      } else if (makeChoice === "Add Departments") {
        addDept();
      } else if (makeChoice === "Quit") {
        quit();
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Uh Oh! Looks like something went wrong =(");
    });
}

const viewEmp = () => {
  db.query(
    'SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employees e INNER JOIN roles r ON e.role_id = r.id INNER JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      run();
    }
  );
};

const viewRole = () => {
  db.query(
    `SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department FROM roles JOIN departments ON roles.department_id = departments.id`,
    (err, res) => {
      console.table(res);
      run();
    }
  );
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Input first name of new Employee.",
      },
      {
        type: "input",
        name: "lastName",
        message: "Input last name of new Employee.",
      },
    ])
    .then((answer) => {
      const empFirstName = answer.firstName;
      const empLastName = answer.lastName;
      db.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              type: "list",
              name: "empRole",
              message: "Input role of new Employee.",
              choices: res.map((role) => role.title),
            },
          ])
          .then((answer) => {
            const selectedRole = res.find(
              (role) => role.title === answer.empRole
            );
            db.query("SELECT * FROM employees", (err, res) => {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "empManager",
                    message: "Input manager of new Employee.",
                    choices: res.map(
                      (emp) => emp.first_name + " " + emp.last_name
                    ),
                  },
                ])
                .then((answer) => {
                  const selectedEmp = res.find(
                    (emp) =>
                      emp.first_name + " " + emp.last_name === answer.empManager
                  );
                  db.query(
                    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                    [
                      empFirstName,
                      empLastName,
                      selectedRole.id,
                      selectedEmp.id,
                    ],
                    (err, res) => {
                      if (err) throw err;
                      else {
                        console.log("Employee added!");
                      }
                      run();
                    }
                  );
                });
            });
          });
      });
    });
};

const updateRole = () => {
  db.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectEmp",
          message: "Select employee that is changing role.",
          choices: res.map((emp) => emp.first_name + " " + emp.last_name),
        },
      ])
      .then((answer) => {
        const selectedEmp = res.find(
          (emp) => emp.first_name + " " + emp.last_name === answer.selectEmp
        );
        db.query("SELECT * FROM roles", (err, res) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "list",
                name: "newRole",
                message: "Select new employee role.",
                choices: res.map((role) => role.title),
              },
            ])
            .then((answer) => {
              const selectedRole = res.find(
                (role) => role.title == answer.newRole
              );
              db.query(
                "UPDATE employees SET role_id = ? WHERE id=?",
                [selectedRole.id, selectedEmp.id],
                (err, res) => {
                  if (err) throw err;
                  else {
                    console.log("Employee role has been updated!");
                  }
                  run();
                }
              );
            });
        });
      });
  });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Input name of new Role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Add the salary for this Role",
      },
    ])
    .then((answer) => {
      const roleName = answer.roleName;
      const roleSalary = answer.roleSalary;
      db.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleDept",
              message: "Specify dept. that this role belongs to.",
              choices: res.map((departments) => departments.dept_name),
            },
          ])
          .then((answer) => {
            const selectedDept = res.find(
              (departments) => departments.dept_name === answer.roleDept
            );
            db.query(
              "INSERT INTO roles (title, department_id, salary) VALUES(?,?,?)",
              [roleName, selectedDept.id, roleSalary],
              (err, res) => {
                if (err) throw err;
                else {
                  console.log("Role added!");
                }
                run();
              }
            );
          });
      });
    });
};

const viewDept = () => {
  db.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    run();
  });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "Input name of new Department",
      },
    ])
    .then((answer) => {
      const deptName = answer.deptName;
      db.query(
        "INSERT INTO departments (dept_name) VALUES (?)",
        [deptName],
        (err, res) => {
          if (err) throw err;
          else {
            console.log("Department added!");
          }
          run();
        }
      );
    });
};

const quit = () => {
  console.log("Exiting the application...");
  process.exit();
};

module.exports = run;
