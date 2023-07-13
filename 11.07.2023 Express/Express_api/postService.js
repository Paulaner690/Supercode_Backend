// # 4
import e from "express";
import fs from "fs/promises";

// Absoluter Pfad zur Json-Datei
const PostsFileURL = new URL("./data/posts.json", import.meta.url);

export const getPosts = async () => {
  let fileContent = await fs.readFile(PostsFileURL, { encoding: "utf8" });

  fileContent = JSON.parse(fileContent);

  return fileContent;
};

export const getPostById = async (id) => {
  const posts = await getPosts();
  let resultPost;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log({ id, postId: post.id, vergleich: id === post.id });
    if (id === post.id) {
      resultPost = post;
      continue;
    }
  }

  return resultPost;
};
