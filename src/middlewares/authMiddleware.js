import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import { secret } from '../config/config.js';

//Middleware de autenticación
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) return res.status(403).json({message: 'Token no proporcionado'});
    
    const bearerToken = token.split(' ')[1]; 
    verify(bearerToken, secret, (err, decoded) => {
        if(err) return res.status(401).json({message: 'Token inválido'});

        //Guardo los datos del usuario en el request
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}

export default verifyToken;