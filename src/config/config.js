module.exports = {
    secret: process.env.JWT_SECRET || 'keyysecreet-key',
    expiresIn: '1h',
  };
  