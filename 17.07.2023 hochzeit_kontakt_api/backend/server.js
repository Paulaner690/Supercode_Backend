import express from "express";
// Cors = "Cross-Origin Resource Sharing" (zu Deutsch: Quellenübergreifende Ressourcenfreigabe)
// CORS ermöglicht Webanwendungen, Ressourcen (wie z. B. Daten oder APIs) von einer Quelle (einem Server) anzufordern, die sich auf einer anderen Domain oder einem anderen Port befindet als die ursprüngliche Seite, auf der die Anwendung ausgeführt wird.
import cors from "cors";
// Funktionen (benötigt vor MongoDB)
// import {
//   addContact,
//   contacts,
//   deleteContact,
//   updateContact,
// } from "./model/contacts.js";

// Verbindung zur Datenbank:
import "./model/index.js";
// Kontaktschema:
import { ContactModel } from "./model/contactModel.js";

const app = express();
const PORT = 9898;

// ! MIDDLEWARE
app.use(express.json());
app.use(cors());

// ! ALLE KONTAKTE
app.get("/api/contacts", async (req, res) => {
  console.log(contacts);
  const data = await ContactModel.find();
  // res.send(contacts);
  res.send(data);
});

// ! NEUER KONTAKT
app.post("/api/contacts", async (req, res) => {
  const contact = req.body;
  console.log(contact);
  // const newContact = await addContact(contact);
  const response = await ContactModel.create(contact);
  console.log(response);
  res.send(response);
});

// ! KONTAKT AKTUALISIEREN
app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const contact = req.body;
  const updatedContact = await updateContact(id, contact);
  res.send(updatedContact);
});

// ! KONTAKT LÖSCHEN
app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  deleteContact(id);
  res.send("Kontakt gelöscht");
});

// ! APP LISTENER
app.listen(PORT, () => {
  console.log(`Server läuft auf Port: ${PORT}`);
});
