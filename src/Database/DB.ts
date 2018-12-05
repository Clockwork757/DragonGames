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

    login(username: string, password: string) {
        var q = `SELECT username FROM users WHERE username = $1::text AND hpassword = $2::text`;
        var self = this;
        con.query(q, [username, password], (err: Error, res: QueryResult) => {
            if (err) {
                console.log(err);
            }
            else {
                if (res.rowCount > 0)
                    self.emit('loggedin:' + username, true);
                else
                    self.emit('loggedin:' + username, false);
            }
        }
        );
    }
}

export var DB = new _DB();