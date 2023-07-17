import express from "express";
import cors from "cors";
// ! Immer die dateiendung anhängen!
import { addTodo, deleteTodo, todos, updateTodo } from "./model/TodosModel.js";

// Express ist eine Funktion und muss aufgerufen werden
const app = express();

const PORT = 3001;

// Middelware. Ab jetzt sind alle Dateien die weitergeschickt werden JSON-Dateien
app.use(express.json());
// Server auf PORT 3001 und Frontend aber auf 3000, sollen aber miteinander kommunizeiren. Cors sorgt für diese Verbindung, damit kommuniziert werden kann.
app.use(cors());

// ! hier werden die Routen definiert und die Daten werden an den Client gesendet
app.get("/api/todos", (req, res) => {
  console.log(todos);
  res.send(todos);
});

// ! hier werden die Daten vom Client empfangen und in der Datenbank gespeichert
app.post("/api/todos", async (req, res) => {
  // Nimmt Daten aus dem Body
  const todo = req.body;
  // hängt neues Todo an
  const newTodo = await addTodo(todo);
  res.send(newTodo);
});

// ! hier werden die Daten vom Client empfangen und in der Datenbank bearbeitet
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  const updatedTodo = await updateTodo(id, todo);
  res.send(updatedTodo);
});

// ! hier werden die Daten vom Client empfangen und in der Datenbank gelöscht
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  deleteTodo(id);
  res.send("Es wurde gelöscht");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf diesem Port: ${PORT}`);
});
