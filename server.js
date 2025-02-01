const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://david:ARno0192@cluster0.runro.mongodb.net/appa?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error en MongoDB:', err));

// Modelo
const respuestaSchema = new mongoose.Schema({
    respuesta: String,
    fecha: { type: Date, default: Date.now }
});
const Respuesta = mongoose.model('Respuesta', respuestaSchema);

app.post('/api/respuesta', async (req, res) => {
    try {
        const { respuesta } = req.body;
        const nuevaRespuesta = new Respuesta({ respuesta });
        await nuevaRespuesta.save();

        if (respuesta.toLowerCase() === 'sí') {
            res.json({ redirect: '/felicidades.html' });
        } else {
            res.json({ mensaje: '✅ Respuesta guardada correctamente' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: '❌ Error al guardar la respuesta' });
    }
});


// Servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
