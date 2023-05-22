const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.indexOf;
        next();
    });
};

isAuthor = (req, res, next) => {
    User.findByPk(req.userId).then(user =>{
        user.getBooks().then(books => {
            for( let i=0; i < books.length; i++){
                if(books[i].id === req.body.bookId){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require author role!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAuthor: isAuthor
};

module.exports=authJwt;