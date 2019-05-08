import builtInDbDriver from "./buildinDB/driver";
import path from "path";


import defineAppStructure   from "../Application/defineAppStructure";
import defineModelStructure from "../Application/defineModelStructure";
import syncDBStructure      from "../Application/syncDBStructure";

class Platform {

  static applications = new Map();

  static async getAppSettings(id: string, sekretKey: string): Promise<AppSettings> {
    if(id === "admin") {
      return { 
        id: id,
        dirname: path.join(__dirname, "../../admin"),
        filename: "Application.js",
        dbDriver: await getBuiltInDbDriver(sekretKey) }
    }
  }

  static async initApplication(application: Application, settings: AppSettings) {
    const modelDefinition = {};
    try {
      defineAppStructure(application, settings, modelDefinition);
    } catch(error) {
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
  }
} export = Platform;

async function getBuiltInDbDriver(sekretKey: string) {
  const driver = builtInDbDriver("../metadata", sekretKey);
  return driver;
}