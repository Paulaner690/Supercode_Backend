import express from "express";
import axios from "axios";

import { getPosts } from "./postService.js";

const PORT = 3001;
const app = express();

// # 1 Status Code 200 (success)
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

// # 2 axios fetch
// # 4
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

getPosts().then((posts) => {
  console.log(posts);
  res.json(posts);
});

app.get("/post-async", async (req, res) => {
  const posts = await getPosts();

  console.log(posts);
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
app.get("/post/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  res.send(data);
});

// # 5

// # 6

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
