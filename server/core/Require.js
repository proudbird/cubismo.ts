"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const module_1 = __importDefault(require("module"));
function Require(pathToModule, _arguments, clearCache) {
    if (fs_1.default.existsSync(pathToModule)) {
        if (clearCache) {
            if (require.cache[require.resolve(pathToModule)]) {
                delete require.cache[require.resolve(pathToModule)];
            }
            else {
                //console.log("no cache");
            }
        }
        const _argNames = [];
        const _argValues = [];
        if (_arguments && typeof _arguments != "object") {
            throw new Error("Error on loading module '" + pathToModule + "'. Second argument can be only an object.");
        }
        else {
            for (let key in _arguments) {
                _argNames.push(key);
                _argValues.push(_arguments[key]);
            }
        }
        try {
            if (_arguments) {
                // override original Node 'require' function to supply our module with additional 
                // global variables
                (function (originalModuleWrap) {
                    module_1.default.wrap = function (script) {
                        const wrapper = [
                            '(function (module) { ',
                            'module.exports = function(' + _argNames.join(", ") + ') { ',
                            '\n}});'
                        ];
                        return wrapper[0] + wrapper[1] + script + wrapper[2];
                    };
                }(module_1.default.wrap));
                // loading our module
                var _module = require(pathToModule);
                // returning 'require' function to the original state
                (function (originalModuleWrap) {
                    module_1.default.wrap = function (script) {
                        const wrapper = [
                            '(function (exports, require, module, __filename, __dirname) { ',
                            '\n});'
                        ];
                        return wrapper[0] + script + wrapper[1];
                    };
                }(module_1.default.wrap));
                if (typeof _module === "function") {
                    _module.call(_argValues[0], _argValues[1], _argValues[2], _argValues[3], _argValues[4], _argValues[5], _argValues[6], _argValues[7], _argValues[8], _argValues[9]);
                }
                return _module;
            }
            else {
                return require(pathToModule);
            }
        }
        catch (err) {
            throw err;
        }
    }
    else {
        throw new Error("Cannot find module '" + pathToModule + "'");
    }
}
exports.default = Require;
//# sourceMappingURL=Require.js.map