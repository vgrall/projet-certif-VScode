export default (req, res) => {
  req.session.destroy(() => {
    console.log("Déconnexion");
    res.redirect("/");
  });
};
