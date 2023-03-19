// Things to do still:
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

// View all employees
function viewEmployees() {
    var sql = `SELECT employee.id, first_name, last_name, title, name AS department, salary, manager_id AS manager FROM employee INNER JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON
    department.id = roles.department_id;`;
    // Need to figure out how to connect PK + FK in employee table
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            process.exit();
        }
        console.table(result);
        init();
    });
}

// View all roles
function viewRoles() {
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
}

// Adding a new department to the department table
function addDepartment() {

    // Inquirer Prompt for Adding a New Department
    const newDepartment = [
	    {
		type: 'input',
		message: 'What is the name of the department?',
		name: 'newDepartment',
	    },
    ];

	// Prompts the user for their response
	inquirer.prompt(newDepartment).then((response) => {
		// SQL language to add the users response into the department table
		const sql = `INSERT INTO department (name) VALUES ("${response.newDepartment}");`;
		// Queries SQL using above line of code to actually make the new row
		db.query(sql, (err, result) => {
			if (err) {
				console.log(err);
				process.exit();
			}
            // Logs their response to the console
		    console.log(`Added ${response.newDepartment} to the database`);

			// Sends user back to initial/main prompts
			init();
		});
	});
}


// Adding a new role to the roles table
function addRole() {

    // Shows all departments
	function availableDepartments() {
        // variable to show all in the department table
		let sql = 'SELECT * FROM department';

        // Runs the query
		db.query(sql, async function (err, result) {
            // Throws an error
			if (err) throw err;
            // Iterates through department names & ids and pushes to array
			for (let i = 0; i < result.length; i++) {
				myChoices.push(result[i].name);
				departmentIdName[result[i].name] = result[i].id;
			}
		});
	}

	availableDepartments();

    // Array to store all the departments
	let myChoices = [];
    // Object to store the department ID's
	const departmentIdName = {};

    // Inquirer Prompts for Adding a new role
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
			choices: myChoices,
		},
	];

	// Prompts the user for their response
	inquirer.prompt(newRole).then((response) => {
		const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';

		db.query(sql, [response.newRole, response.salary, departmentIdName[response.department]],
			function (err, result) {
				if (err) {
					console.log(err);
					process.exit();
				}
				console.log(`Added ${response.department} to the database`);

				init();
			}
		);
	});
}

function init() {
	inquirer.prompt(prompts).then((response) => {
		console.log(response.start);

		switch (response.start) {
			case 'View All Employees':
                viewEmployees()
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
                viewRoles()
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
				addDepartment();
				break;

			case 'Quit':
				process.exit();
		}
	});
}

init();
