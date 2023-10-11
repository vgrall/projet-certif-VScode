import query from "./database.js";
import express from "express";

const router = express.Router();

// redirection vers la page d'accueil
router.get("/api", (req, res) => {
  res.redirect("/");
});

// /******************  /API : Menu Items *******************/

/**
 * API : Menus
 * Recuperation de tous les menus
 */
router.get("/api/menus", (req, res) => {
  const q =
    "SELECT m.id, m.name, m.price, m.name, c.NAME as 'category', m.CATEGORIES_ID as categories_id " +
    "FROM MENU_ITEMS as m , CATEGORIES as c WHERE c.ID = m.CATEGORIES_ID " +
    "ORDER BY m.name ASC";
  query(q, [], (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json(data);
  });
});

/**
 * API : Menus
 * Insertion d'un menu item
 */
router.post("/api/menus", (req, res) => {
  console.log("POST /api/menus", req.body);
  const categories_id = req.body.categories_id;
  const name = req.body.name;
  const price = req.body.price;

  // id généré automatiquement (AUTO_INCREMENT)
  // voir https://dev.mysql.com/doc/refman/8.0/en/example-auto-increment.html
  const q =
    "INSERT INTO MENU_ITEMS (name, price, categories_id) VALUES (?, ?, ?)";
  const values = [name, price, categories_id];

  query(q, values, (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json("Element créé avec succès");
  });
});

/**
 * API : Menus
 * Recuperation d'un menu item
 */
router.get("/api/menus/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT m.id, m.name, m.price, m.name, c.NAME as 'category', m.CATEGORIES_ID as categories_id " +
    "FROM MENU_ITEMS as m , CATEGORIES as c " +
    "WHERE c.ID = m.CATEGORIES_ID " +
    "AND m.id = ? ";
  query(q, [id], (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    // query sur un seul élément, on renvoie le premier élément du tableau
    if (data.length === 0) {
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
});

/**
 * API : Menus
 * Suppression d'un menu item
 */
router.delete("/api/menus/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM MENU_ITEMS WHERE id = ?";
  query(q, [id], (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json("Element supprimé avec succès");
  });
});

/**
 * API : Menus
 * Modification d'un menu item
 */
router.put("/api/modif/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const categories_id = req.body.categories_id;
  const name = req.body.name;
  const price = req.body.price;

  const q =
    "UPDATE MENU_ITEMS SET name= ?, price= ?, categories_id = ? WHERE id = ?";
  const values = [name, price, categories_id, id];
  query(q, values, (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json(data);
  });
});

// /******************  /API : Menu Items *******************/

// /******************  API : Categories *******************/

/**
 * API : Categories
 * Recuperation de toutes les categories
 */
router.get("/api/categories", (req, res) => {
  const q = "SELECT * FROM CATEGORIES ORDER BY ID ASC";
  query(q, [], (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json(data);
  });
});

/**
 * API : User
 * Recuperation de tous les Users
 */

router.get("/api/accueil", (req, res) => {
  const q = "SELECT a.id, a.pseudo, a.password " + "FROM USERS as a";
  query(q, [], (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json(data);
  });
});

router.post("/api/accueil", (req, res) => {
  console.log("POST /api/menus", req.body);

  const id = req.body.id;
  const password = req.body.password;

  console.log("POST /api/accueil", req.body);
  const q = "SELECT * FROM USERS WHERE id = ? AND password = ?";
  const values = [id, password];

  query(q, values, (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json("Erreur serveur");
      return;
    }

    if (data.length === 0) {
      res.status(401).json("Identifiants incorrects");
      return;
    }

    // Authentification réussie

    res.redirect("/accueil");
  });
});

// /******************  /API : Categories *******************/

export default router;
