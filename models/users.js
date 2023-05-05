const {Model, Sequelize, DataTypes} = require('sequelize');
const books = require("./books");
const rating = require("./rating");
const authorisbn = require("./authorisbn");

module.exports=(sequelize,DataTypes)=>{
    class users extends Model{
        static associations(models){
        }
    };
    users.init({
        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        loginName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male','Female')
        },
        role: {
            type: DataTypes.ENUM('Reader','Author')
        },
        email: {
            type: DataTypes.STRING
        },
        avatar: {
            types: DataTypes.STRING,
            defaultValue: ""
        }

    }, {
        sequelize,
        modelName: 'users',
    });
    users.belongsToMany(books,{through: rating});
    users.belongsToMany(books,{through: authorisbn});

    users.removeAttribute("id");
    return users;
};