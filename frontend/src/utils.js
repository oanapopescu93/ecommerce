import { getCookie, setCookie } from "./cookies";

export const parseRequestUrl = function(){
    const url = document.location.hash.toLowerCase();
    const request = url.split('/'); 
    return{
        resourse: request[1],
        id: request[2],
        action: request[3],
    }
}

export const rerender = async function(component){
    var my_render = await component.render();
    document.getElementById('main_container').innerHTML = my_render;
    await component.actions();
};

export const redirectUser = function(){
    if(getCookie("cartItems") === ""){
        document.location.hash = '/';
    } else {
        document.location.hash = '/shipping';
    }
};

export const showLoader = function(){
    if(document.getElementById('loader_container')){
        document.getElementById('loader_container').classList.add('show');
    }
};
export const hideLoader = function(){
    if(document.getElementById('loader_container')){
        document.getElementById('loader_container').classList.remove('show');
    }
};

export const showMessage = function(title, message, callback){
    let title_text = ``;
    let message_text = ``;
    if(typeof title !== "undefined" || title !== ""){
        title_text = `<div id="message_overlay_title"><h4>${title}</h4></div>`;
    }
    if(typeof message !== "undefined" || message !== ""){
        message_text = `<div id="message_overlay_message"><p>${message}</p></div>`;
    }

    document.getElementById('message_overlay').innerHTML = `<div>
        ${title_text}
        ${message_text}
        <button id="message_overlay_close_button">OK</button>
    </div>`;
    document.getElementById('message_overlay').classList.add('active');
    document.getElementById('message_overlay_close_button').addEventListener('click', function(){
        document.getElementById('message_overlay').classList.remove('active');
        if (callback) {
          callback();
        }
    });
};

export const getInfo = function(text){
    var info = [];
    if(getCookie(text) !== ""){
        info = JSON.parse(getCookie(text));
    }
    return info;
}
export const cleanCart = function(){
    setCookie("cartItems", "");
}