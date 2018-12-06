CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (20) UNIQUE NOT NULL,
    hpassword VARCHAR (100) NOT NULL,
    avatar VARCHAR (100) DEFAULT 'default.jpg',
    bio VARCHAR (500),
    email VARCHAR (50),
    experience INT DEFAULT 0
);CREATE TABLE playedGames (
    id SERIAL,
    /* Just a game type string, e.g. "Chess" or "Tic Tac Toe" */
    gtype VARCHAR (10),
    p1 INT REFERENCES users(id),
    p2 INT REFERENCES users(id),
    winner VARCHAR (1),
    unique(p1, p2)
);CREATE TABLE savedGames (
    id SERIAL,
    gtype VARCHAR(20),
    p1 INT REFERENCES users(id),
    p2 INT REFERENCES users(id),
    gstate VARCHAR(1000),
    unique(p1, p2)
);CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    userID INT REFERENCES users(id),
    friend INT REFERENCES users(id),
    unique(userID, friend)
);