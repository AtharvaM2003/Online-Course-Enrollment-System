
document.addEventListener("DOMContentLoaded", function () {
    loadPage('admin-dashboard.html');
});

function loadPage(page) {
    if (page) {
        sessionStorage.setItem('currentPage', page);
    }

    fetch(`pages/${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthorization()
        },
    })
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-content');
            container.innerHTML = data;

            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                script.remove();
            });

            setTimeout(() => {
                if (page === "admin-dashboard.html") {
                    renderAdminDashboardCharts();
                } else if (page === "student-dashboard.html") {
                    renderStudentDashboardCharts();
                }
            }, 200);
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML =
                '<p class="text-danger">Failed to load content.</p>';
            console.error(err);
        });
}

// Utility: Generate random colors
function getRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
}

// Admin Charts
function renderAdminDashboardCharts() {
    renderPopularCoursesChart();
    renderStudentsPerInstructorChart();
}

function renderPopularCoursesChart() {
    const reportUrl = `http://localhost:8080/api/courses/coursereport`;

    fetch(reportUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthorization()
        },
    })
        .then(res => res.json())
        .then(data => {
            const courseMap = new Map();

            data.forEach(course => {
                const title = course.courseTitle;
                const count = course.totalEnrollments || 0;
                courseMap.set(title, (courseMap.get(title) || 0) + count);
            });

            const labels = Array.from(courseMap.keys());
            const enrollments = Array.from(courseMap.values());
            const colors = getRandomColors(labels.length);

            const ctx1 = document.getElementById('courseBarChart')?.getContext('2d');
            if (ctx1) {
                new Chart(ctx1, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Students',
                            data: enrollments,
                            backgroundColor: colors,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 }
                            }
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error loading chart data:", error);
        });
}

function renderStudentsPerInstructorChart() {
    fetch('http://localhost:8080/api/instructors/iwisestudent', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthorization()
        },
    })
        .then(res => res.json())
        .then(data => {
            const labels = data.map(entry => entry.instructorName);
            const counts = data.map(entry => entry.studentCount);
            const colors = getRandomColors(labels.length);

            const ctx2 = document.getElementById('instructorPieChart')?.getContext('2d');
            if (ctx2) {
                new Chart(ctx2, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: counts,
                            backgroundColor: colors
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'bottom' }
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error loading students per instructor chart:", error);
        });
}

// Student Charts
function renderStudentDashboardCharts() {
    const reportUrl = `http://localhost:8080/api/courses/findTop5Courses`;

    fetch(reportUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthorization()
        },
    })
        .then(res => res.json())
        .then(data => {
            const labels = data.map(course => course.courseTitle);
            const enrollments = data.map(course => course.totalEnrollments || 0);
            const colors = getRandomColors(labels.length);

            const ctx1 = document.getElementById('popularCourse')?.getContext('2d');
            if (ctx1) {
                new Chart(ctx1, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Students',
                            data: enrollments,
                            backgroundColor: colors,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 }
                            }
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error loading top courses chart:", error);
        });
}

function redirectToLogin() {
    const currentPath = window.location.pathname;
    if (!currentPath.includes("login.html")) {
        window.location.href = "../pages/login.html";
    }
}

function decodeJWT(token) {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null; const payload = parts[1];
    // Base64URL decode
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error("Invalid JWT payload:", e); return null;
    }
}

function getUserId() {
    const token = localStorage.getItem("token");
    if (!token)
        redirectToLogin();

    const decoded = decodeJWT(token);
    console.log(decoded.userid);
    return decoded.userid;
}



function getUserName() {
    const token = localStorage.getItem("token");
    if (!token)
        redirectToLogin();
    const decoded = decodeJWT(token);
    console.log(decoded.sub);

    return decoded.sub;
}

function getUserEmail() {
    const token = localStorage.getItem("token");
    if (!token)
        redirectToLogin();
    const decoded = decodeJWT(token);
    console.log(decoded.email);
    return decoded.email;
}

function getUserType() {
    const token = localStorage.getItem("token");
    if (!token)
        redirectToLogin();
    const decoded = decodeJWT(token);
    return decoded.usertype;
}

function getAuthorization() {
    const token = localStorage.getItem("token");
    if (!token)
        redirectToLogin();
    const decoded = decodeJWT(token);
    return `Bearer ${token}`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    redirectToLogin();
}