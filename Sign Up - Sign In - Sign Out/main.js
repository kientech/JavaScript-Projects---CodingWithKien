function signUp(event){
    event.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    let isExisting = userData.some(user => (user.email == email));

    if (!isExisting){
        userData.push({firstName, lastName, email, password});
        localStorage.setItem('userData', JSON.stringify(userData))

        document.querySelector('form').reset();
        document.getElementById('firstName').focus();

        alert("Sign Up Successfully")
        window.location.href = './signin.html'
    } else {
        alert('You have already signed up!')
    }
}

function signIn(event){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    let auth = userData.some((user) => user.email == email && user.password == password);

    if (auth){
        let currentUser = userData.find((user) => user.email == email && user.password == password);
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        alert("Sign In Successfully")
        window.location.href = './index.html'
    } else {
        alert("Incorrect login credentials")
    }
}

function signOut(){
    sessionStorage.removeItem('currentUser');
    window.location.href = './signin.html';
}