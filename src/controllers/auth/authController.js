const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config');
const prisma = require('@prisma/client');

const prismaClient = new prisma.PrismaClient();

//Registro interno 
exports.register = async (req, res) => {
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
  };

  // Login de usuario
exports.login = async (req, res) => {
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
      const token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
        expiresIn: config.expiresIn,
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
  };