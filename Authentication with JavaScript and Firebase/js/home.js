import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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

document.addEventListener("DOMContentLoaded", () => {
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("displayName");
  };
  onAuthStateChanged(auth, (user) => {
    const inforElement = document.getElementById("information");
    const displayName = localStorage.getItem("displayName");
    if (user) {
      const displayName = user.displayName || "User";
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else if (displayName) {
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
    } else {
      inforElement.innerHTML = `
            <div class='signin'>
                <a href="/html/signin.html">Sign in</a>
            </div>
        `;
    }
  });
});
