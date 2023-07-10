import { error } from "node:console";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

// PATH
const dataFolderPath = new URL("./data", import.meta.url);
const postPath = new URL("./data/posts", import.meta.url);

//   ! FUNCTION !
// # ORDNER ERSTELLEN
const exists = async (path) => {
  // Eine Variable mit dem Namen exists wird deklariert und initialisiert. Diese Variable wird später den Wert true oder false erhalten, abhängig davon, ob das angegebene Objekt existiert oder nicht.
  let exists;
  //   try-catch-Block, um Fehler während der Ausführung abzufangen. Dies ist wichtig, da der Zugriff auf Dateien oder Verzeichnisse asynchron erfolgt und möglicherweise fehlschlagen kann.
  try {
    // Die access-Funktion prüft, ob der angegebene Pfad zugänglich ist und ob bestimmte Berechtigungen (hier fs.constants.W_OK für Schreibzugriff) vorhanden sind.
    await fsPromises.access(path, fs.constants.W_OK);
    // Wenn der Zugriff erfolgreich ist, wird die Variable exists auf true gesetzt, da dies bedeutet, dass das Objekt existiert und schreibbar ist.
    exists = true;
  } catch (err) {
    // exists auf false, wenn ein Fehler eintritt, also das Objekt existiert nicht
    exists = false;
  }
  return exists;
};
// Parameter ist der Pfad zum Ordner
export const folder = async (dataFolder) => {
  // Checken ob der Ordner bereits existiert. Das Ergebnis wird in der Variable existingFolder gespeichert.
  const existingFolder = await exists(dataFolder);

  //   Wenn der Ordner nicht existiert (also existingFolder den Wert false hat), wird der Ordner mit fsPromises.mkdir erstellt.
  if (!existingFolder) {
    await fsPromises.mkdir(dataFolder);
    // Wenn der Ordner schon existiert, wird Fehler ausgegeben
  } else {
    console.error("Gibt's schon", error);
  }
  //   Daten zur vorhandenen Datei hinzufügen
  //   await fsPromises.appendFile(postPath, { encoding: "utf8" });
};
folder(dataFolderPath);

export const posts = async () => {
  try {
    //  # FETCH
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    // console.log(data);

    // data-JSON in String konvertieren, wird in postPath geschrieben
    await fsPromises.writeFile(postPath, JSON.stringify(data, null, 2), {
      encoding: "utf8",
    });
    console.log("Daten in Datei gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern in der Datei:", error);
  }
};
