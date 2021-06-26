export function openSider(formSide){
    const w = screen.width;
    if(w<=500){
        formSide.style.transform = `translateX(0)`;
    }else{
        formSide.style.transform = `translateX(100px)`;
    }
}


export function setSessionStorage(data){
    sessionStorage.setItem('state', JSON.stringify(data));
}

export function getSessionStorage(){
    const obj = JSON.parse(sessionStorage.getItem('state'));
    return obj;
}

export function preventDefaultFuns(e){
    e.preventDefault();
}
