"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = __importDefault(require("lowdb"));
const lowdb_crypto_adapter_1 = __importDefault(require("lowdb-crypto-adapter"));
function BuilInDbDriver(file, sekretKey) {
    const adapter = new lowdb_crypto_adapter_1.default(file, sekretKey);
    const driver = lowdb_1.default(adapter);
    driver["queryInterface"] = {};
    return driver;
}
exports.default = BuilInDbDriver;
//# sourceMappingURL=driver.js.map