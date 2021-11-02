import historyList from "../components/historyList";
import updateForm from "../components/updateForm";
import { getCookie } from "../cookies";

const Profile = {
    actions: async function(){
        var update_container = document.getElementById('update_container');
        if(typeof update_container !== "undefined"){
            update_container.innerHTML = await updateForm.render();
            if(typeof updateForm.actions === "function"){
                await updateForm.actions();
            }
        }
        var history_container = document.getElementById('history_container');
        if(typeof history_container !== "undefined"){
            history_container.innerHTML = await historyList.render();
            if(typeof historyList.actions === "function"){
                await historyList.actions();
            }
        }
    },
    render: async function(){
        let name = '';   
        if(getCookie("userInfo") !== "" && JSON.parse(getCookie("userInfo")).name){
            name = JSON.parse(getCookie("userInfo")).name;
        }
        if (name === '') {
            document.location.hash = '/';
        }
        return `
            <div class="container">
                <div class="row profile_container">
                    <div id="update_container" class="col-sm-4"></div>
                    <div id="history_container" class="col-sm-8"></div>
                </div>
            </div>`
    }
}

export default Profile;