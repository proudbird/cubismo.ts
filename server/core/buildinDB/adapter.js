"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const encrypt_1 = __importDefault(require("./encrypt"));
const decrypt_1 = __importDefault(require("./decrypt"));
function adapter(file, password) {
    return new FileSync_1.default(file, {
        defaultValue: {},
        serialize: (data) => _serialize(data, password),
        deserialize: (data) => _deserialize(data, password, file)
    });
}
exports.default = adapter;
function _serialize(data, password) {
    const result = decrypt_1.default(data, password);
    return JSON.stringify(result);
}
function _deserialize(data, password, file) {
    const result = encrypt_1.default(data, password, file);
    return JSON.parse(result);
}
//# sourceMappingURL=adapter.js.map