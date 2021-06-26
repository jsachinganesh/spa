import InvoiceItems from "./InvoiceItems.js";
import PreviewView from "./PreviewView.js";

class InvoiceView{
    _parentElement  = document.querySelector('.invoicesContainer');
    // _back = document.querySelector('.backBtn');
    constructor(){
        
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _generateHTMl(data){
    //    const boxs = data.map((el,i)=>{
    //        return PreviewView.generateMarkup(el)
    //    }).join('');
        console.log(data);
        const paid = data.type !== 'save' ? '<div class="savePaidBtnBoxTwo">Save As Paid</div>':'';
        let boxs = data.itemsArray?.map((el,i)=>{
            return InvoiceItems.generateMarkup(el)
        }).join('');
       
        const html = `
            <div class="invoiceIDPage">
                <div class="invoiceIDPageContainer">
                    <div class="backBtn">&#8592; Go Back</div>
                    <div class="optionContainerInvoice">
                        <div class="optionContainerInvoiceBox">
                            <div class="statusDiv">Status</div>
                            <div class="statusDis">😤 ${data.type}d</div>
                        </div>
                        <div class="optionContainerInvoiceBoxTwo">
                            <div class="editBtnBoxTwo">Edit</div>
                            <div class="deleteBtnBoxTwo">delete</div>
                            ${paid}
                        </div>
                    </div>
                    <div class="bigDisplayEditInvoice">
                        <div class="idNameAdd">
                            <div class="idNameHash">
                                <div class="idYESS">#${data.id}</div>
                                <div class="nameidYess">
                                    ${data.clientDetails.clientName}
                                </div>
                            </div>
                            <div class="placeIdName">
                                <div class="">${data.clientDetails.cityClient}</div>
                                <div class="">${data.clientDetails.clientAddress}</div>
                                <div class="">${data.clientDetails.postCodeClient}</div>
                                <div class="">${data.clientDetails.countryClient}</div>
                            </div>
                        </div>
                        <div class="dateAndTimeQtybig">
                            <div class="invoiceDateAndTime">
                                <div class="timeanddatabox1">
                                    <div class="headTimeanddatabox1">Invoice Date</div>
                                    <div class="dateHead">${data.invoiceDate.month}/${data.invoiceDate.day}/${data.invoiceDate.year}</div>
                                </div>
                                <div class="timeanddatabox1">
                                    <div class="headTimeanddatabox1">Last Date</div>
                                    <div class="dateHead">${data.paymentLastDate.dayLast}/${data.paymentLastDate.monthLast}/${data.paymentLastDate.yearLast}</div>
                                </div>
                            </div>
                            <div class="invoiceDateAndTime">
                                <div class="">Banglore</div>
                                <div class="">Content</div>
                                <div class="">54548</div>
                                <div class="">${data.clientDetails.countryClient}</div>
                            </div>
                            <div class="emailSendBro">
                                <div class="">
                                    <div class="BillBro">
                                        Bill To
                                    </div>
                                    <div class="billEmailBro">
                                        ${data.clientDetails.clientEmail}
                                    </div>
                                </div>
                                <div class="blockBro"></div>
                            </div>
                        </div>
                        <div class="itemsToDisplaybig">
                            <div class="itemsToDisplaybigheader">
                                <div class="nameDisItems">Item Name</div>
                                <div class="namesQtyAndStuff">
                                    <div class="qtyStuff">
                                        Qty
                                    </div>
                                    <div class="qtyStuff">
                                        Price
                                    </div>
                                    <div class="qtyStuff">
                                        Total
                                    </div>
                                </div>
                            </div>
                            
                            ${boxs!=null? boxs:''}
                            <div class="amountStuff" data-amountStuff>
                                <div class="amountStuffText">Amount Due</div>
                                <div class="amountStuffNum">${data.totalAmount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `;

        return html;
    }

    handleClick(handler){
        this._parentElement.addEventListener('click',(e)=>handler(e));
    }

    renderDOM(data){
        const markup = this._generateHTMl(data);
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

}


export default new InvoiceView;

{/* <div class="itemsToDisplaybigheader">
    <div class="nameDisItems">Coding</div>
    <div class="namesQtyAndStuff">
        <div data-qtyStuff="qtyStuff" class="qtyStuff">
            1
        </div>
        <div data-qtyPrice="price" class="qtyStuff">
            ₹9000
        </div>
        <div data-qtyTotal="total" class="qtyStuff">
            9000
        </div>
    </div>
</div> */}