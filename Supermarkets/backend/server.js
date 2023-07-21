import "./config/config.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import "./models/index.js";
import { Supermarkt } from "./models/SupermarktModels.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() });

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ROUTES
// Test
app.get("/api/server", async (req, res) => {
  res.send("LÄUFT");
});

app.get("/api/supermarkt", async (req, res) => {
  const allSupermarkets = await Supermarkt.find();
  res.send(allSupermarkets);
});

app.post("/api/supermarkt", async (req, res) => {
  const content = req.body;
  const postSupermarket = await Supermarkt.create(content);
  res.send(postSupermarket);
});

// Mit Bild
app.post("/api/supermarkt/image", upload.single("image"), async (req, res) => {
  try {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "einzelhandel" },
        async (err, result) => {
          const response = await Supermarkt.create({
            ...req.body,
            image: { url: result.secure_url, imageId: result.public_id },
          });
        }
      )
      .end(req.file.buffer);
    res.send("File wurde gepostet");
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

app.put("/api/supermarkt/:id", async (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  const editSupermarket = await Supermarkt.findByIdAndUpdate(id, updates);
  res.send(editSupermarket);
});

app.delete("/api/supermarkt/:id", async (req, res) => {
  const id = req.params.id;
  const deleteSupermarket = await Supermarkt.findByIdAndDelete(id);
  res.send("GELÖSCHT");
});

// LISTEN
app.listen(PORT, () => {
  console.log("Server läuft auf Port:", PORT);
});
