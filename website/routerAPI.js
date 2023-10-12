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
 * API : Concours
 * Recuperation de tous les mails du concours mensuel
 */
router.get("/api/concours", (req, res) => {
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
router.delete("/api/concours/:id", (req, res) => {
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
router.get("/api/avis", (req, res) => {
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
router.delete("/api/avis/:id", (req, res) => {
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

/**
 * API : Page d'administration
 * afficher la page lorsque l'utilisateur est vérifié (voir middleware)
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

// ****************************************************************************************
// BROUILLON POUR CRYPTAGE MDP
// ****************************************************************************************

/**
 * API : Vérification d'utilisateur
 * Récupération des utilisateurs pour vérification (à des fins de démonstration uniquement)
 */
// router.get("/api/accueil", (req, res) => {
//   const q = "SELECT a.id, a.pseudo, a.password FROM USERS as a";
//   query(q, [], (error, data) => {
//     if (error) {
//       console.log(error);
//       res.json(error);
//       return;
//     }
//     res.json(data);
//   });
// });

/**
 * API : Hachage de mot de passe (à des fins de démonstration uniquement, en pratique, le hachage doit être effectué côté serveur)
 */
// router.post("/api/hashPassword", (req, res) => {
//   const plainTextPassword = req.body.password;

//   // Hash du mot de passe côté serveur (en pratique, cela doit être effectué côté serveur)
//   const saltRounds = 10; // Nombre de tours de hachage
//   bcrypt.hash(plainTextPassword, saltRounds, (error, hashedPassword) => {
//     if (error) {
//       console.log(error);
//       res.json(error);
//       return;
//     }
//     res.json({ hashedPassword });
//   });
// });

/**
 * API : Authentification de l'utilisateur
 * Vérification du pseudo et du mot de passe haché
 */
// router.post("/api/authenticate", (req, res) => {
//   const { pseudo, hashedPassword } = req.body;

//   // Récupérez les utilisateurs à partir de la base de données (à des fins de démonstration uniquement)
//   const q =
//     "SELECT a.id, a.pseudo, a.password FROM USERS as a WHERE a.pseudo = ?";
//   query(q, [pseudo], (error, data) => {
//     if (error) {
//       console.log(error);
//       res.json(error);
//       return;
//     }

//     if (data.length === 0) {
//       res.json({ isAuthenticated: false });
//       return;
//     }

//     // Comparez le mot de passe haché avec le mot de passe stocké en base de données
//     const user = data[0];
//     bcrypt.compare(hashedPassword, user.password, (compareError, result) => {
//       if (compareError) {
//         console.log(compareError);
//         res.json(compareError);
//         return;
//       }

//       if (result) {
//         res.json({ isAuthenticated: true });
//       } else {
//         res.json({ isAuthenticated: false });
//       }
//     });
//   });
// });

// ****************************************************************************************
// BROUILLON POUR CRYPTAGE MDP
// ****************************************************************************************

// /******************  /API : Categories *******************/

/**
 * API : Restaurants
 * Recuperation de tous les restaurants
 */
router.get("/api/restaurants", (req, res) => {
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

router.post("/api/restaurants", (req, res) => {
  // Assurez-vous d'avoir les données requises du corps de la requête
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
router.get("/api/restaurants/:id", (req, res) => {
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
router.delete("/api/restaurants/:id", (req, res) => {
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
router.put("/api/modifRestaurant/:id", (req, res) => {
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
