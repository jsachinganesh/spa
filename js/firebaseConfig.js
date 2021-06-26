const firebaseConfig = {
    apiKey: "AIzaSyBlWxP6sxjIEX6ky059s8iz4uIVYNNudBM",
    authDomain: "ecomcourse-110ca.firebaseapp.com",
    projectId: "ecomcourse-110ca",
    storageBucket: "ecomcourse-110ca.appspot.com",
    messagingSenderId: "81809985069",
    appId: "1:81809985069:web:a3008dee7a71eceeb1f2a4"
};
  // Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();
export const auth = firebase.auth(firebase.app());
    
db.settings({timestampsInSnapshots:true});