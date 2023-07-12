import express from "express";

const app = express();
const PORT = 3000;

const contacts = [];
let id = 0;

const getId = (contact) => {
  id += 1;
  contact.id = id;
};

// Middelware
app.use(express.json());

// Alle Kontakte auslesen
app.get("/contacts", (req, res) => {
  res.json(contacts);
});

// Bestimmten Kontakt anhand der ID aufrufen
app.get("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const selectedContact = contacts.find(
    (contact) => contact.id.toString() === contactId
  );
  console.log(selectedContact);
  if (!selectedContact) {
    return res.status(404).json({ error: "Kontakt nicht gefunden" });
  }
  res.json(selectedContact);
});

// Kontakt erstellen
app.post("/contacts", (req, res) => {
  const contact = {
    name: "Paula",
    number: "0123456789",
    email: "paula@paulaner.com",
  };
  getId(contact);
  contacts.push(contact);
  res.json(contacts);
});

// Kontakt anhand einer Id aktualisieren
app.put("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  // # find gibt uns das erste Element zurück was gefunden wird und hört dann auf zu suchen!
  const selectedContact = contacts.find(
    (contact) => contact.id.toString() === contactId
  );
  selectedContact.name = "Udo";
  selectedContact.number = 4723234344;
  selectedContact.email = "udo@udomail.com";
  if (!selectedContact) {
    return res.status(404).json({ error: "Kontakt nicht gefunden" });
  }
  res.json(selectedContact);
});

// Bestimmten Kontakt anhand der ID löschen
app.delete("/contacts/:id", (req, res) => {
  const contactId = Number(req.params.id);
  contacts.map((item, key, arr) => {
    if (item.id === contactId) {
      arr.splice(key, 1);
    }
  });
  res.json(contacts);
});

// FALLBACK
app.use((req, res, next) => {
  res.send("Request fehlgeschlagen");
});

app.listen(PORT, () => console.log("LÄUFT...", PORT));
