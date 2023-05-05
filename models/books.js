const {Model, Sequelize, DataTypes} = require('sequelize');
const users = require("./users");
const category = require("./category");
const rating = require("./rating");
const authorisbn = require("./authorisbn");
const categoryList = require("./categoryList");

module.exports=(sequelize,DataTypes)=>{
    class books extends Model{
        static associations(models){
        }
    };
    books.init({
        isbn: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type: DataTypes.STRING,
            allowNull:true
        },
        avatar: {
            types: DataTypes.STRING,
            defaultValue: ""
        }

    }, {
        sequelize,
        modelName: 'books',
    });
    books.belongsToMany(users,{through: rating});
    books.belongsToMany(users,{through: authorisbn});
    books.belongsToMany(category,{through: categoryList});

    books.removeAttribute("id");
    return books;
};