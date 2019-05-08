"use strict";
const stream_1 = require("stream");
class AppendInitVect extends stream_1.Transform {
    constructor(initVect, opts) {
        super(opts);
        this.initVect = initVect;
        this.appended = false;
    }
    _transform(chunk, encoding, callback) {
        if (!this.appended) {
            this.push(this.initVect);
            this.appended = true;
        }
        this.push(chunk);
        callback();
    }
}
module.exports = AppendInitVect;
//# sourceMappingURL=appendInitVect.js.map