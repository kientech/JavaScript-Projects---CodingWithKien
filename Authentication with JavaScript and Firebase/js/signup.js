import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const db = getFirestore(app);

const formSignUp = document.getElementById("form-signup");
formSignUp.addEventListener("submit", async (e) => {
  e.preventDefault();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password);

  updateProfile(auth.currentUser, {
    displayName: firstName + " " + lastName,
  });

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    firstName,
    lastName,
    email,
    password,
  });

  alert("Register Successfully!");
  window.location.href = "/index.html";
});
