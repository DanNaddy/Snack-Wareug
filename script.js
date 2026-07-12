// ========================================
// JAJANAN WAREUG - COZY WARUNG THEME
// Floating Doodles, Steam, Food Confetti
// ========================================

// ========================================
// MENU DATA
// ========================================
const menuData = [
    // Seblak
    { id: 1, name: "All Kerupuk", price: 1000, category: "seblak", emoji: "🍘" },
    { id: 2, name: "Kwetiau", price: 1000, category: "seblak", emoji: "🍜" },
    { id: 3, name: "Tulang", price: 500, category: "seblak", emoji: "🦴" },
    { id: 4, name: "Telur", price: 2500, category: "seblak", emoji: "🥚" },
    { id: 5, name: "Mie", price: 1000, category: "seblak", emoji: "🍝" },
    { id: 6, name: "Makaroni", price: 1000, category: "seblak", emoji: "🧀" },
    { id: 7, name: "Pilus Cikur", price: 1000, category: "seblak", emoji: "🥜" },
    { id: 8, name: "Siomay Kering", price: 1000, category: "seblak", emoji: "🥟" },
    { id: 9, name: "Telur Puyuh", price: 500, category: "seblak", emoji: "🥚" },
    { id: 10, name: "Cuanki Lidah", price: 1000, category: "seblak", emoji: "🍢" },
    { id: 11, name: "Cilok", price: 1000, category: "seblak", emoji: "🍡" },
    { id: 12, name: "Bakso", price: 2000, category: "seblak", emoji: "🍖" },
    { id: 13, name: "Topping Lainnya", price: 2000, category: "seblak", emoji: "✨" },
    { id: 14, name: "Jamur Enoki", price: 1000, category: "seblak", emoji: "🍄" },
    { id: 15, name: "Sosis", price: 2000, category: "seblak", emoji: "🌭" },
    { id: 16, name: "Soteng", price: 5000, category: "lainnya", emoji: "🌽" },
    { id: 17, name: "Gorengan (3 Pcs)", price: 2000, category: "lainnya", emoji: "🍤" },
    { id: 18, name: "Mie Pedas", price: 7000, category: "lainnya", emoji: "🌶️" },
    { id: 19, name: "Pop Ice", price: 3000, category: "lainnya", emoji: "🧊" },
    { id: 20, name: "Es Cekek", price: 1000, category: "lainnya", emoji: "🍧" },
    { id: 21, name: "Topping Soteng", price: 1000, category: "lainnya", emoji: "🧄" },
    { id: 22, name: "Spaghetti Lite", price: 5000, category: "spaghetti", description: "Tulang & Sayur", emoji: "🍝" },
    { id: 23, name: "Tulang", price: 500, category: "spaghetti", emoji: "🦴" },
    { id: 24, name: "Daging Ayam Tabur", price: 1000, category: "spaghetti", emoji: "🍗" },
    { id: 25, name: "Telur Puyuh", price: 500, category: "spaghetti", emoji: "🥚" },
    { id: 26, name: "Telur Ayam", price: 2500, category: "spaghetti", emoji: "🍳" },
];

const cart = [];
const menuContainer = document.getElementById('menu-container');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// ========================================
// FOOD CONFETTI EFFECT
// ========================================
class FoodConfetti {
    constructor() {
        this.canvas = document.getElementById('confetti-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.emojis = ['🌶️', '🍜', '🍘', '🥢', '💨', '✨', '🔥', '😋'];

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    burst(x, y, emoji) {
        const count = 12;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const velocity = 5 + Math.random() * 5;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 3,
                emoji: emoji || this.emojis[Math.floor(Math.random() * this.emojis.length)],
                size: 20 + Math.random() * 15,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                life: 1,
                gravity: 0.15
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.vy += p.gravity;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.life -= 0.015;

            if (p.life <= 0 || p.y > this.canvas.height) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.globalAlpha = p.life;
            this.ctx.font = `${p.size}px serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(p.emoji, 0, 0);
            this.ctx.restore();
        }

        requestAnimationFrame(() => this.animate());
    }
}

let confetti;

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.menu-item, .reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// PLAYFUL HOVER EFFECTS
// ========================================
function initPlayfulEffects() {
    // Squish effect on menu cards
    document.querySelectorAll('.menu-item').forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'scale(0.95)';
        });

        card.addEventListener('mouseup', () => {
            card.style.transform = '';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Bounce effect on buttons
    document.querySelectorAll('.btn, .tab-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'none';
            btn.offsetHeight; // Trigger reflow
            btn.style.animation = '';
        });
    });
}

// ========================================
// RENDER MENU WITH STAGGER
// ========================================
function renderMenu(category = 'seblak') {
    menuContainer.innerHTML = '';
    const filteredItems = menuData.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('menu-item');
        itemEl.style.transitionDelay = `${index * 0.1}s`;

        itemEl.innerHTML = `
            <div class="item-content">
                <h4 class="item-name">${item.emoji} ${item.name}</h4>
                ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
                <p class="item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <button class="add-btn" data-emoji="${item.emoji}" onclick="addToCart(${item.id})">
                <i class="fa-solid fa-plus"></i>
            </button>
        `;
        menuContainer.appendChild(itemEl);

        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                itemEl.classList.add('visible');
            });
        });
    });

    // Re-init effects
    setTimeout(() => {
        initPlayfulEffects();
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

    // Get button and add wobble animation
    const btn = event.currentTarget;
    btn.classList.add('wobble');
    setTimeout(() => btn.classList.remove('wobble'), 500);

    // Burst food confetti!
    if (confetti) {
        const rect = btn.getBoundingClientRect();
        const emoji = btn.dataset.emoji || '🌶️';
        confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, emoji);
    }

    // Play a subtle sound effect (optional)
    playPopSound();
};

// Simple pop sound using Web Audio API
function playPopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported, fail silently
    }
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
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Keranjang kosong 🛒<br>Yuk pilih jajanannya!</div>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.style.animation = `slideIn 0.3s ease ${index * 0.05}s both`;

            cartItemEl.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
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

    // Bouncy badge animation
    cartCountElement.classList.add('bump');
    setTimeout(() => cartCountElement.classList.remove('bump'), 400);
}

// ========================================
// WHATSAPP INTEGRATION
// ========================================
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Pilih jajanannya dulu dong! 🍜');
        return;
    }

    let message = "Halo Jajanan Wareug! 👋 Saya mau pesan:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `${item.emoji} ${item.name} (${item.quantity}x) : Rp ${subtotal.toLocaleString('id-ID')}%0A`;
    });

    message += `%0A💰 *Total: Rp ${total.toLocaleString('id-ID')}*`;
    message += "%0A%0ATerima kasih! 🙏";

    const phoneNumber = "6281296986113";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

// ========================================
// CATEGORY TABS
// ========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '8px 8px 20px rgba(139, 69, 19, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = '';
    }
});

// ========================================
// ADD DYNAMIC KEYFRAMES
// ========================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    confetti = new FoodConfetti();
    renderMenu();
    initScrollReveal();
    initPlayfulEffects();
});

// Initial render
renderMenu();
