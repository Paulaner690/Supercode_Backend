// FileSystem  ermöglicht Zugriff auf Dateisystem. Die Version mit /promises gibt uns die Möglichkeit, die Funktionen asynchron mithilfe von Promises zu verwenden.
import fs from "node:fs/promises";
// eindeutige IDs (Universally Unique Identifiers) für unsere Kontakte generieren
import { v4 as uuidv4 } from "uuid";

// Der Pfad zur JSON-Datei, in der die Kontaktdaten gespeichert werden.
const filePath = "./data/contacts.json";

// Array, das die Liste der Kontakte speichert.
export let contacts = [];

// ! DATEN LESEN
// Eine asynchrone Funktion, die die Kontaktdaten aus der JSON-Datei liest und in das contacts-Array lädt.
const getData = async () => {
  try {
    // Inhalt der Datei mit dem angegebenen "filePath" lesen
    const buffer = await fs.readFile(filePath);
    // JSON.parse() konvertiert den gelesenen Inhalt von JSON-Format zu JavaScript-Objekten und Arrays.
    contacts = JSON.parse(buffer);
  } catch (error) {
    // Fehler abfangen und in der Konsole ausgeben
    console.error("Error reading todos from file", error);
  }
};
// Funktion ausführen
getData();

// ! DATEN IN DER JSON-DATEI SPEICHERN
// Kontaktdaten aus dem contacts-Array in die JSON-Datei schreiben
const saveData = async () => {
  try {
    // Inhalt des contacts-Arrays im JSON-Format in die angegebene Datei.
    await fs.writeFile(filePath, JSON.stringify(contacts));
  } catch (error) {
    console.error("Error saving todos to file", error);
  }
};

// ! NEUEN KONTAKT HINZUFÜGEN UND ZURÜCKGEBEN
// Dies ist eine asynchrone Funktion, die einen neuen Kontakt zum contacts-Array hinzufügt und den neu erstellten Kontakt zurückgibt. Der Parameter contact ist ein Objekt, das die Kontaktinformationen enthält.
export const addContact = async (contact) => {
  // neues Kontaktobjekt erstellt, das alle Eigenschaften des übergebenen contact-Objekts enthält und zusätzlich eine eindeutige ID, die mit uuidv4() generiert wird. Das ... ist der Spread-Operator, der die Eigenschaften des contact-Objekts in das neue newContact-Objekt kopiert.
  const newContact = { ...contact, id: uuidv4() };
  // Fügt den neuen Kontakt dem contacts-Array hinzu.
  contacts.push(newContact);
  // Speichert die aktualisierten Kontaktdaten in der JSON-Datei. Diese Funktion ist ebenfalls asynchron und wird mit await aufgerufen, damit die Operation abgeschlossen ist, bevor die Funktion addContact fortfährt.
  await saveData();
  // neu erstellte Kontaktobjekt zurückgeben. Dadurch kann der Aufrufer der Funktion die Daten des neu erstellten Kontakts erhalten, einschließlich der generierten eindeutigen ID.
  return newContact;
};

// ! ID SUCHEN
// Hier wird die Array.findIndex()-Funktion verwendet, um den Index des Kontakts mit der entsprechenden ID zu finden.
const _findEntryIndex = (id) => {
  return contacts.findIndex((contact) => contact.id === id);
};

// ! KONTAKT AKTUALISIEREN
// Eine asynchrone Funktion, die einen vorhandenen Kontakt aktualisiert und den aktualisierten Kontakt zurückgibt.
export const updateContact = async (id, contact) => {
  // Die Funktion _findEntryIndex(id) wird aufgerufen, um den Index des vorhandenen Kontakts im contacts-Array anhand der übergebenen ID zu finden.
  const contactIndex = _findEntryIndex(id);
  // Hier wird überprüft, ob der Kontakt mit der angegebenen ID im contacts-Array gefunden wurde. Wenn der Kontakt gefunden wurde (der contactIndex ist nicht -1), wird der folgende Code ausgeführt.
  if (contactIndex !== -1) {
    // Eigenschaften des vorhandenen Kontakts mit den aktualisierten Eigenschaften überschreiben. Der Spread-Operator ... wird verwendet, um die Eigenschaften in das neue Objekt zu kopieren.
    const updatedContact = { ...contacts[contactIndex], ...contact };
    // Der vorhandene Kontakt im contacts-Array wird mit dem aktualisierten Kontaktobjekt updatedContact aktualisiert.
    contacts[contactIndex] = updatedContact;
    // Speichert die aktualisierten Kontaktdaten in der JSON-Datei.
    await saveData();
    return updatedContact;
  }
  // Wenn der Kontakt mit der angegebenen ID nicht gefunden wurde (der contactIndex ist -1), wird null zurückgegeben, um anzuzeigen, dass kein Kontakt aktualisiert wurde.
  return null;
};

// ! KONTAKT LÖSCHEN
// Eine asynchrone Funktion, die einen vorhandenen Kontakt anhand seiner ID löscht und true zurückgibt, wenn der Kontakt erfolgreich gelöscht wurde, ansonsten false.
export const deleteContact = async (id) => {
  const contactIndex = _findEntryIndex(id);
  if (contactIndex !== -1) {
    // Entfernt den Kontakt mit dem angegebenen Index aus dem contacts-Array.
    contacts.splice(contactIndex, 1);
    // Speichert die aktualisierten Kontaktdaten in der JSON-Datei.
    await saveData();
    return true;
  }
  return false;
};
