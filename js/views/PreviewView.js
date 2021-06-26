class PreviewView{
    

    generateMarkup(id){
        
        return `
            <a href="#${id.docID}" class="invoicesItem">
                <div class="invoicesItemboxone">
                    <div class="itemId"><span>#</span>${id.id}</div>
                    <div class="itemDate">Due ${id.paymentLastDate.dayLast}/${id.paymentLastDate.monthLast}/${id.paymentLastDate.yearLast}</div>
                    <div class="itemName">${id.clientDetails.clientName}</div>
                </div>
                <div class="invoicesItemboxtwo">
                    <div class="invoiceAmount">₹ ${id.totalAmount}</div>
                    <div class="itemAction">
                        &bull; ${id.type} >
                    </div>
                    
                </div>
            </a>
        `;
    }

}

export default new PreviewView;


