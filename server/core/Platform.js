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
const driver_1 = __importDefault(require("./buildinDB/driver"));
const path_1 = __importDefault(require("path"));
const defineAppStructure_1 = __importDefault(require("../Application/defineAppStructure"));
class Platform {
    static getAppSettings(id, sekretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === "admin") {
                return {
                    id: id,
                    dirname: path_1.default.join(__dirname, "../../admin"),
                    filename: "Application.js",
                    dbDriver: yield getBuiltInDbDriver(sekretKey)
                };
            }
        });
    }
    static initApplication(application, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelDefinition = {};
            try {
                defineAppStructure_1.default(application, settings, modelDefinition);
            }
            catch (error) {
                Logger.error("Unsuccessful attempt to define application structure", error);
                undefined;
            }
            // try {
            //     defineModelStructure(application, settings.dbDriver, modelDefinition);
            // } catch(error) {
            //     Logger.error("Unsuccessful attempt to define application model structure", error);
            //     undefined;
            // }
            // if(application.id() != "admin") {
            //     try {
            //         await syncDBStructure(settings.dbDriver);
            //     } catch(error) {
            //         Logger.error("Unsuccessful attempt to synchronize application model structure with database", error);
            //         undefined;
            //     }
            // }
            // if(!this.applications.get(application.id())) {
            //   this.applications.set(application.id(), application);
            // }
        });
    }
}
Platform.applications = new Map();
function getBuiltInDbDriver(sekretKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = driver_1.default("../metadata", sekretKey);
        return driver;
    });
}
module.exports = Platform;
//# sourceMappingURL=Platform.js.map