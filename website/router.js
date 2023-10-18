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
import mentions_legales from "./controlers/mentions_legales.js";

router.get("/", homeControler);
router.get("/mentions_legales", mentions_legales);
router.get("/restaurants", restaurantControler);
router.get("/:id/carte", carteControler);

router.post("/concours/", addConcoursControler);

router.get("/avis", avisControler);
router.post("/avis", addAvisControler);

export default router;
