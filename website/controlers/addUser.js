import query from "../database.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";

//AFFICHAGE DU FORMULAIRE
export function addUser(req, res) {
  res.render("adminForm", {
    title: "Ajout d'un utilisateur",
    action: "/user/add",
  });
}

// export du controller
export function addUserSubmit(req, res) {
  // Générez un nouvel identifiant UUID
  const userId = v4();

  // Hachez le mot de passe avant de l'insérer en base de données
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Une erreur s'est produite");
    }

    query(
      `INSERT INTO USERS (ID, PSEUDO, PASSWORD, ROLE) VALUES (?, ?, ?, ?)`,
      [userId, req.body.pseudo, hash, req.body.role],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Une erreur s'est produite");
        }
        console.log("Utilisateur créé avec succès. ID:", userId);
        res.redirect("/");
      }
    );
  });
}
