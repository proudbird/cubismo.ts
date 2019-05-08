"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
//Logger.info(router);
// router.bind = function(platform: Cubismo) {
//   router.platform = platform;
// }
// router.use(express.static("../client"))
// router.get('/:applicationId', async function(req, res, next) {
//   function sendWindow() {
//     const view = fs.readFileSync('../client/window.html', 'UTF-8');
//     res.send(view);
//   }
//   const applicationId = req.params.applicationId;
//   if(applicationId != 'favicon.ico') {
//     const application = router.platform.applications[applicationId];
//     if(!application) {
//       router.platform.initApplication(applicationId);
//       sendWindow();
//     } else {
//       sendWindow();
//     }
//   }
// });
// router.get('/favicon.ico', function(req, res, next) {
//   console.log('favicon');
// });
//# sourceMappingURL=Router.js.map