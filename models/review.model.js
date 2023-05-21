const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
      reviewId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      rating: {
        type: Sequelize.TINYINT
      },
      comment: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return Review;
  };