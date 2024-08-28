import { z } from 'zod';

const hasTokenRequest = z.object({
  token: z.string(),
});

export default hasTokenRequest;
