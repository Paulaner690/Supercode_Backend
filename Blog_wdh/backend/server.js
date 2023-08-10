import "./config/config.js";
import "./models/index.js"; // Connection zu mongoose
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "./models/PostModel.js";

const app = express();
const PORT = process.env.PORT;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// # Status Test
app.get("/status", (req, res) => {
  res.send("Ok");
});

// # Get all
app.get("/api/posts", async (req, res) => {
  const data = await Post.find();
  res.send(data);
});

// # Get one
app.get("/api/post/:id", async (req, res) => {
  try {
    const postId = await req.params.id;
    const singlePost = await Post.findById(postId);
    res.json(singlePost);
  } catch (error) {
    console.log(error);
    res.send("error vom singlePost GET");
  }
});

// # Post
app.post("/api/post", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "ImgPost" },
        async (err, result) => {
          console.log(result);
          const response = await Post.create({
            ...req.body,
            image: { url: result.secure_url, imageId: result.public_id },
          });
          res.json(response);
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log(err);
    res.status(500).send("shit happens Post");
  }
});

// # Edit
app.put("/api/updatePost/:id", upload.single("image"), async (req, res) => {
  console.log(req.body);
  try {
    const id = req.params.id;

    if (req.file) {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "ImgPost" },
          async (err, result) => {
            const response = await Post.findByIdAndUpdate(id, {
              ...req.body,
              image: { url: result.secure_url, imageId: result.public_id },
            });
            cloudinary.uploader.destroy(response.image?.imageId, (err) => {
              console.log(err, "error img update");
            });

            res.json(response);
          }
        )
        .end(req.file.buffer);
    } else {
      const updatePost = await Post.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      console.log(req.body, updatePost);
      res.send(updatePost);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send(error, "Put post");
  }
});

// # Delete
app.delete("/api/post/delete/:id", async (req, res) => {
  try {
    const postId = await req.params.id;
    const singlePost = await Post.findByIdAndDelete(postId);
    cloudinary.uploader.destroy(postId.image?.imageId, (err) =>
      console.log(err)
    );
    res.json(singlePost);
  } catch (error) {
    console.log(error);
    res.send("error delete Post");
  }
});

app.listen(PORT, () => console.log(`Der Server läuft auf Port: ${PORT}`));
