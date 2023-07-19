DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

DROP TABLE IF EXISTS
    departments, 
    roles, 
    employees;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    dept_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title     VARCHAR(50) NOT NULL,
    department_id INT     NOT NULL,
    salary        INT     NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE employees (
  id   INT AUTO_INCREMENT   NOT NULL,
  first_name  VARCHAR(15)   NOT NULL,
  last_name   VARCHAR(20)   NOT NULL,
  role_id     INT           NOT NULL,
  manager_id  INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles (id),
  FOREIGN KEY (manager_id) REFERENCES employees (id)
);