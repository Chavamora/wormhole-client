const hamburguer = document.querySelector('.hamburguer');
const info = document.querySelector('#profileInfo');

const menu = document.querySelector('.sideBar')

console.log(menu)
console.log(hamburguer)

hamburguer.addEventListener('click', ()=>{
    menu.classList.toggle("spread")
    hamburguer.classList.toggle("spreadHamburguer")
})


info.addEventListener('click', ()=>{
console.log('hola')
})

window.addEventListener("click", ()=>{
    if(menu.classList.contains("spread")
        && e.target != menu && e.target != hamburguer){

            menu.classList.toggle("spread")
        }
})