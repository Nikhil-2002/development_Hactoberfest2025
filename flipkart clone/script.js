// Sample Products Data
const products = [
    { id: 1, name: 'iPhone 14', price: 79999, image: './iphone 14.jpg' },
    { id: 2, name: 'Samsung Galaxy', price: 59999, image: 'samsung.jpg' },
    { id: 3, name: 'Laptop Dell', price: 49999, image: 'dell laptop.jpg' },
    { id: 4, name: 'Nike Shoes', price: 4999, image: 'nike.jpg' },
    { id: 5, name: 'Headphones', price: 2999, image: 'headphone.jpg' },
    { id: 6, name: 'T-Shirt', price: 999, image: 'tshirt.jpg' }
];

let cart = [];
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize Products Grid
function initProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productEl = document.createElement('div');
        productEl.classList.add('product');
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productEl);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
    document.getElementById('modalCartCount').textContent = cart.length;
    updateCartModal();
}

// Update Cart Modal
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
}

// Toggle Cart Modal
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Search Functionality (Simulation)
function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        alert(`Searching for: ${query}`);
        // In a real app, this would filter products or redirect
    }
}

// Login Simulation
function showLogin() {
    alert('Login functionality - Redirect to login page in real app');
}

// Slider Functionality
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Auto-slide (optional)
setInterval(() => changeSlide(1), 5000);

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    updateCartCount();
});
