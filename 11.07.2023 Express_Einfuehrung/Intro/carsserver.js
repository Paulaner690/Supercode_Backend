import express from "express";

const app = express();
const PORT = 9898;

// Wir wollen einen Autohandel simulieren. Wir brauchen folgende Routen
// a) wir wollen alle autos
// b) wir erzeugen ein neues Auto
// c) wir wollen ein bestimmtes Auto

// GET --> Read
// POST --> Create
// PUT --> Update
// DELETE --> Delete

const cars = [];
let id = 0;

function getId(car) {
  id += 1;
  car.id = id;
}

// Middleware zum auslesen des Bodys, wenn dieser Daten im JSON Format beinhaltet
// Bodyparser
app.use(express.json());

// a)
app.get("/cars", (req, res) => {
  res.json(cars);
});

// b)
app.post("/cars", (req, res) => {
  const car = { model: "BMW", color: "lila", price: 50000 };
  getId(car);
  cars.push(car);
  res.json(cars);
});

// c)
app.delete("/cars", (req, res) => {
  console.log("Schau dir mal meinen Body:", req.body);
  // Object destructuring
  // {id:4, name:"Christian", ort:"Berlin"}
  const { id } = req.body;
  console.log(id);
  cars.map((item, key, arr) => {
    if (item.id === id) {
      arr.splice(key, 1);
    }
  });
  res.json(cars);
});

app.listen(PORT, () => console.log("Ich stehe vor derTür mit der Nr", PORT));
