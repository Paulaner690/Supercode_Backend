// # npm i express core mongoose
import express from "express";
// Verbindung zur Datenbank:
import "./models/index.js";
// Schema:
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";

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
  try {
    const author = await Author.findById(req.body.author);
    console.log(author);
    if (author === null) {
      return res.send("Author is invalid");
    }

    console.log(req.body);
    // Post erstellen
    const response = await Post.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("da war ein Fehler");
  }

  //alternative Ansätze zur Erstellung eines neuen Beitrags zeigen. In diesem Fall wird ein neues Post-Objekt erstellt, der Autor wird festgelegt und der Beitrag wird in der Datenbank gespeichert.
  // const newPost = new Post(post)
  // console.log(newPost)
  // newPost.author ="***"
  // const response2 = await newPost.save()
});

//  ! Post verändern
// Diese Route handhabt PUT-Anfragen an "/api/editPost/:id".
// Die Funktion wird asynchron ausgeführt, um auf die Datenbankoperationen zu warten.
// Die in der Anfrage enthaltenen Änderungen (edits) werden aus dem Anfragekörper extrahiert.
// Die `id` wird aus den URL-Parametern extrahiert, um den zu bearbeitenden Beitrag in der Datenbank zu identifizieren.
// Das `Post.findByIdAndUpdate()` führt die Datenbankaktualisierung durch, indem es den Beitrag mit der angegebenen `id` sucht und die Änderungen anwendet.
// Die aktualisierte Version des Beitrags wird als JSON an den Client zurückgegeben.
// Im Fehlerfall wird der Fehler in der Konsole protokolliert und dem Client die Meldung "there was an error" gesendet.

app.put("/api/editPost/:id", async (req, res) => {
  const edits = req.body; // Extrahiert die Bearbeitungen (Änderungen) aus dem Anfragekörper.
  const postId = req.params.id; // Extrahiert die `id` aus den URL-Parametern.

  try {
    const dbRes = await Post.findByIdAndUpdate(postId, edits, { new: true });
    res.json(dbRes); // Gibt das aktualisierte Beitrag-Objekt als JSON an den Client zurück.
  } catch (err) {
    console.log(err); // Protokolliert den Fehler in der Konsole.
    res.send("there was an error"); // Sendet dem Client die Meldung "there was an error".
  }
});

//  ! Post löschen
// Diese Route handhabt DELETE-Anfragen an "/api/deletePost/:id".
// Die Funktion wird asynchron ausgeführt, um auf die Datenbankoperationen zu warten.
// Die `id` wird aus den URL-Parametern extrahiert, um den zu löschenden Beitrag in der Datenbank zu identifizieren.
// Das `Post.findByIdAndDelete()` sucht den Beitrag mit der angegebenen `id` und löscht ihn aus der Datenbank.
// Wenn der Beitrag erfolgreich gelöscht wurde, wird dem Client die Meldung "post has been deleted" gesendet.
// Im Fehlerfall wird der Fehler in der Konsole protokolliert und dem Client die Meldung "there was an error" gesendet.
app.delete("/api/deletePost/:id", async (req, res) => {
  const postId = req.params.id; // Extrahiert die `id` aus den URL-Parametern.

  try {
    const dbRes = await Post.findByIdAndDelete(postId); // Sucht und löscht den Beitrag mit der `id`.
    res.send("post has been deleted"); // Sendet dem Client die Meldung "post has been deleted".
  } catch (err) {
    console.log(err); // Protokolliert den Fehler in der Konsole.
    res.send("there was an error"); // Sendet dem Client die Meldung "there was an error".
  }
});

// ! Author hinzufügen
// Diese Route handhabt POST-Anfragen an "/api/newAuthor".
// Die Funktion wird asynchron ausgeführt, um auf die Datenbankoperationen zu warten.
// `Author.create(req.body)` erstellt einen neuen Datenbankeintrag für den Autor mit den Daten, die im Anfragekörper enthalten sind.
// Die Antwort der Datenbankoperation, das neu erstellte `Author`-Objekt, wird als JSON an den Client zurückgegeben.
// Im Fehlerfall wird der Fehler in der Konsole protokolliert und dem Client die Meldung "there was an error" gesendet.
app.post("/api/newAuthor", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body); // Erstellt einen neuen Datenbankeintrag für den Autor.
    res.json(newAuthor); // Gibt das neu erstellte `Author`-Objekt als JSON an den Client zurück.
  } catch (err) {
    console.log(err); // Protokolliert den Fehler in der Konsole.
    res.send("there was an error"); // Sendet dem Client die Meldung "there was an error".
  }
});

// Diese Route handhabt GET-Anfragen an "/api/getPostsByAuthor/:authorId".
// Die Funktion wird asynchron ausgeführt, um auf die Datenbankoperationen zu warten.
// Die `authorId` wird aus den URL-Parametern extrahiert, um alle Beiträge zu finden, die von einem bestimmten Autor erstellt wurden.
// Das `Post.find({ author: authorId })` sucht alle Beiträge in der Datenbank, deren `author`-Feld mit der `authorId` übereinstimmt.
// Die gefundenen Beiträge werden als JSON an den Client zurückgegeben.
// Im Fehlerfall wird der Fehler in der Konsole protokolliert und dem Client die Meldung "there was an error" gesendet.
app.get("/api/getPostsByAuthor/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId; // Extrahiert die `authorId` aus den URL-Parametern.
    const posts = await Post.find({ author: authorId }); // Sucht alle Beiträge mit dem Autor, der die `authorId` hat.
    res.json(posts); // Gibt die gefundenen Beiträge als JSON an den Client zurück.
  } catch (err) {
    console.log(err); // Protokolliert den Fehler in der Konsole.
    res.send("there was an error"); // Sendet dem Client die Meldung "there was an error".
  }
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port:", PORT);
});
