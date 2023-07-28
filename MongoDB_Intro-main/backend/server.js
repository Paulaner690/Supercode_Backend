import "./config/config.js";
import express from "express";
import "./models/index.js";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";
import multer from "multer"; // Multer ist eine Middelware
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import postRouter from "./controller/post.js";

const FE_DIR = new URL("../frontend/dist", import.meta.url);
const FE_INDEX = new URL("../frontend/dist/index.html", import.meta.url)
  .pathname;

// console.log(process.env.CLOUDINARY_CLOUDNAME);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(FE_DIR));

// # PostRouter
app.use("/api/posts", postRouter);

app.post("/api/newAuthor", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.json(newAuthor);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

app.get("/api/getPostsByAuthor/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await Post.find({ author: authorId });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

//! MIDDLEWARE
app.use((req, res, next) => {
  if (req.fail) {
    res.status(500).json({ error: "FAIL" });
  } else {
    next();
  }
});

app.get("*", (req, res) => res.sendFile(FE_INDEX));

app.listen(PORT, () => console.log("Der Server läuft", PORT));
