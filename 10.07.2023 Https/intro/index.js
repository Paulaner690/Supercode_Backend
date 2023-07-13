import http from "http";

// Server bekommt client request ---> gibt response

// Wir müssen unserem Server sagen, was er eigentlich mit einem request machen soll

// ! localhost:9898 im Browser eingeben bzw. 127.0.0.1:9898

// super  simpel
function requestHandler(req, res) {
  res.end("<h1>Hallo</h1>");
}

// simpel
function simplerequestHandler(req, res) {
  if (req.url === "/") {
    res.end("Home");
  } else if (req.url === "/about") {
    res.end("About");
  } else {
    req.writeHead(404);
    res.end("Nichts da");
  }
}

// simpel mit request Methoden
// GET --> liefer mir Daten, wir wollen was haben
// POST --> nimm diese Daten, wir geben etwas neues
// PUT --> veränder diese Daten, wir updaten vorhandenes
// DELETE --> lösche diese Daten, wir löschen vorhandene Daten

// simpel
function simplerequestHandlerPlus(req, res) {
  console.log("unsere Methode:", req.method);
  if (req.url === "/") {
    if (req.method === "POST") {
      res.end("Danke für deine Daten");
    } else {
      res.end("Home");
    }
  } else if (req.url === "/about") {
    res.end("About");
  } else {
    req.writeHead(404);
    res.end("Nichts da");
  }
}

const server = http.createServer(simplerequestHandlerPlus);

server.listen(9898, () => console.log("Ich stehe vor der Tür 9898 und warte"));

// instagram alle beiträge bekommen
// instragam/beitrag
// erstelle einen neuen beitrag
// instragam/beitrag/newbeitrag
// update einen beitrag
// instragam/beitrag/updatebeitrag
// lösche einen beitrag
// instragam/beitrag/deletebeitrag

// instagram/beitrag
// GET
// POST
// PUT
// DELETE
