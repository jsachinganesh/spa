class LoginView{
    _parentElement  = document.querySelector('.invoicesContainer');
    constructor(){
        
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    _generateHTMl(){
        const html = `
        <div class="login">
            <h1>Login To View Your Invoices</h1>
            <div class="loginContainer">
                <form type="submit" class="signInLogin signInForm">
                    <h1 style="text-align: center;">Login In</h1>
                    <input required placeholder="Email" type="email">
                    <input required placeholder="Password" type="password" autocomplete="on">
                    <button data-login="login" >Login</button>
                </form>
                <div class="signUpLogin">
                    <form class="signInLogin signUpForm">
                        <h1 style="text-align: center;">Sign Up</h1>
                        <input required placeholder="Email" type="email">
                        <input required placeholder="Password" type="password" autocomplete="on">
                        <button data-signup="signup" >Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        `;

        return html;
    }

    renderDOM(){
        const markup = this._generateHTMl();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

}


export default new LoginView;