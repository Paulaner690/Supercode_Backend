// # npm i express core mongoose
import express from "express";
// Verbindung zur Datenbank:
import "./models/index.js";
// Postschema:
import { Post } from "./models/PostModel.js";

const app = express();
const PORT = 3001;

// ! Middleware
// express.json() ist eine eingebaute Middleware-Funktion in Express.js.
// Sie analysiert den Anfragekörper, wenn er im JSON-Format vorliegt, und setzt das req.body-Objekt auf die geparsten JSON-Daten.
// Diese Middleware ist erforderlich, um JSON-Daten zu verarbeiten, die von einem Client an den Server gesendet werden, z. B. bei POST-Anfragen mit JSON-Payload.
// Durch das Hinzufügen dieser Middleware wird Express in der Lage sein, den Anfragekörper zu analysieren und die Daten im JSON-Format für weitere Verarbeitung verfügbar zu machen.
app.use(express.json());

// # MongoDB erstellt die Datenbank und collection automatisch
// ! Post hinzufügen
const addPost = async (post) => {
  // Neuen Post erstellen
  const newPost = new Post(post);
  //   * hier könnte der Post noch vor dem Speichern bearbetet werden
  //   Push in die DB mit .save()
  const response = await newPost.save();
  console.log(response);
};
// ! Funktion ausführen
// addPost({
//   title: "Mein erster Post",
//   content: "Willkommen auf dem Blog",
//   author: "Paula",
// });
// addPost({
//   title: "Mein ZWEITER Post",
//   content: "Willkommen auf dem Blog",
//   author: "Marius",
// });
// addPost({
//   title: "Mein DRITTER Post",
//   content: "Willkommen auf dem Blog",
//   author: "Farid",
// });

// ! Bestimmten Post suchen (durch Parameter)
// const findPost = async (search) => {
//   const posts = await Post.find({ author: search });
//   console.log(posts);
// };
// findPost("Marius");

// ! Alle Posts ausgeben
// GET-Anfrage an "/api/posts":

// Diese Route handhabt GET-Anfragen an "/api/posts".
// Die Funktion wird asynchron ausgeführt, um auf die Ergebnisse der Datenbankabfrage zu warten.
// Post.find() wird verwendet, um alle vorhandenen Beiträge aus der Datenbank abzurufen.
// Die erhaltenen Daten werden als JSON an den Client zurückgegeben.

app.get("/api/posts", async (req, res) => {
  // alle Posts finden
  const data = await Post.find();
  res.json(data);
});

// ! Neuer Post
// POST-Anfrage an "/api/addPost":

// Diese Route handhabt POST-Anfragen an "/api/addPost".
// Die Funktion wird asynchron ausgeführt, um auf die Datenbankoperationen zu warten..
// Post.create(req.body) erstellt einen neuen Datenbankeintrag mit den im Anfragekörper enthaltenen Daten.
// Die Antwort der Datenbankoperation wird als JSON an den Client zurückgegeben.

app.post("/api/addPost", async (req, res) => {
  console.log(req.body);
  // Post erstellen
  const response = await Post.create(req.body);
  res.json(response);

  //alternative Ansätze zur Erstellung eines neuen Beitrags zeigen. In diesem Fall wird ein neues Post-Objekt erstellt, der Autor wird festgelegt und der Beitrag wird in der Datenbank gespeichert.
  // const newPost = new Post(post)
  // console.log(newPost)
  // newPost.author ="***"
  // const response2 = await newPost.save()
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port:", PORT);
});
