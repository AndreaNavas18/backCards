import express from 'express';
import { json } from 'body-parser';
import authRoutes from './src/routes/authRoutes';
import protectedRoutes from './src/routes/protectedRoutes';
import cors from 'cors';

const app = express();

app.use(json());

app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});