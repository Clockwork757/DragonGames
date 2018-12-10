import { EventEmitter } from "events";
import { Pool, QueryResult } from "pg";

const con: Pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

con.connect();

class _DB extends EventEmitter {
    constructor() {
        super();
    }

    login(username: string) {
        var q = `SELECT hpassword, avatar FROM users WHERE username = $1::text`;
        var self = this;
        con.query(q, [username], (err: Error, res: QueryResult) => {
            if (err) {
                console.log(err);
            }
            else {
                if (res.rowCount == 1) {
                    self.emit('login:' + username, { hpassword: res.rows[0]['hpassword'], avatar: res.rows[0]['avatar'] });
                }
                else {
                    self.emit('login:' + username, false);
                }
            }
        }
        );
    }

    signup(username: string, password: string) {
        var q = `INSERT INTO users(username, hpassword) VALUES($1::text, $2::text)`;
        var self = this;
        con.query(q, [username, password], (err: Error, res: QueryResult) => {
            if (err) {
                console.log(err);
                self.emit('signup:' + username, false);
            }
            else {
                self.emit('signup:' + username, true);
            }
        })
    }

    getUserInfo(username: string) {
        var q = `SELECT avatar,username FROM users WHERE username = $1::text`;
        var self = this;
        con.query(q, [username], (err: Error, res: QueryResult) => {
            if (err) {
                console.log(err);
            }
            else {
                if (res.rowCount == 1)
                    self.emit('userInfo:' + username, { avatar: res.rows[0]['avatar'], username: res.rows[0]['username'] });
                else
                    self.emit('userInfo:' + username, {});
            }
        }
        );
    }

    getChallenges(username: string) {
        var q = `SELECT id, username, gtype from challenges WHERE opponent = $1::text`
        var self = this;
        con.query(q, [username], (err: Error, res: QueryResult) => {
            if (err) {
                console.log(err);
                self.emit('getChalllenges:' + username, false);
            }
            else {
                if (res.rowCount > 0) {
                    var r = new Array();
                    res.rows.forEach(row => {
                        r.push({ opponent: row['username'], gtype: row['gtype'], id: row['id'] });
                    });
                    self.emit('getChalllenges:' + username, r);
                }
                else {
                    self.emit('getChalllenges:' + username, false);
                }
            }
        }
        );
    }

    challenge(username: string, opponent: string, game: string) {
        var q = `INSERT INTO challenges (username, opponent, gType) VALUES ($1::text, $2::text, $3::text)`
        var self = this;
        con.query(q, [username, opponent, game], (err: Error, res: QueryResult) => {
            if (err) {
                console.log(err);
                self.emit('challenge:' + username + opponent + game, false);
            } else {
                self.emit('challenge:' + username + opponent + game, true);
            }
        }
        );
    }


}

export const DB = new _DB();