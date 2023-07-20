# Staff-Base
Project 12 SQL: Employee Database

## Project Description
Staff-Base is a tool designed to interact with and manager an employee database stored in MySQL. Utilizing intuitive CLI powered by Inquirer.js, users can easily perform various operations related to the management of employees.

# Key Functions
1. View Employees
2. View Employee Roles
3. Add New Employees
4. Change Employee Roles
5. View Departments
6. Add Departments

## Built With
- Node.js
- Inquirer
- Console.table
- MySQL
- Figlet

## Getting Started

To get a local copy running, follow the steps below!

### Installation

- Clone the repo
  ```sh
  git clone git@github.com:IlirHajdari/Staff-Base.git
  ```
- Install NPM packages
  ```sh
  npm i
  ```
- Create database in MySQL
  ```sh
  mysql -u root -p
  ```
  ```sh
  source ./db/schema.sql
  ```
- Add seed data to the database
  ```sh
  souce ./db/seeds.sql
  ```
  - Make sure to change the `user:` and the `password:` in the `connection.js` file to whatever your personal information is for your MySQL database or you wont be able to connect.

  ## DEMO
  Here is a demo of the finished application

https://github.com/IlirHajdari/Staff-Base/assets/19784799/0efefe9b-3e05-4af7-83de-7b17e5209d1f

## Contact Info

If you have any questions, reach out to me below:
- Email: ilir.hajdari111@gmail.com
  
