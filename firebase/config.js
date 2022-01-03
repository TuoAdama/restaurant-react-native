import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBEjzrbnxltR1uu5EuWy_NB9AIO7plMKMg",
    authDomain: "restaurant-app-b0fcc.firebaseapp.com",
    projectId: "restaurant-app-b0fcc",
    storageBucket: "restaurant-app-b0fcc.appspot.com",
    messagingSenderId: "408800134646",
    appId: "1:408800134646:web:fe5bc755514d83f86073d7",
    measurementId: "G-CXSHFJ2MY1"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}