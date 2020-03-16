const route = require("express").Router();
route.get("/", (req, res) => {
  req.session.username = undefined;
  res.redirect("/login");
});
module.exports = route;
