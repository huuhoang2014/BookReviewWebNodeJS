const {Model, Sequelize, DataTypes} = require('sequelize');
const books = require('./books');
const users = require('./users');

module.exoport=(Sequelize,DataTypes)=>{
    class authorisbn extends Model{
        static associations(models){
        }
    };
    authorisbn.init({
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
        }
    }, {
        sequelize,
        modelName: 'authorisbn',
    });
    authorisbn.removeAttribute("id");
    return authorisbn;
};