"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs = __importStar(require("fs"));
const express_1 = __importDefault(require("express"));
class server {
    static start(cubismo) {
        this.cubismo = cubismo; // TypeScript gives error: Property 'port' is a 
        this.router.listen(cubismo.port, function () {
            Logger.info(`cubismo server is listening at port ${cubismo.port}`);
        });
    }
}
server.router = express_1.default();
server.router.use(express_1.default.static("./client"));
server.router.get('/:applicationId', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        function sendWindow() {
            const view = fs.readFileSync('./client/window.html', 'UTF-8');
            res.send(view);
        }
        const applicationId = req.params.applicationId;
        if (applicationId != 'favicon.ico') {
            const application = server.cubismo.applications[applicationId];
            if (!application) {
                yield server.cubismo.runApplication(applicationId);
                sendWindow();
            }
            else {
                sendWindow();
            }
        }
    });
});
server.router.get('/favicon.ico', function (req, res, next) {
    Logger.debug("Request for the favicon");
});
module.exports = server;
//# sourceMappingURL=Server.js.map