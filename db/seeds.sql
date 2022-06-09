INSERT into department(name)
VALUES ('Engineer') , ('Human Resources');

INSERT into roles(title,salary,department_id)
VALUES ('Engineer', 80000, 1) , ('Recruiter', 40000, 2);

INSERT into employee(first_name, last_name, role_id, manager_id)
VALUES ('Alex', 'Canez' , 1, null) , ('Karen', 'Ortiz', 2, null) , ('Ryan', 'Sanchez', 1 , 1);

