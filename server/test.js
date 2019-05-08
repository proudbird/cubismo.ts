const msg = `Woks good!`;
console.log(msg);
class Private {
}
class Cubismo {
    get port() {
        return this._.port;
    }
    constructor(__port) {
        this._ = {};
        this._.port = __port;
    }
}
const cubismo = new Cubismo(21021);
console.log(cubismo.port);
class privates {
}
class Embryo {
    constructor() {
        this._ = new privates;
    }
}
class Next extends Embryo {
    get name() {
        return this._.name;
    }
    constructor(name) {
        super();
        this._.name = name;
    }
}
const t = new Next("Bob");
console.log(t.name);
//# sourceMappingURL=test.js.map