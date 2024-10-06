import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/auth/authController';

// Rutas de loggeo
router.post('/registro', register);
router.post('/login', login);

export default router;
