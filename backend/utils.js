import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = function(user){
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    config.JWT_SECRET)
}

export const isAuth = function(req, res, next){
    var bearer_token = req.headers.authorization;
    if(!bearer_token){
        res.status(401).send({message: "Token doesn't exist"});
    } else {
        var token_array = bearer_token.split("Bearer ");
        var token = token_array[1];
        jwt.verify(token, config.JWT_SECRET, function(err, data){
            if(err){
                res.status(401).send({message: "Invalid token"});
            } else {
                req.user = data;
                next();
            }
        })
    }
}