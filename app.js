const express = require('express');
var cookieParser = require('cookie-parser');
// require("./config/passport")(passport)
//express app
const app = express();
var PORT = process.env.PORT || 5000
//connect to mongodb
app.listen(PORT)

console.log('listening on ', PORT)
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.render('index', {title: 'inicio'})
})

app.get('/users/login', (req, res) => {
    res.render('login', {title: 'login'})
})  

app.get('/users/register', (req, res) => {
    res.render('register', {title: 'register'})
})  

app.get('/users/perfil', (req, res) => {
    res.render('perfil', {title: 'perfil', secret_token: req.cookies['secret_token']})
})  

app.get('/users/estudio', (req,res) => {
    res.render('estudio', {title: 'Estudio'})
})  

app.get('/users/estudio/agregar_materia', (req,res) => {
    res.render('agregarMateria', {title: 'Agregar una Materia'})
})  

app.get('/users/deporte', (req,res) => {
    res.render('deporte', {title: 'Deporte'})
})  

app.get('/users/deporte/agregar_deporte', (req,res) => {
    res.render('agregarDeporte', {title: 'Agregar una Deporte'})
})  

app.get('/users/hobbies', (req,res) => {
    res.render('hobbies', {title: 'Hobbie'})
})  

app.get('/users/hobbies/agregar_hobbie', (req,res) => {
    res.render('agregarHobbie', {title: 'Agregar una Hobbie'})
})  

app.get('/users/plan_de_vida', (req,res) => {
    res.render('planDeVida', {title: 'Metas'})
})  

app.get('/users/plan_de_vida/agregar_metas', (req,res) => {
    res.render('agregarMeta', {title: 'Agregar una Meta'})
})  

app.get('/users/rueda_de_vida', (req,res) => {
    res.render('ruedaDeVida', {title: 'Rueda De Vida'})
})  
app.get('/users/buscar/:busqueda', (req,res) => {
    const busqueda =req.params.busqueda
    res.render('resultadosBusqueda', {title: 'resultados de la busqueda', busqueda: busqueda})
}) 

app.get('/users/:id', (req,res) => {
    const id =req.params.id
    res.render('perfilUser', {title: 'perfil', id: id})
}) 

app.get('/privacidad', (req, res) => {
    res.render('privacidad', {title: 'Privacidad'})
})

app.get('/contacto', (req, res) => {
    res.render('contacto', {title: 'Contacto'})
})

app.get('/reportesID', (req, res) => {
    res.render('reporteCompleto', {title: 'Reporte'})
})

app.get('/reportes', (req, res) => {
    res.render('reportesListaGeneral', {title: 'Reportes'})
})

app.get('/nuevo-reporte', (req, res) => {
    res.render('nuevoReporte', {title: 'Crear Reporte'})
})

app.get('/publicaciones', (req, res) => {
    res.render('publicaciones', {title: 'publicaciones'})
})

app.get('/publicaciones/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('singlePublicacion', {title: 'publicacion', id: id})
})


app.get('/reporte/editar/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('editReport', {title: 'editar reporte', id: id})
})

app.get('/reporte/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('reporteCompleto', {title: 'reporte', id: id})
})


app.use((req,res) => {
    res.render('404', {title: '404'})
})

