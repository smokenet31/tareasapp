const path = require ('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//Conectando la base de datos
mongoose.connect(process.env.KEY_MONGO).then(db => console.log('Db connected')).catch(err => console.log(err));


// Importing Routes
const indexRoutes = require('./routes/index'); //Importa la ruta index



// settings
app.set('port', process.env.PORT || 3000); // Se conecta al puerto por default o al 3000
app.set('views', path.join(__dirname, 'views')); // Busca la carpeta views en cualquier directorio no importa si Linux o Windows
app.set('view engine', 'ejs');




// middlewares
app.use(morgan('dev')); //Da la informacion del servidor y el cliente
app.use(express.urlencoded({extended: false})); //Entiende los datos del navegador



// routes
app.use('/', indexRoutes); //Usa las rutas importadas


// starting the server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); // Avisa a que puerto se conecto
});