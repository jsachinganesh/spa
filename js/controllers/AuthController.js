import { getSessionStorage, setSessionStorage } from "../helpers";
import { getInvoice, getInvoices, state } from "../model";
import invoicesView from "../views/invoicesView";
import loginView from "../views/loginView";
import sideBarView from "../views/sideBarView";
import { handleClickInvoiceNav } from "./controller";
const sideBarFixed = document.querySelector('.sidebar');

export async function getAccessAuth(loginEl,form){
   

    const authForm = document.querySelector(`.${form}`);
    authForm.addEventListener('submit',preventDefaultFuns);

    const email = authForm.querySelector('input[type="email"]');
    const password = authForm.querySelector('input[type="password"]');
    const emailValue = email.value;
    const passwordValue  = password.value;

    if(email.value === ''){
        email.style.border = '1px solid red';
        setTimeout(()=>{
            email.style.border = 'none';
        },1000)
        return;
    }
    if(password.value === ''){
        password.style.border = '1px solid red';
        setTimeout(()=>{
            password.style.border = 'none';
        },1000)
        return;
    }

    if(form === 'signUpForm'){
        state.user =  await createUserWithEmailAndPassword(emailValue,passwordValue);
    }else if(form === 'signInForm'){
        state.user =  await signInWithEmailAndPassword(emailValue,passwordValue);
    }

    // window.history.pushState(null, '', `#${state.user.uid}`);
    
    setSessionStorage(state);
    sideBarFixed.addEventListener('click',sideBarFixedHandler);
    invoicesView.renderDOM();
    invoicesView.handleClick(handleClickInvoiceNav);

    console.log("Done Auth");
}


export async function isAuth(){
    const id = window.location.hash.slice(1);

    const data = getSessionStorage();
   
    if(data?.user){
        state.user = data.user;
        const invoicesData = await getInvoices(state.user.uid);
        if(invoicesData.status !== 'good'){
            console.log(invoicesData);
            return;
        }

        
        console.log(invoicesData);
        state.invoices.data = invoicesData.data;
        state.invoices.length = invoicesData.length;

        if(id){

            state.invoice = await getInvoice(state.user.uid,id);
            InvoiceView.renderDOM(state.invoice.data);
            InvoiceView.handleClick(handleInvoice);

            return;
        }
       
        invoicesView.renderDOM(state.invoices.data);
        invoicesView.handleClick(handleClickInvoiceNav);
        sideBarView.renderDOM(null,handleSubmit);
        sideBarView.handleClick(handlerSilder);
        sideBarFixed.addEventListener('click',sideBarFixedHandler);
        
    }else {
        history.pushState({}, null, '/');
        loginView.renderDOM();
    }
}
