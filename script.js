function showSection(section) {
    
    const sections = document.querySelectorAll('.section');
    sections.forEach((sec) => {
        sec.style.display = 'none';
    });

    document.getElementById(section).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('Dashboard');
});


const jsonData = [
    {
        "trackingNumber": "12345",
        "status": "In Transit",
        "location": "Warehouse",
        "progress": 15
    },
    {
        "trackingNumber": "67890",
        "status": "Delivered",
        "location": "Customer",
        "progress": 100
    }
];


function updateStatusBar() {
    const progress = jsonData[0].progress; 
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = `${progress}%`;
    
    
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < (progress / 25)) { 
            step.classList.add('completed');
        } else if (index === Math.floor(progress / 25)) {
            step.classList.add('in-progress');
        }
    });
}

updateStatusBar();

fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const productBody = document.getElementById('productBody');

            data.forEach(item => {
                const row = document.createElement('tr');
                
                let statusClass;
                switch (item.status) {
                    case "In Progress":
                        statusClass = "in-transist";
                        break;
                    case "Completed":
                        statusClass = "achieved";
                        break;
                    case "Cancelled":
                        statusClass = "cancelled";
                        break;
                    default:
                        statusClass = "";
                }

                row.innerHTML = `
                    <td>${item.product}</td>
                    <td>${item.trackingNumber}</td>
                    <td>${item.Date}</td>
                    <td class="${statusClass}">${item.status}</td>
                    <td>$${item.Amount}</td>
                    <td>${item.location}</td>
                `;

                productBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));