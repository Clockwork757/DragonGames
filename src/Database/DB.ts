import { EventEmitter } from "events";
import { Pool, QueryResult } from "pg";

function autoEscape(target: Function) {
    for (const propertyName of Object.keys(target.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        if (descriptor == null) {
            continue;
        }
        const isMethod = descriptor.value instanceof Function;
        if (!isMethod)
            continue;

        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            var escaped_args: string[] = [];
            args.forEach(arg => {
                escaped_args.push(escape(arg));
            });
            return originalMethod(...escaped_args);
        };

        Object.defineProperty(target.prototype, propertyName, descriptor);
    }
}

const con: Pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

con.connect();

@autoEscape
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
                if (res.rowCount == 1)
                    self.emit('login:' + username, { hpassword: res.rows[0]['hpassword'], avatar: res.rows[0]['avatar'] });
                else
                    self.emit('login:' + username, {});
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
                    self.emit('userInfo:' + username, { avatar: res.rows[0]['avatar'], username: res.rows[0]['username']});
                else
                    self.emit('userInfo:' + username, {});
            }
        }
        );
    }
}

export const DB = new _DB();