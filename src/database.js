const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/picturest', {
    useNewUrlParser: true
})
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));