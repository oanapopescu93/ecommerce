import axios from "axios"
import { apiUrl } from "./config"
import { getCookie } from "./cookies";

export const getProduct = async function(id){
    try{
        const response = await axios({
            url: apiUrl + '/api/products/' + id,
            method: 'GET',
            headers: {'Content-type':'application/json'}
        })
        if(!response || response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.warn('get product error--> ', err);
        return {error: err.message}
    }
}

export const signin = async function(obj){
    const my_email = obj.email;
    const my_password = obj.password;
    try{
        const response = await axios({
            url: apiUrl + '/api/users/signin',
            method: 'POST',
            headers: {'Content-type':'application/json'},
            data: {email: my_email, password: my_password}
        })
        if(!response || response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.warn('signin error--> ', err);
        let error_text = err.message;
        if(!error_text){
            error_text = err.response.message;
        }
        return {error: error_text}
    }
}

export const signup = async function(obj){
    const my_name = obj.name;
    const my_email = obj.email;
    const my_password = obj.password;
    try{
        const response = await axios({
            url: apiUrl + '/api/users/signup',
            method: 'POST',
            headers: {'Content-type':'application/json'},
            data: {name: my_name, email: my_email, password: my_password}
        })
        if(!response || response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.warn('signup error--> ', err);
        let error_text = err.message;
        if(!error_text){
            error_text = err.response.message;
        }
        return {error: error_text}
    }
}

export const update = async function(obj){
    const my_name = obj.name;
    const my_email = obj.email;
    const my_password = obj.password;
    let id = '';
    let token = '';
    if(getCookie("userInfo") !== "" && JSON.parse(getCookie("userInfo")).id && JSON.parse(getCookie("userInfo")).token){
        id = JSON.parse(getCookie("userInfo")).id;
        token = JSON.parse(getCookie("userInfo")).token;
    } else {
        return {error: 'User Not Found'}
    }
    try{
        const response = await axios({
            url: apiUrl + '/api/users/update',
            method: 'POST',
            headers: {'Content-type':'application/json', 'Authorization': `Bearer ${token}`},
            data: {id: id, name: my_name, email: my_email, password: my_password}
        })
        if(!response || response.statusText !== "OK"){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        console.warn('update error--> ', err);
        let error_text = err.message;
        if(!error_text){
            error_text = err.response.message;
        }
        return {error: error_text}
    }
}

export const createOrder = async function(obj){
    console.log(obj)
}