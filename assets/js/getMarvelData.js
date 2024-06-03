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


