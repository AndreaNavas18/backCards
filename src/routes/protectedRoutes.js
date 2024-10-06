import { Router } from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import checkPermission from '../middlewares/checkPermission.js';
const router = Router();

router.get('/home', verifyToken, (req, res) => {
  res.status(200).send({ message: 'Bienvenido a Digitals Cards' });
});

router.get('/home-admin', verifyToken, checkPermission('verinicioadmin'), (req, res) => {
  res.json({ message: 'Datos de administración accesibles' });
});

export default router;
