import query from "../database.js";

export default (req, res) => {
  const id = req.params.id;
  console.log(id);
  query(
    `
        SELECT
            MENU_ITEMS_has_RESTAURANTS.RESTAURANTS_ID AS RESTAURANT,
            MENU_ITEMS.NAME AS PRODUIT,
            MENU_ITEMS.PRICE AS PRIX,
            MENU_ITEMS.CATEGORIES_ID AS CATEGORY
        FROM
            MENU_ITEMS_has_RESTAURANTS
        INNER JOIN
            MENU_ITEMS ON MENU_ITEMS_has_RESTAURANTS.MENU_ITEMS_ID = MENU_ITEMS.ID
        WHERE
            MENU_ITEMS_has_RESTAURANTS.RESTAURANTS_ID = ?
        `,
    [id],
    (error, result) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send("Erreur serveur");
        return;
      }
      res.render("carteParRestaurant", { carteParRestaurant: result });
    }
  );
};
