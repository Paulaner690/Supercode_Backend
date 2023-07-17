import express from "express";

const app = express();

// im Terminal ausführen bevor man es im Browser starten kann!

// app.use = middelware
// Jeder request kommt hier rein und kann hier bearbeitet werden (res auch)
// res muss zurückgesendet werden sonst bleibt req stecken
// oder mit next wird req an Route weitergeleitet
// ander Middelware kann "verlorene" request bearbeiten und zB Fehler auswerfen
app.use((req, res, next) => {
  console.log(req.method, req.url);
  //   res.send("In der middelware");

  //   next leitet weiter "Geh in die nächste Route" und vergleicht dort ob methode und Route übereinstimmen
  next();
});

app.get("/", (req, res) => {
  // Client wartet auf Antwort, hiermit wird response gesendet
  res.send("Hallo Welt");
});

app.get("/cars", (req, res) => {
  res.send("in Cars");
});

app.post("/cars", (req, res) => {
  res.send("Danke für das neue Auto");
});

// ander Middelware kann "verlorene" request bearbeiten und zB Fehler auswerfen. zb Route /boote (gibt es nicht)
app.use((req, res, next) => {
  res.send("Keiner mag dich");
});

app.listen(9898, () => console.log("Ich stehe wieder vor der Tür"));

//  Get ist einzge method die den Body nicht befüllen kann, nur daten bekommen
// Funktion geben wir selbst mit, nicht die Methode entscheidet dies
