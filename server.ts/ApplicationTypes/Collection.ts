import Base from "./Base";

export default function Collection(application: Application, cube: MetaDataItem,
  name: string, dirname: string, filename: string) {
    
  const privates: any = {};
  privates.dirname  = dirname
  privates.filename = filename;
  privates.elements = {};
  
  Base.call(this, application, cube, name, dirname, filename);
}