import { auth } from "../firebaseConfig.js";
import { openSider, setSessionStorage, getSessionStorage, preventDefaultFuns} from "../helpers.js";
import { addInvoices, createUserWithEmailAndPassword, deleteInvoice, getInvoice, getInvoices, signInWithEmailAndPassword, sortBy, state } from "../model.js";
import EditSide from "../views/EditSide.js";
import invoicesView from "../views/invoicesView.js";
import InvoiceView from "../views/InvoiceView.js";
import loginView from "../views/loginView.js";
import LogOut from "../views/LogOut.js";
import sideBarView from "../views/sideBarView.js";

const sideBarFixed = document.querySelector('.sidebar');
const formSide  = document.querySelector('.newForm');
const invoicesContainer = document.querySelector('.invoicesContainer');



async function handleInvoice(e){
    // invoicesView.renderDOM(state.invoices.data);
    // invoicesView.handleClick(handleClickInvoiceNav);
    const backBtn = e.target.classList.contains('backBtn');
    const editBtnBox = e.target.classList.contains('editBtnBoxTwo');

    const deleteBtnBoxTwo = e.target.classList.contains('deleteBtnBoxTwo');

    if(backBtn){
        invoicesContainer.insertAdjacentHTML('afterbegin','<div class="loader"></div>')
        invoicesView.renderDOM(state);
        invoicesView.handleClick(handleClickInvoiceNav);
        history.pushState({}, null, '/');


        return;
    }

    if(editBtnBox){

        EditSide.renderDOM(state.invoice.data);
        EditSide.handleClick(handlerSilder);
        openSider(formSide);
    }

    if(deleteBtnBoxTwo){
        const id = window.location.hash.slice(1);
        await deleteInvoice(state.invoice.data.uid,id);
        console.log(id, " Deleted");
        invoicesContainer.insertAdjacentHTML('afterbegin','<div class="loader"></div>')
        invoicesView.renderDOM(state);
        invoicesView.handleClick(handleClickInvoiceNav);
        history.pushState({}, null, '/');
        return;
    }
    
}


export async function handleClickInvoiceNav(e){
    const newInvoice = e.target.getAttribute('data-newInvoice');

    const w = screen.width;
    // const h = screen.height;
    if(newInvoice){
        sideBarView.renderDOM(null,handleSubmit);
        sideBarView.handleClick(handlerSilder);
        openSider(formSide);
       
    }

    const invoicesItemIS = e.target.classList.contains('invoicesItem');

    if(invoicesItemIS){
        const invoicesItem = e.target.href;
        const invoice = invoicesItem.split('#')[1];
        state.invoice = await getInvoice(state.user.uid,invoice);
        
        InvoiceView.renderDOM(state.invoice.data);
        InvoiceView.handleClick(handleInvoice);
    }
    
}

async function handleSubmit(e){
    
    const address = this.querySelector('#address').value;
    const city = this.querySelector('#city').value;
    const country = this.querySelector('#country').value;
    const postCode = this.querySelector('#postCode').value;
    const clientName = this.querySelector('#clientName').value;
    const clientEmail = this.querySelector('#clientEmail').value;
    const clientAddress = this.querySelector('#clientAddress').value;
    const cityClient = this.querySelector('#cityClient').value;
    const postCodeClient = this.querySelector('#postCodeClient').value;
    const countryClient = this.querySelector('#countryClient').value;
    const day = this.querySelector('#day').value;
    const month = this.querySelector('#month').value;
    const year = this.querySelector('#year').value;
    const dayLast = this.querySelector('#dayLast').value;
    const monthLast = this.querySelector('#monthLast').value;
    const yearLast = this.querySelector('#yearLast').value;
    const projectDescription = this.querySelector('#projectDescription').value;

    var activeElement = document.activeElement;
    const isDraft = activeElement.classList.contains('draftBtn');

    const what = isDraft? 'draft' : 'save';


    const itemsBoxsAll = this.querySelectorAll('.itemsBoxs');
    const itemsArray = [];
    let totalAmount = 0;
    itemsBoxsAll.forEach((el,i)=>{

        const itemsBoxsName = el.querySelector('.itemsBoxsName').value;
        const itemsBoxsQty = el.querySelector('.itemsBoxsQty').value * 1;
        const itemsBoxsPrice = el.querySelector('.itemsBoxsPrice').value * 1;

        const obj = {
            itemsBoxsName,itemsBoxsQty,itemsBoxsPrice,total:itemsBoxsQty*itemsBoxsPrice
        }
        totalAmount = totalAmount + (itemsBoxsQty*itemsBoxsPrice);
        itemsArray.push(obj);
    });

    const bill = {
        address,city,country,postCode,
        clientDetails:{
            clientName,clientEmail,clientAddress,cityClient,postCodeClient,countryClient
        },
        invoiceDate:{
            day,month,year,
        },
        paymentLastDate:{
            dayLast,monthLast,yearLast
        },
        projectDescription,
        itemsArray,
        totalAmount,
        uid:state.user.uid,
        type:what,
        id:Math.floor(100000 + Math.random() * 900000),
        created: new Date()
    }
    console.log(bill);
    await addInvoices(bill,state.user.uid);
    this.reset();
    this.parentElement.style.transform = `translateX(-100%)`;
}

export function handlerSilder(e){
    
    const close = e.target.getAttribute('data-close');
    const form = this.querySelectorAll('.formContainer');
    const itemsBoxsBtnAdd = e.target.getAttribute('data-itemsBoxsBtnAdd');
    const itemsBoxsBtn = this.querySelector('.itemsBoxsBtn');
    const draftBtn = e.target.classList.contains('draftBtn');
    const delBtnItem = e.target.classList.contains('delItem');
    const cancel = e.target.classList.contains('cancel');

    if(close === 'close' || cancel){
        this.style.transform = `translateX(-100%)`;
    }

    if(itemsBoxsBtnAdd === 'itemsBoxsBtnAdd'){
        const boxHTML = `
            <div class="itemsBoxs">
                <input type="text" class="itemsBoxsName" value="">
                <input type="number" class=itemsBoxsQty value="">
                <input type="number" class="itemsBoxsPrice" value="">
               
                <div class="delItem">&#9940;</div>
            </div>
        `;

        itemsBoxsBtn.insertAdjacentHTML('beforeBegin',boxHTML);
    }

    if(delBtnItem){
        const par = e.target.parentElement;
        par.remove();
    }  
}


async function isAuth(){
    const id = window.location.hash.slice(1);

    const data = getSessionStorage();
    invoicesContainer.innerHTML = '<div class="loader"></div>';
    if(data?.user){
        console.log("Dsss");
        state.user = data.user;
        const invoicesData = await getInvoices(state.user.uid);
        if(invoicesData.status !== 'good'){
            console.log(invoicesData);
            return;
        }

        
        console.log(invoicesData);
        state.invoices.data = invoicesData.data;
        state.invoices.length = invoicesData.data.length;
        console.log("sa",state);
        if(id){

            state.invoice = await getInvoice(state.user.uid,id);
            InvoiceView.renderDOM(state.invoice.data);
            InvoiceView.handleClick(handleInvoice);

            return;
        }
        console.log("uuih");
        sortBy([...state.invoices.data],'totalAmount')
        invoicesView.renderDOM(state);
        invoicesView.handleClick(handleClickInvoiceNav);
        sideBarView.renderDOM(null,handleSubmit);
        sideBarView.handleClick(handlerSilder);
        sideBarFixed.addEventListener('click',sideBarFixedHandler);
       
    }else {
        
        history.pushState({}, null, '/');
        loginView.renderDOM();
    }
}

async function getAccessAuth(loginEl,form){
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
    const invoicesData = await getInvoices(state.user.uid);
        if(invoicesData.status !== 'good'){
            console.log(invoicesData);
            return;
        }

        
    console.log(invoicesData);
    state.invoices.data = invoicesData.data;
    state.invoices.length = invoicesData.data.length;
    
    setSessionStorage(state);
    sideBarFixed.addEventListener('click',sideBarFixedHandler);
    invoicesView.renderDOM(state);
    invoicesView.handleClick(handleClickInvoiceNav);
    

    console.log("Done Auth");
}

function main(){
    invoicesContainer.addEventListener('click', (e)=>{
        const signupAttr = e.target.getAttribute('data-signup');
        const loginAttr = e.target.getAttribute('data-login');

        if(signupAttr){
            const signupEl = e.target;
            getAccessAuth(signupEl,'signUpForm');
        }

        if(loginAttr){
            const loginEl = e.target;
            getAccessAuth(loginEl,'signInForm');
        }
    })
}


async function LogoutHandler(e){
    

    const logout = e.target.classList.contains('logout');
    const sideNavProfileClose = e.target.id === 'sideNavProfileClose';

    if(sideNavProfileClose){
        this.style.transform = `translateX(-100%)`;
        return;
    }

    if(logout){
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
            return;
        }
        loginView.renderDOM();
        sessionStorage.clear();
        
        this.style.transform = `translateX(-100%)`;
        sideBarFixed.removeEventListener(sideBarFixedHandler);
        
        
    }

    return;
}

export function sideBarFixedHandler(e){
    const logoImg = e.target.classList.contains('logoImg');
    if(logoImg){
        LogOut.renderDOM(state,LogoutHandler);
        openSider(formSide);
    }
}





function init(){
    isAuth();
    main();
}

document.addEventListener('DOMContentLoaded',init);