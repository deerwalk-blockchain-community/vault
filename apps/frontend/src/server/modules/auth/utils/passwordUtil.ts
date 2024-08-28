import bcrypt from 'bcryptjs';

const SALT_COUNT = 18;

async function generateHash(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_COUNT);
}

async function compareHash(plain: string, hashed: string) {
  return await bcrypt.compare(plain, hashed);
}

export { generateHash, compareHash };
