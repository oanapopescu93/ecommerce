const CheckoutSteps = {
    render: function(props){
        return `<div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4">
                        <div class="row checkout_steps">
                            <div class="col-sm-4 ${props.step1 ? 'active' : ''}">Shipping</div>
                            <div class="col-sm-4 ${props.step2 ? 'active' : ''}">Payment</div>
                            <div class="col-sm-4 ${props.step3 ? 'active' : ''}">Place Order</div>
                        </div>
                    </div>
                    <div class="col-sm-4"></div>
                </div>`;
    },
};
export default CheckoutSteps;