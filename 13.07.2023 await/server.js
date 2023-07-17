import express from "express";
import { add, getAll, getOneById } from "./services/contacts.js";

const PORT = 3001;
const app = express();

app.use(express.json());

// # Gib mir alle Kontakte
app.get("/contacts", async (req, res) => {
  const allContacts = await getAll();
  res.send(allContacts);
});

// # Gib mir einen Kontakt
app.get("/contacts/:id", async (req, res) => {
  const contact = await getOneById(req.params.id);
  res.send(contact);
});

// # Füge einen neunen Kontakt hinzu
app.post("/contacts", async (req, res) => {
  const contact = req.body;
  const createdContact = await add(contact);

  res.send({
    message: "Added contact",
    data: createdContact,
  });
});

// # Ändere einen Kontakt
app.put("/contacts/:id", (req, res) => {
  // TODO: Implement
  res.send("Not implemented");
});

// # Lösche einen Kontakt
app.delete("/contacts/:id", (req, res) => {
  // TODO: Implement
  res.send("Not implemented");
});

app.listen(PORT, () => {
  console.log("server running on Port:", PORT);
});
