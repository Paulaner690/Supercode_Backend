import express from "express";
import multer from "multer"; // Multer ist eine Middelware

const postRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// ! MIDDLEWARE
const logger = (req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
};

postRouter.use("/", logger);

postRouter.get("/", logger, async (req, res) => {
  const data = await Post.find();
  res.json(data);
});

postRouter.post("/api/addPost", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    const author = await Author.findById(req.body.author);

    if (author === null) {
      return res.send("Author is invalid");
    }
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "MyBlog" },
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

    // const response = await Post.create(req.body);
    // res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("there was an error");
  }
});

postRouter.put("/api/editPost/:id", async (req, res) => {
  const edits = req.body;
  const postId = req.params.id;

  try {
    const dbRes = await Post.findByIdAndUpdate(postId, edits, { new: true });
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

postRouter.delete("/api/deletePost/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const dbRes = await Post.findByIdAndDelete(postId);
    cloudinary.uploader.destroy(dbRes.image?.imageId, (err) =>
      console.log(err)
    );
    res.send("post has been deleted");
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

export default postRouter;
