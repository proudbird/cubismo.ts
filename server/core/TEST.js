"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = __importDefault(require("lowdb"));
const lowdb_crypto_adapter_1 = __importDefault(require("lowdb-crypto-adapter"));
function Test() {
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
exports.default = Test;
function Utils(name) {
    const privates = {};
    privates.name = name;
    Object.defineProperty(this, "name", {
        enumerable: true,
        get() {
            return privates.name;
        },
        set(value) {
            privates.name = value;
        }
    });
    this.hi = function () {
        _hi(this, privates);
    };
}
function _hi(self, privates) {
    console.log(privates.name);
    console.log(self.name);
}
function testCrypto() {
    return __awaiter(this, void 0, void 0, function* () {
        const SECRET_KEY = "cubismo";
        const DB_FILE = "config";
        const t = lowdb_crypto_adapter_1.default;
        const db = yield lowdb_1.default(new t(DB_FILE, SECRET_KEY));
        db.get('users')
            .push({ id: 1, username: 'admin' })
            .write();
        db.defaults({ users: [] })
            .write();
        db.get('users')
            .push({ id: 2, username: 'admin2' })
            .write();
        const user = db.get('users')
            .find({ id: 1 })
            .value();
        Logger.info(user.username);
    });
}
//# sourceMappingURL=TEST.js.map