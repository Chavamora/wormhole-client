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

app.get('/privacidad', (req, res) => {
    res.render('privacidad', {title: 'Privacidad'})
})

app.get('/contacto', (req, res) => {
    res.render('contacto', {title: 'Contacto'})
})

app.get('/reportes', (req, res) => {
    res.render('reportes', {title: 'Reportes'})
})
app.get('/user/faqs', (req, res) => {
    res.render('faqs', {title: 'Preguntas frecuentes'})
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



