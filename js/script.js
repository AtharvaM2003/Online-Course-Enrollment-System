
function loadPage(page) {
    fetch(`pages/${page}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("main-content").innerHTML = data;

            // Wait for DOM content to be inserted, then re-run chart setup
            setTimeout(() => {
                if (page === "admin-dashboard.html") {
                    loadDashboardCharts();
                }
            }, 100); // slight delay ensures DOM is ready
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
