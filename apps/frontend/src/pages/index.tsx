import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import type { inferProcedureInput } from '@trpc/server';
import { register } from 'module';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import type { AppRouter } from '~/server/routers/_app';

const IndexPage: NextPageWithLayout = () => {
  // const utils = trpc.useUtils();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePwChange = (e: any) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    registerUser();
  };

  const registerMutation = trpc.auth.register.useMutation();

  const registerUser = () => {
    registerMutation.mutate({
      email: email,
      password: pw,
      confirmPassword: pw,
    });
  };

  const data = registerMutation.data;

  return (
    <div className="flex flex-col bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">
        Welcome to your tRPC with Prisma starter!
      </h1>

      <input
        type="text"
        className="mt-5 text-black"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        type="text"
        className="my-5 text-black"
        onChange={handlePwChange}
        value={pw}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={registerMutation.isPending}
        className="bg-black"
      >
        Reg
      </button>
      {registerMutation.error && (
        <p>Something went wrong! {registerMutation.error.message}</p>
      )}
      {registerMutation.isSuccess && (
        <p>YOOOO {registerMutation.data.authToken}</p>
      )}
      {registerMutation.isPending && <p>Inserting.....</p>}
    </div>
  );
};

export default IndexPage;
