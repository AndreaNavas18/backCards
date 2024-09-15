const express = require('express');
const cors = require('cors');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

// Configurar CORS
app.use(cors());

app.use(express.json());

// Registro de usuario
app.post('/registro', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        res.json({ message: 'Usuario creado', user });
    } catch (error) {
        res.status(400).json({ error: 'El usuario ya existe' });
    }
});

  // Login
app.post('/login', async (req, res) => {
const { username, password } = req.body;
const user = await prisma.user.findUnique({ where: { username } });

if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

const isPasswordValid = await compare(password, user.password);
if (!isPasswordValid) return res.status(401).json({ error: 'Credenciales erroneasXX' });

const token = sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});