import Collection from "../ApplicationTypes/Collection";

export default function Application(settings: AppSettings): void {

    Collection.call(this, undefined, undefined, settings.id, settings.dirname, settings.filename);

    const privates: any = {};
    privates.id       = settings.id;
    privates.dirname  = settings.dirname
    privates.filename = settings.filename;
    privates.dbDriver = settings.dbDriver;

    this.id = function() {
        return privates.id;
    }

    this.window = function() {
        return this.views[process.env.WINDOW];
    }

    this.lang = function() {
        return process.env.LANG;
    }
}