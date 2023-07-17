INSERT INTO department (department_name)
VALUES
('kage'),
('Advisor'),
('Village Elders'),
('Jonin Council'),
('Anbu'),
('Youth'),
('Akutski');

INSERT INTO role (title, salary, department_id)
VALUES
('Hokage', 200000.00, 1),
('Kazekage', 200000.00, 1),
('Raikage', 200000.00, 1),
('Hokages Assistant', 120000.00, 2),
('Elder Chairman', 150000.00, 3),
('Former Kage', 175000.00, 3),
('Jonin', 80000.00, 4),
('Instructor', 70000.00, 4),
('Anbu Director', 100000.00, 5),
('Black Ops', 90000.00, 5),
('Chunin', 60000.00, 6),
('Genin', 40000.00, 6),
('Rogue Ninja', 100000.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kakashi', 'Hatake', 6, 12), 
('Sasuke', 'Uchiha', 10, 3),
 ('Naruto', 'Uzumaki', 1, NULL),
 ('Darui','Gobetsu', 3, NULL),
 ('Itachi', 'Uchiha', 10, 18),
 ('Jiraiya', 'The Gallant', 5, 13),
 ('Minato', 'Namikaze', 6, 6),
 ('Orochimaru','The Snake', 13, NULL),
 ('Madara', 'Uchiha', 13, NULL),
 ('Gaara','Of The Sand', 2, NULL),
 ('Obito', 'Uchiha', 13, 9),
 ('Hiruzen', 'Sarutobi', 6, 17),
 ('Tsunade', 'Senju', 6, NULL),
 ('Hashirama', 'Senju', 6, NULL),
 ('Might', 'Guy', 7, 12),
 ('Shikamaru', 'Nara', 4, 3),
 ('Tobirama', 'Senju', 6, 14),
 ('Nagato','Pain', 13, NULL),
('Asuma', 'Sarutobi', 8, 12),
 ('Rock', 'Lee', 11, 15),
 ('Sai', 'Yamanaka', 9, 3),
 ('boruto', 'Uzamaki', 12, 2);
--  ('Hinata', 'Hyuga', 7, 3),
--  ('Sasori', 'Of The Sand' 13, 18),
--  


