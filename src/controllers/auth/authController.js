import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
import bcrypt from 'bcrypt';
import { secret, expiresIn as _expiresIn } from '../../config/config.js';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

//Registro interno 
export async function register(req, res) {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
  
    try {
      const user = await prismaClient.user.create({
        data: {
          username,
          password: hashedPassword,
          role,
        },
      });
      res.status(201).send({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      res.status(500).send({ message: 'Error al registrar usuario.' });
    }
  }

  // Login de usuario
export async function login(req, res) {
    const { username, password } = req.body;
  
    try {
      const user = await prismaClient.user.findUnique({
        where: { username },
      });
  
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado.' });
      }
  
      const passwordIsValid = bcrypt.compareSync(password, user.password);
  
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Contraseña incorrecta.' });
      }
  
      // Crea un token JWT
      const token = sign({ id: user.id, role: user.role }, secret, {
        expiresIn: _expiresIn,
      });
  
      res.status(200).send({
        id: user.id,
        username: user.username,
        role: user.role,
        token: token,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error al iniciar sesión.' });
    }
  }