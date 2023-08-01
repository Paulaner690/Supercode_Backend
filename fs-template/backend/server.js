import { pathToFileURL } from "url";
import express from "express";
import dotenv from "dotenv";
import data from "./data.json" assert { type: "json" };
// !
import mongoose from "mongoose";
import { userRouter } from "./user/routes.js";
import cookieParser from "cookie-parser";

const dotenvPath = new URL("../.env", import.meta.url).pathname;
const fileURL = pathToFileURL(dotenvPath);

dotenv.config({
  path: pathToFileURL(new URL("../.env", import.meta.url).pathname),
});

// !
await mongoose.connect(process.env.DB);

const PORT = process.env.PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(ReactAppDistPath.pathname));
// !
app.use("/api/user", userRouter);

/*
 * express.static matched auf jede Datei im angegebenen Ordner
 * und erstellt uns einen request handler for FREE
 * app.get("/",(req,res)=> res.sendFile("path/to/index.html"))
 * app.get("/index.html",(req,res)=> res.sendFile("path/to/index.html"))
 */

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/nobel-prize", (req, res) => {
  // console.log({ query: req.query }, req.query.query.year);
  const { year, sortBy } = req.query;
  // console.log(year, sortBy);
  let responseData = [...data.prizes];

  if (year) {
    responseData = responseData.filter((prize) => {
      return prize.year === year;
    });
  }

  if (sortBy) {
    responseData.sort((prizeA, prizeB) => {
      if (prizeA[sortBy] >= prizeB[sortBy]) {
        return -1;
      } else if (prizeA[sortBy] <= prizeB[sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  res.json(responseData);
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
