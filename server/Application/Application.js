"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(require("../ApplicationTypes/Collection"));
function Application(settings) {
    Collection_1.default.call(this, undefined, undefined, settings.id, settings.dirname, settings.filename);
    const privates = {};
    privates.id = settings.id;
    privates.dirname = settings.dirname;
    privates.filename = settings.filename;
    privates.dbDriver = settings.dbDriver;
    this.id = function () {
        return privates.id;
    };
    this.window = function () {
        return this.views[process.env.WINDOW];
    };
    this.lang = function () {
        return process.env.LANG;
    };
}
exports.default = Application;
//# sourceMappingURL=Application.js.map