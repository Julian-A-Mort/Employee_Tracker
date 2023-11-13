INSERT INTO department (id, name) VALUES (1, 'Management');
INSERT INTO department (id, name) VALUES (2, 'Bar');
INSERT INTO department (id, name) VALUES (3, 'Kitchen');

INSERT INTO role (id, title, salary, department_id) VALUES (1, 'Manager', 90000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'Bartender', 60000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Chef', 55000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'Geoff', 'Goldblum', 1, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Mort', 'Mortimer', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3,'Sally', 'Sadface', 3, 1);