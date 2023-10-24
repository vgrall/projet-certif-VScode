import express from "express";
import router from "./router.js";
import routerAPI from "./routerAPI.js";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const PORT = 3000;
const app = express();

// utilisation d'une session
app.use(
  session({
    secret: "sdgfdgdfgdfgfdg",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

//pour récupérer les informations du formulaire
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // Définit le moteur de modèle EJS
app.set("views", "./views"); // Définit le répertoire des vues

app.use(express.json());

app.use(
  cors({
    // pour autoriser les requêtes cross-origin
    origin: "http://localhost:3001",
    credentials: true, // pour autoriser les cookies
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);
app.use(routerAPI);

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur : http://localhost:${PORT}`);
});
