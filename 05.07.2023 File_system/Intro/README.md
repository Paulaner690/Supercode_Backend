# FS and Async Code / Promises

## Import FS (filesystem module)

### Callback / Sync methods

```js
import fs from "node:fs";
```

### Async / Promise Methods

```js
import fs from "node:fs/promises";
```

## Async Functions

Async keyword verwandelt eine Funktion in einen Promise. Wenn diese Funktion aufgerufen wird ist der Wiedergabe wert ein Promise. Der eigentliche (explizite) return wert wird der `.then` methode übergeben. Wenn wir innerhalb der `async function` einen Fehler werfen (`throw "Nope"`) dann wird dieser wert der `.catch` methode übergeben aka Promise `status = 'rejected'`.

```js
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
```
