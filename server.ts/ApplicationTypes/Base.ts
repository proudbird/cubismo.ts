import fs from "fs";
import path from "path";
import Require from "../core/Require";

export default function Base(application: Application, cube: MetaDataItem,
    name: string, dirname: string, filename: string) {

    const privates: any = {};
    privates.dirname  = dirname
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
        return
    };

    const moduleFileName = path.join(dirname, filename);
    if (!fs.existsSync(moduleFileName)) {
        throw new Error("Can't find module file '" + moduleFileName + "'");
    }
    const id = require.resolve(moduleFileName);
    let load = true;
    let storedModule = privates.modules[id];
    if (storedModule) {
        let lastUpdated = fs.statSync(moduleFileName).mtime.getTime();
        if (lastUpdated === storedModule.lastUpdated) {
            load = false;
        }
    }

    if (load) {
        if (cube === undefined && filename === "Cube.js") {
            cube = this;
        }
        Require(moduleFileName, {
            Application: application,
            Module:      this,
            Cube:        cube
        });
        storedModule = {
            lastUpdated: fs.statSync(moduleFileName).mtime.getTime()
        }
        privates.modules[id] = storedModule;
    }
}