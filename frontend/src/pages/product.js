import {parseRequestUrl} from '../utils';
import {getProduct} from '../api';
import Rating from '../components/rating';

const product = {
    actions: function(){
        var request = parseRequestUrl();
        document.querySelectorAll(".add_cart").forEach(function(item){
            item.addEventListener("click", function(){
                document.location.hash = `/cart/${request.id}`;
            });
        });
    },
    render: async function(){
        var request = parseRequestUrl();
        var prod = await getProduct(request.id);
        var my_discount = prod.discount;
        var my_price = prod.price;
        var my_stock = "Available";
        var stock_color = "";
        if(my_discount !== 0 && typeof my_discount !== "undefined" && my_discount !== "null" && my_discount !== null){
            my_price -= my_price * my_discount/100;
        }
        if(prod.stock === 0){
            my_stock = "Unavailable";
            stock_color = "text_red";
        }
        return `
        <div class="container product_page">
            <div class="row">
                <div class="col-sm-12 product_back">
                    <a href="/#/"><span>Back</span></a>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 product_image">
                    <img src="${prod.image}" alt="${prod.name}"/>
                </div>
                <div class="col-sm-8 product_info hidden-xs">
                    <div class="product_name">
                        <h3>${prod.name}</h3>
                    </div>
                    <div class="product_price">
                        <h4 class="highlight">$${my_price}<span class="discount red_text">$${prod.price}</span></h4>
                    </div>
                    <div class="product_description_small">
                        <p>${prod.description_small}</p>
                    </div>
                    <div class="product_description_small">
                        <p>Stock: <span class="${stock_color}">${my_stock}</span></p>
                    </div>
                    <div class="product_buy">
                        <button type="button" class="btn add_cart">Add to cart</button>
                    </div>
                    <div class="product_rating">
                        ${Rating.render({rating: prod.rating, reviews: prod.reviews})}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 product_info visible-xs-block">
                    <div class="product_name">
                        <h3>${prod.name}</h3>
                    </div>
                    <div class="product_price">
                        <h4 class="highlight">$${my_price}<span class="discount red_text">$${prod.price}</span></h4>
                    </div>
                    <div class="product_description_small">
                        <p>${prod.description_small}</p>
                    </div>
                    <div class="product_description_small">
                        <p>Stock: <span class="${stock_color}">${my_stock}</span></p>
                    </div>
                    <div class="product_buy">
                        <button type="button" class="btn add_cart">Add to cart</button>
                    </div>
                    <div class="product_rating">
                        ${Rating.render({rating: prod.rating, reviews: prod.reviews})}
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="product_description_big">
                        <h4>Description:</h4>
                        <p>${prod.description_big}</p>
                        <h4>Brand:</h4>
                        <p>${prod.brand}</p>
                    </div>
                    <div class="product_features">
                        <h4>Features:</h4>
                        ${prod.features.map(function(feature){
                            return `<div class="features">${feature}</div>`
                        }).join('\n')}
                    </div>
                </div>
            </div>
        </div>
        ` 
    }
}

export default product;