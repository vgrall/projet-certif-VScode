import query from "../database.js";
import xss from "xss";

export default (req, res) => {
  console.log("POST /avis");
  console.log(req.body);

  let photo = xss(req.body.photo);
  const firstname = xss(req.body.firstname);
  const lastname = xss(req.body.lastname);
  const email = xss(req.body.email);
  const comment = req.body.comment;
  const satisfaction = xss(req.body.satisfaction);
  const restaurants_id = req.body.restaurants_id;

  // tester si le champ photo est vide et le mettre à undifined
  if (photo.trim() == "") {
    photo = "/images/avatarForm.png";
  }

  // id est généré automatiquement par la base de données
  query(
    "INSERT INTO AVIS_CLIENTS (firstname, lastname, email, comment, satisfaction, photo, restaurants_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, comment, satisfaction, photo, restaurants_id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Erreur serveur");
        return;
      }
      res.redirect("/avis");
    }
  );
};
