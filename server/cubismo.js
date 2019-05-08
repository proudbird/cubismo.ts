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
require("./core/Utils");
require("./Logger");
require("./Errors/Uncaught");
const Platform_1 = __importDefault(require("./core/Platform"));
const Application_1 = __importDefault(require("./Application/Application"));
const Server_1 = __importDefault(require("./Server"));
let SECRET_KEY;
class Cubismo {
    constructor(port, root, sekretKey) {
        this._port = 21021;
        this._root = __dirname;
        this._applications = [];
        SECRET_KEY = sekretKey;
        this._port = port || this._port;
        this._root = root || this._root;
    }
    get port() {
        return this._port;
    }
    get root() {
        return this._root;
    }
    get applications() {
        return this._applications;
    }
    start() {
        Server_1.default.start(this);
    }
    runApplication(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield Platform_1.default.getAppSettings(id, SECRET_KEY);
            if (settings) {
                Logger.debug(`Application <${id}> is found in the list`);
            }
            else {
                return Logger.error(`There is no an application with the id <${id}> in the application list`);
            }
            const application = new Application_1.default(settings);
            yield Platform_1.default.initApplication(application, settings);
            this._applications.push(application);
        });
    }
    stopApplication(id) {
        try {
            Platform_1.default.applications.delete(id);
        }
        catch (error) {
            Logger.error(`Can't find an appplication '${id}' among runnin applications`, error);
        }
    }
}
exports.Cubismo = Cubismo;
//# sourceMappingURL=cubismo.js.map