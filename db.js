const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "mysql",
  database: "chatappdb",
  username: "chatappuser",
  password: "chatapppass"
});

const Users = db.define("users", {
  username: {
    type: Sequelize.STRING(30),
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING(75),
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = {
  db,
  Users
};
