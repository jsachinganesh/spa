class EditSider{
    _parentElement  = document.querySelector('.newForm');
    _data = null;
    constructor(){
        
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _sideBoxItem(name,price,qty,total){
        return `
            <div class="itemsBoxs">
                <input type="text" class="itemsBoxsName" value="${name}">
                <input type="number" class=itemsBoxsQty value="${qty}">
                <input type="number" class="itemsBoxsPrice" value="${price}">
                <input type="number" class="total" value="${total}">
               
                <div class="delItem">&#9940;</div>
            </div>
        `;


    }

    _generateHTMl(){
        const items = this._data.itemsArray;
        const boxs = items.map(({itemsBoxsName,itemsBoxsPrice,itemsBoxsQty,total},i)=>{
            const str = this._sideBoxItem(itemsBoxsName,itemsBoxsPrice,itemsBoxsQty,total);
            return str;
        }).join('');

        // boxs = boxs == ''?null:boxs;
        
        const html = `
            <h1 class="newFormHeading">Edit <span class="greyBack">#</span>${this._data.id}</h1>
            <h1 class="close" data-close="close">X</h1>
            <form class="formContainer">
                <h3 class="highLight">Bill Form</h3>
                <div data-address="bill" class="addressDiv">
                    <label for="address" class="greyBack">Street Address</label>
                    <input required value="${this._data.address}"  type="text" class="address" id="address">
                </div>
                <div data-city="bill" class="cityDiv">
                    <div class="divFormBillBoxs">
                        <label for="city" class="greyBack">City</label>
                        <input required value="${this._data.city}"  type="text" id="city">
                    </div>
                    <div class="divFormBillBoxs">
                        <label for="postCode" class="greyBack">Post Code</label>
                        <input required value="${this._data.postCode}"  type="text" id="postCode">
                    </div>
                    <div class="divFormBillBoxs">
                        <label for="country" class="greyBack">Country</label>
                        <input required value="${this._data.country}"  type="text" id="country">
                    </div>
                </div>
                <h3  class="billTo highLight">Bill To</h3>
                <div data-address="client" class="addressDiv">
                    <label for="clientName" class="greyBack">Client's Name</label>
                    <input required value="${this._data.clientDetails.clientName}"  type="text" class="address"  id="clientName">
                </div>
                <div data-address="client" class="addressDiv">
                    <label for="clientEmail" class="greyBack">Client's Email</label>
                    <input required value="${this._data.clientDetails.clientEmail}"  type="email" class="address" id="clientEmail">
                </div>
                <div data-address="client" class="addressDiv">
                    <label for="clientAddress" class="greyBack">Street Address</label>
                    <input required value="${this._data.clientDetails.clientAddress}"  type="text" class="address" id="clientAddress">
                </div>

                <div data-city="client" class="cityDiv">
                    <div class="divFormBillBoxs">
                        <label for="cityClient" class="greyBack">City</label>
                        <input required value="${this._data.clientDetails.cityClient}"  type="text" id="cityClient">
                    </div>
                    <div class="divFormBillBoxs">
                        <label for="postCodeClient" class="greyBack">Post Code</label>
                        <input required value="${this._data.clientDetails.postCodeClient}"  type="text" id="postCodeClient">
                    </div>
                    <div class="divFormBillBoxs">
                        <label for="countryClient" class="greyBack">Country</label>
                        <input required value="${this._data.clientDetails.countryClient}"  type="text" id="countryClient">
                    </div>
                </div>

                <div class="invoiceDateAndPay">
                    <div class="dateThree">
                        <h4 class="greyBack">Invoice Date</h4>
                        <input required value="${this._data.invoiceDate.day}" id="day" placeholder="Day" type="number">
                        <input required value="${this._data.invoiceDate.month}" id="month" placeholder="Mon" type="number">
                        <input required value="${this._data.invoiceDate.year}" id="year" placeholder="Year" type="number">
                    </div>
                    <div class="dateThree">
                        <h4 class="greyBack">Payment Last Date</h4>
                        <input required value="${this._data.paymentLastDate.dayLast}" id="dayLast" placeholder="Day" type="number">
                        <input required value="${this._data.paymentLastDate.monthLast}" id="monthLast" placeholder="Mon" type="number">
                        <input required value="${this._data.paymentLastDate.yearLast}" id="yearLast" placeholder="Year" type="number">
                    </div>

                </div>

                <div data-address="client" class="addressDiv">
                    <label for="projectDescription" class="greyBack">Project Description</label>
                    <input required value="${this._data.projectDescription}"  type="text" class="address" id="projectDescription">
                </div>

                <div class="itemListForm">
                    <h3 class="greyBack">Item List</h3>
                    <div class="itemListBox">
                        <div class="itemsHeader">
                            <h4>Item Name</h4>
                            <h4>Qty</h4>
                            <h4>Price</h4>
                            <h4>Total</h4>
                            <h4>Delete</h4>
                        </div>

                        ${boxs}
                        
                        <div class="itemsBoxsBtn">
                            <div data-itemsBoxsBtnAdd="itemsBoxsBtnAdd" class="itemsBoxsBtnAdd">
                                Add item
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    
                    <div class="space"></div>
                </div>

                <div class="itemListBtns">
                        <button type="button" class="cancel">Cancel</button>
                        <button type="submit" class="draftBtn">Draft</button>
                        <button type="submit"  class="saveChanges">Save</button>
                </div>
                
            </form>
        `;
        // <input type="number" class="itemsBoxsTotal" value="25000">
        
        return html;
    }

    handleClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const hand = handler.bind(this);
            hand(e);
        });
        
    }

    handleSubmit(handler){
        this._parentElement.querySelector('.formContainer').addEventListener('submit',function(e){
            e.preventDefault();  
            const hand = handler.bind(this);
            hand(e);
        });
    }

    renderDOM(data = null,handleSubmit){
        this._data = data;
        console.log(data);
        const markup = this._generateHTMl();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
        this.handleSubmit(handleSubmit);
    }

}


export default new EditSider;