import express from "express";
import axios from "axios";

import { getPostById, getPosts } from "./postService.js";

// Port hat viele Zimmer und dieser ist unsere Zimmernummer. (Wo auf unserem Computer soll dieses Programm laufen)
const PORT = 3001;
// Express-Instanz (Import ausführen)
const app = express();

// # 1 Status Code 200 (success)
// Erste Route, erlaubt uns zu checken ob die express App funktioniert (Status 200 ok, ab 400 Fehler)
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

// # 2 axios fetch
// Http-Verb, Endpunkt(URL-Path), Callback mit (request, template- response)
app.get("/post", (req, res) => {
  /*
   * Beispiel mit fetch, wir müssen den body konvertieren.
   * Mit axios passiert das automatisch und vereinfacht den
   * zugriff auf die komplette response mit dem body.
   */
  // fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // res.send("OK");

  // # 4
  //  Hole alle Posts (Promise) und dann senden wir diese Posts als JSON zurück
  getPosts().then((posts) => {
    console.log(posts);
    res.json(posts);
  });
});

// Das selbe mit async. Mache also aus dieser Funktion ein Promise (async)
app.get("/post-async", async (req, res) => {
  // Pausiere den umliegenden Promise/warte auf alle Posts (NUR DIESE FUNKTION WIRD GESTOPPT, NEBENBEI KANN DER RESTLICHE CODE WEITERLADEN)
  const posts = await getPosts();

  console.log(posts);
  // Nimm Posts und sende diese zurück
  res.json(posts);
});

// app.get("/post", (req, res) => {
//   axios
//     .get("https://jsonplaceholder.typicode.com/posts")
//     .then((placeholderResponse) => {
//       // ! .data weil sonst auch der Head mitausgegeben wird
//       console.log(placeholderResponse.data);
//       res.send(placeholderResponse.data);
//     });
// });

// # 3 id route params
// app.get("/post/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   res.send(data);
// });

// # 4
// Get-Methode, individuelle Posts durch :id (Placeholder, wahrhaftigen Wert können wir über req.params.id), asynchrone Funktion
app.get("/post/:requestID", async (req, res) => {
  // Aus dem request holen wir uns die id und speichern diese als Nummer in der const id
  const requestID_AsNumber = Number(req.params.requestID);
  // Wir warten auf getPostById aus postService.js das diese den entsprechenden Post zurückgibt und speichern diesen Wert in Data
  const data = await getPostById(requestID_AsNumber);
  // data loggen
  console.log(data);
  // senden Antwort mit data (post)
  res.send(data);
});

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
