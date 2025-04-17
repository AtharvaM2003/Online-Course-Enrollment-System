const apiUrl = "http://localhost:3000/Users";
let allUsers = [];
const form = document.getElementById("userForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userphone = document.getElementById("userPhone");
const userPass = document.getElementById("userPassword");
const userCPass = document.getElementById("userCPassword");
const userType = document.getElementById("role");
const submit = document.getElementById("submitBtn");
let allEmail = [];
let editId = null;


//Validating Username
function validateUsername() {
    if (userName.value.trim().length >= 5) {
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        return true;
    } else {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        return false;
    }
}

//Validating Pass
function validatePassword() {
    const pass = userPass.value;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (passRegex.test(pass)) {
        userPass.classList.add("is-valid");
        userPass.classList.remove("is-invalid");
        return true;
    } else {
        userPass.classList.add("is-invalid");
        userPass.classList.remove("is-valid");
        return false;
    }
}

//Validating Cpass
function validateCPass() {
    const pass = userPass.value;
    const cpass = userCPass.value;

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (pass === cpass && passRegex.test(cpass)) {

        userCPass.classList.add("is-valid");
        userCPass.classList.remove("is-invalid");
        return true;
    } else {
        userCPass.classList.add("is-invalid");
        userCPass.classList.remove("is-valid");
        return false;
    }
}

//validating Email
function validateEmail() {
    if (userEmail.value && userEmail.checkValidity()) {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");

        return true;

    } else {
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        return false;
    }
}


function validateMobile() {
    const mobileRegex = /^[789]\d{9}$/;
    if (mobileRegex.test(userphone.value.trim())) {
        userphone.classList.add("is-valid");
        userphone.classList.remove("is-invalid");
        return true;
    } else {
        userphone.classList.add("is-invalid");
        userphone.classList.remove("is-valid");
        return false;
    }
}

function validateType() {
    if (userType.value) {
        userType.classList.add("is-valid");
        userType.classList.remove("is-invalid");
        return true;
    } else {
        userType.classList.add("is-invalid");
        userType.classList.remove("is-valid");
        return false;
    }
}


form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(`${apiUrl}`)
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.email === userEmail.value);
            if (!user) {

                if (validateUsername() & validateEmail() & validateMobile() & validatePassword() & validateType() & validateCPass()) {
                    addUser();
                    window.location.href = "../pages/login.html";
                }


            }
            else {
                alert("User Exists!!");
                document.getElementById("error").textContent = "Email Present";
            }
        })

        .catch(err => {
            console.error("Error fetching users:", err);
            document.getElementById("error").textContent = "Server error. Please try again later.";
        });
});





function addUser() {
    const users = {
        name: userName.value.trim(),
        email: userEmail.value.trim(),
        phone: userphone.value.trim(),
        password: userPass.value.trim(),
        usertype: userType.value.trim(),

    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users)
    }).then(() => {
        alert("User Registered Successfully!");
    });
}
