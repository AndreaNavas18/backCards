
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear o actualizar roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' }
  });

  console.log('Admin Role:', adminRole);

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: { name: 'User' }
  });

  console.log('User Role:', userRole);

  const clienteRole = await prisma.role.upsert({
    where: { name: 'Cliente' },
    update: {},
    create: { name: 'Cliente' }
  });

  console.log('Cliente Role:', clienteRole);

  // Crear o actualizar permisos usando los IDs de los roles
  await prisma.permission.upsert({
    where: { action: 'verinicioadmin' },
    update: {},
    create: { 
      action: 'verinicioadmin', 
      roles: {connect: { id: adminRole.id }},
    },
  });

  console.log('Admin Permission:', adminPermission);

  await prisma.permission.upsert({
    where: { action: 'veriniciouser' },
    update: {},
    create: { 
      action: 'veriniciouser', 
      roles: {connect: { id: userRole.id }},
    },
  });

  console.log('User Permission:', userPermission);

  await prisma.permission.upsert({
    where: { action: 'veriniciocliente' },
    update: {},
    create: { 
      action: 'veriniciouser', 
      roles: {connect: {id: clienteRole.id}},
    },
  });

  console.log('Cliente Permission:', clientePermission);
  
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
