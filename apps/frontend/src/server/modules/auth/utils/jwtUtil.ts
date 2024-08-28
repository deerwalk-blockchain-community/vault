import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../core/config';

async function generateJWT(userId: string): Promise<string> {
  return jwt.sign(
    {
      userId: userId,
    },
    SECRET_KEY,
    {
      expiresIn: '1w',
    },
  );
}

async function validateToken() {}

export { generateJWT };
