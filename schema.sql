CREATE TABLE users
(
    uid INT
    AUTO_INCREMENT KEY,
    username VARCHAR
    (20),
    hpassword VARCHAR
    (20),
    avafile FILESTREAM,
    bio VARCHAR
    (500),
    email VARCHAR
    (50),
    experience INT,
);