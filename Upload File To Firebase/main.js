import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import {
  getFirestore,
  setDoc,
  doc,
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
const storage = getStorage(app);
const db = getFirestore(app);

let uploadForm = document.getElementById("uploadForm");
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const file = document.getElementById("image").files[0];
  // console.log("🚀 ~ uploadForm.addEventListener ~ image:", title)
  // console.log("🚀 ~ uploadForm.addEventListener ~ image:", author)
  // console.log("🚀 ~ uploadForm.addEventListener ~ image:", image)
  const fileRef = storageRef(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log("🚀 ~ uploadTask.on ~ error:", error);
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const docRef = doc(db, "images", file.name);
        await setDoc(docRef, {
          title,
          author,
          image: downloadURL,
        });
        alert("Upload Data Successfully!!!");
        e.target.reset();
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    }
  );
});
