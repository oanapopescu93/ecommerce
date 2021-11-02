/* eslint-disable no-use-before-define */
/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { parseRequestUrl, rerender, showMessage, getInfo } from '../utils';
import {getProduct} from '../api';
import {setCookie} from '../cookies';

function addToCart(prod){
    const cartItems = getInfo('cartItems');
    if(cartItems===""){
        var array = [];
        array.push(prod);
        setCookie("cartItems", JSON.stringify(array));
    } else {
        var exists = false;
        for(var i in cartItems){
            if(cartItems[i].id === prod.id){
                exists = true;
                break;
            }
        }
        if(!exists){
            cartItems.push(prod);
            setCookie("cartItems", JSON.stringify(cartItems));
        }
    }
};

async function removeFromCart(id){
    const cartItems = getInfo('cartItems');
    for (var i = cartItems.length-1; i >= 0; i--) {
        if(cartItems[i].id === id){
            cartItems.splice(i, 1);
            break;
        }
    }
    setCookie("cartItems", JSON.stringify(cartItems));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        rerender(Cart);
    }
}

function updateCart(id, value){
    const cartItems = getInfo('cartItems');
    for(var i in cartItems){
        if(cartItems[i].id === id){
            cartItems[i].qty = value;
            setCookie("cartItems", JSON.stringify(cartItems));
            break;
        }
    }
}

function showCartItems(){
    const cartItems = getInfo('cartItems');
    var show = "";
    if(cartItems.length > 0){
        cartItems.map(function(x){
            if(x != null){
                show += `<div class="row cart_body_container">
                    <div class="col-sm-12">
                        <div class="row cart_body">
                            <div class="col-sm-10 cart_body_left">
                                <div class="cart_body_image">
                                    <img src="${x.image}" alt="${x.name}"/>
                                </div>
                                <div class="cart_body_info">
                                    <h4>${x.name}</h4>
                                    <label>Qty:</label>
                                    <input type="number" prod="${x.id}" name="quantity" min="1" max="${x.stock}" value="${x.qty}" class="update_card_prod">
                                    <button type="button" prod="${x.id}" class="btn delete_cart_prod">Delete</button>
                                </div>
                            </div>
                            <div class="col-sm-2 cart_body_right">
                                <div class="cart_body_price">
                                    <p>$${x.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row cart_footer_container">
                    <div class="col-sm-12">
                        <button id="delete_cart_all" type="button" class="btn delete_cart_all">Delete all</button>
                    </div>
                </div>`
            } 
            return ``;                               
        }).join('\n')
    } else {
        show += `<div class="row cart_body">
            <div class="col-sm-12">
                <p class="cart_header_left">No items in the cart</p>
            </div>
        </div>`
    }
    return show;
}
function calculateSubtotal(){
    const cartItems = getInfo('cartItems');
    var sum = 0;
    for(var i in cartItems){
        sum += cartItems[i].price*cartItems[i].qty;
    }
    const subtotal = document.getElementById('subtotal');
    subtotal.innerHTML = '$'+sum;
}

const Cart = {
    actions: function(){
        // delete certain product
        const delete_cart_prod = document.getElementsByClassName('delete_cart_prod');  
        const update_card_prod = document.getElementsByClassName('update_card_prod');   
        const delete_cart_all = document.getElementById('delete_cart_all');      
        Array.from(delete_cart_prod).forEach(function(elem){
            elem.addEventListener('click', function(){
                const id = elem.getAttribute("prod");
                removeFromCart(id);
            });
        });
        Array.from(update_card_prod).forEach(function(elem){
            elem.addEventListener('change', function(){
                const id = elem.getAttribute("prod");
                const {value} = elem;
                updateCart(id, value);
                calculateSubtotal();
            });
        });
        if(delete_cart_all){
            delete_cart_all.addEventListener("click", function(){
                setCookie("cartItems", JSON.stringify(""));
                document.location.hash = '/cart';
            });
        }

        document.getElementById('checkout_cart').addEventListener('click', () => {
            const userInfo = getInfo('userInfo');
            const cartItems = getInfo('cartItems');
            if(Object.keys(userInfo).length > 0){
                if(cartItems.length > 0){
                    document.location.hash = '/shipping';
                } else {
                    showMessage('Attention', 'Your cart is empty.');
                }
            } else {
                document.location.hash = '/signin';
            }
        });
    },
    render: async function(){
        const request = parseRequestUrl();
        let prod;
        let cartItems = [];
        cartItems = getInfo('cartItems');
        if(request.id){
            prod = await getProduct(request.id);
            if(typeof prod.qty === "undefined"){
                prod.qty = 1;
            }
            addToCart(prod);
            cartItems = getInfo('cartItems');
        }
        var subtotal = 0;
        for(var i in cartItems){
            subtotal += cartItems[i].price*cartItems[i].qty;
        }
        
        return `
        <div class="container">
            <div class="row">
                <div class="col-sm-8 cart_container">
                    <div class="row cart_header_container">
                        <div class="col-sm-8 cart_header_left">
                            <h3>Shopping cart</h3>
                        </div>
                        <div class="col-sm-4 cart_header_right">
                            <p>Price</p>
                        </div>
                    </div>
                    ${showCartItems()}
                </div>
                <div class="col-sm-4 cart_buy_container">
                    <div class="cart_buy">
                        <p>Subtotal (${cartItems.length} items): <span id="subtotal">$${subtotal}</span></p>
                        <button id="checkout_cart" type="button" class="btn checkout_cart">Checkout</button> 
                    </div>
                </div>
            </div>
        </div>
        ` 
    }
}

export default Cart;