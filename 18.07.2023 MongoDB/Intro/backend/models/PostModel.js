import mongoose from "mongoose";

// Das Schema definiert die Struktur eines "Post"-Dokuments in der MongoDB-Datenbank.
// Das Mongoose-Modell ermöglicht den Zugriff auf die Datenbank und bietet Methoden
// zum Erstellen, Lesen, Aktualisieren und Löschen von Beiträgen in der Datenbank.

// # MongoDB erstellt Dinge automatisch, die nicht existieren

// ! Schema erstellen:
// alle Keys aus dem Objekt mit Datentyp definieren
// * Nur diese Keys werden am Ende abgespeichert
const postSchema = new mongoose.Schema({
  // title muss angegeben werden (required!)
  title: { type: String, required: true },
  content: String,
  author: String,
  //   views: Number,
});

// ! Model erstellen und exportieren (name, Schema)
// const postSchema = new mongoose.Schema({ ... });: Definiert ein Mongoose-Schema mit den gewünschten Feldern und deren Konfiguration. Das Schema besteht aus den folgenden Feldern:
// title: Ein erforderliches Feld vom Typ String, das den Titel des Beitrags enthält.
// content: Ein optionales Feld vom Typ String, das den Inhalt des Beitrags enthält.
// author: Ein optionales Feld vom Typ String, das den Autor des Beitrags enthält.
// export const Post = mongoose.model("Post", postSchema): Erstellt ein Mongoose-Modell mit dem Namen "Post", das auf dem definierten Schema basiert. Das Modell wird exportiert, um in anderen Teilen des Codes verwendet zu werden.

export const Post = mongoose.model("Post", postSchema);
