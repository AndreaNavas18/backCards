
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear o actualizar roles
  await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' }
  });

  await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: { name: 'User' }
  });

  await prisma.role.upsert({
    where: { name: 'Cliente' },
    update: {},
    create: { name: 'Cliente' }
  });

  // Obtener IDs de roles para usarlos en los permisos
  const adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } });
  const userRole = await prisma.role.findUnique({ where: { name: 'User' } });
  const clienteRole = await prisma.role.findUnique({ where: { name: 'Cliente' } });

  // Crear o actualizar permisos usando los IDs de los roles
  await prisma.permission.upsert({
    where: { action: 'verinicioadmin' },
    update: {},
    create: { action: 'verinicioadmin', roleId: adminRole.id },
  });

  await prisma.permission.upsert({
    where: { action: 'veriniciouser' },
    update: {},
    create: { action: 'veriniciouser', roleId: userRole.id },
  });

  await prisma.permission.upsert({
    where: { action: 'veriniciocliente' },
    update: {},
    create: { action: 'veriniciouser', roleId: clienteRole.id },
  });
  
  await prisma.user.update({
    where: { username: 'jhony' },
    data: { roleId: adminRole.id },
  });
  
  await prisma.user.upsert({
    where: { username: 'jhony' },
    update: {roleId: adminRole.id},
    create: { },
  });

  await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: { username: 'user', password: 'hashed_password', roleId: userRole.id },
  });

  console.log('Seed data has been populated successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
