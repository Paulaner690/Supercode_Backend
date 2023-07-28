import mongoose from "mongoose";

// ! Verbindung zu Mongoose
await mongoose.connect("mongodb://localhost:27017/relation-test");

// ! Inventory Schema
const inventorySchenma = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ["bigstuff", "smallstuff"],
  },
});

const Inventory = mongoose.model("Inventory", inventorySchenma);

// ! User Schema
const userSchema = new mongoose.Schema({
  name: String,
  inventory: [inventorySchenma],
});

const User = mongoose.model("User", userSchema);

// !
await Inventory.findOneAndUpdate(
  { name: "Couch" },
  { name: "Couch", category: "bigstuff" },
  { upsert: true }
);

// ! 1. Suche Dokument (Bernd), 2. Update, 3. OptionsObject: wie verhält sich findOneAndUpdate : wenn es keinen User "Bernd" findet, dann erstelle einen neuen User (sonst updaten) upsert = an update that inserts a new document if no document matches the filter
await User.findOneAndUpdate(
  { name: "Bernd" },
  { name: "Bernd", inventory: [{ name: "Couch", category: "bigstuff" }] },
  { upsert: true }
);

// ! Mongoose connection trennen (da es oben einen Promise gibt, würde Node nie aufhören)
await mongoose.disconnect();
