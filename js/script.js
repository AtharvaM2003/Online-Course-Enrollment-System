
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
    const apiUrl = "http://localhost:8080/api";
    const courseUrl = `${apiUrl}/courses`;
    const instructorUrl = `${apiUrl}/instructors`;
    const enrollUrl = `${apiUrl}/enrollments`;
    function loadTopCoursesChart() {
        Promise.all([
            fetch(courseUrl),
            fetch(enrollUrl),
            fetch(instructorUrl)
        ])
            .then(([courseRes, enrollRes, instructorRes]) =>
                Promise.all([
                    courseRes.json(),
                    enrollRes.json(),
                    instructorRes.json()
                ])
            )
            .then(([courseData, enrollData]) => {
                const enrollCountObj = {};
                enrollData.forEach(enroll => {
                    const cid = enroll.courseid;
                    enrollCountObj[cid] = (enrollCountObj[cid] || 0) + 1;
                });

                const coursesWithEnroll = courseData.map(course => ({
                    title: course.title,
                    enrollCount: enrollCountObj[course.id] || 0
                }));

                coursesWithEnroll.sort((a, b) => b.enrollCount - a.enrollCount);

                const topCourses = coursesWithEnroll.slice(0, 5);

                const labels = topCourses.map(c => c.title);
                const data = topCourses.map(c => c.enrollCount);

                const ctx1 = document.getElementById('popularCourse')?.getContext('2d');
                if (ctx1) {
                    new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Students',
                                data: data,
                                backgroundColor: [
                                    '#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'
                                ],
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


    loadTopCoursesChart();


}

document.addEventListener("DOMContentLoaded", function () {
    loadPage('admin-dashboard.html');
});
