interface IPrivates {
  [property: string]: any;
}

export class privates implements IPrivates {}

export class Embryo {
  protected _: privates;
  constructor() {
    this._ = new privates;
  }
}