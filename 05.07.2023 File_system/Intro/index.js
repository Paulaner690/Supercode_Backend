// ! https://github.com/VZ-FS-23-02/LiveCode/tree/main/node/03.FileSystem/01.Intro

import fs from "node:fs";

// # synchron blockiert
// # Programm wird erst gelesen, dann beenden
// readFileSync lässt input.txt synchron lesen, durch encoding wird der Buffer direkt in Utf8 ausgegeben (sonst in Zahlen, stammen von Binärcode)
const data = fs.readFileSync("input.txt", { encoding: "utf8" });

console.log(data); // Buffer = Puffer,damit intput.txt nicht nochmal geladenwerden muss. Wird dafür als Roh-Daten in unserem Zwischenspeicher gespeichert
console.log(data.toString());
console.log("Program Ended");

// # Asynchron
// 1. Parameter: Pfad, 2.Parameter: options Object, 3. Parameter: callback
fs.readFile("./input.txt", { encoding: "utf8" }, (err, data) => {
  if (err) console.error("Nooooo!");
  console.log("Async Data");
  console.log(data);
});
// Durch noch mehr daten würde hier eine Callback-Hell (Tannenbaum) entstehen
// So kamen 2015 die Promises mit ES6 (weiterentwickeltes Konzept der asynchronen Programmierung, dass Callback ersetzt)
// Lassen sich leichter in Kettenstruktur bringen

// # Promisify Callback Funktion
const readFilePromise = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
console.log("Promisify Async");
readFilePromise("./input.txt").then((data) => console.log({ data }));

import fsPromise from "node:fs/promises";
const fsPromiseData = fsPromise
  .readFile("./input.txt", { encoding: "utf8" })
  .then((fsPromiseData) => console.log({ fsPromiseData }));

// Kein Callback hell aber eine then chain hell?
//const fsPromiseData = fsPromies
// .readFile("./input.txt", { encoding: "utf8" })
// .then((fsPromiseData) => fetch(data))
// .then((data) => console.log("hi"));

// Async / Await === Promises
const prom = () => new Promise();
//              ⬇ Verwandelt Funktion in Promise
const prom2 = async (filePath) => {
  if (!filePath) {
    // Promise rejected, also (.catch)
    throw new Error("Please define a file path");
  }

  let data = await fsPromies.readFile(filePath, { encoding: "utf8" });

  return true; // Promise resolved ist, also (.then)
};

prom2().catch((e) => console.error("Here: ", e));

try {
  await fetch("http://google.commmm");
} catch (error) {
  console.error("Catch fetch: ", error);
}
