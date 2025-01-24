// Data for products and restaurants
const products = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', restaurant: 'Pizza Hub', price: 299, image: 'margherita.jpg', rating: 5 },
    { id: 2, name: 'Veg Burger', category: 'Burger', restaurant: 'Mansi Restaurant', price: 149, image: 'veg-burger.jpg', rating: 4.5 },
    { id: 3, name: 'Noodles', category: 'Noodles', restaurant: 'Royal Family', price: 199, image: 'noodles.jpg', rating: 4 },
    { id: 4, name: 'Cheese Pizza', category: 'Pizza', restaurant: 'Pizza Hot Restro', price: 350, image: 'cheese-pizza.jpg', rating: 4.7 },
    { id: 5, name: 'Dosa', category: 'Dosa', restaurant: 'Country Bite Restro', price: 120, image: 'dosa.jpg', rating: 4.8 },
];

// Initialize cart
let cart = [];

// Render products dynamically
function renderProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <p>Rating: ${'★'.repeat(product.rating)} (${product.rating})</p>
            <p class="restaurant-name">${product.restaurant}</p> <!-- Display restaurant name -->
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productList.appendChild(productElement);
    });
}

// Filter products by category
function filterCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// Filter products by restaurant
function filterRestaurant(restaurant) {
    const filteredProducts = products.filter(product => product.restaurant === restaurant);
    renderProducts(filteredProducts);
}

// Search products
function filterSearch() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || product.restaurant.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    document.getElementById('cart-quantity').textContent = cart.reduce((total, item) => total + item.quantity, 0);


    // Store updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function redirectToCart() {
    window.location.href = 'cart.html';
}
   

// Initial render of all products
renderProducts(products);
