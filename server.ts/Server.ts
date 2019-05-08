import * as fs   from "fs";
import express from "express";

class server {
  static cubismo: any;
  static router = express();                        
  static start(cubismo: any): void {               // if to specify type cuismo for parametr platform,
    this.cubismo = cubismo;                        // TypeScript gives error: Property 'port' is a 
    this.router.listen(cubismo.port, function() {  // static member of type 'cubismo'
      Logger.info(`cubismo server is listening at port ${cubismo.port}`);
    });
  }
} export = server;

server.router.use(express.static("./client"))

server.router.get('/:applicationId', async function(req, res, next) {
  function sendWindow() {
    const view = fs.readFileSync('./client/window.html', 'UTF-8');
    res.send(view);
  }

  const applicationId = req.params.applicationId;
  if(applicationId != 'favicon.ico') {
    const application = server.cubismo.applications[applicationId];
    if(!application) {
      await server.cubismo.runApplication(applicationId);
      sendWindow();
    } else {
      sendWindow();
    }
  }
});

server.router.get('/favicon.ico', function(req, res, next) {
  Logger.debug("Request for the favicon");
});