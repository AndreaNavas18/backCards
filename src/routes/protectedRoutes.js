const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.get('/home', verifyToken, (req, res) => {
  res.status(200).send({ message: 'Bienvenido a Digitals Cards' });
});

module.exports = router;
