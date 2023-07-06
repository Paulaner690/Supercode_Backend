import fs from "node:fs";
import fsPromises from "node:fs/promises";

// PATH zu Output-Dateien
const logTxtPath = new URL("./logs/log.txt", import.meta.url);
const errorTxtPath = new URL("./logs/error.txt", import.meta.url);
const warnTxtPath = new URL("./logs/warn.txt", import.meta.url);
const infoTxtPath = new URL("./logs/info.txt", import.meta.url);

// ! FUNCTION !
export const addToLog = async (addText, logLevel) => {
  // OUTPUT, der in den Dateien ausgegeben wird
  const date = new Date().toUTCString();
  // AUSGABETEXT: Parameter logLevel und addText werden im Funktionsaufruf vergeben. date wird durch new Date() in der Konstante date erstellt.
  const ausgabe = `\n${logLevel} - ${date} - ${addText} `;

  // Checken, ob Unterordner existiert. Wenn nicht wird er erstellt.
  const logDirUrl = new URL("./logs", import.meta.url);
  !fs.existsSync(logDirUrl)
    ? await fsPromises.mkdir(logDirUrl, { recursive: true })
    : null;

  // Wenn die log.txt Datei besteht, wird die Konstante "ausgabe" an den bestehenden Inhalt angehängt und in der Konsole "Inhalt hinzugefügt" ausgegeben.
  if (fs.existsSync(logTxtPath)) {
    fs.appendFileSync(logTxtPath, ausgabe, {
      encoding: "utf-8",
    });
    console.log("Inhalt hinzugefügt");
    // Wenn es die log.txt Datei nicht gibt, dann wird die Datei mit fsPromises.writeFile erstellt und die Konstante "ausgabe" an den bestehenden Inhalt angehängt. In der Konsole wird "Datei erstellt" ausgegeben.
  } else {
    fs.writeFileSync(logTxtPath, ausgabe, { encoding: "utf-8" });
    console.log("Datei erstellt");
  }

  // EINORDNUNG IN LOG LEVELS, je nach Parametervergabe
  // Wenn logLevel === "übergebener Parameter im Funktionsaufruf", wird der dynamische Path ausgewählt
  let dynPath;
  if (logLevel === "error") {
    dynPath = errorTxtPath;
  } else if (logLevel === "warn") {
    dynPath = warnTxtPath;
  } else if (logLevel === "info") {
    dynPath = infoTxtPath;
    // Wenn ein anderer Parameter als error, warn oder info vergeben wird, wird else ausgegeben.
  } else {
    console.error("error: Typ gibt es nicht");
  }

  // Wenn die Datei existiert, wird Inhalt hinzugefügt. Wenn nicht wird die Datei mit Inhalt erestellt.
  if (fs.existsSync(dynPath)) {
    fs.appendFileSync(dynPath, ausgabe, { encoding: "utf8" });
    console.log("Inhalt zugefügt");
  } else {
    fs.writeFileSync(dynPath, ausgabe, { encoding: "utf-8" });
    console.log("Datei erstellt");
  }
};
