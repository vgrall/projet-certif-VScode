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
    MENU_ITEMS.CATEGORIES_ID AS CATEGORY,
    CATEGORIES.NAME as CATE_PRODUIT
FROM
    MENU_ITEMS_has_RESTAURANTS
INNER JOIN
    MENU_ITEMS ON MENU_ITEMS_has_RESTAURANTS.MENU_ITEMS_ID = MENU_ITEMS.ID
INNER JOIN
    CATEGORIES ON MENU_ITEMS.CATEGORIES_ID = CATEGORIES.ID
WHERE
    MENU_ITEMS_has_RESTAURANTS.RESTAURANTS_ID = ?
ORDER BY CATEGORIES.NAME DESC, MENU_ITEMS.PRICE ASC
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
