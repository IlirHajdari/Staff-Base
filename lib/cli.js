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

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the new Employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the new Employee?",
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
              message: "What is the role of the new Employee?",
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
                    message: "Who is the manager of the new Employee?",
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
