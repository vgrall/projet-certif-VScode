import query from "../database.js";

export default (req, res) => {
  query(
    "SELECT UPPER(name) 'name', price FROM MENU_ITEMS WHERE categories_id = 'GLT' ORDER BY price DESC",
    [],
    (error, result) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send("Erreur serveur");
        return;
      }
      res.render("galetteCarte", { galettes: result });
    }
  );
};
