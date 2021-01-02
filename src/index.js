const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');

// INICIALIZACIONES
const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000); // Si no existe un puerto definido en la nuve, usa el puerto 3000
/**
 * Definir la ruta de la carpte views
 */
app.set('views', path.join(__dirname, 'views'));
/**
 * Definir el motor de plantilla
 */
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(multer({dest: path.join(__dirname, 'public/img/uploads')}).single('image'));

// VARIABLES GLOBALES

// ROUTES
app.use(require('./routes/index'));

// Static files

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});