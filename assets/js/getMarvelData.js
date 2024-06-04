import { privateKey, publicKey} from "./autenticacion.js"
import { generateHash, renderHeroes } from "./operacines.js"

export const getMarvelData = (offset) => {
    const timestamp = new Date().getTime().toString();
    const hash = generateHash(timestamp, privateKey, publicKey);
    const limit = 20;
    const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error(` Network response was not ok`);
        }
        return response.json();
    })
    .then((data) => {
        renderHeroes(data.data.results);
    })
    .catch((error) => {
        console.error(`there was a problem with th fetch operation:`, error);
    });

}

document.querySelectorAll('.listButtons button').forEach(button => {
    button.addEventListener('click', function() {
        const isMarvel = this.id === 'cargaMarvel';
        
        const heroesToShow = isMarvel ? '#heroesRow .product-box' : '#comics .product-box';
        const heroesToHide = isMarvel ? '#comics .product-box' : '#heroesRow .product-box';

        document.querySelectorAll(heroesToShow).forEach(hero => hero.style.display = 'block');
        document.querySelectorAll(heroesToHide).forEach(hero => hero.style.display = 'none');

        if (isMarvel) {
            document.querySelector('.marvelShop').style.marginTop = '-100px';
        }
    });
});

export const getComicDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('id');

    if (!comicId) {
        console.error('Comic ID not found in URL parameters.');
        return;
    }

    const timestamp = new Date().getTime().toString();
    const hash = generateHash(timestamp, privateKey, publicKey);
    const apiUrl = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        const data = await response.json();
        const comic = data.data.results[0];

        // Mostrar los detalles del cómic en la página
        document.getElementById('comic-image').src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
        document.getElementById('comic-title').textContent = comic.title;
        document.getElementById('comic-description').textContent = comic.description || "Descripción no disponible.";

        // Agregar evento al botón "Agregar al Carrito"
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            addProductToCart(comic.title, `$${Math.floor(Math.random() * 100)}`, `${comic.thumbnail.path}.${comic.thumbnail.extension}`);
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Llamar a la función para obtener los detalles del cómic al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    getComicDetails();
});

