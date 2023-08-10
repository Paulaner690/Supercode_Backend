VORGEHENSWEISE:

//Schritt 1: Packages installieren
npm init -y
npm i
"cloudinary": "^1.39.0",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"crypto": "^1.0.1", // für Hash
"dotenv": "^16.3.1",
"express": "^4.18.2",
"form-data": "^4.0.0",
"jsonwebtoken": "^9.0.1",
"mailgun.js": "^9.2.0",
"mongoose": "^7.4.1",
"morgan": "^1.10.0",
"multer": "^1.4.5-lts.1"

npm i uuid nicht nötig bei mongoose dotenv (wird von mongoDB erstellt)

//Schritt 2: Änderungen in package json - module,script-dev
"main" anpassen z.B. "server.js"
"type":"module",
in script "dev": "node --watch server.js"

//Schritt 3:
.env und .gitignore erstellen

//Schritt 4: Variablen
const app = express();
const PORT = 3001;

//Schritt 5: Middelwares
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

//Schritt 6: Listen
app.listen(PORT, () => {
console.log(`Server läuft auf Port: ${PORT}`);
});

//Schritt 7: Routen
app.get("/status", (req,res) => {
res.send("Server läuft problemlos")
})
erste Route testen : http://localhost:3001/status

Methoden:
GET -> get req an Server damit wir was zurück bekommen (kann keine Daten empfangen, die anderen schon)
POST -> hinzufügen
PUT -> bearbeiten
DELETE -> löschen

//Schritt 8:
mongoose models ordner im Backend
index.js drin
import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017")
//für Uri ("mongodb://localhost:27017/NAME DER DATENBANK") in mongo db oben links string copy

in server.js:
import "./models/index.js" -> connecten zur MeineNeueDatenbank

//Schritt 9:

- Model datei anlegen
- Schema festlegen
- export const Car = mongoose.model("Car", carSchema)
  //name = collection name
  // + schema name

- in server.js importieren:
  import {Car} from "./models/CarModel.js"

//Schritt 10:

- in server.js Schema nutzen
- POST http://localhost:3001/api/v1/createCar -> test thunderclient
- in json:
  {
  "test":"test"
  }

//Schritt 11: neuen Post in datenbank speichern

- app.post("/api/v1/createCar", async (req,res) => {
  try {
  //console.log(req.body);
  //neuen Post in Var speichern
  //Car Model exportieren
  //()Objekt rein
  // im req.body alles was ins backend geht
  const newPostCar = await Car.create(req.body)
  //als json zurückschicken
  res.json(newPostCar)
  } catch (error) {
  console.log(error);
  res.status(501).end()
  }
  }

- in Thunderclient testen:
- POST http://localhost:3001/api/v1/createCar
- in JSON eingeben:
  {
  "model":"C-Klasse",
  "color":"black",
  "wheels":4
  }

JETZT Check in MongoDB ob post erschienen

===============================================================

FRONTEND
//Schritt 1:
Ordner erstellen
npm create vite@latest
name
cd frontend
npm i
"axios": "^1.4.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.14.2"
npm run dev

//Schritt 2:
App.jsx ausfüllen

//Schritt 3:
Daten fetchen mit fetch oder axios:

//Schritt 4: BESSER weil man code spart + besseres error handling
axios installieren
importieren
Funktion aufstellen

danach Test im Browser on Object in console angezeigt wird

// Schritt 5: Proxy in vite eingeben wenn man es nutzt!
export default defineConfig({
plugins: [react()],
server:{
port:3000,
proxy: {
"/api": {target: "http://localhost:3001/", changeOrigin: true}
}
}
})
