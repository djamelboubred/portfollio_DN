// Menu Data
const menuData = {
    tacos: [
        {
            id: 1,
            name: "Tacos Classic",
            description: "Viande au choix, sauce fromagère, frites",
            price: 7.50,
            image: "img/salade1.jpg"
        },
        {
            id: 2,
            name: "Tacos Royal",
            description: "Double viande, sauce fromagère, frites, sauce au choix",
            price: 9.50,
            image: "img/tacos.jpg"
        }
    ],
    burgers: [
        {
            id: 3,
            name: "Cheese Burger",
            description: "Steak haché, cheddar, salade, tomate, oignon",
            price: 6.50,
            image: "img/burgermenu.jpg"
        }
    ],
    menus: [
        {
            id: 4,
            name: "Menu Tacos",
            description: "Tacos au choix + Frites + Boisson",
            price: 10.90,
            image: "img/menu1.jpg"
        }
    ],
    boissons: [
        {
            id: 5,
            name: "Coca-Cola",
            description: "33cl",
            price: 2.50,
            image: "img/boisson.jpg"
        }
    ]
};

// Cart State
let cartElement = [];
let currentCategory = 'tacos';

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const cart = document.getElementById('cart');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Functions
function displayMenuItems(category) {
    const items = menuData[category];
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item fade-in';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">${item.price.toFixed(2)}€</span>
                    <button class="btn-primary" onclick="addToCart(${item.id})">
                        Ajouter
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(itemElement);
    });
}

function addToCart(itemId) {
    let item;
    for (const category in menuData) {
        const found = menuData[category].find(i => i.id === itemId);
        if (found) {
            item = found;
            break;
        }
    }

    if (item) {
        const existingItem = cart.find(i => i.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCart();
        showCart();
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.quantity} x ${item.price.toFixed(2)}€</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = `${total.toFixed(2)}€`;
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== itemId);
    } else {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

function showCart() {
    cartElement.classList.add('active');
}

function hideCart() {
    cartElement.classList.remove('active');
}

// Event Listeners
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        currentCategory = category;
        
        // Update active state
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Display items
        displayMenuItems(category);
    });
});

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('-rotate-45');
});

closeCart.addEventListener('click', hideCart);

// Initialize
displayMenuItems(currentCategory);

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});