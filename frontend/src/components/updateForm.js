import { update } from "../api";
import { getCookie, setCookie } from "../cookies";
import { hideLoader, showLoader, showMessage } from "../utils";
import Header from "./header";

const updateForm = {
    actions: function(){
        var logout_form = document.getElementById('logout_submit');
        logout_form.addEventListener("click", function(){
            setCookie("userInfo", "");
            document.location.hash = '/';
        });

        var update_form = document.getElementById('update_form');
        update_form.addEventListener("submit", async function(e){
            e.preventDefault();
            showLoader();
            const info = await update({
                name: document.getElementById("update_name").value,
                email: document.getElementById("update_email").value,
                password: document.getElementById("update_password").value,
            });
            if (info.error) {
                showMessage('Error', info.error);
            } else {
                setCookie("userInfo", JSON.stringify(info));
                var header = document.getElementById('header_container');
                if(typeof header !== "undefined"){
                    header.innerHTML = await Header.render();
                    if(typeof Header.actions === "function"){
                        await Header.actions();
                    }
                }
            }
            hideLoader();            
        });
    },
    render: function(){
        let name = ''; 
        let email = '';  
        if(getCookie("userInfo") !== "" && JSON.parse(getCookie("userInfo")).name && JSON.parse(getCookie("userInfo")).email){
            name = JSON.parse(getCookie("userInfo")).name;
            email = JSON.parse(getCookie("userInfo")).email;
        }
        if (name === '' || email === '') {
            document.location.hash = '/';
        }
        return `<h4>User profile</h4>
                <div class="update_form_container">
                    <div class="update_form shadow_convex">
                        <form id="update_form">
                            <div class="form-group">
                                <label for="update_name">Name:</label>
                                <input value="${name}" type="text" id="update_name" name="update_name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="update_email">Email:</label>
                                <input value="${email}" type="email" id="update_email" name="update_email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="update_password">Password:</label>
                                <input type="password" id="update_password" name="update_password" class="form-control"">
                            </div>
                            <button type="submit" class="update_submit" id="update_submit">Update</button>
                            <button type="button" class="logout_submit" id="logout_submit">Logout</button> 
                        </form>
                    </div>
                </div>`
    }
}

export default updateForm;