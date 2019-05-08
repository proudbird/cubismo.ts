import lowdb from "lowdb";
import adapter from "lowdb-crypto-adapter";

export default function Test() {
    let utils = Utils;
    //console.log(new utils("test"));
    let f = new utils("first");
    let s = new utils("second");
    let t = new utils("third");
    // console.log(t.name);
    // console.log(s.name);
    //console.log(f.name);
     s.hi();
}

function Utils(name) {
  const privates: any = {};
  privates.name = name;

  Object.defineProperty(this, "name", {
    enumerable: true,
    get() {
      return privates.name;
    },
    set(value) {
      privates.name = value;
    }
  })

  this.hi = function() {
    _hi(this, privates);
  }

}

function _hi(self, privates) {
  console.log(privates.name);
  console.log(self.name);
}

async function testCrypto() {

  const SECRET_KEY = "cubismo";
  const DB_FILE = "config"

  const t = adapter as any;
  const db = await lowdb(new t(DB_FILE, SECRET_KEY));

  db.get('users')
  .push({ id: 1, username: 'admin'})
  .write()

    db.defaults({ users: [] })
    .write()

    db.get('users')
      .push({ id: 2, username: 'admin2'})
      .write()

  const user = db.get('users')
  .find({ id: 1 })
  .value() as any;

  Logger.info(user.username)
}