import query from "../database.js";
import bcrypt, { hash } from "bcrypt";

export function loginForm(req, res) {
  res.render("loginForm");
}

export function login(req, res) {
  const { pseudo, password } = req.body;

  // Récupération du USERS par son pseudo
  query("SELECT * FROM USERS WHERE PSEUDO = ?", [pseudo], (error, result) => {
    // Gestion de l'erreur
    if (error) {
      console.error(`Erreur lors l'exécution de la requête : ${error}`);
      res.status(500).send("Erreur serveur");
      return;
    }

    // Si l'utilisateur n'a pas été trouvé
    console.log(result);
    if (result.length === 0) {
      res.render("loginForm", { message: "Identifiants non retrouvé" });
      return;
    }
    console.log(password, result[0].password);
    // Vérification du mot de passe

    bcrypt.compare(password, result[0].password, (error, hashresult) => {
      if (!hashresult) {
        res.render("loginForm", { message: "Identifiants incorrects" });
        return;
      }
      req.session.isLogged = true;
      res.redirect("/");
    });
  });
}
