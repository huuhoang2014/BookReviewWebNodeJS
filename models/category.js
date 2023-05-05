const {Model, Sequelize, DataTypes} = require('sequelize');
const books = require("./books");
const categoryList=require("./categoryList");

module.exports=(sequelize,DataTypes)=>{
    class category extends Model{
        static associations(models){
        }
    };
    category.init({
        categoryID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        sequelize,
        modelName: 'category',
    });
    category.belongsToMany(books, {through: 'categoryList'});
    category.removeAttribute("id");
    return category;
};