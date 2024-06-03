export const generateHash = (timestamp, privateKey, publicKey) => {
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    return hash;
}

export const renderHeroes = (heroes) => {
    const heroesRow = document.getElementById("heroesRow");
    const seenTitles = new Set();

    heroes.forEach(hero => {
        const { id, title, description, thumbnail } = hero;
        const { extension, path } = thumbnail;

        if (seenTitles.has(title)) {
            return; 
        }
        seenTitles.add(title);

        const productBox = document.createElement("div");
        productBox.classList.add("product-box");

        const img = document.createElement("img");
        img.src = `${path}.${extension}`;
        img.alt = `image of ${title}`;
        img.classList.add("product");

        const productTitle = document.createElement("div");
        productTitle.classList.add("product-title");
        productTitle.textContent = title;

        const price = document.createElement("span");
        price.classList.add("price");
        price.textContent = `$${Math.floor(Math.random() * 100)}`;

        const stock = document.createElement("span");
        stock.textContent = "Comic en stock: 10";

        const moreInfoLink = document.createElement("a");
        moreInfoLink.href = `/assets/view/comic${id}.html`;
        moreInfoLink.classList.add("bi", "bi-box-arrow-in-down-left", "moinf", "btncard");

        const addToCartIcon = document.createElement("i");
        addToCartIcon.classList.add("bi", "bi-bag", "add-cart", "btncard");

        productBox.appendChild(img);
        productBox.appendChild(productTitle);
        productBox.appendChild(price);
        productBox.appendChild(document.createElement("br"));
        productBox.appendChild(document.createElement("br"));
        productBox.appendChild(stock);
        productBox.appendChild(moreInfoLink);
        productBox.appendChild(addToCartIcon);

        heroesRow.appendChild(productBox);
    });

    const addCartButtons = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCartButtons.length; i++) {
        addCartButtons[i].addEventListener('click', addCartClicked);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let cartIcon = document.querySelector('#cart-icon');
    let cart = document.querySelector('.cart');
    let closeCart = document.querySelector('#close-cart');

    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    ready();
});

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function buyButtonClicked() {
    alert('Tu orden está lista');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    var cartItemsImgs = cartItems.getElementsByClassName('cart-img');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title && cartItemsImgs[i].src === productImg) {
            alert("Este producto ya está en tu carrito.");
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bi bi-trash-fill cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;

    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    updateTotal();
}

function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    if (!cartContent) {
        console.error('Elemento .cart-content no encontrado');
        return;
    }

    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

        if (!priceElement || !quantityElement) {
            console.error('No hay price no cart-box');
            continue;
        }

        var priceText = priceElement.innerText.replace("$", "").replace(",", ".");
        var price = parseFloat(priceText);
        var quantity = parseInt(quantityElement.value);

        if (isNaN(price) || isNaN(quantity)) {
            console.error('Invalido: ', priceText, quantityElement.value);
            continue;
        }

        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    var totalPriceElement = document.getElementsByClassName('total-price')[0];

    if (!totalPriceElement) {
        console.error('Elemento .total-price No fue encontrado');
        return;
    }

    totalPriceElement.innerText = '$' + total;
}