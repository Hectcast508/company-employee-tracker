INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Mike', 'Chan', 1, 2),
  ('Ashley', 'Rodriguez', 3, 5),
  ('Kevin', 'Tupik', 2, 2),
  ('Kunal', 'Singh', 1, 3),
  ('Malia', 'Brown', 4, 2),
  ('Sarah', 'Lourd', 3, 3),
  ('Tom', 'Allen', 4, 1);

INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

INSERT INTO roles (title, salary)
VALUES
  ('Salesperson', 50000),
  ('Lead Engineer', 80000),
  ('Manager', 90000),
  ('Lawyer', 190000);