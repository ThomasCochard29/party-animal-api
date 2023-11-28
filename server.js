import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Database Connection
import sequelize from "./db/connexion.js";

// Association
// import "./models/association.js"; // Importer les associations depuis le fichier associations.js

// Routes
import routesUser from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://192.168.1.19:8081",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files Configuration (upload des images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Upload file
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  "/assets",
  express.static(path.join(__dirname, "public/assets"), {
    setHeaders: function (res, path) {
      res.type(path);
    },
  })
);

// Database Connect
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing with the database:", error);
  });

// Routes
app.use(routesUser);

// Test route
app.get("/api", (req, res) => {
  res.send("Bienvenue sur le serveur de mon application !");
});
