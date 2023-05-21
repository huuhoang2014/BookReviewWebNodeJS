const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.book = require("../models/book.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.review = require("../models/review.model.js")(sequelize, Sequelize);

//authors Relation Table
db.book.belongsToMany(db.user, {
  through: "authors",
  foreignKey: "bookId",
  otherKey: "userId"
});
db.user.belongsToMany(db.book, {
  through: "authors",
  foreignKey: "userId",
  otherKey: "bookId"
});

//book_categories Relation Table
db.book.belongsToMany(db.category, {
    through: "book_categories",
    foreignKey: "bookId",
    otherKey: "categoryId"
  });
db.category.belongsToMany(db.book, {
    through: "book_categories",
    foreignKey: "categoryId",
    otherKey: "bookId"
});

//review Relationship table
db.book.belongsToMany(db.user, {
    through: "review",
    foreignKey: "bookId",
    otherKey: "userId"
  });
  db.user.belongsToMany(db.book, {
    through: "review",
    foreignKey: "userId",
    otherKey: "bookId"
  });

module.exports = db;