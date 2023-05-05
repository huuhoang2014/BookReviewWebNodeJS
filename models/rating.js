const {Model, Sequelize, DataTypes} = require('sequelize');
const users = require("./users");
const books = require("./books");

module.exports=(sequelize,DataTypes)=>{
    class rating extends Model{
        static associations(models){
        }
    };
    rating.init({
        ratingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: users,
                key: 'userID'
            }
        },
        isbn: {
            type: DataTypes.INTEGER,
            references: {
                model: books,
                key: 'isbn'
            }
        },
        score: {
            types: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        sequelize,
        modelName: 'rating',
    });
    rating.removeAttribute("id");
    return rating;
};