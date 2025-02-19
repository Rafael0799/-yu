const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema del mensaje de contacto
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    newContact.save((err) => {
        if (err) {
            res.status(500).send('Error al guardar el mensaje.');
        } else {
            res.status(200).send('Mensaje enviado con éxito.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});