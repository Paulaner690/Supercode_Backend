import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.MONGO_URI);
