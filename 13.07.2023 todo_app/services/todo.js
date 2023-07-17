import fsPromise from "node:fs/promises";
import { v4 as uuid } from "uuid";

const todoPath = new URL("../data/todos.json", import.meta.url);

let fileContent;

const init = async () => {
  const fileContentString = await fsPromise.readFile(todoPath, {
    encoding: "utf-8",
  });
  fileContent = JSON.parse(fileContentString);
};

init().catch((err) =>
  console.error("Initialization of todos service failed with: ", err)
);
