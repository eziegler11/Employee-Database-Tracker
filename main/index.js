// Things to do still:
    // How to show the departments that the user created appear in prompts?
    // Converting newly created department names into ID's for addRole Function
    // Need to figure out how to connect PK + FK in employee table
    // Add employee


// Required Dependencies
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'Elke!12162020',
		database: 'employee_db',
	},
	console.log(`Connected to the employee database.`)
);

// Inquirer Prompts for Initial/Main User Navigation
const prompts = [
	{
		type: 'list',
		message: 'What would you like to do?',
		name: 'start',
		choices: [
			'View All Employees',
			'Add Employee',
			'Update Employee Role',
			'View All Roles',
			'Add Role',
			'View All Departments',
			'Add Department',
			'Quit',
		],
	},
];

// Inquirer Prompt for Adding a New Department
const newDepartment = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'newDepartment',
    },
];

// Adding a new department to the department table
function addDepartment() {
    // Prompts the user for their response
    inquirer.prompt(newDepartment).then((response) => {
        // Logs their response to the console
        console.log(`Added ${response.newDepartment} to the database`);
        // SQL language to add the users response into the department table
        const sql = `INSERT INTO department (name) VALUES ("${response.newDepartment}");`;
        // Queries SQL using above line of code to actually make the new row
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                process.exit();
            }
            // Sends user back to initial/main prompts
            init();
        });
    });
};

// Inquirer Prompt for Adding a New Role
const newRole = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'newRole',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'department',
        choices: [
            'Sales',
            'Engineering',
            'Finance',
            'Legal'
        ] // How to show the departments that the user created appear here?
    },
];

// Adding a new role to the roles table
function addRole() {
    // Prompts the user for their response
    inquirer.prompt(newRole).then((response) => {
        // Logs their response to the console
        console.log(`Added ${response.department} to the database`);
        // SQL language to add the users response into the department table
        const sql = `INSERT INTO department (name) VALUES ("${response.newDepartment}");

        INSERT INTO roles (title, salary, department_id)
        VALUES ("${response.newRole}", "${response.salary}", ${response.department});`;
        // Queries SQL using above line of code to actually make the new row
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                process.exit();
            }
            // Sends user back to initial/main prompts
            init();
        });
    });
};


function init() {
	inquirer.prompt(prompts).then((response) => {
		console.log(response.start);

		switch (response.start) {
			case 'View All Employees':
                var sql = `SELECT employee.id, first_name, last_name, title, name AS department, salary, manager_id AS manager FROM employee INNER JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON
                department.id = roles.department_id
                

                
                ;`;
                // Need to figure out how to connect PK + FK in employee table
				db.query(sql, (err, result) => {
					if (err) {
						console.log(err);
						process.exit();
					}
					console.table(result);
                    init();
				});
				break;

			case 'Add Employee':
                // another function with inquirer
                // inquirer will receive employee name, etc

                // select on roles and change that into a list in inquirer, list of different roles
                // whatever role the user selects, change it back into role id

                // select an employee name for manager name or select none (no manager)
                // convert manager name into employee id, insert at line 59

// having problems showing different roles for new employee - slack



                // INSERT INTO employee (first_name, last_name, role_id, manager_id)
                // VALUES ("John", "Doe", 1, NULL),
                // 
				init();
				break;

			case 'Update Employee Role':
				init();
				break;

			case 'View All Roles':
                var sql = `SELECT roles.id, title, name AS department, salary FROM roles
                INNER JOIN department
                ON roles.department_id = department.id;`;
				db.query(sql, (err, result) => {
					if (err) {
						console.log(err);
						process.exit();
					}
					console.table(result);
                    init();
				});
				break;

			case 'Add Role':
                addRole();
				break;

			case 'View All Departments':
				var sql = 'SELECT * FROM department;';
				db.query(sql, (err, result) => {
					if (err) {
						console.log(err);
						process.exit();
					}
					console.table(result);
                    init();
				});
				break;

			case 'Add Department':
                addDepartment()
				break;

			case 'Quit':
				process.exit();
		}
	});
}

init();