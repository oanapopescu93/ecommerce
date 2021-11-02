import { getCookie } from "../cookies";

const Header = {
    actions: function(){

    },
    render: function(){     
        let name = '';   
        if(getCookie("userInfo") !== "" && JSON.parse(getCookie("userInfo")).name){
            name = JSON.parse(getCookie("userInfo")).name;
        }
        let link = `<a href="/#/signin">Sign in</a>`;
        if(name !== ""){
            link = `<a href="/#/profile">${name}</a>`;
        }
        return `<div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="header_left">
                                <a href="/#/"><h1>LogoTitle</h1></a>
                            </div>
                            <div class="header_right">
                                <div class="header_box">${link}</div>
                                <div class="header_box"><a href="/#/cart">Cart</a></div>
                            </div>
                        </div>
                    </div>
                </div>`
    }
}

export default Header;