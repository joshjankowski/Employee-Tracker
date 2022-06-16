INSERT INTO department (id, name)
VALUES (1, "Retail"),
       (2, "Operations"),
       (3, "Executive Management"),
       (4, "Back Office");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "CEO", 500000.00, 3),
       (2, "Teller", 25000.50, 1),
       (3, "MOA", 90000.45, 2),
       (4, "Underwriter", 65235.50, 4),
       (5, "Banker", 55500.00, 1),
       (6, "Branch Manager", 95000.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, null),
       (2, "Plane", "Jane", 3, 1),
       (3, "RuPaul", "Charles", 5, 4),
       (4, "Britney", "Spears", 6, 1),
       (5, "Ashley", "Tisdale", 5, 4),
       (6, "Haley", "Hilton", 4, 7),
       (7, "Amy", "Shumer", 3, 1)