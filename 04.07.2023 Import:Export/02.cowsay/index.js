// Im Terminal in den Cowsay Ordner navigieren
// npm init (oder npm init -y)
// in der package.json "type": "module", hinzufügen
// npm install cowsay

import cowsay from "cowsay";
import { hello } from "./lib/dialog.js";

hello();

// console.log(
//   // cowsay.say({
//   cowsay.think({
//     text: "I'm a moooodule",
//     e: "oO",
//     T: "U ",
//   })
// );

// AUSFÜHREN: node ./index.js
//WATCHFLAG: node --watch ./index.js (wie Liveserver)

// node_modules .bin (Optionenen die ich ausgeben kann)
// node_modules/.bin/cowsay Hi how are you (so kann ich Text direkt im Terminal verändern)

// Im package.json kann das Skript verändert und mit npm run aufgerunfen werden
// z.B. hier npm run start ===> Hellooooo World
