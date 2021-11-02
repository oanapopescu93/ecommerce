import axios from 'axios';
import Rating from '../components/rating';
import { apiUrl } from '../config';
import { hideLoader, showLoader } from '../utils';

const Home = {
    actions: function(){
        document.querySelectorAll(".product_box").forEach(function(item){
            item.addEventListener("mouseover", function(){
                item.querySelector('.product_image_box').classList.add('open');
            });
            item.addEventListener("mouseout", function(){
                item.querySelector('.product_image_box').classList.remove('open');
            });
        });
    },
    render: async function(){
        showLoader();
        try{
            const response = await axios({
                url: apiUrl + '/api/products',
                headers: {
                    'Content-type':'application/json',
                }
            })
            if(!response || response.statusText !== "OK"){
                throw new Error(response.data.message);
            }
            var products = response.data;
            hideLoader();
            return `
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="row products">
                            ${products.map(function(prod){
                                return `<li class="col-sm-3 product">
                                    <div class="product_box shadow_convex">
                                        <div class="product_image">
                                            <img src="${prod.image}" alt="${prod.name}"/>
                                        </div>
                                        <div class="product_info">
                                            <div class="product_name">
                                                <a href="/#/product/${prod.id}"><h3>${prod.name}</h3></a>
                                            </div>
                                            <div class="product_brand">
                                                <p>${prod.brand}</p>
                                            </div>
                                            <div class="product_rating">
                                                ${Rating.render({rating: prod.rating, reviews: prod.reviews})}
                                            </div>
                                            <div class="product_price">
                                                <p>$${prod.price}</p>
                                            </div>
                                        </div>
                                        <a class="product_image_box" href="/#/product/${prod.id}"><h4>See product</h4></a>
                                    </div>
                                </li>`
                            }).join('\n')}
                            </ul>
                        </div>
                    </div>
                </div>` 
        } catch(err){
            console.warn('home error--> ', err);
            return {error: err.message}
        }   
    }
}

export default Home;