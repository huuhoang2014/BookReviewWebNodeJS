const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Book = db.book;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req,res) => {
    //Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.send({message: "User was reistered successful!"});
    }).catch(err =>{
        res.status(500).send({message: err.message});
    });
};

export.updateAccount = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({message: "User Not Found!"})
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return response.status(401).send({
                accessToken:null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({id: user.id}, config.secret,{
            expiresIn: 86400
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });    
    }).catch(err =>{
        res.status(500).send({message: err.message});
    });
};