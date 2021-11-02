/* eslint-disable import/no-unresolved */
import CheckoutSteps from '../components/CheckoutSteps';
import { getCookie, setCookie } from '../cookies';
import { getInfo } from '../utils';

const Shipping = {
    actions: function(){
        var shipping = document.getElementById('shipping_submit');
        shipping.addEventListener("click", function(e){
            e.preventDefault();
            var shipping_array = [{
                shipping_address: document.getElementById("shipping_address").value,
                shipping_city: document.getElementById("shipping_city").value,
                shipping_postal_code: document.getElementById("shipping_postal_code").value,
                shipping_country: document.getElementById("shipping_country").value,
                shipping_method: document.getElementById("shipping_method").value,
            }];            
            setCookie("shipping", JSON.stringify(shipping_array));
            document.location.hash = '/payment';
        });
    },
    render: async function(){
        const userInfo = getInfo('userInfo');
        if(Object.keys(userInfo).length === 0 || typeof userInfo.name === "undefined"){
            document.location.hash = '/';
        } 

        let shipping_address = ''; 
        let shipping_city = '';
        let shipping_postal_code = '';
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
        }
        return `${CheckoutSteps.render({step1: true})}
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4 shipping_form_container">                    
                        <div class="shipping_form shadow_convex">
                            <h3 class="text-center">Shipping</h3>
                            <form id="shipping_form">
                                <div class="form-group">
                                    <label for="shipping_address">Address:</label>
                                    <input value="${shipping_address}" type="text" id="shipping_address" name="shipping_address" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="shipping_city">City:</label>
                                    <input value="${shipping_city}" type="text" id="shipping_city" name="shipping_city" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="shipping_postal_code">Postal code:</label>
                                    <input value="${shipping_postal_code}" type="text" id="shipping_postal_code" name="shipping_postal_code" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="shipping_country">Country:</label>
                                    <select class="form-control" name="shipping_country" id="shipping_country">
                                        <option value="romania" selected>Romania</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="shipping_method">Shipping method:</label>
                                    <select class="form-control" name="shipping_method" id="shipping_method">
                                        <option value="standard" selected>Standard</option>
                                    </select>
                                </div>
                                <button type="submit" class="shipping_submit" id="shipping_submit">Continue</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-4"></div>
                </div>`
          
    }
}

export default Shipping;