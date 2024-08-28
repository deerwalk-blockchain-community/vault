import { router } from '~/server/trpc';

import { fetchSelfProcedure, isAdminProcedure, loginProcedure, registerProcedure } from '../procedure/procedure';

const authRouter = router({
  register: registerProcedure,
  login:loginProcedure,
  isAdmin: isAdminProcedure, // yet to implement
  getSelfProcedure:fetchSelfProcedure // yet to implement
});


export default authRouter