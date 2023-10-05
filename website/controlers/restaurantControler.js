import query from "../database.js";

export default (req, res) => {
  query("SELECT * FROM RESTAURANTS ORDER BY VILLE ASC", [], (error, result) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de la requête ${error}`);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.render("restaurants", { restaurants: result });
  });
};
