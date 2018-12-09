CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (20) UNIQUE NOT NULL,
    hpassword VARCHAR (100) NOT NULL,
    avatar VARCHAR (100) DEFAULT 'default.jpg',
    bio VARCHAR (500),
    email VARCHAR (50),
    experience INT DEFAULT 0
);
CREATE TABLE playedGames (
    id SERIAL PRIMARY KEY,
    /* Just a game type string, e.g. "Chess" or "Tic Tac Toe" */
    gtype VARCHAR (10),
    p1 VARCHAR (20) REFERENCES users(username),
    p2 VARCHAR (20) REFERENCES users(username),
    winner VARCHAR (1),
);
CREATE TABLE savedGames (
    id SERIAL PRIMARY KEY,
    gtype VARCHAR(20),
    p1 VARCHAR (20) REFERENCES users(username),
    p2 VARCHAR (20) REFERENCES users(username),
    gstate VARCHAR(1000),
);
CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    username VARCHAR (20) REFERENCES users(username),
    friend VARCHAR (20) REFERENCES users(username),
    unique(userID, friend)
);
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    username VARCHAR (20) REFERENCES users(username),
    opponent VARCHAR (20) REFERENCES users(username),
    gtype VARCHAR (10)
);