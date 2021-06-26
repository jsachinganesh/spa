import PreviewView from "./PreviewView.js";

class InvoicesView{
    _parentElement  = document.querySelector('.invoicesContainer');
    constructor(){
        
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _generateHTMl(data){
        console.log(data);
       let boxs = data?.invoices?.data?.map((el,i)=>{
           return PreviewView.generateMarkup(el)
       }).join('');

      

       boxs = boxs?boxs:null;

        const html = `
            <div class="invoices">
                <div class="header">
                    <div class="headerName">
                        <h1>Invoices</h1>
                        <div class="totalInvoices">${data?.invoices?.length} total invoices</div>
                    </div>
                    <div class="headerFilterSide">
                        <div class="customSelectFilter">
                            <select>
                            <option value="0">Created Art</option>
                            <option value="1">Paid</option>
                            <option value="2">Pending</option>
                            <option value="3">Draft</option>
                            
                            </select>
                        </div>
                        <button data-newInvoice="newInvoice">
                            <img src="./assets/icon-plus.svg" alt="">
                            <span>New</span>
                        </button>
                    </div>
                </div>
                <div class="invoicesLists">
                   
                    ${boxs}
                    
                    
                
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


export default new InvoicesView;