import Home from './pages/home'
import Product from './pages/product'
import Cart from './pages/cart'
import Error404 from './pages/error404'
import {parseRequestUrl} from './utils'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Header from './components/header';
import Footer from './components/footer'
import Profile from './pages/profile'
import Shipping from './pages/shipping'
import Payment from './pages/payment'
import Placeorder from './pages/placeorder'

var routes = {
    '/#/': Home,
    'product/:id': Product,
    'cart/:id': Cart,
    'cart': Cart,
    'signin': SignIn,
    'signup': SignUp,
    'profile':Profile,
    'shipping': Shipping,
    'payment': Payment,
    'placeorder': Placeorder,
}

var router = async function(){
    var request = parseRequestUrl();    
    var resourse = '/#/';
    var id = '';
    var action = '';
    if(typeof request.resourse !== "undefined" && request.resourse !== ""){
        resourse = request.resourse;
    }
    if(typeof request.id !== "undefined"){
        id = '/:id';
    }
    if(typeof request.action !== "undefined"){
        action = request.action;
    }
    var parseUrl = resourse + id + action;
    var view = routes[parseUrl];

    if(typeof view === "undefined"){
        view = Error404;
    }    

    if(parseUrl === '/#/'){
        window.location.href='/#/'
    }
    
    var header = document.getElementById('header_container');
    var main = document.getElementById('main_container');
    var footer = document.getElementById('footer_container');
    if(typeof header !== "undefined"){
        header.innerHTML = await Header.render();
        if(typeof Header.actions === "function"){
            await Header.actions();
        }
    }
    if(typeof main !== "undefined"){
        main.innerHTML = await view.render();
        if(typeof view.actions === "function"){
            await view.actions();
        }
    }
    if(typeof footer !== "undefined"){
        footer.innerHTML = await Footer.render();
        if(typeof Footer.actions === "function"){
            await Footer.actions();
        }
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
