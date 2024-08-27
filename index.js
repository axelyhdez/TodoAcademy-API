var mongoose= require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

//mongoose.connect('mongodb+srv://Axely:axel_yael@cluster0.r7qvt3l.mongodb.net/?retryWrites=true&w=majority', (err, res) => {
mongoose.connect('mongodb://127.0.0.1:27017/proyecto', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("conexion Mongo OK");
        app.listen(port, function() {
            console.log("Servidor escuchando en http://127.0.0.1:" + port);
        });
    }
})
