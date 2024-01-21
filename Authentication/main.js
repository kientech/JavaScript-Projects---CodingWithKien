// Show hide password
window.addEventListener("load", function () {
  const togglePassword = document.querySelector(".toggle");
  togglePassword.addEventListener("click", function () {
    const input = togglePassword.previousElementSibling;
    const inputType = input.getAttribute("type");

    if (inputType === "password") {
      input.setAttribute("type", "text");
      togglePassword.classList.remove("uil-eye");
      togglePassword.classList.add("uil-eye-slash");
    } else {
      input.setAttribute("type", "password");
      togglePassword.classList.remove("uil-eye-slash");
      togglePassword.classList.add("uil-eye");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role");

  if (role === "admin") {
    document.getElementById("buttonLogOut").style.display = "block";
    document.getElementById("adminButton").style.display = "block";
  } else if (role === "user") {
    document.getElementById("buttonLogOut").style.display = "block";
  }
});

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(
    "http://localhost:3000/users?username=" + username + "&password=" + password
  );
  const users = await response.json();

  if (users.length > 0) {
    const user = users[0];
    if (user.role === "admin") {
      window.location.href = "index.html?role=admin";
    } else {
      window.location.href = "index.html?role=user";
    }
    localStorage.setItem(
      "userLogin",
      JSON.stringify({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        background: user.background,
      })
    );
    localStorage.setItem("role", user.role);
  } else {
    alert("Invalid username or password");
  }
}

async function checkUserExistence(username) {
  const response = await fetch(
    "http://localhost:3000/users?username=" + username
  );
  const users = await response.json();
  return users.length > 0;
}

function clearUserData() {
  localStorage.removeItem("userLogin");
  localStorage.removeItem("role");
}

function logout() {
  clearUserData();
  window.location.href = "signin.html";
}

// Sign up
function displayError(inputFieldId, errorMessage) {
  const errorElement = document.getElementById(inputFieldId + "Error");
  errorElement.innerHTML = errorMessage;
}

function clearErrors() {
  [
    "firstName",
    "lastName",
    "email",
    "username",
    "password",
    "confirmPassword",
  ].forEach((field) => {
    displayError(field, "");
  });
}

async function register() {
  clearErrors();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const avatar =
    "https://cdn.dribbble.com/users/2123888/screenshots/15193995/media/6557876b6595d1bb426c98d399a7a0cc.jpg?resize=1600x1200&vertical=center";
  const background =
    "https://cdn.dribbble.com/userupload/9644947/file/original-039cb27178826fe8271124454fa8e618.png?resize=2048x1536";

  // Kiểm tra thông tin trước khi đăng ký
  if (!firstName) {
    displayError("firstName", "Please enter your first name.");
    return;
  }

  if (!lastName) {
    displayError("lastName", "Please enter your last name.");
    return;
  }

  if (!email) {
    displayError("email", "Please enter your email address.");
    return;
  }

  if (!username) {
    displayError("username", "Please enter a username.");
    return;
  }

  if (!password) {
    displayError("password", "Please enter a password.");
    return;
  }

  if (password !== confirmPassword) {
    displayError(
      "confirmPassword",
      "Passwords do not match. Please enter matching passwords."
    );
    return;
  }

  // Kiểm tra xem tên người dùng đã tồn tại chưa
  const userExists = await checkUserExistence(username);

  if (userExists) {
    displayError(
      "username",
      "Username already exists. Please choose a different one."
    );
    return;
  }

  // Thêm người dùng mới vào cơ sở dữ liệu
  await addUserToDatabase(
    firstName,
    lastName,
    email,
    username,
    password,
    avatar,
    background
  );
  alert(
    "Registration successful. You can now login with your new credentials."
  );

  // Chuyển hướng người dùng đến trang đăng nhập
  window.location.href = "signin.html";
}

async function addUserToDatabase(
  firstName,
  lastName,
  email,
  username,
  password,
  avatar,
  background
) {
  // Thêm người dùng mới vào cơ sở dữ liệu
  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      avatar: avatar,
      background: background,
      role: "user", // Mặc định là user khi đăng ký
    }),
  });
}

function welcomeUser() {
  const userData = JSON.parse(localStorage.getItem("userLogin"));

  let firstName = document.getElementById("welcomeUser");
  let avatarImg = document.getElementById("user_image");

  firstName.innerText = userData.firstName;
  avatarImg.setAttribute("src", userData.avatar);
}

welcomeUser();
