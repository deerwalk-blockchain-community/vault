import { z } from 'zod';

// const emailRegex = new RegExp('^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$');

const loginUserSchema = z.object({
  email: z.string(),
  password: z.string().min(8, 'Password Should be at least 8 character long!'),
});

export default loginUserSchema;
