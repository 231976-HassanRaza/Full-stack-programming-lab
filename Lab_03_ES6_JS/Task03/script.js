function fetchUsers() {
    return new Promise((resolve, reject) => {
        const isSuccess = true; // Set to false to see the error design!
        
        setTimeout(() => {
            if (isSuccess) {
                const users = [
                    { id: 1, name: "Ali Khan", role: "Admin" },
                    { id: 2, name: "Aisha Ahmed", role: "Developer" },
                    { id: 3, name: "Omar Tariq", role: "Designer" }
                ];
                resolve(users);
            } else {
                reject("Failed to connect to the server. Please try again.");
            }
        }, 3000); 
    });
}

const outputSection = document.getElementById("output-section");

fetchUsers()
    .then((usersData) => {
        let userListHTML = `
            <div class="success-box">
                <div class="status-header">✅ Data Loaded Successfully</div>
                <ul class="user-list">
        `;
        
        usersData.forEach(user => {
            userListHTML += `
                <li>
                    <span class="user-name">${user.name}</span>
                    <span class="user-role">${user.role}</span>
                </li>
            `;
        });
        
        userListHTML += `</ul></div>`;
        outputSection.innerHTML = userListHTML;
    })
    .catch((errorMessage) => {
        outputSection.innerHTML = `
            <div class="error-box">
                <div class="status-header" style="color: #ef4444;">❌ Connection Error</div>
                <p>${errorMessage}</p>
            </div>
        `;
    });