const menuData = [
    // Seblak
    { id: 1, name: "All Kerupuk", price: 1000, category: "seblak" },
    { id: 2, name: "Kwetiau", price: 1000, category: "seblak" },
    { id: 3, name: "Tulang", price: 500, category: "seblak" },
    { id: 4, name: "Telur", price: 2500, category: "seblak" },
    { id: 5, name: "Mie", price: 1000, category: "seblak" },
    { id: 6, name: "Makaroni", price: 1000, category: "seblak" },
    { id: 7, name: "Pilus Cikur", price: 1000, category: "seblak" },
    { id: 8, name: "Siomay Kering", price: 1000, category: "seblak" },
    { id: 9, name: "Telur Puyuh", price: 500, category: "seblak" },
    { id: 10, name: "Cuanki Lidah", price: 1000, category: "seblak" },
    { id: 11, name: "Cilok", price: 1000, category: "seblak" },
    { id: 12, name: "Bakso", price: 2000, category: "seblak" },
    { id: 13, name: "Topping Lainnya", price: 2000, category: "seblak" },
    { id: 14, name: "Jamur Enoki", price: 1000, category: "seblak" },
    { id: 15, name: "Sosis", price: 2000, category: "seblak" },

    // Menu Lainnya
    { id: 16, name: "Soteng", price: 5000, category: "lainnya" },
    { id: 17, name: "Gorengan (3 Pcs)", price: 2000, category: "lainnya" },
    { id: 18, name: "Mie Pedas", price: 7000, category: "lainnya" },
    { id: 19, name: "Pop Ice", price: 3000, category: "lainnya" },
    { id: 20, name: "Es Cekek", price: 1000, category: "lainnya" },
    { id: 21, name: "Topping Soteng", price: 1000, category: "lainnya" },
    { id: 22, name: "Spaghetti Lite", price: 5000, category: "spaghetti", description: "Tulang, Sayur, Telur Puyuh, Telur Ayam, Ayam Tabur" },
];

const cart = [];
const menuContainer = document.getElementById('menu-container');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// Render Menu
function renderMenu(category = 'seblak') {
    menuContainer.innerHTML = '';
    const filteredItems = menuData.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('menu-item');
        itemEl.innerHTML = `
            <div class="item-content">
                <h4 class="item-name">${item.name}</h4>
                ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
                <p class="item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <button class="add-btn" onclick="addToCart(${item.id})">
                <i class="fa-solid fa-plus"></i>
            </button>
        `;
        menuContainer.appendChild(itemEl);
    });
}

// Add to Cart
window.addToCart = function (id) {
    const item = menuData.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    // Animation feedback
    const btn = event.currentTarget;
    btn.style.transform = 'scale(1.2) rotate(90deg)';
    setTimeout(() => btn.style.transform = 'scale(1) rotate(0deg)', 200);
};

// Remove from Cart
window.removeFromCart = function (id) {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartUI();
    }
};

// Change Quantity
window.changeQty = function (id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
};

// Update Cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Keranjang kosong. Yuk jajan!</div>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
                </div>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    cartTotalElement.innerText = `Rp ${total.toLocaleString('id-ID')}`;
    cartCountElement.innerText = count;

    // Animate badge
    cartCountElement.classList.add('bump');
    setTimeout(() => cartCountElement.classList.remove('bump'), 300);
}

// WhatsApp Integration
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return alert('Pilih jajanannya dulu dong!');

    let message = "Halo Jajanan Wareug! Saya mau pesan:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `- ${item.name} (${item.quantity}x) : Rp ${subtotal.toLocaleString('id-ID')}%0A`;
    });

    message += `%0A*Total: Rp ${total.toLocaleString('id-ID')}*`;
    message += "%0A%0ATerima kasih!";

    // Replace with actual phone number if available. Using placeholder.
    const phoneNumber = "628388046510";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

// Category Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.category);
    });
});

// Toggle Cart
document.getElementById('cart-btn').addEventListener('click', () => {
    cartOverlay.classList.add('open');
});
document.getElementById('close-cart').addEventListener('click', () => {
    cartOverlay.classList.remove('open');
});
cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) cartOverlay.classList.remove('open');
});

// Initialize
renderMenu();

// Music Control Logic
// Since script is at bottom of body, elements should be ready.
const music = document.getElementById('bg-music');
const enterBtn = document.getElementById('enter-btn');
const overlay = document.getElementById('music-overlay');
const musicControl = document.getElementById('music-control');
const musicIcon = musicControl ? musicControl.querySelector('i') : null;

if (enterBtn && music && overlay && musicControl) {
    enterBtn.addEventListener('click', () => {
        // ALWAYS hide overlay first so user is not stuck
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);

        // Then try to play music
        music.play().then(() => {
            musicControl.classList.remove('hidden');
            musicControl.classList.add('music-playing');
        }).catch(err => {
            console.error("Autoplay Error:", err);
            // Show button anyway so they can try manually later
            musicControl.classList.remove('hidden');
        });
    });

    musicControl.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicControl.classList.add('music-playing');
            if (musicIcon) {
                musicIcon.classList.remove('fa-volume-xmark');
                musicIcon.classList.add('fa-volume-high');
            }
        } else {
            music.pause();
            musicControl.classList.remove('music-playing');
            if (musicIcon) {
                musicIcon.classList.remove('fa-volume-high');
                musicIcon.classList.add('fa-volume-xmark');
            }
        }
    });
} else {
    console.error("Music elements not found in DOM");
}
