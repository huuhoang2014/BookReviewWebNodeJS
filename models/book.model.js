const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return Book;
  };