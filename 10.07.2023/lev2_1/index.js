import http from "http";
import fs from "fs";

const ultimateSendFile = (path, response) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      response.writeHead(500);
      response.end();
      return;
    }
    console.log(data);
    if (path.includes(".jpg")) {
      res.writeHead(200, {
        "Content-Type": "image/jpg",
      });
      res.end(data);
      return;
    }
    response.write(data.toString());
    response.end();
  });
};

function ultimativerRequestHandler(req, res) {
  console.log("Unsere Methode:", req.method, req.url);
  if (req.url === "/") {
    ultimateSendFile("./index.html", res);
  } else {
    ultimateSendFile("." + req.url, res);
  }
}

const server = http.createServer(ultimativerRequestHandler);

server.listen(9898, () => console.log("I'm working...'"));
