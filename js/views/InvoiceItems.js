class InvoiceItems{
    

    generateMarkup(data){
        
        return `
            <div class="itemsToDisplaybigheader">
                <div class="nameDisItems">${data.itemsBoxsName}</div>
                <div class="namesQtyAndStuff">
                    <div data-qtyStuff="qtyStuff" class="qtyStuff">
                        ${data.itemsBoxsQty}
                    </div>
                    <div data-qtyPrice="price" class="qtyStuff">
                        ₹${data.itemsBoxsPrice}
                    </div>
                    <div data-qtyTotal="total" class="qtyStuff">
                        ₹${data.total}
                    </div>
                </div>
            </div>
        `;
    }

}

export default new InvoiceItems;


