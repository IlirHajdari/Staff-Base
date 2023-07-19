USE employees_db

INSERT INTO departments (dept_name)
VALUES
('Marketing'),
('Human Resources'),
('Development');

INSERT INTO roles (title, department_id, salary)
VALUES
('Staff', 1, 50000),
('Marketing Manager', 1, 75000),
('Software Engineer', 3, 70000),
('Senior Engineer', 3, 90000),
('Human Resources', 2, 50000),
('Operations Specialist', 2, 80000);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Wick', 4, NULL),
('Itachi', 'Uchiha', 2, NULL),
('Hans', 'Solo', 6, NULL),
('Percy', 'Jackson', 3, 1),
('Randy', 'Savage', 1, 2),
('Cloud', 'Strife', 5, 3);