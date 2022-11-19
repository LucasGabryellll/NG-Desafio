import React, { useState } from 'react';

import logo from '../assets/logoWrite.png';
import { Link } from 'react-router-dom';
import api from 'services/api';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex flex-row items-center bg-current">
      <div className='mx-auto'>
        <div>
          <div className='flex justify-center items-center pb-4'>
            <img className='w-24' src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="logo"></img>
          </div>
          <h1 className='text-4xl font-bold text-white' >
            Faça seu Login
          </h1>
          <h1 className='text-4xl font-bold text-white'>
            na Plataforma
          </h1>
        </div>
      </div>
      <div className="bg-white mx-auto max-w-md py-8 px-10 shadow rounded-lg">
        <div className='mb-4'>
          <img className='w-14' src={logo} alt="logo" />
        </div>

        <form action=''>
          <div className='mb-4'>
            <input
              className='appearance-none block w-full px-10 py-3 leading-tight text-white
              bg-black border-2 border-black focus:border-indigo-700
                      rounded focus:outline-none' type="text" placeholder='Username' />
          </div>
          <div className='mb-4'>
            <input className='appearance-none block w-full px-10 py-3 leading-tight text-white
                      bg-black border-2 border-black focus:border-indigo-700
                      rounded focus:outline-none' type="password" placeholder='senha' />
          </div>

          <div className='mb-4' >
            <Link to={'/profile'}>

              <button className='inline-block w-full px-8 py-4 leading-none text-white bg-indigo-700
                            hover:bg-indigo-900 font-semibold rounded shadow'>Entrar</button>
            </Link>
          </div>

          <div className='nb-4'>
            <p>Não tem uma conta?
              <Link to={'/create_account'}>
                <button className='ml-2 text-indigo-600 font-semibold'>Registre-se</button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
//https://ng.cash/_nuxt/img/ngcash.5b8db70.png