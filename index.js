let fs = require("fs");
let stream = require("stream");
let { Readable } = stream;
let { Writable } = stream;
let { Transform } = stream;
let moment = require("moment");
let filPah = __dirname+"text.txt";

let readableStream = new Readable({
  read(size) {
    let action = setInterval(() => {
      clearInterval(action);
      let currentDateTime = new Date();
      this.push(currentDateTime.toISOString());
    }, 1000);
  },
});
let transform = new Transform({
  transform(chunk, encoding, callback) {
    console.log(chunk.toString());
    this.push(moment(chunk.toString()).format("yyyy-MM-DD HH:mm:ss") + "\n");
    callback();
  },
});
let writableStream = new Writable({
  write(chunk, encoding, callback) {
    fs.writeFile(filPah, chunk, { flag: "a" }, callback);
  },
});

readableStream.pipe(transform).pipe(writableStream);
