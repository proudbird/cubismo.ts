"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
//const Application = require("./Application.js");
class Platform {
    static initApplication(id) {
        const appListFile = fs.readFileSync(path.join(this.root, "applications.json"), 'UTF-8');
        const appList = JSON.parse(appListFile);
        if (!appList[id]) {
            Logger.error(`There is no an application with the id <${id}> in the application list`);
        }
        else {
            Logger.debug(`Application <${id}> is found in the list`);
        }
        // const application = new Application(id, 
        //                                     path.join(this.root, appList[id].directory), 
        //                                     "Application.js");
        // await application.init();
        // this.applications[id] = application;
        // console.log("Application <" + id + "> has started.");
        // for(let key in application.Cubes) {
        //   const cube = application.Cubes[key];
        //   const start = cube.onStart;
        //   if(start) {
        //     start();
        //   }
        // }
    }
}
exports.default = Platform;
//# sourceMappingURL=Platform.js.map