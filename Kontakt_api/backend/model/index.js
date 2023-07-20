import mongoose from "mongoose";

// Verbindung zur Datenbank
await mongoose.connect("mongodb://localhost:27017/KontaktAPI");
