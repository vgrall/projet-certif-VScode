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

  const hashedPwd = bcrypt.hashSync(req.body.password, 10);

  // Enregistrez l'utilisateur dans la base de données
  console.log("req.body", req.body, "hashedPwd", hashedPwd);

  query(
    `INSERT INTO USERS (ID, PSEUDO, PASSWORD, ROLE) VALUES (?, ?, ?, ?)`,
    [userId, req.body.pseudo, hashedPwd, req.body.role],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Une erreur s'est produite");
      }
      console.log("Utilisateur créé avec succès. ID:", userId);
      res.redirect("/");
    }
  );
}
