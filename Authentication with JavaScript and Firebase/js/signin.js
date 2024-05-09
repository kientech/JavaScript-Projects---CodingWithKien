import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaBq1dY3SR1Zf9cfgh_kan5GsYWOw1TfI",
  authDomain: "blogfirebase-b75df.firebaseapp.com",
  databaseURL: "https://blogfirebase-b75df-default-rtdb.firebaseio.com",
  projectId: "blogfirebase-b75df",
  storageBucket: "blogfirebase-b75df.appspot.com",
  messagingSenderId: "40433844212",
  appId: "1:40433844212:web:57e2e985f7b6647b0203a1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let formSignIn = document.getElementById("form-signin");
formSignIn.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password);

  localStorage.setItem('displayName', auth.currentUser.displayName)

  alert("Sign In Successfully!");
  window.location.href = "/index.html";
});
