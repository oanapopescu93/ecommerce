/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import express from 'express';
import expressAsyncHandler from "express-async-handler";
import User from '../models/userModels';
import { generateToken, isAuth } from '../utils';

const userRouter = express.Router();

userRouter.get('/createadmin', expressAsyncHandler(async function(req, res){
    try{
        const user = new User({
            name: 'admin',
            email: 'oanapopescu93@gmail.com',
            password: 'Parola123',
            isAdmin: true,
        });
        const createUser = await user.save();
        res.send(createUser)
    } catch(err) {
        console.log('userRouter err', err)
        res.status(500).send({message: err})
    }
}));

userRouter.post('/signin', expressAsyncHandler(async function(req, res){
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
  
    if (!signinUser) {
        res.status(401).send({message: 'Invalid Email or Password'});
    } else {
        res.send({
            id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser),
        });
    }
})
);

userRouter.post('/signup', expressAsyncHandler(async function(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const createUser = await user.save();
    if (!createUser) {
        res.status(401).send({message: 'Invalid User Date'});
    } else {
        res.send({
            id: createUser.id,
            name: createUser.name,
            email: createUser.email,
            isAdmin: createUser.isAdmin,
            token: generateToken(createUser),
        });
    }
})
);

userRouter.post('/update', isAuth, expressAsyncHandler(async function(req, res){
    const user = await User.findById(req.body.id);
    if (!user) {
        res.status(404).send({message: 'User Not Found'});
    } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));

export default userRouter;