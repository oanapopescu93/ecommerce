/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import { createOrder } from '../api';
import CheckoutSteps from '../components/CheckoutSteps';
import { getCookie } from '../cookies';
import { cleanCart, getInfo, hideLoader, showLoader, showMessage } from '../utils';

function showCartItems(){
    const cartItems = getInfo('cartItems');
    var show = "";
    if(cartItems.length > 0){
        cartItems.map(function(x){
            if(x != null){
                show += `<div class="cart_body">
                            <div class="cart_body_left">
                                <div class="cart_body_image">
                                    <img src="${x.image}" alt="${x.name}"/>
                                </div>
                                <div class="cart_body_info">
                                    <h4>${x.name}</h4>
                                    <p>Qty: <span>${x.qty}</span></p>
                                    <p>Price: <span>$${x.price}</span></p>
                                </div>
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

function cartOrder(){
    let my_order = {};

    let shipping_address = ''; 
    let shipping_city = '';
    let shipping_postal_code = '';
    let shipping_country = '';
    let shipping_method = '';
    if(getCookie("shipping") !== ""){
        if(JSON.parse(getCookie("shipping"))[0].shipping_address){
            shipping_address = JSON.parse(getCookie("shipping"))[0].shipping_address;
        }
        if(JSON.parse(getCookie("shipping"))[0].shipping_city){
            shipping_city = JSON.parse(getCookie("shipping"))[0].shipping_city;
        }
        if(JSON.parse(getCookie("shipping"))[0].shipping_postal_code){
            shipping_postal_code = JSON.parse(getCookie("shipping"))[0].shipping_postal_code;
        }
        if(JSON.parse(getCookie("shipping"))[0].shipping_country){
            shipping_country = JSON.parse(getCookie("shipping"))[0].shipping_country;
        }
        if(JSON.parse(getCookie("shipping"))[0].shipping_method){
            shipping_method = JSON.parse(getCookie("shipping"))[0].shipping_method;
        }
    }    

    let payment_method = '';
    if(getCookie("payment") !== ""){
        if(JSON.parse(getCookie("payment"))[0].payment){
            payment_method = JSON.parse(getCookie("payment"))[0].payment;
        }
    }

    const cartItems = getInfo('cartItems');
    var order_subtotal = 0;
    var order_shipping = 0;
    var total = 0;
    for(var i in cartItems){
        order_subtotal += cartItems[i].price*cartItems[i].qty;
    }    
    if(order_subtotal > 200){
        switch (shipping_method) {
            case 'standard':
                order_shipping = 5;
                break; 
            default:
                order_shipping = 5;            
        }
    } 
    total = order_subtotal + order_shipping;    

    my_order = {
        cartItems, 
        shipping_address, 
        shipping_city, 
        shipping_postal_code, 
        shipping_country, 
        shipping_method, 
        payment_method,
        order_subtotal, 
        order_shipping,
        total
    }

    return my_order;
}
const Placeorder = {
    actions: function(){
        var order = document.getElementById('order_submit');
        order.addEventListener("click", async function(e){
            e.preventDefault();
            showLoader();
            const my_cartOrder = cartOrder();
            if(Object.keys(my_cartOrder).length === 0){
                const info = await createOrder(my_cartOrder);
                if(info.error){
                    showMessage('Error', info.error);
                } else {
                    cleanCart();
                    document.location.hash = '/';
                }
            }
            hideLoader();            
        }); 
    },
    render: async function(){
        const userInfo = getInfo('userInfo');
        if(Object.keys(userInfo).length === 0 || typeof userInfo.name === "undefined"){
            document.location.hash = '/';
        }
        const my_cartOrder = cartOrder();
        return `${CheckoutSteps.render({step3: true})}
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 order_summary_container">
                            <div id="order_summary_shipping" class="order_summary shadow_convex">
                                <h3>Shipping</h3>
                                <p>Location: <span>${my_cartOrder.shipping_address}, ${my_cartOrder.shipping_postal_code}, ${my_cartOrder.shipping_city}, ${my_cartOrder.shipping_country}</span></p>
                                <p>Shipping method: <span>${my_cartOrder.shipping_method}</span></p>
                            </div>
                            <div id="order_summary_payment" class="order_summary shadow_convex">
                                <h3>Payment</h3>
                                <p>Payment method: <span>${my_cartOrder.payment_method}</span></p>
                            </div>
                            <div id="order_summary_cart" class="order_summary shadow_convex">
                                <h3>Cart</h3>
                                <div class="order_summary_box">
                                    ${showCartItems()}
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 order_summary_container">
                            <div id="order_summary_shipping" class="order_summary shadow_convex">
                                <h3>Order summary</h3>
                                <p>Subtotal (${my_cartOrder.cartItems.length} items): <span id="order_subtotal">$${my_cartOrder.order_subtotal}</span></p>
                                <p>Shipping: <span id="order_shipping">$${my_cartOrder.order_shipping}</span></p>
                                <h4>Total: <span>$${my_cartOrder.total}</span></h4>
                                <button type="submit" class="order_submit" id="order_submit">Place order</button>
                            </div>
                        </div>
                    </div>
                </div>`
          
    }
}

export default Placeorder;