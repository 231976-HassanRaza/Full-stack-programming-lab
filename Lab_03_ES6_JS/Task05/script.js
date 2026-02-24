// Requirement: Create a Map where Key = Product ID and Value = Product object.
const productCatalog = new Map();

// Requirement: Add minimum 5 products.
productCatalog.set(101, { name: "Wireless Headphones", price: "$99", category: "Electronics" });
productCatalog.set(102, { name: "Ergonomic Office Chair", price: "$150", category: "Furniture" });
productCatalog.set(103, { name: "Mechanical Keyboard", price: "$85", category: "Electronics" });
productCatalog.set(104, { name: "Stainless Steel Water Bottle", price: "$25", category: "Accessories" });
productCatalog.set(105, { name: "Yoga Mat", price: "$30", category: "Fitness" });

// DOM Elements
const productListUI = document.getElementById("product-list");
const productCountUI = document.getElementById("product-count");
const searchInput = document.getElementById("search-id");
const searchBtn = document.getElementById("search-btn");
const messageBox = document.getElementById("message-box");

// Requirement: Display results in HTML (and show total products using .size)
function renderCatalog() {
    // Update total products count using Map.size
    productCountUI.innerText = productCatalog.size;
    productListUI.innerHTML = ""; // Clear existing list

    // Loop through the Map to display all products
    for (let [id, product] of productCatalog) {
        productListUI.innerHTML += `
            <li>
                <div class="product-info">
                    <strong>${product.name}</strong>
                    <span>ID: ${id} | Price: ${product.price} | Category: ${product.category}</span>
                </div>
                <button class="delete-btn" onclick="deleteProduct(${id})">Delete</button>
            </li>
        `;
    }
}

// Requirement: Implement search by ID
function searchProduct() {
    const searchId = parseInt(searchInput.value);

    if (isNaN(searchId)) {
        showMessage("Please enter a valid numeric ID.", "error");
        return;
    }

    // Check if the product exists in the Map
    if (productCatalog.has(searchId)) {
        const product = productCatalog.get(searchId);
        showMessage(`Found: ${product.name} (${product.price})`, "success");
    } else {
        showMessage(`Product with ID ${searchId} not found.`, "error");
    }
}

// Requirement: Implement delete product
// Note: This function is triggered by the onclick attribute in the HTML string above
window.deleteProduct = function(id) {
    if (productCatalog.has(id)) {
        productCatalog.delete(id); // Delete from Map
        showMessage(`Product ID ${id} deleted successfully.`, "success");
        renderCatalog(); // Re-render the UI to reflect changes
    }
};

// Helper function for UI messages
function showMessage(message, type) {
    messageBox.innerText = message;
    messageBox.className = `message-box ${type}`;
    setTimeout(() => { messageBox.className = "message-box"; }, 3000);
}

// Event Listener for Search
searchBtn.addEventListener("click", searchProduct);

// Initial Render
renderCatalog();