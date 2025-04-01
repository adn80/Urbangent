//Menu Toggle
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

// index.html
document.addEventListener("DOMContentLoaded", () => {
    // Greet User
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Explore the best fashion collections at UrbanGent!";
    document.getElementById("home").appendChild(welcomeMessage);

    // Toggle Navigation for Mobile
    const nav = document.querySelector("nav ul");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "☰ Menu";
    toggleBtn.classList.add("nav-toggle");
    document.querySelector("header").insertBefore(toggleBtn, nav);

    toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Cart Functionality
    const cartCount = document.createElement("span");
    cartCount.id = "cart-count";
    cartCount.textContent = "0";
    document.querySelector(".login-btn").insertAdjacentElement("beforebegin", cartCount);

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cartItems.length;
    }

    updateCartCount();

    window.addToCart = (productName, price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ productName, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} added to cart!`);
    };

    window.proceedToPayment = () => {
        if (JSON.parse(localStorage.getItem("cart")).length === 0) {
            alert("Your cart is empty!");
        } else {
            window.location.href = "payment.html";
        }
    };
});

// shirts.html
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

// Function to add an item to the cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Function to update cart count in the navigation bar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    let cartLink = document.querySelector("nav ul li a[href='cart.html']");
    if (cartLink) {
        cartLink.textContent = `Cart (${cartCount})`;
    }
}

// Function to proceed to the payment page
function proceedToPayment() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before proceeding.");
    } else {
        window.location.href = "payment.html";
    }
}

//cart.html
document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
});

// Function to add item to cart and store in localStorage
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to update cart count in navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    let cartNavItem = document.querySelector("nav ul li a[href='cart.html']");
    if (cartNavItem) {
        cartNavItem.textContent = `Cart (${totalItems})`;
    }
}

// Function to update the cart UI
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotalElement = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.textContent = total.toFixed(2);
    updateCartCount();
}

// Function to update item quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to proceed to payment
function proceedToPayment() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before proceeding.");
        return;
    }

    window.location.href = "payment.html";
}

// Run cart count update on page load
updateCartCount();

//payment.html
document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
    loadCartTotal();
    setupPaymentForm();
});

// Function to load cart total in payment page
function loadCartTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let paymentSection = document.getElementById("payment");
    if (paymentSection) {
        let totalDisplay = document.createElement("h3");
        totalDisplay.innerHTML = `Total Amount: $<span id="payment-total">${total.toFixed(2)}</span>`;
        paymentSection.insertBefore(totalDisplay, paymentSection.children[1]);
    }
}

// Function to validate card details
function validatePaymentForm() {
    let cardName = document.getElementById("card-name").value.trim();
    let cardNumber = document.getElementById("card-number").value.trim();
    let expiry = document.getElementById("expiry").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    if (!cardName || !cardNumber || !expiry || !cvv) {
        alert("Please fill in all fields.");
        return false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Invalid Card Number. Must be 16 digits.");
        return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        alert("Invalid CVV. Must be 3 or 4 digits.");
        return false;
    }

    return true;
}

// Function to handle payment
function processPayment(event) {
    event.preventDefault();

    if (!validatePaymentForm()) return;

    alert("Payment Successful! Thank you for shopping with UrbanGent.");
    localStorage.removeItem("cart"); // Clear cart after payment
    updateCartUI();
    updateCartCount();

    setTimeout(() => {
        window.location.href = "index.html"; // Redirect to home
    }, 2000);
}

// Function to set up payment form event listener
function setupPaymentForm() {
    let paymentForm = document.getElementById("payment-form");
    if (paymentForm) {
        paymentForm.addEventListener("submit", processPayment);
    }
}

//login.html
document.addEventListener("DOMContentLoaded", () => {
    setupLoginForm();
    checkUserStatus();
});

// Function to handle login
function handleLogin(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
        alert("Invalid email or password. Please try again.");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify({ email })); // Store logged-in user
    alert("Login successful! Redirecting to home...");

    setTimeout(() => {
        window.location.href = "index.html"; // Redirect after login
    }, 2000);
}

// Function to check if user is logged in
function checkUserStatus() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        let loginLink = document.querySelector(".login-btn");
        if (loginLink) {
            loginLink.innerText = "Logout";
            loginLink.href = "#";
            loginLink.addEventListener("click", handleLogout);
        }
    }
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
}

// Function to set up login form event listener
function setupLoginForm() {
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
}

