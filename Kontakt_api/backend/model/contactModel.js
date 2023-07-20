import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: Number,
});

export const ContactModel = mongoose.model("ContactModel", contactSchema);
