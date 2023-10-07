import express from "express";

const router = express.Router();

import homeControler from "./controlers/homeControler.js";
import avisControler from "./controlers/avisControler.js";
import addAvisControler from "./controlers/addAvisControler.js";
import addConcoursControler from "./controlers/addConcoursControler.js";
import restaurantControler from "./controlers/restaurantControler.js";
import carteControler from "./controlers/carteControler.js";
import { loginForm, login } from "./controlers/login.js";
import logout from "./controlers/logout.js";
import { addUser, addUserSubmit } from "./controlers/addUser.js";

//  Middleware pour vérifier si l'utilisateur est connecté
const checkAuthentification = (req, res, next) => {
  if (!req.session.isLogged) {
    res.redirect("/login");
    return;
  }
  next();
};

// passer l'information de connexion à toutes les vues
router.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

router.get("/", homeControler);

router.get("/login", loginForm);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user/add", checkAuthentification, addUser);
router.post("/user/add", checkAuthentification, addUserSubmit);

// hardcodé pour le moment
router.get("/admin", checkAuthentification, (req, res) => {
  res.redirect("http://localhost:3001/");
});
router.get("/restaurants", restaurantControler);
router.get("/:id/carte", carteControler);

router.post("/concours/", addConcoursControler);

router.get("/avis", avisControler);
router.post("/avis", addAvisControler);

export default router;
