
// function loadPage(page) {
//     fetch(`pages/${page}`)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("main-content").innerHTML = data;

//             setTimeout(() => {
//                 if (page === "admin-dashboard.html") {
//                     loadDashboardCharts();
//                 }
//                 if (url === 'student-dashboard.html') {
//                     setTimeout(renderStudentDashboardCharts, 100);
//                 }

//             }, 100); 
//         });
// }
function loadPage(page) {
    fetch(`pages/${page}`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-content');
            container.innerHTML = data;

            // Extract and evaluate scripts manually
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                script.remove(); // Optional: remove the original script tag
            });
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML =
                '<p class="text-danger">Failed to load content.</p>';
            console.error(err);
        });
}
function loadDashboardCharts() {
    // Bar Chart
    const ctx1 = document.getElementById('courseBarChart')?.getContext('2d');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Python', 'Web Dev', 'Data Science', 'ML'],
                datasets: [{
                    label: 'Students',
                    data: [300, 250, 200, 180],
                    backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 50 }
                    }
                }
            }
        });
    }

    // Pie Chart
    const ctx2 = document.getElementById('instructorPieChart')?.getContext('2d');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Assigned', 'Unassigned'],
                datasets: [{
                    data: [12, 3],
                    backgroundColor: ['#0dcaf0', '#6c757d']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}
function renderStudentDashboardCharts() {
    const ctx2 = document.getElementById('enrollmentChart')?.getContext('2d');
    if (!ctx2) return;

    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Python Programming', 'Web Development', 'Machine Learning'],
            datasets: [{
                label: 'Enrollments',
                data: [1200, 950, 800],
                backgroundColor: ['#198754', '#ffc107', '#dc3545'],
                borderColor: ['#999', '#bbb', '#777'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Call the chart render function after the DOM is updated
setTimeout(renderStudentDashboardCharts, 100);