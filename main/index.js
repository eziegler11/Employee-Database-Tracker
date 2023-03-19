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

function init() {
	inquirer.prompt(prompts).then((response) => {
		console.log(response.start);

		switch (response.start) {
			case 'View All Employees':
                // left join and inner join
				init();
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
                var sql = `SELECT roles.id, title, name AS department, salary, FROM roles
                INNER JOIN department
                ON roles.department_id = department.id
                
                ;`;
				db.query(sql, (err, result) => {
					if (err) {
						console.log('****');
						console.log(err);
						process.exit();
					}
					console.table(result);
                    init();
				});
				break;
			case 'Add Role':
				//create a function for inquirer to prompt user about role
				init();
				break;
			case 'View All Departments':
				var sql = 'select * from department;';
				db.query(sql, (err, result) => {
					if (err) {
						console.log('****');
						console.log(err);
						process.exit();
					}
					console.table(result);
                    init();
				});
				break;
			case 'Add Department':
				break;
			case 'Quit':
				process.exit();
		}
	});
}

init();
