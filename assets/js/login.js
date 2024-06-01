const LoginForm = document.querySelector('#LoginForm')
LoginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const ValidUser = Users.find(user => user.email === email && user.password === password)
    if(!ValidUser){
        return alert('Usuario y/o contraseña incorrecta!')
    }
    alert(`Bienvenido ${ValidUser.name}`)
    window.location.href = 'home.html'
})