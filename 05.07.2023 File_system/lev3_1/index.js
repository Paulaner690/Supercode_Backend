import fs from "node:fs";
import fsPromises from "node:fs/promises";

// Ordner Pfad
const filePath = new URL("./unterordner", import.meta.url);
// Datei Pfad
const txtPath = new URL("./unterordner/textDatei.txt", import.meta.url);

// 1. Unterordner erstellen
await fsPromises.mkdir(
  filePath,
  { recursive: true, encoding: "utf8" },
  (error) => {
    if (error) {
      console.error(error);
    }
  }
);

// 2. Funktion, die Prüft, ob txt-Datei vorhanden ist (inkl. Parameter, der als Text übergeben werden soll)
function existTextFile(inhalt) {
  if (fs.existsSync(txtPath)) {
    fs.appendFileSync(txtPath, `\n${inhalt}`, { encoding: "utf-8" });
    console.log("Inhalt hinzugefügt");
  } else {
    fs.writeFileSync(txtPath, inhalt, { encoding: "utf-8" });
    console.log("Datei erstellt");
  }
}
existTextFile("Hallooooo");
