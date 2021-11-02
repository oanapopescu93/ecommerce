const Footer = {
    actions: function(){

    },
    render: function(){  
        var date = new Date();
        date = date.getFullYear();
        return `<div class="container">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <h6>Copyright © <span id="copyright_year">${date}</span> Oana Popescu. All rights reserved.</h6>
                        </div>
                    </div>
                </div>`
    }
}

export default Footer;