import query from "../database.js";
import { v4 } from "uuid";
import xss from "xss";

export default (req, res) => {
  console.log("POST /concours");
  console.log(req.body);

  // Récupérez la valeur de l'e-mail depuis le formulaire
  const mail = xss(req.body.emailField).trim();
  console.log(mail);

  if (mail === "") {
    console.log("champ vide : ", mail);
  }

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regex.test(mail)) {
    console.log("controler verif mail regex");
  }

  const id = v4();

  query(
    "INSERT INTO CONCOURS (id, mail) VALUES (?, ?)",
    [id, mail],
    (error) => {
      if (error && error.code === "ER_DUP_ENTRY") {
        console.log("mail déjà enregistré");
        res.render("erreurMessage", {
          messageTitle: "Erreur",
          messageContent: "Vous avez déjà participé au concours",
        });
        return;
      } else if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send("Erreur serveur");
        return;
      }
      res.render("messageConcours");
    }
  );
};
