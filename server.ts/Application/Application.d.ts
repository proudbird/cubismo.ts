import { Embryo } from "../core/Embryo";

declare module Application {
  interface IApplication extends Embryo {
    init(): IApplication
  }
}