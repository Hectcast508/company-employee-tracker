const db = require('./db/connection');
const inquirer = require("inquirer");
const cTable = require("console.table");

db.connect(err => {
  if(err) throw err;
  console.log('Database connected.');
});

function promptHandler () {
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit"
    ]
    }
  ]).then(answers => {
    let sql ='';
    
    switch(answers.choice) {
      case "View all departments":
        sql = `SELECT * FROM department`;
        viewTable(sql);
        break;
      case "View all roles":
        sql = `SELECT * FROM roles`;
        viewTable(sql);
        break;
      case "View all employees":
        sql = `SELECT employees.*, roles.title AS role_title FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;
        viewTable(sql);
        break;
      case "Add a department":
        addDep();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmploy();
        break;
      case "Update an employee role":
        updateEmploy();
        break;
      case "Exit":
        db.end();
    }
  });
};

function viewTable(sql) {
  db.query(sql, (err,rows) => {
    if(err){
      console.log(err);
      return;
    }
    console.info('\n=====================');
    console.table(rows);
    console.info('=====================');
    promptHandler();
  });
  return;
};

function addDep() {
  inquirer.prompt([
    {
      message: "Enter department name.",
      name: "name"
    }
  ])
  .then((answers) => {
    db.query(`INSERT INTO department (name) VALUES (?)`,
      [answers.name],
      (err, results) => {
        promptHandler();
      })
  });
};

function addRole() {
  db.query(`SELECT id AS value, name AS name FROM department`, (err, department) => {
    if (err) console.log(err);
    inquirer.prompt([
      {
        message: "Enter the role.",
        name: "title"
      },
      {
        message: "Enter salary.",
        name: "salary"
      },
      {
        message: "Choose the department",
        type: "list",
        name: "dep",
        choices: department
      },
    ])
    .then((answers) => {
      db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
      [answers.title, answers.salary, answers.dep],
      (err, results) => {
        if (err) console.log(err);
        console.log(answers);
        promptHandler();
      });
    })
  });
};

function addEmploy() {
  db.query(`SELECT id AS value, title AS name FROM roles`, (err, roles) => {
    if (err) console.log(err);
    inquirer.prompt([
      {
        message: "Enter first name.",
        name: "first_name"
      },
      {
        message: "Enter last name.",
        name: "last_name"
      },
      {
        message: "Choose role",
        type: "list",
        name: "role",
        choices: roles
      },
    ])
    .then((answers) => {
      db.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`,
      [answers.first_name, answers.last_name, answers.roles],
      (err, results) => {
        if (err) console.log(err);
        console.log(answers);
        promptHandler();
      });
    })
  });
}

function updateEmploy() {
  var roleResults;
  db.query(`SELECT id AS value, title AS name FROM roles`, (err, roles) => {
    if (err) {
      console.log(err)
      return;
    }
    roleResults = roles;
  });
  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees`, (err, employees) => {
    if (err) console.log(err);
      inquirer.prompt(
        [
          {
            message: 'Choose the employee',
            type: 'list',
            name: 'employees',
            choices: employees
          },
          {
            message: 'Choose the new role',
            type: 'list',
            name: 'role',
            choices: roleResults
          },
        ])
        .then((answers) => {
          var employName = answers.employees.split(' ');
          var employFirstName = employName[0];
          var employLastName = employName[employName.length - 1];

        db.query('UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?',
          [answers.role, employFirstName, employLastName],
          (err, results) => {
            if (err) console.log(err);
              console.log(results);
              promptHandler();
          });
        })
  });
};

promptHandler();