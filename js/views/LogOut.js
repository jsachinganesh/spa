class LogOut{
    _parentElement  = document.querySelector('.newForm');
    _data = null;
    constructor(){
        
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _generateHTMl(){
        console.log(this._data);
        const html = `
        <div class="sideNavProfile">
        <h1 id="sideNavProfileClose">X</h1>
        <div class="userNameAndImg">
            <div class="userPicBig">
                <img src="./assets/image-avatar.jpg" alt="user">
            </div>
            <h1>${this._data.user.email}</h1>
        </div>
        <div class="numberImp">
         
           
            <div class="stats"> 
                <h3 style=background:#33D69F>Total Paid</h3>
                <div class="paidStats">
                    ₹ 9974.04               
                </div>
            </div>
            <div class="stats"> 
                <h3 style=background:#ff910081>Total Pending</h3>
                <div class="pendingStats">
                    ₹ 9974.04                
                </div>
            </div>
            <div  class="stats"> 
                <h3  style=background:#373b53>Total Draft</h3>
                <div class="DraftStats">
                    ₹ 9974.04                
                </div>
            </div>

        </div>

        <button class="logout">LogOut</button>
        <div class="space"></div>
    </div>
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
        console.log(handler);
        this._parentElement.querySelector('.formContainer').addEventListener('submit',function(e){
            e.preventDefault();  
            const hand = handler.bind(this);
            hand(e);
        });
    }

    renderDOM(data,handleSubmit){
        this._data = data;
        const markup = this._generateHTMl();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
        this.handleClick(handleSubmit);
    }

}


export default new LogOut;