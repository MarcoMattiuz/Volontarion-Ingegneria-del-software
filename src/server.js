import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb://127.0.0.1:27017/VolontariOn';
try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('MongoDB connection error:', err);
}

const volontarioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 200 },
    email: { type: String, unique: true, required: true },
    phone: String,
    password: { type: String, required: true }
});

const associazioneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: String,
    password: { type: String, required: true }
});

const Volontario = mongoose.model("Volontario", volontarioSchema, 'Volontari');
const Associazione = mongoose.model("Associazione", associazioneSchema, 'Associazioni');

// Endpoint per registrazione volontari
app.post("/users/registrazioneVolontario", async (req, res) => {
    console.log("Dati ricevuti volontario:", req.body);
    try {
        // Validate required fields
        const { email, name, surname, age, password } = req.body;
        if (!email?.trim() || !name?.trim() || !surname?.trim() || !age || !password) {
            return res.status(400).json({ message: "Dati obbligatori mancanti" });
        }

        // Sanitize email
        req.body.email = email.trim().toLowerCase();
        
        const newVolontario = new Volontario(req.body);
        await newVolontario.save();
        res.status(201).json({ message: "Volontario registrato con successo!" });
    } catch (error) {
        if (error.code === 11000) {
            console.log("Email duplicata:", req.body.email);
            res.status(605).json({ message: "Email già registrata" });
        } else {
            console.error("Errore registrazione volontario:", error);
            res.status(500).json({ message: "Errore nel server" });
        }
    }
});

// Endpoint per registrazione associazioni
app.post("/users/registrazioneAssociazione", async (req, res) => {
    console.log("Dati ricevuti associazione:", req.body);
    try {
        // Validate required fields
        const { email, name, password } = req.body;
        if (!email?.trim() || !name?.trim() || !password) {
            return res.status(400).json({ message: "Dati obbligatori mancanti" });
        }

        // Sanitize email
        req.body.email = email.trim().toLowerCase();
        
        const newAssociazione = new Associazione(req.body);
        await newAssociazione.save();
        res.status(201).json({ message: "Associazione registrata con successo!" });
    } catch (error) {
        if (error.code === 11000) {
            console.log("Email duplicata:", req.body.email);
            res.status(605).json({ message: "Email già registrata" });
        } else {
            console.error("Errore registrazione associazione:", error);
            res.status(500).json({ message: "Errore nel server" });
        }
    }
});

app.get('/api/lista_associazioni', async (req, res) => {
    try {
        const Info_associazioni = await Associazione.find();
        console.log('Data retrieved:', Info_associazioni);
        res.json(Info_associazioni);
    } catch (error) {
        console.error('Error retrieving associations:', error);
        res.status(500).json({ message: "Errore nel recupero delle associazioni" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});