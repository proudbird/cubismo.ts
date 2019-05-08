"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
function Collection(application, cube, name, dirname, filename) {
    const privates = {};
    privates.dirname = dirname;
    privates.filename = filename;
    privates.elements = {};
    Base_1.default.call(this, application, cube, name, dirname, filename);
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map