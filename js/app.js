/* =====================================================
   SHOPZONE - E-COMMERCE PRODUCT CATALOG
   Main JavaScript Application
===================================================== */


/* ================= GLOBAL STATE ================= */

let cart = JSON.parse(
    localStorage.getItem("shopzone-cart")
) || [];


/* ================= DOM ELEMENTS ================= */

const app = document.getElementById("app");

const cartCount =
    document.getElementById("cartCount");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    router();

});


/* ================= ROUTER ================= */

function router() {

    const hash =
        window.location.hash || "#home";

    window.scrollTo(0, 0);

    if (hash === "#home") {

        showHome();

    }

    else if (hash === "#products") {

        showProducts();

    }

    else if (hash === "#cart") {

        showCart();

    }

    else if (hash === "#about") {

        showAbout();

    }

    else if (hash.startsWith("#product-")) {

        const id =
            Number(hash.replace("#product-", ""));

        showProductDetails(id);

    }

    else {

        showHome();

    }

    closeMobileMenu();

}


/* ================= HOME PAGE ================= */

function showHome() {

    app.innerHTML = `

        <section class="hero">

            <div class="hero-content">

                <span class="hero-badge">
                    ✨ NEW COLLECTION 2026
                </span>

                <h1>
                    Everything You Need,
                    <span>All in One Place.</span>
                </h1>

                <p>
                    Discover quality electronics,
                    fashion and home essentials
                    at affordable prices.
                </p>

                <div class="hero-buttons">

                    <a
                        href="#products"
                        class="primary-btn"
                    >
                        Shop Now →
                    </a>

                    <a
                        href="#about"
                        class="secondary-btn"
                    >
                        Learn More
                    </a>

                </div>

            </div>

            <div class="hero-card">

                <div class="floating-card">

                    <span>🔥</span>

                    <div>
                        <strong>Best Deals</strong>
                        <small>Up to 30% OFF</small>
                    </div>

                </div>

                <div class="hero-circle">

                    🛍️

                </div>

            </div>

        </section>


        <section class="features-section">

            <div class="feature">

                <div class="feature-icon">
                    🚚
                </div>

                <div>
                    <h3>Fast Delivery</h3>

                    <p>
                        Quick and reliable delivery.
                    </p>
                </div>

            </div>


            <div class="feature">

                <div class="feature-icon">
                    🔒
                </div>

                <div>
                    <h3>Secure Shopping</h3>

                    <p>
                        Your information stays protected.
                    </p>
                </div>

            </div>


            <div class="feature">

                <div class="feature-icon">
                    ⭐
                </div>

                <div>
                    <h3>Quality Products</h3>

                    <p>
                        Carefully selected products.
                    </p>
                </div>

            </div>


            <div class="feature">

                <div class="feature-icon">
                    💳
                </div>

                <div>
                    <h3>Easy Payment</h3>

                    <p>
                        Simple and convenient checkout.
                    </p>
                </div>

            </div>

        </section>


        <section class="section">

            <div class="section-heading">

                <div>
                    <span class="section-label">
                        POPULAR
                    </span>

                    <h2>
                        Featured Products
                    </h2>
                </div>

                <a
                    href="#products"
                    class="view-all"
                >
                    View All →
                </a>

            </div>


            <div class="product-grid">

                ${products
                    .slice(0, 4)
                    .map(productCard)
                    .join("")}

            </div>

        </section>

    `;
}


/* ================= PRODUCT CARD ================= */

function productCard(product) {

    return `

        <article class="product-card">

            <div class="product-image-container">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    width="700"
                    height="500"
                >

                <span class="discount-badge">
                    SALE
                </span>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">

                    ⭐ ${product.rating}

                </div>


                <div class="price-row">

                    <div>

                        <span class="price">
                            ₹${formatPrice(product.price)}
                        </span>

                        <span class="old-price">
                            ₹${formatPrice(product.oldPrice)}
                        </span>

                    </div>

                </div>


                <div class="card-buttons">

                    <a
                        href="#product-${product.id}"
                        class="view-btn"
                    >
                        View Details
                    </a>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        + Cart
                    </button>

                </div>

            </div>

        </article>

    `;
}


/* ================= PRODUCTS PAGE ================= */

function showProducts() {

    app.innerHTML = `

        <section class="page-banner">

            <span>
                OUR COLLECTION
            </span>

            <h1>
                Explore Products
            </h1>

            <p>
                Find the perfect product for your needs.
            </p>

        </section>


        <section class="section products-section">

            <div class="filter-bar">

                <div class="search-box">

                    🔍

                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Search products..."
                    >

                </div>


                <select id="categoryFilter">

                    <option value="All">
                        All Categories
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Fashion">
                        Fashion
                    </option>

                    <option value="Home">
                        Home
                    </option>

                </select>

            </div>


            <div
                class="product-grid"
                id="productGrid"
            >

                ${products
                    .map(productCard)
                    .join("")}

            </div>

        </section>

    `;


    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");


    searchInput.addEventListener(
        "input",
        filterProducts
    );

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


/* ================= FILTER PRODUCTS ================= */

function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const category =
        document
            .getElementById("categoryFilter")
            .value;


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return matchesSearch &&
                   matchesCategory;

        });


    const productGrid =
        document.getElementById("productGrid");


    if (filtered.length === 0) {

        productGrid.innerHTML = `

            <div class="no-results">

                <div>
                    🔎
                </div>

                <h2>
                    No products found
                </h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;
    }


    productGrid.innerHTML =
        filtered.map(productCard).join("");

}


/* ================= PRODUCT DETAILS ================= */

function showProductDetails(id) {

    const product =
        products.find(item => item.id === id);


    if (!product) {

        app.innerHTML = `

            <section class="not-found">

                <h1>
                    Product Not Found
                </h1>

                <p>
                    Sorry, this product does not exist.
                </p>

                <a
                    href="#products"
                    class="primary-btn"
                >
                    Back to Products
                </a>

            </section>

        `;

        return;
    }


    app.innerHTML = `

        <section class="details-page">

            <div class="details-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="details-content">

                <span class="product-category">
                    ${product.category}
                </span>

                <h1>
                    ${product.name}
                </h1>

                <div class="details-rating">
                    ⭐ ${product.rating} / 5
                </div>


                <div class="details-price">

                    ₹${formatPrice(product.price)}

                    <span>
                        ₹${formatPrice(product.oldPrice)}
                    </span>

                </div>


                <p>
                    ${product.description}
                </p>


                <div class="detail-features">

                    <div>
                        ✓ Free Delivery
                    </div>

                    <div>
                        ✓ 7-Day Replacement
                    </div>

                    <div>
                        ✓ Secure Payment
                    </div>

                </div>


                <button
                    class="large-cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Add to Cart
                </button>


                <a
                    href="#products"
                    class="back-link"
                >
                    ← Back to Products
                </a>

            </div>

        </section>

    `;
}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        products.find(item => item.id === id);


    if (!product) {
        return;
    }


    cart.push(product);


    saveCart();

    updateCartCount();


    showToast(
        `${product.name} added to cart!`
    );

}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    showCart();

}


/* ================= CART PAGE ================= */

function showCart() {

    if (cart.length === 0) {

        app.innerHTML = `

            <section class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>

                <a
                    href="#products"
                    class="primary-btn"
                >
                    Start Shopping
                </a>

            </section>

        `;

        return;
    }


    const total =
        cart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    app.innerHTML = `

        <section class="cart-page">

            <div class="page-banner small">

                <span>
                    SHOPPING CART
                </span>

                <h1>
                    Your Cart
                </h1>

            </div>


            <div class="cart-layout">

                <div class="cart-items">

                    ${cart
                        .map((product, index) => `

                        <div class="cart-item">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy"
                            >

                            <div class="cart-item-info">

                                <span class="product-category">
                                    ${product.category}
                                </span>

                                <h3>
                                    ${product.name}
                                </h3>

                                <strong>
                                    ₹${formatPrice(product.price)}
                                </strong>

                            </div>


                            <button
                                class="remove-btn"
                                onclick="removeFromCart(${index})"
                            >
                                Remove
                            </button>

                        </div>

                    `)
                    .join("")}

                </div>


                <aside class="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <div class="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            ${cart.length}
                        </span>

                    </div>


                    <div class="summary-row">

                        <span>
                            Delivery
                        </span>

                        <span class="free">
                            FREE
                        </span>

                    </div>


                    <div class="summary-line"></div>


                    <div class="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹${formatPrice(total)}
                        </strong>

                    </div>


                    <button
                        class="checkout-btn"
                        onclick="checkout()"
                    >
                        Proceed to Checkout →
                    </button>

                </aside>

            </div>

        </section>

    `;

}


/* ================= CHECKOUT ================= */

function checkout() {

    showToast(
        "Demo checkout - payment integration can be added later."
    );

}


/* ================= ABOUT PAGE ================= */

function showAbout() {

    app.innerHTML = `

        <section class="page-banner">

            <span>
                ABOUT SHOPZONE
            </span>

            <h1>
                Shopping Made Simple
            </h1>

            <p>
                A modern product catalog built
                for a smooth shopping experience.
            </p>

        </section>


        <section class="about-section">

            <div class="about-card">

                <div class="about-icon">
                    🚀
                </div>

                <h2>
                    Our Mission
                </h2>

                <p>
                    ShopZone makes it easy for customers
                    to discover quality products through
                    a clean, fast and responsive
                    e-commerce experience.
                </p>

            </div>


            <div class="about-card">

                <div class="about-icon">
                    💡
                </div>

                <h2>
                    Modern Architecture
                </h2>

                <p>
                    This application uses modular
                    HTML, CSS and JavaScript components
                    with client-side routing,
                    reusable product cards and
                    browser-based cart storage.
                </p>

            </div>


            <div class="about-card">

                <div class="about-icon">
                    ⚡
                </div>

                <h2>
                    Performance
                </h2>

                <p>
                    Product images use optimized
                    dimensions and lazy loading to
                    improve page loading performance.
                </p>

            </div>

        </section>

    `;

}


/* ================= CART STORAGE ================= */

function saveCart() {

    localStorage.setItem(
        "shopzone-cart",
        JSON.stringify(cart)
    );

}


/* ================= CART COUNT ================= */

function updateCartCount() {

    cartCount.textContent =
        cart.length;

}


/* ================= PRICE FORMAT ================= */

function formatPrice(price) {

    return price.toLocaleString("en-IN");

}


/* ================= TOAST MESSAGE ================= */

function showToast(message) {

    const existingToast =
        document.querySelector(".toast");

    if (existingToast) {
        existingToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("show");

    }, 10);


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);

}


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("open");

    }
);


function closeMobileMenu() {

    navMenu.classList.remove("open");

}


/* ================= ROUTING LISTENER ================= */

window.addEventListener(
    "hashchange",
    router
);
