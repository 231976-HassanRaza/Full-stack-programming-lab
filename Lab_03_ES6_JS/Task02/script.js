// Requirement: Store products in an array
let productList = [];

// Requirement: Create a function addToCart(...items) using Rest operator
function addToCart(...items) {
    for (let item of items) {
        productList.push(item);
    }
}

// Add sample items
addToCart("MacBook Pro", "Logitech MX Master 3", "Keychron Keyboard", "LG Ultrawide Monitor");

// Requirement: Use Spread operator to clone the cart
let clonedCart = [...productList];

// Requirement: Use Array Destructuring to extract first product and remaining products
let [firstProduct, ...remainingProducts] = clonedCart;

// Requirement: Display total items, first item, and updated cart
// 1. Populate the Total Items Box
document.getElementById("total-items").innerHTML = `
    <span class="label">Total Items</span>
    <span class="value">${clonedCart.length}</span>
`;

// 2. Populate the Extracted First Item Box
document.getElementById("first-item").innerHTML = `
    <span class="label">Extracted First Item</span>
    <span class="value">${firstProduct}</span>
`;

// 3. Populate the Remaining Items List
const updatedCartContainer = document.getElementById("updated-cart");
let remainingItemsHTML = "";

// Loop through the remaining destructured products and format them into cards
for (let item of remainingProducts) {
    remainingItemsHTML += `<div class="item-card">${item}</div>`;
}

updatedCartContainer.innerHTML = remainingItemsHTML;