import { router, publicProcedure } from '~/server/trpc';
import { TRPCError } from '@trpc/server';
import { prisma } from '~/server/prisma';
import registerUserSchema from '../entities/requests/registerRequest';
import loginUserSchema from '../entities/requests/loginRequest';
import AuthController from '../controllers/authController';
import { TokenResponse } from '../entities/responses/tokenResponse';

const authRouter = router({
  register: publicProcedure
    .input(registerUserSchema)
    .mutation(async ({ input }) => {
      console.log(input.email, input.password);
      const registered = await AuthController.registerUser(
        input.email,
        input.password,
        prisma,
      );
      if (registered.isErr) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: registered.error.message,
          cause: registered.error.field,
        });
      }
      const token = await AuthController.generateToken(registered.value.id);
      return {
        authToken: token,
      } as TokenResponse;
    }),

  login: publicProcedure.input(loginUserSchema).query(async ({ input }) => {
    const loggedIn = await AuthController.loginUser(
      input.email,
      input.password,
      prisma,
    );
    if (loggedIn.isErr) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: loggedIn.error.message,
        cause: loggedIn.error.field,
      });
    }
    const token = await AuthController.generateToken(loggedIn.value.id);
    return {
      authToken: token,
    } as TokenResponse;
  }),
  isAdmin: publicProcedure.query(async () => {
  }),
});
