// # Connection mit der DB

import mongoose from "mongoose";

// ! Verbindung zur Datenbank aufbauen (hinter den Port kommt der Name der Datenbank)
// ! wird automatisch erstellt, wenn diese noch nicht existiert
mongoose.connect("mongodb://localhost:27017/MyBlog");

// # muss in server.js importiert werden
