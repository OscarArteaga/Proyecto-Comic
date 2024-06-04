import { getFechaActual } from "./getFechaActual.js";
import { getComicDetails, addProductToCart } from "./getMarvelData.js";

console.log(getFechaActual());

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const comicId = params.get('id');

    if (comicId) {
        getComicDetails(comicId);
    }

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            addProductToCart();
        });
    }
});