import { generateHash } from '../src/auth/utils/passwordUtil';
import { prisma } from '../src/core/db/prisma';

async function main() {
  const created = await prisma.users.upsert({
    where: {
      email: 'admin@admin.com',
    },
    update: {
      isAdmin: true,
      password: await generateHash('password123'),
    },
    create: {
      email: 'admin@admin.com',
      password: await generateHash('password123'),
      isAdmin: true,
    },
  });
  return created;
}

main().then((user) => console.log(`Created Admin ${user.email}`));
