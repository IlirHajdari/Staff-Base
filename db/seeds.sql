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
('GrandMaster', 'Yoda', 4, NULL),
('Mace', 'Windu', 2, NULL),
('Darth', 'Maul', 6, NULL),
('Anakin', 'Skywalker', 3, 1),
('Cpt.', 'Rex', 1, 2),
('Leia', 'Organa', 5, 3);