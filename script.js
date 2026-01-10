// ========================================
// JAJANAN WAREUG - CREATIVE JAVASCRIPT
// Particles, Magnetic Effects, Scroll Reveal
// ========================================

// ========================================
// MENU DATA
// ========================================
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
    { id: 16, name: "Soteng", price: 5000, category: "lainnya" },
    { id: 17, name: "Gorengan (3 Pcs)", price: 2000, category: "lainnya" },
    { id: 18, name: "Mie Pedas", price: 7000, category: "lainnya" },
    { id: 19, name: "Pop Ice", price: 3000, category: "lainnya" },
    { id: 20, name: "Es Cekek", price: 1000, category: "lainnya" },
    { id: 21, name: "Topping Soteng", price: 1000, category: "lainnya" },
    { id: 22, name: "Spaghetti Lite", price: 5000, category: "spaghetti", description: "Tulang & Sayur" },
    { id: 23, name: "Tulang", price: 500, category: "spaghetti" },
    { id: 24, name: "Daging Ayam Tabur", price: 1000, category: "spaghetti" },
    { id: 25, name: "Telur Puyuh", price: 500, category: "spaghetti" },
    { id: 26, name: "Telur Ayam", price: 2500, category: "spaghetti" },
];

const cart = [];
const menuContainer = document.getElementById('menu-container');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// ========================================
// PARTICLE CURSOR TRAIL EFFECT
// ========================================
class ParticleTrail {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.colors = ['#ff6b9d', '#c85afc', '#00d4ff', '#b8ff57'];

        this.resize();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Create particles on mouse move
            for (let i = 0; i < 2; i++) {
                this.particles.push({
                    x: this.mouse.x,
                    y: this.mouse.y,
                    size: Math.random() * 4 + 2,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)],
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    life: 1
                });
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;
            p.size *= 0.98;

            if (p.life <= 0 || p.size < 0.5) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.fill();
        }

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// 3D CARD TILT EFFECT
// ========================================
function initCardTilt() {
    document.querySelectorAll('.menu-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

            // Update glow position
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
function initMagneticButtons() {
    document.querySelectorAll('.btn, .add-btn, .cart-icon-wrapper').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.menu-item, .reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// RENDER MENU WITH STAGGER ANIMATION
// ========================================
function renderMenu(category = 'seblak') {
    menuContainer.innerHTML = '';
    const filteredItems = menuData.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('menu-item');
        itemEl.style.transitionDelay = `${index * 0.08}s`;

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

        // Trigger animation after append
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                itemEl.classList.add('visible');
            });
        });
    });

    // Re-init interactive effects
    setTimeout(() => {
        initCardTilt();
        initMagneticButtons();
    }, 100);
}

// ========================================
// CART FUNCTIONS
// ========================================
window.addToCart = function (id) {
    const item = menuData.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();

    // Enhanced animation feedback
    const btn = event.currentTarget;
    btn.style.transform = 'scale(1.3) rotate(180deg)';
    btn.style.boxShadow = '0 0 30px rgba(184, 255, 87, 0.8)';

    setTimeout(() => {
        btn.style.transform = 'scale(1) rotate(0deg)';
        btn.style.boxShadow = '';
    }, 300);

    // Create burst particles
    createBurstParticles(event.clientX, event.clientY);
};

// Burst particles on add to cart
function createBurstParticles(x, y) {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#b8ff57', '#00d4ff', '#ff6b9d'];

    for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 / 15) * i;
        particles.push({
            x: x,
            y: y,
            speedX: Math.cos(angle) * (Math.random() * 5 + 3),
            speedY: Math.sin(angle) * (Math.random() * 5 + 3),
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1
        });
    }

    function animateBurst() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.03;
            p.size *= 0.95;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (particles.length > 0) {
            requestAnimationFrame(animateBurst);
        }
    }

    animateBurst();
}

window.removeFromCart = function (id) {
    const index = cart.findIndex(i => i.id === id);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartUI();
    }
};

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

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Keranjang kosong. Yuk jajan! 🛒</div>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.style.animation = `fadeSlideIn 0.3s ease ${index * 0.05}s both`;

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

// ========================================
// WHATSAPP INTEGRATION
// ========================================
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

    const phoneNumber = "628388046510";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

// ========================================
// CATEGORY TABS
// ========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Add click ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        renderMenu(btn.dataset.category);
    });
});

// ========================================
// CART TOGGLE
// ========================================
document.getElementById('cart-btn').addEventListener('click', () => {
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});

document.getElementById('close-cart').addEventListener('click', () => {
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
});

cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ========================================
// MUSIC CONTROL
// ========================================
const music = document.getElementById('bg-music');
const enterBtn = document.getElementById('enter-btn');
const overlay = document.getElementById('music-overlay');
const musicControl = document.getElementById('music-control');
const musicIcon = musicControl ? musicControl.querySelector('i') : null;

if (enterBtn && music && overlay && musicControl) {
    enterBtn.addEventListener('click', () => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 600);

        music.play().then(() => {
            musicControl.classList.remove('hidden');
            musicControl.classList.add('music-playing');
        }).catch(err => {
            console.error("Autoplay Error:", err);
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
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.8)';
    }

    lastScroll = currentScroll;
});

// ========================================
// INITIALIZE EVERYTHING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle trail
    new ParticleTrail();

    // Render menu
    renderMenu();

    // Initialize interactive effects
    initScrollReveal();
    initMagneticButtons();

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeSlideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Initialize on load
renderMenu();
