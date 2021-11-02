import { signup } from "../api";
import { setCookie } from "../cookies";
import { hideLoader, showLoader, showMessage } from "../utils";

const SignIn = {
    actions: function(){
        var signup_form = document.getElementById('signup_form');
        signup_form.addEventListener("submit", async function(e){
            e.preventDefault();
            showLoader();
            const info = await signup({
                name: document.getElementById("signup_name").value,
                email: document.getElementById("signup_email").value,
                password: document.getElementById("signup_password").value,
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
                document.location.hash = '/';
            }
        });
    },
    render: async function(){
        return `<div class="sign_up_form_container">
                    <div class="sign_up_form shadow_convex">
                        <h3 class="text-center">Sign Up</h3>
                        <form id="signup_form">
                            <div class="form-group">
                                <label for="signup_name">Name:</label>
                                <input type="text" id="signup_name" name="signup_name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="signup_email">Email:</label>
                                <input type="email" id="signup_email" name="signup_email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="signup_password">Password:</label>
                                <input type="password" id="signup_password" name="signup_password" class="form-control">
                            </div>
                            <button type="submit" class="sign_up_submit" id="sign_up_submit">Sign up</button>
                            <div class="form-group">
                                <a class="text-center" href="/#/signin">I have an account</a>
                            </div>
                        </form>
                    </div>
                </div>`
    }
}

export default SignIn;