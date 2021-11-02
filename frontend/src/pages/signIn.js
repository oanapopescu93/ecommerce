import {signin} from '../api';
import {getCookie, setCookie} from '../cookies';
import { hideLoader, redirectUser, showLoader, showMessage } from '../utils';

const SignIn = {
    actions: function(){
        var signin_form = document.getElementById('signin_form');
        signin_form.addEventListener("submit", async function(e){
            e.preventDefault();
            showLoader();
            const info = await signin({
                email: document.getElementById("signin_email").value,
                password: document.getElementById("signin_password").value,
            });
            hideLoader();
            if(info.error){
                showMessage('Error', info.error);
            } else {
                var user_info = {
                    id: info.id,
                    email: info.email,
                    isAdmin: info.isAdmin,
                    name: info.name,
                    token: info.token
                }
                setCookie("userInfo", JSON.stringify(user_info));
                redirectUser();
            }
        });
    },
    render: async function(){
        if(getCookie("userInfo") !== "" && getCookie("userInfo")){
            if(JSON.parse(getCookie("userInfo")).name){
                redirectUser();
            }            
        }
        return `<div class="sign_in_form_container">
                    <div class="sign_in_form shadow_convex">
                        <h3 class="text-center">Sign in</h3>
                        <form id="signin_form">
                            <div class="form-group">
                                <label for="signin_email">Email:</label>
                                <input type="email" id="signin_email" name="sign_in_email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="sign_in_password">Password:</label>
                                <input type="password" id="signin_password" name="sign_in_password" class="form-control"">
                            </div>
                            <button type="submit" class="sign_in_submit" id="sign_in_submit">Sign in</button> 
                            <div class="form-group">
                                <a class="text-center" href="/#/signup">Create new account</a>
                            </div>
                        </form>
                    </div>
                </div>`
    }
}

export default SignIn;