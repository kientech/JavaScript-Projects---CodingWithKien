function signUp(e) {
  // Retrieve input values from the form
  let fname = document.getElementById("fname").value,
    lname = document.getElementById("lname").value,
    email = document.getElementById("email").value,
    pwd = document.getElementById("pwd").value;

  // Retrieve existing form data from local storage or initialize an empty array
  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  // Check if a user with the same email already exists
  let exist =
    formData.length &&
    formData.some(
      (data) => data.email == email
    );

  // If the user doesn't exist, add the new user data to the form data in local storage
  if (!exist) {
    formData.push({ fname, lname, email, pwd });
    localStorage.setItem("formData", JSON.stringify(formData));
    // Reset the form and set focus on the first name input
    document.querySelector("form").reset();
    document.getElementById("fname").focus()
    // Display an alert indicating successful account creation
    alert("Sign Up Successfully. Please Sign In ");
  } else {
    // If the user already exists, display an alert indicating duplication
    alert("You have already signed up");
  }
  // Prevent the default form submission
  e.preventDefault();
};

function signIn(e) {
  // Retrieve email and password input values from the form
  let email = document.getElementById("email").value,
    pwd = document.getElementById("pwd").value;

  // Retrieve existing form data from local storage or initialize an empty array
  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  // Check if a user with the provided email and password exists
  let exist =
    formData.length &&
    formData.some(
      (data) =>
        data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd
    );

  // If the user doesn't exist, display an alert indicating incorrect login credentials
  if (!exist) {
    alert("Incorrect login credentials");
  } else {
    // If the user exists, redirect to the home page (index.html)
    alert("Sign In Successfully");
    location.href = "./index.html";
  }
  // Prevent the default form submission
  e.preventDefault();
}
