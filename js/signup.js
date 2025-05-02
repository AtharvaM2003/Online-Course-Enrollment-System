const apiUrl = "http://localhost:8080/api/users";

const form = document.getElementById("userForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userphone = document.getElementById("userPhone");
const userPass = document.getElementById("userPassword");
const userCPass = document.getElementById("userCPassword");
const userType = document.getElementById("role");
const togglePassword = document.getElementById('togglePassword');
const togglePassword1 = document.getElementById('togglePassword1');
const errorDiv = document.getElementById("errorMessage");

// Show/Hide Passwords
togglePassword.addEventListener('click', function () {
    const type = userPass.type === 'password' ? 'text' : 'password';
    userPass.type = type;
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

togglePassword1.addEventListener('click', function () {
    const type = userCPass.type === 'password' ? 'text' : 'password';
    userCPass.type = type;
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Validations


userName.addEventListener("blur", validateUsername);
userPass.addEventListener("blur", validatePassword);
userEmail.addEventListener("blur", validateEmail);
userphone.addEventListener("blur", validateMobile);
userCPass.addEventListener("blur", validateCPass);
userType.addEventListener("blur", validateType);

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

// Submit 
form.addEventListener("submit", function (e) {
    e.preventDefault();

    errorDiv.textContent = "";
    errorDiv.classList.add("d-none");

    const isValid =
        validateUsername() &&
        validateEmail() &&
        validateMobile() &&
        validatePassword() &&
        validateCPass() &&
        validateType();

    if (isValid) {
        addUser();
    }
});

// Add User
function addUser() {
    const user = {
        name: userName.value.trim(),
        email: userEmail.value.trim(),
        phone: userphone.value.trim(),
        password: userPass.value.trim(),
        usertype: userType.value.trim(),
    };

    fetch(`${apiUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (response.status === 409) {
                userEmail.classList.add("is-invalid");
                userEmail.classList.remove("is-valid");
                errorDiv.textContent = "Email already exists!";
                errorDiv.classList.remove("d-none");
                throw new Error("Email conflict");
            }

            if (!response.ok) {
                throw new Error("Failed to register user.");
            }

            return response.json();
        })
        .then(() => {
            alert("User Registered Successfully!");
            window.location.href = "../pages/login.html";
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
}
