import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@fitnow.com';
  const passwordHash = await bcrypt.hash('Password123!!', 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: UserRole.admin,
      isActive: true,
    },
    create: {
      email,
      passwordHash,
      fullName: 'Administrador FitNow',
      phone: '+51999999999',
      role: UserRole.admin,
      isActive: true,
      isEmailVerified: true,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
    },
  });

  console.log('Admin seed creado/actualizado:', admin);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });