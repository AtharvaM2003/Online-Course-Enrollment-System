document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    verify();
});
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

//Show Password--------------------------------------------------------
togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

//Authenticate through Session Storage----------------------------------------------------------
function verify() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password })
    })
        .then(response => {
            // Handle HTTP status codes with console logs
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                document.getElementById("error").textContent = "404 Not Found - Users data not available.";
            } else if (response.status === 401) {
                document.getElementById("error").textContent = "401 Unauthorized - Invalid token or access denied.";
            } else if (response.status === 500) {
                document.getElementById("error").textContent = "500 Internal Server Error.";
            } else {
                document.getElementById("error").textContent = `Unexpected status code: ${response.status}`;
            }
        })

        .then(response => {
            if (!response) return;

            if (response.token)
                localStorage.setItem("token", response.token);
            else
                throw new Error("Token Not Found");

            const userType = getUserType();
            if (userType === "ADMIN") {
                window.location.href = "../admin.html";
            } else {
                window.location.href = "../student.html";
            }
        }
        )
        // .then(users => {
        //     const user = users.find(u => u.email === email && u.password === password);

        //     if (user) {
        //         sessionStorage.setItem("userId", user.id);
        //         sessionStorage.setItem("userName", user.name);
        //         sessionStorage.setItem("userType", user.usertype);

        //         if (user.usertype === "ADMIN") {
        //             window.location.href = "../admin.html";
        //         } else {
        //             window.location.href = "../student.html";
        //         }
        //     } else {
        //         document.getElementById("error").textContent = "Invalid email or password.";
        //     }
        // })
        .catch(err => {
            console.error("Error fetching users:", err);
            document.getElementById("error").textContent = "Server error. Please try again later.";
        });
}

// function getUserId() {
//     return sessionStorage.getItem("userId");
// }

// function getUserName() {
//     return sessionStorage.getItem("userName");
// }

// function getUserType() {
//     return sessionStorage.getItem("userType");
// }

