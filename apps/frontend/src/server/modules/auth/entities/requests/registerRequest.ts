import { z } from 'zod';

const emailRegex = new RegExp('^[w-.]+@([w-]+.)+[w-]{2,4}$');

const registerUserSchema = z
  .object({
    email: z.string().regex(emailRegex, 'Please provide a valid email!'),
    password: z
      .string()
      .min(8, 'Password Should be at least 8 character long!'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and Confirm Password do not match!',
    path: ['confirmPassword'],
  });

export default registerUserSchema;
