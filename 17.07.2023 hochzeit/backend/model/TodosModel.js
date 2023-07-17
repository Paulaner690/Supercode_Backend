// Diese Datei ist für unsere "Werkzeuge" also Funktionen

// File system importieren
import fs from "node:fs/promises";
// Individuelle ID durch uuid vergeben
import { v4 as uuidv4 } from "uuid";

// Pfad zu Datei in der wir unsere Todos speichern
// ! KEIN new URL weil wir die Datei vorher schon erstellt haben!
const filePath = "./data/todos.json";

// Feststellen, dass in unserem Zielordner ein leeres Array ist!!! Benötigit für Json! LET verwenden, da es überschreiben werden kann!!
export let todos = [];

// hier werden die Daten aus der Datenbank gelesen
const _setUp = async () => {
  try {
    const buffer = await fs.readFile(filePath);
    // Wenn du einen Buffer bekommst, muss dieser in JSON umgewandelt werden und wir in todos eingefügt
    todos = JSON.parse(buffer);
  } catch (error) {
    console.error("Error reading todos from file", error);
  }
};
_setUp();
// Wird nur hier im model ausgeführt

// hier werden die Daten in der Datenbank gespeichert
const _saveTodo = async () => {
  try {
    // 1. Parameter Pfad, 2. umwandlung in String
    await fs.writeFile(filePath, JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to file", error);
  }
};

export const addTodo = async (todo) => {
  // kopie von todo wird erstellt + id
  const newTodo = { ...todo, id: uuidv4() };
  // ein neues Todo wird angefügt
  todos.push(newTodo);
  await _saveTodo();
  return newTodo;
};

// hier wird die ID gesucht
const _findEntryIndex = (id) => {
  return todos.findIndex((todo) => todo.id === id);
};

export const updateTodo = async (id, todo) => {
  // Passende Id finden durch vorherige Funktion
  const todoIndex = _findEntryIndex(id);
  if (todoIndex !== -1) {
    const updatedTodo = { ...todos[todoIndex], ...todo };
    todos[todoIndex] = updatedTodo;
    await _saveTodo();
    return updatedTodo;
  }
  return null;
};

export const deleteTodo = async (id) => {
  const todoIndex = _findEntryIndex(id);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    await _saveTodo();
    return true;
  }
  return false;
};
