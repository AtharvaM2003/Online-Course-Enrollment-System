
function loadPage(page) {
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

    const apiUrl = "http://localhost:3000";
    const courseUrl = `${apiUrl}/Courses`;
    const instructorUrl = `${apiUrl}/Instructors`;
    const enrollUrl = `${apiUrl}/Enrollments`;

    //Fetch Course wise Enrollments--------------------------------------
    function renderPopularCoursesChart() {
        Promise.all([
            fetch(courseUrl),
            fetch(enrollUrl),
            fetch(instructorUrl)
        ])
            .then(([courseRes, enrollRes, instructorRes]) => Promise.all([
                courseRes.json(),
                enrollRes.json(),
                instructorRes.json()
            ]))
            .then(([courseData, enrollData]) => {
                const enrollCountObj = {};
                enrollData.forEach(enroll => {
                    const cid = enroll.courseid;
                    enrollCountObj[cid] = (enrollCountObj[cid] || 0) + 1;
                });

                const labels = [];
                const data = [];

                courseData.forEach(course => {
                    labels.push(course.title);
                    data.push(enrollCountObj[course.id] || 0);
                });

                //Dynamic Bar Chart---------------------------------------------
                const ctx1 = document.getElementById('courseBarChart')?.getContext('2d');
                if (ctx1) {
                    new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Students',
                                data: data,
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
        Promise.all([
            fetch(enrollUrl),
            fetch(courseUrl),
            fetch(instructorUrl)
        ])
            .then(([enrollRes, courseRes, instructorRes]) => Promise.all([
                enrollRes.json(),
                courseRes.json(),
                instructorRes.json()
            ]))
            .then(([enrollData, courseData, instructorData]) => {
                const courseInstructorMap = {};
                courseData.forEach(course => {
                    courseInstructorMap[course.id] = course.instructorid;
                });
                allInstructors = instructorData;

                const instructorStudentCount = {};
                enrollData.forEach(enroll => {
                    const courseId = enroll.courseid;
                    const instructorId = courseInstructorMap[courseId];
                    if (instructorId) {
                        instructorStudentCount[instructorId] = (instructorStudentCount[instructorId] || 0) + 1;
                    }
                });

                const labels = [];
                const data = [];

                allInstructors.forEach(instructor => {
                    const name = instructor.name;
                    labels.push(name);
                    data.push(instructorStudentCount[instructor.id] || 0);
                });

                // Dynamic Pie Chart
                const ctx2 = document.getElementById('instructorPieChart')?.getContext('2d');
                if (ctx2) {
                    new Chart(ctx2, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [{
                                data: data,
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
    const apiUrl = "http://localhost:3000";
    const courseUrl = `${apiUrl}/Courses`;
    const instructorUrl = `${apiUrl}/Instructors`;
    const enrollUrl = `${apiUrl}/Enrollments`;
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
