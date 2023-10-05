import express from "express";
import homeControler from "./controlers/homeControler.js";
import avisControler from "./controlers/avisControler.js";
import crepeControler from "./controlers/crepeControler.js";
import galetteControler from "./controlers/galetteControler.js";
import boissonControler from "./controlers/boissonControler.js";
import addAvisControler from "./controlers/addAvisControler.js";
import addConcoursControler from "./controlers/addConcoursControler.js";

const router = express.Router();

router.get("/", homeControler);
router.get("/crepe", crepeControler);
router.get("/galette", galetteControler);
router.get("/boissons", boissonControler);

router.post("/concours/", addConcoursControler);

router.get("/avis", avisControler);
router.post("/avis", addAvisControler);

export default router;
