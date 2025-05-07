
function loadPage(page) {
    if (page) {
        sessionStorage.setItem('currentPage', page);
    }
    fetch(`pages/${page}`)
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
            }, 100);
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML =
                '<p class="text-danger">Failed to load content.</p>';
            console.error(err);
        });
}



function renderAdminDashboardCharts() {

    const reportUrl = `http://localhost:8080/api/courses/coursereport`;

    // Fetch Course-wise Enrollments and Render Bar Chart
    function renderPopularCoursesChart() {
        fetch(reportUrl)
            .then(res => res.json())
            .then(data => {
                const courseMap = new Map();

                data.forEach(course => {
                    const title = course.courseTitle;
                    const count = course.totalEnrollments || 0;

                    // If title already exists, add to the count (optional)
                    if (courseMap.has(title)) {
                        courseMap.set(title, courseMap.get(title) + count);
                    } else {
                        courseMap.set(title, count);
                    }
                });

                const labels = Array.from(courseMap.keys());
                const enrollments = Array.from(courseMap.values());

                const ctx1 = document.getElementById('courseBarChart')?.getContext('2d');
                if (ctx1) {
                    new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Students',
                                data: enrollments,
                                backgroundColor: [
                                    '#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#20c997', '#fd7e14'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { display: false }
                            },
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

    renderPopularCoursesChart();


    //Fetch Enrollments, Course, Instructor----------------------
    function renderStudentsPerInstructorChart() {
        fetch('http://localhost:8080/api/instructors/iwisestudent')
            .then(res => res.json())
            .then(data => {
                const labels = data.map(entry => entry.instructorName);
                const counts = data.map(entry => entry.studentCount);

                const ctx2 = document.getElementById('instructorPieChart')?.getContext('2d');
                if (ctx2) {
                    new Chart(ctx2, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                data: counts,
                                backgroundColor: [
                                    '#0dcaf0', '#6c757d', '#ffc107', '#198754', '#dc3545',
                                    '#6610f2', '#d63384', '#fd7e14', '#20c997', '#0d6efd'
                                ]
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

    renderStudentsPerInstructorChart();

}

// Student Dashboard Chart 
function renderStudentDashboardCharts() {

    const reportUrl = `http://localhost:8080/api/courses/coursereport`;

    function renderPopularCoursesChart() {
        fetch(reportUrl)
            .then(res => res.json())
            .then(data => {
                const labels = [];
                const enrollments = [];

                data.forEach(course => {
                    labels.push(course.courseTitle);
                    enrollments.push(course.totalEnrollments || 0);
                });

                // Dynamic Bar Chart
                const ctx1 = document.getElementById('courseBarChart')?.getContext('2d');
                if (ctx1) {
                    new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Students',
                                data: enrollments,
                                backgroundColor: [
                                    '#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#20c997', '#fd7e14'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { display: false }
                            },
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

    renderPopularCoursesChart();





}

document.addEventListener("DOMContentLoaded", function () {
    loadPage('admin-dashboard.html');
});
