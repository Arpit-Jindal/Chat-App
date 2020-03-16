const route = require("express").Router();
const { Users } = require("../db");
route.get("/", (req, res) => {
  res.render("signup");
});
route.post("/", async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.body.username.trim()
    }
  });
  if (user) {
    return res.send("Username already registered! Login instead");
  }
  await Users.create({
    username: req.body.username.trim(),
    email: req.body.email.trim(),
    name: req.body.name.trim(),
    password: req.body.password
  });
  res.redirect("/login");
});
module.exports = route;
