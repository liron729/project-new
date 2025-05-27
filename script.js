
const productData = [
    { name: 'MEG Vision X AI 2nd', id: 1 },
    { name: 'MSI Creator P100X', id: 2 },
    { name: 'MSI GE76 Raider', id: 3 },
    { name: 'MSI Trident X', id: 4 },
    { name: 'MSI Stealth GS77', id: 5 },
];

const searchBar = document.querySelector('.search-bar');
const searchResults = document.createElement('ul');
searchResults.classList.add('search-suggestions');
document.querySelector('.search-container').appendChild(searchResults);

const cartButton = document.querySelector('.cart-button');
const cartContainer = document.querySelector('.cart-container');

const cartCount = document.querySelector('.cart-count');
const cartPreview = document.querySelector('.cart-preview');

let cart = [];

function renderSearchSuggestions(filteredProducts) {
    searchResults.innerHTML = '';
    filteredProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.name;
        li.addEventListener('click', () => {
            searchBar.value = product.name;
            searchResults.innerHTML = '';
        });
        searchResults.appendChild(li);
    });
}

searchBar.addEventListener('input', () => {
    const query = searchBar.value.trim().toLowerCase();
    searchResults.innerHTML = '';

    if (!query) return;

    const filteredResults = productData.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    if (filteredResults.length) {
        renderSearchSuggestions(filteredResults);
    }
});

document.querySelector('.search-button').addEventListener('click', e => {
    e.preventDefault();
    const query = searchBar.value.trim();

    if (query) {
        alert(`Searching for: ${query}`);
    } else {
        alert('Please enter a search term!');
    }
});

function updateCart() {
    cartCount.textContent = cart.length;
    cartPreview.innerHTML = '';

    if (cart.length === 0) {
        cartPreview.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - ${item.price}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartPreview.appendChild(cartItem);
    });
}
document.querySelector('.checkout-btn').addEventListener('click', () => {
    
    if (cart.length) {
        alert('Checkout successful! Thank you for your order.');
        cart = [];
        updateCart();
    }
});
cartPreview.addEventListener('click', e => {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
});

document.querySelectorAll('.order-button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.pc');
        if (!productElement) return;

        const productName = productElement.querySelector('h2').textContent;
        const productPrice = "$26,000"; 

        cart.push({ name: productName, price: productPrice });
        updateCart();

        const checkoutModal = document.querySelector('.checkout-modal');
        const modalContent = checkoutModal.querySelector('.modal-content');

        modalContent.innerHTML = `
            <h2>Order Confirmation</h2>
            <p>You selected: <strong>${productName}</strong></p>
            <p>Price: <strong>${productPrice}</strong></p>
            <p>Proceed to checkout or add more products.</p>
            <button class="proceed-button">Proceed to Checkout</button>
            <button class="modal-close">&times; Close</button>
        `;

        checkoutModal.style.display = 'flex';

        modalContent.querySelector('.proceed-button').addEventListener('click', () => {
            alert('Proceeding to checkout...');
            checkoutModal.style.display = 'none';
        });

        modalContent.querySelector('.modal-close').addEventListener('click', () => {
            checkoutModal.style.display = 'none';
        });
    });
});

cartButton.addEventListener('click', () => {
    cartContainer.classList.toggle('show');
});

const closeCartButton = document.createElement('button');
const clearCartButton = document.createElement('button');

closeCartButton.textContent = 'Close';
clearCartButton.textContent = 'Clear Cart';

closeCartButton.classList.add('close-cart-btn');
clearCartButton.classList.add('clear-cart-btn');

cartContainer.appendChild(clearCartButton);
cartContainer.appendChild(closeCartButton);

closeCartButton.addEventListener('click', () => {
    cartContainer.classList.remove('show');
});

clearCartButton.addEventListener('click', () => {
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        updateCart();
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

updateCart();
