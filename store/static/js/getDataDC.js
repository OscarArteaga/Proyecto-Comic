document.addEventListener('DOMContentLoaded', loadComics);

function loadComics() {
    fetch('/static/js/listComics.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comics => {
            displayComics(comics);
        })
        .catch(error => {
            console.error('Failed to fetch comics:', error);
        });
}

function displayComics(comics) {
    const comicsContainer = document.getElementById('comics');
    comicsContainer.innerHTML = '';

    comics.forEach(comic => {
        const comicDiv = document.createElement('div');
        comicDiv.className = 'product-box';
        comicDiv.innerHTML = `
            <img src="${comic.image}" alt="image of ${comic.name}" class="product">
            <div class="product-title">${comic.name}</div>
            <span class="price">${comic.price}</span><br><br>
            <a href="#" class="bi bi-box-arrow-in-down-left moinf btncard"></a>
            <i class="bi bi-bag add-cart btncard"></i>
        `;
        comicsContainer.appendChild(comicDiv);
    });
}


