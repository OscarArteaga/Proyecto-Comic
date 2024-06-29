const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){

}
const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=> {
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = '/index/'

})  
document.addEventListener('DOMContentLoaded', function() {
    const boletaContent = document.getElementById('boleta-content');
    const boletaData = JSON.parse(localStorage.getItem('boleta'));

    if (!boletaData) {
        boletaContent.innerHTML = '<p>No hay datos de boleta disponibles.</p>';
        return;
    }

    let boletaHTML = '<ul class="list-group">';
    boletaData.items.forEach(item => {
        boletaHTML += `
            <li class="list-group-item">
                <img src="${item.imgSrc}" alt="Imagen de ${item.title}" class="img-thumbnail" style="width: 100px;">
                <strong>${item.title}</strong> - ${item.price} x ${item.quantity}
            </li>
        `;
    });
    boletaHTML += `
        <li class="list-group-item">
            <strong>Total:</strong> ${boletaData.totalPrice}
        </li>
    `;
    boletaHTML += '</ul>';

    boletaContent.innerHTML = boletaHTML;
});

