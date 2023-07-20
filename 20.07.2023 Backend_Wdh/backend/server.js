// IMPORTS
import express from "express";
import morgan from "morgan";
import cors from "cors";
// wird so direkt ausgeführt:
// Verbindung zur Datenbank
import "./models/index.js";
import { Car } from "./models/CarModel.js";

// VARIABLEN
const app = express();
const PORT = 3001;

// MIDDLEWARES
// .use = Middleware (wird bei jedem request ausgeführt)
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// ROUTEN
// * zum Testen:
app.get("/status", (req, res) => {
  res.send("Server läuft ohne Probleme");
});

// * Daten bekommen
app.get("/car/:index", (req, res) => {
  console.log(req.params);
  res.end();
});

// * Neue Daten speichern
app.post("/api/v1/createCar", async (req, res) => {
  try {
    console.log(req.body);
    const dbRes = await Car.create(req.body);
    res.json(dbRes);
  } catch (error) {
    console.log(error);
    res.status(501).end();
  }
});

// LISTEN
app.listen(PORT, () => {
  console.log("Server läuft auf Port:", PORT);
});
