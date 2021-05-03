const express = require('express');

// require("./config/passport")(passport)
//express app
const app = express();
var PORT = process.env.PORT || 5000
//connect to mongodb
app.listen(PORT)

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.render('index', {title: 'inicio'})
})

app.get('/users/login', (req, res) => {
    res.render('login', {title: 'login'})
})  

app.get('/users/perfil', (req, res) => {
    res.render('perfil', {title: 'perfil'})
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

