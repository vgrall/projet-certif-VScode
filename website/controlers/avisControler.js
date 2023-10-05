// export default (req, res) => res.render("avis", {});

import query from "../database.js";

export default (req, res) => {
  const sqlRestaurants = "SELECT id, name FROM RESTAURANTS ORDER BY name ASC";
  const sqlAvis = "SELECT a.id, a.comment, a.photo, a.firstname, a.lastname, a.email, a.satisfaction, r.name as restaurant "+
             "FROM AVIS_CLIENTS as a, RESTAURANTS as r "+
             "WHERE a.restaurants_id = r.id "+
             "ORDER BY a.date_creation DESC ";
  
   // recuperer les avis
  query(
    sqlAvis,
    [],
    (error, avis) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la requête ${error}`);
        res.status(500).send("Erreur serveur");
        return;
      }

      // recuperer les restaurants
      query(sqlRestaurants, [], (errorRestaurants, restaurants) => {
        if (errorRestaurants) {
          console.error(`Erreur lors de l'exécution de la requête ${error}`);
          res.status(500).send("Erreur serveur");
          errorRestaurants;
        }        
        res.render("avis", { avis, restaurants });
      });


    }
  );
};
