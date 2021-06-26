import { auth, db } from "./firebaseConfig.js";

export const state = {
    user:null,
    invoices:{
        length:0,
        data:[]
    },
    invoice:null    
};

export const addInvoices = async (data,uid) =>{
    await db.collection('invoices').doc(uid).collection('myInvoices').doc().set(data);
    console.log("Done");
}

export const getInvoices = async (uid) =>{
    try {
        const invoices = await db.collection('invoices').doc(uid).collection('myInvoices').get();
        const data = [];
        invoices.forEach((doc,i)=>{
            data.push({...doc.data(),docID:doc.id});
        });

        return {status:'good',data,length:data.length};
    } catch (error) {
        return {status:error,data:null};
    }
} 

export const getInvoice = async (uid,docID) => {
    try {
        const invoice = await db.collection('invoices').doc(uid).collection('myInvoices').doc(docID).get();

        return {status:'good',data:invoice.data()};
    } catch (error) {
        return {status:error,data:null};
    }

   
}

export const createUserWithEmailAndPassword = async (email,password) =>{
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email,password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        return {status:error,data:null};
    }
}


export const signInWithEmailAndPassword =async (email,password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email,password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error) {
        return {status:error,data:null};
    }
}


export const deleteInvoice = async (uid,docID) => {
    try {
        const invoice = await db.collection('invoices').doc(uid).collection('myInvoices').doc(docID).delete();

    } catch (error) {
        
    }
}

export const sortBy = (COL,order) => {
    const fin = [];
    
    if(order === 'totalAmount'){
        COL.sort(function(a,b){return a.totalAmount - b.totalAmount});
    }

    state.invoices.data = COL;
}