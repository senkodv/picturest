const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// INICIALIZACIONES
const app = express();
require('./database');

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
const storage = multer.diskStorage({
    // DONDE SE VA A SUBIR
    destination: path.join(__dirname, 'public/img/uploads'),
    // CON QUÉ NOMBRE SE VA A SUBIR
    filename: (req, file, cb, filename) => {
        // Cuando suba una imagen le asigno un id y se le suma su extensión
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: storage }).single('image'));

// VARIABLES GLOBALES

// ROUTES
app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});