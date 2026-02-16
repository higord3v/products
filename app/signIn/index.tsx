"use client";

import { useActionState } from "react";
import { signIn } from "../actions/auth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function SignIn() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]'>
        <div className='hidden md:block relative bg-[#7ABA28]'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-white text-4xl font-bold opacity-20'>
              Innovation Brindes
            </div>
          </div>
        </div>
      </div>

      <div className='fixed inset-0 flex items-center justify-center bg-gray-100'>
        <div className='bg-[#7ABA28] w-full max-w-md p-8 rounded-3xl shadow-2xl relative overflow-hidden'>
          <div className='text-center mb-10'>
            <h1 className='text-white text-2xl font-bold'>
              Bem-vindo a Innovation Brindes
            </h1>
          </div>

          <form action={action} className='space-y-6'>
            <Input
              id='email'
              name='email'
              placeholder='Usuário'
              className='rounded-full py-3 bg-white border-white text-gray-900 placeholder-gray-500 focus:ring-white focus:border-white'
              error={state?.errors?.email?.[0]}
              icon={
                <svg
                  className='h-5 w-5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              }
            />

            <Input
              id='password'
              name='password'
              type='password'
              placeholder='Senha'
              className='rounded-full py-3 bg-white border-white text-gray-900 placeholder-gray-500 focus:ring-white focus:border-white'
              error={state?.errors?.password?.[0]}
              icon={
                <svg
                  className='h-5 w-5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              }
            />

            <div className='flex items-center justify-between text-sm text-white'>
              <div className='flex items-center'>
                <input
                  id='remember_me'
                  name='remember_me'
                  type='checkbox'
                  className='h-4 w-4 text-[#7ABA28] focus:ring-white border-gray-300 rounded'
                />
                <label htmlFor='remember_me' className='ml-2 block'>
                  Manter logado
                </label>
              </div>

              <div className='text-xs'>
                <a href='#' className='hover:underline'>
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <Button
                type='submit'
                isLoading={pending}
                className='w-full cursor-pointer rounded-full py-3 bg-white font-bold hover:bg-gray-100 shadow-md transition-transform transform hover:scale-105'
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className='fixed inset-0 -z-10 bg-[url(/assets/login.png)] bg-cover bg-center opacity-50 hidden'></div>
    </div>
  );
}
