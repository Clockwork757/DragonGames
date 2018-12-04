CREATE TABLE users
(
    uid INT
    AUTO_INCREMENT key,
    username VARCHAR
    (20),
    hpassword VARCHAR
    (20),
    avafile VARCHAR
    (100),
    bio VARCHAR
    (500),
    email VARCHAR
    (50),
    experience INT,
);

    CREATE TABLE playedGames
    (
        gid INT
        AUTO_INCREMENT key,
    gtype VARCHAR
        (10),
    p1 VARCHAR
        (20),
    p2 VARCHAR
        (20),
    winner VARCHAR
        (1),
);

        CREATE TABLE savedGames
        (
            gid INT,
            gtype VARCHAR(20),
            p1 VARCHAR
        (20),
            p2 VARCHAR
        (20),
            gstate,
        );

        CREATE TABLE friends
        (
            fsid INT
            AUTO_INCREMENT key,
user VARCHAR
            (20),
friend VARCHAR
            (20),
        ):