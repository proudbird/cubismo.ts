const { Cubismo } = require("./server/cubismo.js");

let sekretKey;
const args = process.argv;
for(let i=0; i<args.length; i++) {
  switch (args[i]) {
    case "--key":
      sekretKey = i < args.length-1 ? args[i+1] : undefined;
      break;
  }
}

// TODO: delet key from process
const cubismo = new Cubismo(21021, __dirname, sekretKey);
cubismo.start();