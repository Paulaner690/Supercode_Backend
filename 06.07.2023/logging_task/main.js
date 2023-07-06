import { addToLog } from "./lib.js";

//Funktion aufrufen und Parameter (addText, logLevel) beachten!
addToLog("Hallooooo", "error");
addToLog("HI", "warn");
addToLog("MOIN", "info");

// Text wird immer in der log.txt Datei ausgegeben und je nach logLevel (Parameter!) in die anderen Dateien einsortiert
// Hier wird in allen 3 Dateien etwas angehängt, da alle 3 Parameter aufgerufen werden!
