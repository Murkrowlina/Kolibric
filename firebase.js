const firebaseConfig = {
    apiKey: "AIzaSyClyeDhakJu7u3TXDNArwh7vaJnIPFzjzY",
    authDomain: "edit-projekt.firebaseapp.com",
    projectId: "edit-projekt",
    storageBucket: "edit-projekt.appspot.com",
    messagingSenderId: "645695215772",
    appId: "1:645695215772:web:4f4f78eb3847fda278b559",
    measurementId: "G-N3MB3ZN4CN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

let email;
let password; 

function register() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
        console.log(result.user)
    })
    .catch((error) => {
        console.log(error.code);
        console.log(error.message);
    })
}

function login(){
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
        window.location = 'index.html';
    })
    .catch((error) => {
        alert('Netočan email ili šifra. Molimo Vas da provjerite.')
        console.log(error.code);
        console.log(error.message);
    })
}

function signOut() {
    auth.signOut()
    .then(function() {
        console.log('User signed out');
    })
    .catch(function(error) {
        console.error('Sign-out error:', error);
    });
}
