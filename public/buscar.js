const buscar = document.querySelector('#buscar')

buscar.addEventListener('click', async(e) => {
    const buscarAmigos = document.querySelector('#searchInput').value
window.location.href = `/users/buscar/${buscarAmigos}`;
})

