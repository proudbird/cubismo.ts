"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catalogist_1 = __importDefault(require("catalogist"));
//import Recorders    from "../ApplicationTypes/Recorders";
//import Registers    from "../ApplicationTypes/Registers";
//import Enumerations from "../ApplicationTypes/Enumerations";
function defineApplicationStructure(application, settings, appModelDefinition) {
    const appDir = settings.dirname;
    const registredClasses = ["Common", "Сonstants", "Catalogs", "Recorders", "Registers", "Enumerations"];
    const cubes = {};
    const appTree = catalogist_1.default.treeSync(appDir, {
        withSysRoot: true,
        childrenAlias: "next"
    });
    appTree.forEach(appLevel => {
        if (appLevel.next) {
            let cubeModuleFile = "Cube.js";
            if (!Utils.find(appLevel.next, {
                fullName: cubeModuleFile
            })) {
                return;
            }
            appLevel.next.forEach(cubeLevel => {
                const appTypeName = cubeLevel.fullName;
                if (!registredClasses.includes(appTypeName)) {
                    return;
                }
                cubeLevel.next.forEach(typeLevel => {
                });
            });
        }
    });
    //   const files = fs.readdirSync(appDir);
    //   for (let i = 0; i < files.length; i++) {
    //       let cubeFile = files[i];
    //       let cubeDir = path.join(appDir, cubeFile);
    //       if (fs.statSync(cubeDir).isDirectory()) {
    //           if (cubeFile.match(/\.|\../) == null) {
    //               let cubeName = cubeFile;
    //               let cubeModuleFile = path.join(cubeDir, 'Cube.js');
    //               if (fs.existsSync(cubeModuleFile)) {
    //                   const _cube = new constructors.Cube(application, undefined, cubeName, cubeDir, "Cube.js")
    //                   application.addElement(cubeName, _cube);
    //                   _cubes.addElement(cubeName, _cube);
    //                   registredClasses.forEach(className => {
    //                       const _constructor = constructors[className];
    //                       const _class = new _constructor(application, _cube, className, cubeDir, undefined);
    //                       _cube.addElement(className, _class);
    //                   });
    //                   const _commonModules = new Collection(application, _cube, "Modules", path.join(cubeDir, "Common", "Modules"), undefined);
    //                   const _common = _cube.Common;
    //                   _common.addElement("Modules", _commonModules);
    //                   let cubeFiles = fs.readdirSync(cubeDir);
    //                   for (let i = 0; i < cubeFiles.length; i++) {
    //                       let classFile = cubeFiles[i];
    //                       let classDir = path.join(cubeDir, classFile);
    //                       if (fs.statSync(classDir).isDirectory()) {
    //                           let className = classFile;
    //                           if (!registredClasses.includes(className)) {
    //                               continue;
    //                           }
    //                           let modelName = undefined;
    //                           let modelModuleFile = undefined;
    //                           let modelDefinition = undefined;
    //                           let modelDefinitionName = undefined;
    //                           let classFiles = fs.readdirSync(classDir);
    //                           for (let i = 0; i < classFiles.length; i++) {
    //                               let classFile = classFiles[i];
    //                               let splitedName = classFile.split(".");
    //                               if (splitedName[0] === className && splitedName[2] === "js") {
    //                                   modelName = splitedName[1];
    //                                   modelModuleFile = path.join(classDir, classFile);
    //                               }
    //                               if (splitedName[0] === className && splitedName[2] === "Model" && splitedName[3] === "json") {
    //                                   modelDefinitionName = splitedName[1];
    //                                   modelDefinition = require(path.join(classDir, classFile));
    //                               }
    //                               if (className === "Common" &&
    //                                   splitedName[0] === className &&
    //                                   splitedName[1] === "Modules" &&
    //                                   splitedName[3] === "js") {
    //                                   const commonModuleName = splitedName[2];
    //                                   const _commonModules = _cube.Common.Modules;
    //                                   const _module = new Base(application, _cube, commonModuleName, path.join(cubeDir, "Common"), classFile);
    //                                   _commonModules.addElement(commonModuleName, _module);
    //                                   Require(path.join(_module.dirname, _module.filename), { Application: application, Cube: _cube, Module: _module } );
    //                               }
    //                               /**
    //                                * @todo There can be poblems on parsing object files
    //                                * @todo Should change the algorithm
    //                                */
    //                               if (modelDefinition && modelDefinitionName) {
    //                                   for (let key in modelDefinition) {
    //                                       modelDefinition[key].id = key;
    //                                       appModelDefinition[key] = {
    //                                           definition: modelDefinition[key],
    //                                           module: modelModuleFile
    //                                       };
    //                                   }
    //                               }
    //                           }
    //                       }
    //                   }
    //               }
    //           }
    //       }
    //   }
}
exports.default = defineApplicationStructure;
//# sourceMappingURL=defineAppStructure.js.map