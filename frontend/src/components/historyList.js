const historyList = {
    actions: function(){

    },
    render: function(){
        const orders = `<tr><td colspan="6">No Order Found.</tr>`;
        return `<h4>Order history</h4>
            <table>
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders}
                </tbody>
            </table>
        `
    }
}

export default historyList;