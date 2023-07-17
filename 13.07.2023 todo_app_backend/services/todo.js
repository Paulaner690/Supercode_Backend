import fsPromise from "node:fs/promises";
import { v4 as uuid } from "uuid";

const toDoFilePath = new URL("../data/toDos.json", import.meta.url);

let fileContent;
const init = async () => {
  const fileContentString = await fsPromise.readFile(toDoFilePath, {
    encoding: "utf-8",
  });

  fileContent = JSON.parse(fileContentString);
};

init().catch((err) =>
  console.error("Initialization of todos service failed with: ", err)
);

const write = async () => {
  const fileContentString = JSON.stringify(fileContent, null, 2);
  await fsPromise.writeFile(toDosFilePath, fileContentString, {
    encoding: "utf-8",
  });
};

//!Funktion zum hinzufuegen eines To Do's
export const addToDo = async (todo) => {
  todo.id = uuid();

  fileContent.push(todo);

  await write();

  return todo;
};

//!Funktion zum anzeigen aller To Do's
export const allToDos = async () => {
  return fileContent;
};

//!Funktion zum anzeigen eines einzelnen To Do's
export const toDoByID = async (id) => {
  const singleToDo = fileContent.find((item) => item.id === id);
  return singleToDo;
};

//!Funktion zum editieren/aktualisieren eines einzelnen To Do's
export const updateSingleToDo = async (id, updatedToDo) => {
  const selectedToDo = fileContent.find((item) => item.id === id);
  Object.assign(selectedToDo, updatedToDo);
  await write();
  return fileContent;
};

//!Funktion zum loeschen eines einzelnen To Do's
export const deleteSingleToDo = async (id) => {
  const index = fileContent.findIndex((item) => item.id === id);
  fileContent.splice(index, 1);

  await write();
  return fileContent;
};
