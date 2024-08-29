import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 3;

async function generateHash(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function compareHash(plain: string, hashed: string) {
  return await bcrypt.compare(plain, hashed);
}

export { generateHash, compareHash };
