const route = require("express").Router();
const { Users } = require("../db");
route.get("/", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
  const user = await Users.findOne({
    where: {
      username: req.session.username.trim()
    }
  });
  res.render("chat", { user });
});
module.exports = route;
