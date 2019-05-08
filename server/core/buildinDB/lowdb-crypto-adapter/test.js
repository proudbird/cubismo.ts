const low = require('lowdb');
const CryptoAdapter = require('./adapter');
let adapter;
try {
    adapter = new CryptoAdapter('my.db', 'PASSWORD');
}
catch (error) {
    console.log("Maybe wrong password?");
}
const db = low(adapter);
db.defaults({ users: [] })
    .write();
db.get('users')
    .push({ id: 1, name: 'Boss' })
    .write();
const user = db.get('users');
console.log(user.name);
//# sourceMappingURL=test.js.map