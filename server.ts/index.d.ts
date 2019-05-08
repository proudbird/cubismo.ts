/// <reference types="node" />

declare const Utils: any;

declare type Privates = {
  [key: string]: any
}

declare type AppSettings = {
  id:       string,
  dirname:  string,
  filename: string,
  dbDriver: any
}

declare type RequireArguments = {
  [key: string]: any
}

/**
 * The main object defining an application structure
 * and providing an API for managing it
 */
declare class Application {
  /**
   * Returns the ID of the applacation
   * 
   * @return {string} the ID of the applacation
   */
  id(): string;

  /**
   * Returns the main view of the current process 
   * 
   * @return {View} the main view
   */
  window(): any;

  /**
   * Returns the language of the current process 
   * 
   * @return {string} the language
   */
  lang(): string;
}

declare class MetaDataItem {

}