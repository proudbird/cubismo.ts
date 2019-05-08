"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Require_1 = __importDefault(require("../core/Require"));
function Base(application, cube, name, dirname, filename) {
    const privates = {};
    privates.dirname = dirname;
    privates.filename = filename;
    privates.modules = {};
    Object.defineProperties(this, {
        application: {
            value: application,
            enumerable: false,
            writable: false
        },
        cube: {
            value: cube,
            enumerable: false,
            writable: false
        },
        name: {
            value: name,
            enumerable: false,
            writable: false
        }
    });
    if (!filename) {
        return;
    }
    ;
    const moduleFileName = path_1.default.join(dirname, filename);
    if (!fs_1.default.existsSync(moduleFileName)) {
        throw new Error("Can't find module file '" + moduleFileName + "'");
    }
    const id = require.resolve(moduleFileName);
    let load = true;
    let storedModule = privates.modules[id];
    if (storedModule) {
        let lastUpdated = fs_1.default.statSync(moduleFileName).mtime.getTime();
        if (lastUpdated === storedModule.lastUpdated) {
            load = false;
        }
    }
    if (load) {
        if (cube === undefined && filename === "Cube.js") {
            cube = this;
        }
        Require_1.default(moduleFileName, {
            Application: application,
            Module: this,
            Cube: cube
        });
        storedModule = {
            lastUpdated: fs_1.default.statSync(moduleFileName).mtime.getTime()
        };
        privates.modules[id] = storedModule;
    }
}
exports.default = Base;
//# sourceMappingURL=Base.js.map