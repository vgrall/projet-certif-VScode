import query from "./database.js";
import express from "express";
import bcrypt from "bcrypt";
import xss from "xss";

const router = express.Router();

// ******************  API : MIDDLEWARE AUTHENTIFICATION *******************/

// Middleware pour vérifier si l'utilisateur est connecté
const checkAuthentification = (req, res, next) => {
  if (!req.session.isLogged) {
    res.status(403).json({ message: "Accès non autorisé" });
  } else {
    next(); // Passer à la prochaine étape de la chaîne de middleware
  }
};

router.post("/login", (req, res) => {
  const pseudo = xss(req.body.pseudo);
  const password = xss(req.body.password);

  const q = "SELECT * FROM USERS WHERE pseudo = ?";
  query(q, [pseudo], (error, data) => {
    if (error) {
      console.log(`Erreur lors de l'exécution de la requête : ${error}`);
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Identifiants non retrouvés" });
      return;
    }

    const user = data[0];

    bcrypt.compare(password, user.PASSWORD, (err, result) => {
      if (result) {
        req.session.isLogged = true; // Authentification réussie

        res.setHeader("set-cookie", "isLogged = true"); // Authentification réussie

        res.json({ message: "Authentification ok" });
      } else {
        res.status(404).json({ message: "Identifiants incorrects" });
      }
    });
  });
});

// ******************  API : FIN MIDDLEWARE AUTHENTIFICATION *******************/

// ******************  API : AJOUT D'UN UTILISATEUR *******************/

/**
 * API : User
 * Insertion d'un User
 */

router.post("/api/addUser", checkAuthentification, async (req, res) => {
  const { id, pseudo, password, role } = req.body;

  // Utilisez bcrypt pour hacher le mot de passe
  const saltRounds = 10; // Le nombre de tours de hachage
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Effectuez une requête SQL pour insérer un nouvel utilisateur dans la base de données
    const q =
      "INSERT INTO USERS (ID, PSEUDO, PASSWORD, ROLE) VALUES (?, ?, ?, ?)";
    const values = [id, pseudo, hashedPassword, role];

    query(q, values, (error, data) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Erreur lors de l'insertion d'un utilisateur" });
      } else {
        res.status(201).json({ message: "Utilisateur inséré avec succès" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors du hachage du mot de passe" });
  }
});

// /******************  /API : Menu Items *******************/

/**
 * API : Menus
 * Recuperation de tous les menus
 */
router.get("/api/menus", checkAuthentification, (req, res) => {
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
router.post("/api/menus", checkAuthentification, (req, res) => {
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
router.get("/api/menus/:id", checkAuthentification, (req, res) => {
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
router.delete("/api/menus/:id", checkAuthentification, (req, res) => {
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
router.put("/api/modif/:id", checkAuthentification, (req, res) => {
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
router.get("/api/categories", checkAuthentification, (req, res) => {
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
 * API : Concours
 * Recuperation de tous les mails du concours mensuel
 */
router.get("/api/concours", checkAuthentification, (req, res) => {
  const q = "SELECT id, mail FROM CONCOURS";
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
 * API : Concours
 * Suppression d'un mail participant
 */
router.delete("/api/concours/:id", checkAuthentification, (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM CONCOURS WHERE id = ?";
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
 * API : des Avis
 * Recuperation de tous les avis du formulaire
 */
router.get("/api/avis", checkAuthentification, (req, res) => {
  const q =
    "SELECT id, photo, comment, firstname, lastname, email, date_creation, satisfaction, consent, restaurants_id FROM AVIS_CLIENTS";
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
 * API : Concours
 * Suppression d'un mail participant
 */
router.delete("/api/avis/:id", checkAuthentification, (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM AVIS_CLIENTS WHERE id = ?";
  query(q, [id], (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json("Element supprimé avec succès");
  });
});

// /******************  /API : Categories *******************/

/**
 * API : Restaurants
 * Recuperation de tous les restaurants
 */
router.get("/api/restaurants", checkAuthentification, (req, res) => {
  const q =
    "SELECT r.ID, r.NAME, r.ADRESSE, r.CP, r.VILLE, r.PHONE, r.IMAGE " +
    "FROM RESTAURANTS AS r " +
    "ORDER BY NAME ASC";
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
 * API : Restaurants
 * Insertion d'un Restaurant item
 */

router.post("/api/restaurants", checkAuthentification, (req, res) => {
  const { id, name, adresse, cp, ville, phone, image } = req.body;

  // Effectuez une requête SQL pour insérer un nouveau restaurant dans la base de données
  const q =
    "INSERT INTO RESTAURANTS (ID, NAME, ADRESSE, CP, VILLE, IMAGE, PHONE) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [id, name, adresse, cp, ville, phone, image];

  query(q, values, (error, data) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'insertion du restaurant" });
    } else {
      res.status(201).json({ message: "Restaurant inséré avec succès" });
    }
  });
});

/**
 * API : Restaurants
 * Recuperation d'un restaurant pour modification
 */
router.get("/api/restaurants/:id", checkAuthentification, (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT r.id, r.name, r.adresse, r.cp, r.ville, r.image, r.phone " +
    "FROM RESTAURANTS as r " +
    "WHERE r.id = ?";

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
 * API : Restaurants
 * Suppression d'un restaurant
 */
router.delete("/api/restaurants/:id", checkAuthentification, (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM RESTAURANTS WHERE id = ?";
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
 * Modification d'un restaurant
 */
router.put("/api/modifRestaurant/:id", checkAuthentification, (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const name = req.body.name;
  const adresse = req.body.adresse;
  const cp = req.body.cp;
  const ville = req.body.ville;
  const phone = req.body.phone;
  const image = req.body.image;

  const q =
    "UPDATE RESTAURANTS SET name= ?, adresse= ?, cp = ?, ville = ?, phone = ?, image = ? WHERE id = ?";
  const values = [name, adresse, cp, ville, phone, image, id];
  query(q, values, (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
      return;
    }
    res.json(data);
  });
});

// /******************  /API : Categories *******************/

export default router;
