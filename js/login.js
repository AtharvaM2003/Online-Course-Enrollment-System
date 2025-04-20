document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    verify();
});
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

function verify() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/Users")
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem("userId", user.id);
                sessionStorage.setItem("userName", user.name);
                sessionStorage.setItem("userType", user.usertype);

                if (user.usertype === "admin") {
                    window.location.href = "../admin.html";
                } else {
                    window.location.href = "../student.html";
                }
            } else {
                document.getElementById("error").textContent = "Invalid email or password.";
            }
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            document.getElementById("error").textContent = "Server error. Please try again later.";
        });
}

function getUserId() {
    return sessionStorage.getItem("userId");
}

function getUserName() {
    return sessionStorage.getItem("userName");
}

function getUserType() {
    return sessionStorage.getItem("userType");
}

function logout() {
    sessionStorage.clear();
    sessionStorage.setItem("loggedOut", "true");
    window.location.href = "login.html";
}
