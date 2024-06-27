import { getFechaActual } from "./getFechaActual.js";
import { getMarvelData } from "./getMarvelData.js";

console.log(getFechaActual());

// let offset = 0;
// getMarvelData(offset);

// document.getElementById('verMasMarvel').addEventListener('click', () => {
//     offset += 20;
//     getMarvelData(offset);
// });
document.addEventListener('DOMContentLoaded', function() {
    getMarvelData();
});

