import fs from "node:fs";
import fsPromises from "node:fs/promises";

// # 1
const content = "Ich bin ein Webdeveloper";

// ! durch Url kann ich die Datei von überall aufrufen (dynamischer Link)
const filePath = new URL("./blog1.txt", import.meta.url);
// await= asynchron, fs.writeFile hat best. Parameter die wir übergeben
await fsPromises.writeFile(
  filePath,
  content,
  (error) => {
    if (error) {
      console.error(error);
    }
  },
  { encoding: "utf8" }
);

// # 2
const filePath2 = new URL("./blog2.txt", import.meta.url);
await fsPromises.writeFile(
  filePath2,
  "Moooooin!",
  (error) => {
    if (error) {
      console.error(error);
    }
  },
  { encoding: "utf8" }
);

// # 3 + 4
const assetPath = new URL("./assets", import.meta.url);

if (fs.existsSync(assetPath)) {
  await fsPromises.rmdir(assetPath);
} else {
  await fsPromises.mkdir(assetPath, { encoding: "utf8" }, (error) => {
    if (error) {
      console.error(error);
    }
  });
}

// # 5 + 6
const deletePath = new URL("./delete.txt", import.meta.url);

fs.existsSync(deletePath)
  ? await fsPromises.unlink(deletePath)
  : await fsPromises.writeFile(deletePath, "", { encoding: "utf-8" });

// # 7
const helloPath = new URL("./Hello.txt", import.meta.url);

await fsPromises.writeFile(
  helloPath,
  "Text",
  { encoding: "utf-8" },
  (error) => {
    if (error) {
      console.error(error);
    }
  }
);
fsPromises.rename(
  "./Hello.txt",
  "./HelloWorld.txt",
  { encoding: "utf-8" },
  (error) => {
    if (error) {
      console.error(error);
    }
  }
);
