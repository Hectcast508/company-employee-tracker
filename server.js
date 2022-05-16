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
        sql = `SELECT * FROM employees`;
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
        return;
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

promptHandler();