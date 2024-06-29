// Función para verificar el inicio de sesión y ajustar la interfaz de usuario según sea necesario
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const registrarseBtn = document.querySelector('#registrarse');
    const iniciarsesionBtn = document.querySelector('#iniciarsesion');

    if (isLoggedIn) {
        if (registrarseBtn) registrarseBtn.style.display = 'none';
        if (iniciarsesionBtn) iniciarsesionBtn.style.display = 'none';
        // alert(`Bienvenido de nuevo, ${localStorage.getItem('userName')}`);
    }
}

// Añade el evento para verificar el inicio de sesión al cargar las páginas
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    // Añade el evento de inicio de sesión al formulario si existe en la página
    const LoginForm = document.querySelector('#LoginForm');
    if (LoginForm) {
        LoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const Users = JSON.parse(localStorage.getItem('users')) || [];
            const ValidUser = Users.find(user => user.email === email && user.password === password);

            if (!ValidUser) {
                alert('¡Usuario y/o contraseña incorrecta!');
            } else {
                alert(`Bienvenido ${ValidUser.name}`);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', ValidUser.name);
                checkLoginStatus();
                window.location.href = '/index/';
            }
        });
    }
});
