/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import CheckoutSteps from '../components/CheckoutSteps';
import { getCookie, setCookie } from '../cookies';
import { getInfo } from '../utils';

const Payment = {
    actions: function(){
        var payment = document.getElementById('payment_submit');
        payment.addEventListener("click", function(e){
            e.preventDefault();
            var payment_array = [{
                payment: document.querySelector('input[name="radio-group"]:checked').value
            }];  
            setCookie("payment", JSON.stringify(payment_array));
            document.location.hash = '/placeorder';
        });
    },
    render: async function(){
        const userInfo = getInfo('userInfo');
        if(Object.keys(userInfo).length === 0 || typeof userInfo.name === "undefined"){
            document.location.hash = '/';
        }

        var props = {paypal: true, cash: false}
        var keys = Object.keys(props);
        if(getCookie("payment") !== ""){
            if(JSON.parse(getCookie("payment"))[0].payment){
                var type = JSON.parse(getCookie("payment"))[0].payment
                for(var i in keys){
                    props[keys[i]] = false;
                }
                props[type] = true;
            }
        }
        return `
            ${CheckoutSteps.render({step2: true})}
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4 payment_form_container">                    
                    <div class="payment_form shadow_convex">
                        <h3 class="text-center">Payment</h3>
                        <form id="payment_form">
                        ${keys.map(function(x){
                            var payment_choose = props[x];
                            return `<p>
                                        <input value="${x}" type="radio" id="payment1" name="radio-group" ${payment_choose ? 'checked' : ''}>
                                        <label for="payment1">${x}</label>
                                    </p>`
                        }).join('\n')}
                        <button type="submit" class="payment_submit" id="payment_submit">Continue</button>
                        </form>
                    </div>
                </div>
                <div class="col-sm-4"></div>
            </div>`
          
    }
}

export default Payment;