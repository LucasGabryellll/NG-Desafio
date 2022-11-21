import React, { useEffect, useContext, useState } from 'react';
import { Header } from "../components";

import { AuthContext } from 'context/auth';
import api from 'services/api';

type AuthUser = [{
  "id": number,
  "username": string,
  "account": {
    "id": number,
    "balance": number
  }
}]

export function Profile() {
  const userContext = useContext(AuthContext);
  const [userInformation, setUserInformation] = useState<AuthUser | null>(null);

  async function loadProfileInformation() {
    const { data } = await api.get('/profile', {
      headers: {
        'Authorization': `Bearer ${userContext?.token}`
      }
    });

    setUserInformation(data);
  }

  useEffect(() => {
    loadProfileInformation();

  }, []);

  return (
    <>
      <Header />

      <div className='bg-zinc-800 pt-5 pb-96 h-screen items-center justify-start'>
        <div className='flex flex-row items-center justify-center border-2 p-10'>
          <h1 className='font-bold pr-6 text-2xl text-white'>Bem Vindo (a):</h1>
          <p className='font-semibold text-gray-300 text-center text-lg'>{userInformation?.[0].username}</p>
        </div>

        <div className='pt-4 flex flex-row justify-center '>
          <div className='w-28 h-28 pl-2 pr-2 border-2 border-cyan-500 hover:bg-gray-900 hover:border-cyan-700 mr-20 flex flex-col justify-center items-center'>
            <h1 className='text-base text-white'>Id da Conta:</h1>
            <h1 className='text-gray-300 text-xl'>{userInformation?.[0]?.account?.id}</h1>
          </div>

          <div className='w-64 h-28 pl-2 pr-2 text-white border-2 border-cyan-500 hover:bg-gray-900 hover:border-cyan-700 flex flex-col justify-center items-center'>
            <h1 className='font-bold text-gray-300'>Saldo Disponível em Conta:
            </h1>
            <h1 className='text-xl text-green-500'>{userInformation?.[0]?.account?.balance}R$</h1>
          </div>
        </div>
      </div>
    </>
  );
}