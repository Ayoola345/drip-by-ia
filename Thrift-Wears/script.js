// ========================================
// DRIP BY I&A - MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // FOOTER YEAR
    // ========================================

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    // ========================================
    // DARK MODE
    // ========================================

    const themeButton = document.getElementById("theme-toggle");

    if (themeButton) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

            themeButton.textContent = "☀️ Light Mode";

        }


        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                themeButton.textContent = "☀️ Light Mode";

                localStorage.setItem("theme", "dark");

            } else {

                themeButton.textContent = "🌙 Dark Mode";

                localStorage.setItem("theme", "light");

            }

        });

    }


    // ========================================
    // SCROLL TO TOP
    // ========================================

    const scrollButton = document.getElementById("scroll-top");

    if (scrollButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                scrollButton.style.display = "block";

            } else {

                scrollButton.style.display = "none";

            }

        });


        scrollButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ========================================
    // PRODUCT SEARCH & CATEGORY FILTER
    // ========================================

    const searchInput =
        document.getElementById("product-search");

    const products =
        document.querySelectorAll(".shop-product-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    let selectedCategory = "all";


    function filterProducts() {

        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


        products.forEach(function (product) {

            const productText =
                product.innerText.toLowerCase();

            const productCategory =
                product.dataset.category;


            const matchesSearch =
                productText.includes(query);


            const matchesCategory =
                selectedCategory === "all" ||
                selectedCategory === productCategory;


            if (matchesSearch && matchesCategory) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    }


    if (searchInput) {

        searchInput.addEventListener("input", function () {

            filterProducts();

        });

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            selectedCategory =
                button.dataset.category;


            filterProducts();

        });

    });


    // ========================================
    // SHOPPING CART
    // ========================================

    let cart = [];

    let nextCartId = 1;


    const cartButtons =
        document.querySelectorAll(".add-to-cart");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    // ========================================
    // UPDATE CART DISPLAY
    // ========================================

    function updateCart() {

        if (!cartItems || !cartTotal) {
            return;
        }


        cartItems.innerHTML = "";

        let total = 0;


        cart.forEach(function (item) {

            total += item.price;


            const cartItem =
                document.createElement("p");

            cartItem.className = "cart-item";

            cartItem.dataset.id = item.id;


            cartItem.innerHTML = `

                <span>
                    ${item.name} - ₦${item.price.toLocaleString()}
                </span>

                <button
                    class="remove-item"
                    type="button"
                    aria-label="Remove ${item.name}"
                >
                    ×
                </button>

            `;


            cartItems.appendChild(cartItem);

        });


        cartTotal.textContent =
            `Total: ₦${total.toLocaleString()}`;

    }


    // ========================================
    // ADD PRODUCTS TO CART
    // ========================================

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const product =
                button.closest(".shop-product-card");


            if (!product) {
                return;
            }


            const nameElement =
                product.querySelector("h3");


            const priceElement =
                product.querySelector(".shop-price");


            if (!nameElement || !priceElement) {
                return;
            }


            const productName =
                nameElement.textContent.trim();


            const productPrice =
                priceElement.textContent;


            const priceNumber =
                Number(
                    productPrice.replace(/[₦,\s]/g, "")
                );


            if (!Number.isFinite(priceNumber)) {
                return;
            }


            cart.push({

                id: nextCartId++,

                name: productName,

                price: priceNumber

            });


            updateCart();

        });

    });


    // ========================================
    // REMOVE CART ITEM
    // ========================================

    if (cartItems) {

        cartItems.addEventListener("click", function (event) {

            const removeButton =
                event.target.closest(".remove-item");


            if (!removeButton) {
                return;
            }


            const cartItem =
                removeButton.closest(".cart-item");


            if (!cartItem) {
                return;
            }


            const itemId =
                Number(cartItem.dataset.id);


            cart = cart.filter(function (item) {

                return item.id !== itemId;

            });


            updateCart();

        });

    }


    // ========================================
    // CHECKOUT WITH WHATSAPP
    // ========================================

    const checkoutButton =
        document.getElementById("checkout-whatsapp");


    if (checkoutButton) {

        checkoutButton.addEventListener("click", function (event) {

            if (cart.length === 0) {

                event.preventDefault();

                alert("Your cart is empty.");

                return;

            }


            let message =
                "Hello Drip by I&A, I'd like to order:\n\n";


            cart.forEach(function (item) {

                message +=
                    `• ${item.name} - ₦${item.price.toLocaleString()}\n`;

            });


            const total =
                cart.reduce(function (sum, item) {

                    return sum + item.price;

                }, 0);


            message +=
                `\nTotal: ₦${total.toLocaleString()}`;


            checkoutButton.href =
                `https://wa.me/2349035915493?text=${encodeURIComponent(message)}`;

        });

    }

});