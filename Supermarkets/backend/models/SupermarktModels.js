import mongoose from "mongoose";

const supermarktSchema = new mongoose.Schema({
  name: String,
  mitarbeiter: Number,
  filialen: Number,
  image: {
    type: {
      url: String,
      imageId: String,
    },
  },
});

export const Supermarkt = mongoose.model("Supermarkt", supermarktSchema);
