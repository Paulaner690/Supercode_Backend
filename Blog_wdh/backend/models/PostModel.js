import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: {
    type: {
      url: String,
      imageId: String,
    },
  },
  description: String,
});

export const Post = mongoose.model("Post", postSchema);
