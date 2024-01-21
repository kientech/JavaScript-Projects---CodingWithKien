// profile.js
document.addEventListener("DOMContentLoaded", function () {
  loadUserProfile();
});

function loadUserProfile() {
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  if (userData) {
    document.getElementById("firstName").value = userData.firstName;
    document.getElementById("lastName").value = userData.lastName;
    document.getElementById("email").value = userData.email;
    document.getElementById("avatar").value = userData.avatar;
    document.getElementById("password").value = userData.password;
    document.getElementById("username").value = userData.username;
    document.getElementById("name_profile").innerText =
      userData.firstName + " " + userData.lastName;
    document.getElementById("email_profile").innerText = userData.email;
    document.getElementById("background").value = userData.background;
    updateAvatarPreview();
  }
}

function updateAvatarPreview() {
  const avatarUrl = document.getElementById("avatar").value;
  const backgroundURL = document.getElementById("background").value;
  const avatarPreview = document.getElementById("avatarPreview");
  const backgroundPreview = document.getElementById("banner_background");

  // Display avatar image preview
  avatarPreview.src = avatarUrl;
  backgroundPreview.src = backgroundURL;
}

async function saveProfile() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const avatar = document.getElementById("avatar").value;
  const username = document.getElementById("username").value;
  const avatarUrl = document.getElementById("avatar").value;
  const password = document.getElementById("password").value;
  const backgroundUrl = document.getElementById("background").value;

  const userData = JSON.parse(localStorage.getItem("userLogin"));

  if (userData) {
    const userId = userData.id;
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        avatar: avatarUrl,
        background: backgroundUrl
      }),
    });

    if (response.ok) {
      userData.firstName = firstName;
      userData.lastName = lastName;
      userData.email = email;
      userData.avatar = avatar;
      userData.username = username;
      userData.background = backgroundUrl;
      localStorage.setItem("userLogin", JSON.stringify(userData));

      alert("Profile updated successfully.");
    } else {
      alert("Failed to update profile. Please try again.");
    }
  }
}
