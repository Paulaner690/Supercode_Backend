import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {});

app.get("/todos/:id", (req, res) => {});

app.post("/todos", (req, res) => {});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log("server running on Port:", PORT);
});
