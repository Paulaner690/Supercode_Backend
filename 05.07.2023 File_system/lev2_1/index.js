import fs from "node:fs";
import fsPromises from "node:fs/promises";

// Pfad zur JSON
const dataPath = new URL("./data.json", import.meta.url);
// Pfad zur Txt
const txtPath = new URL("./data.txt", import.meta.url);

// Daten aus der JSON-Datei bekommen
const data = await fsPromises
  .readFile(dataPath, { encoding: "utf8" })
  // json zu Object konvertieren
  .then((readData) => JSON.parse(readData));
console.log(data);

// Mit Map alle Daten ziehen
let textData = data.map((movie) => {
  return `${movie.id} - ${movie.title} \n ${movie.description}\n\n`;
});

// Txt erstellen mit Daten aus textData
await fsPromises.writeFile(txtPath, textData, (err) => {
  if (err) {
    console.error(error);
  }
});
