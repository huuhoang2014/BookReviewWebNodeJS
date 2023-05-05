const {Model, Sequelize, DataTypes} = require('sequelize');
const books = require('./books');
const category = require('./category');

module.exoport=(Sequelize,DataTypes)=>{
    class categoryList extends Model{
        static associations(models){
        }
    };
    categoryList.init({
        categoryID: {
            type: DataTypes.INTEGER,
            references: {
                model: category,
                key: 'categoryID'
            }
        },
        isbn: {
            type: DataTypes.INTEGER,
            references: {
                model: books,
                key: 'isbn'
            }
        }
    }, {
        sequelize,
        modelName: 'categoryList',
    });
    categoryList.removeAttribute("id");
    return categoryList;
};