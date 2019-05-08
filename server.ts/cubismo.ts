import "./core/Utils";
import "./Logger";
import "./Errors/Uncaught";
import Platform from "./core/Platform";
import Application from "./Application/Application"
import server from "./Server"


let SECRET_KEY: string;

export class Cubismo {

  private _port: number = 21021;
  private _root: string = __dirname;
  private _applications: any[] = [];

  constructor(port?: number, root?: string, sekretKey?: string) {
    SECRET_KEY = sekretKey;
    this._port = port || this._port;
    this._root = root || this._root;
  }

  get port(): number {
    return this._port;
  }
  
  get root(): string {
    return this._root;
  }

  get applications(): any[] {
    return this._applications;
  }

  start() {
    server.start(this);
  }

  async runApplication(id: string) {
    const settings = await Platform.getAppSettings(id, SECRET_KEY);
    if(settings) {
      Logger.debug(`Application <${id}> is found in the list`);
    } else {
      return Logger.error(`There is no an application with the id <${id}> in the application list`);
    }
    const application = new Application(settings) as Application;
    await Platform.initApplication(application, settings);
    this._applications.push(application);
  }

  stopApplication(id: string) {
    try {
      Platform.applications.delete(id);
    } catch(error) {
      Logger.error(`Can't find an appplication '${id}' among runnin applications`, error);
    }
  }
}


