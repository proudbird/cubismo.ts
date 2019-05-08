"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const shortid_1 = __importDefault(require("shortid"));
global["Utils"] = lodash_1.default;
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
lodash_1.default.mixin({ 'guid': guid }, { 'chain': false });
function shortId() {
    return shortid_1.default.generate();
}
lodash_1.default.mixin({ 'shortId': shortId }, { 'chain': false });
lodash_1.default.mixin({ 'sid': shortId }, { 'chain': false }); // alias
//# sourceMappingURL=Utils.js.map