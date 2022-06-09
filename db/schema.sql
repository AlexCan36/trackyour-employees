drop database if exists employees;

create database employees;

use employees;

create table department (
    id int unsigned auto_increment primary key,
    name varchar (30) unique not null
);

create table roles (
    id int unsigned auto_increment primary key,
    title varchar (30) unique not null,
    salary decimal unsigned not null,
    department_id int unsigned not null,
    constraint foreignkey_dep foreign key (department_id) references department (id) on delete cascade  
);

 create table employee (
    id int unsigned auto_increment primary key,
    first_name varchar (30) not null,
    last_name varchar (30) not null,
     role_id int unsigned not null,
    constraint foreignkey_role foreign key (role_id) references roles (id) on delete cascade , 
    manager_id int unsigned,
     constraint foreignkey_manager foreign key (manager_id) references employee (id) on delete cascade
 );




