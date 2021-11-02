/* eslint-disable */
import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routes/userRoutes';

mongoose.connect(config.MONGODB_URL)
.then(function(){
    console.log('connected to mongoDB')
})
.catch(function(error){
    console.log('mongoose error --> ', error);
})

var app = express();
app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/api/products', function(req, res){
    res.send(data.products);
});
app.get('/api/products/:id', function(req, res){
    var id = req.params.id;
    var product = null;
    for(var i in data.products){
        if(data.products[i].id === id){
            product = data.products[i]
        }
    }
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message: "product not found!"})
    }
});

app.use(function(err, req, res, next){
    let status = 500;
    if(err.name && err.name === "ValicationError"){
        status = 400;
    }
    res.status(status).send({message: err.message});
});
app.listen(config.PORT, function(){
    console.log('server is on!!!')
});