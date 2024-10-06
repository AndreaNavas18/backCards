import { PrismaClient } from '@prisma/client';

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      // Obtener el usuario y sus roles y permisos
      const user = await PrismaClient.user.findUnique({
        where: { id: userId },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });

      if (!user || !user.role) {
        return res.status(403).json({ message: 'Usuario o rol no encontrado' });
      }
      
      const hasPermission = user.role.permissions.some(
        (permission) => permission.action === requiredPermission
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
      }

      
      next();
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  };
};

export default checkPermission;
