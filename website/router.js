import express from "express";
import homeControler from "./controlers/homeControler.js";
import avisControler from "./controlers/avisControler.js";
import crepeControler from "./controlers/crepeControler.js";
import galetteControler from "./controlers/galetteControler.js";
import boissonControler from "./controlers/boissonControler.js";
import addAvisControler from "./controlers/addAvisControler.js";
import addConcoursControler from "./controlers/addConcoursControler.js";
import restaurantControler from "./controlers/restaurantControler.js";
import carteControler from "./controlers/carteControler.js";

const router = express.Router();

router.get("/", homeControler);
// router.get("/crepe", crepeControler);
// router.get("/galette", galetteControler);
// router.get("/boissons", boissonControler);
router.get("/restaurants", restaurantControler);
router.get("/:id/carte", carteControler);

router.post("/concours/", addConcoursControler);

router.get("/avis", avisControler);
router.post("/avis", addAvisControler);

export default router;
