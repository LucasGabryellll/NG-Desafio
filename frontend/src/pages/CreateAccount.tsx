import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import logo from '../assets/logoWrite.png';
import api from 'services/api';

export function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreateAccount() {
    if (username.length < 3 || username === '') {
      //return alert('Seu usuário deve ter no mínimo três caracteres!');
    }

    try {
      const { data } = await api.post('/create_user', {
        "username": username,
        "password": password
      });

      /*
      <Link to={'/'} />
      return data;
      */
     console.log(data);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    async function getAccount() {
      const { data } = await api.get("/accounts");

      console.log(data)
      return data;
    }

    getAccount();
  }, []);

  return (
    <div className="min-h-screen flex flex-row items-center bg-current">
      <div className="bg-white mx-auto max-w-md py-8 px-10 shadow rounded-lg">
        <div className='justify-center items-center flex pb-10'>
          <img className='w-14 ml-4' src={logo} alt="logo" />
          <h1 className='text-black font-bold text-xl'>CRIE SUA CONTA</h1>
        </div>
        <form action=''>
          <div className='mb-4'>
            <input
              className='appearance-none block w-full px-10 py-3 leading-tight text-white
                bg-black border-2 border-black focus:border-indigo-700
                        rounded focus:outline-none'
              type="text"
              placeholder='Username'
              onChange={e => setUsername(e.target.value)}
              value={username} />

          </div>
          <div className='mb-4'>
            <input className='appearance-none block w-full px-10 py-3 leading-tight text-white
                        bg-black border-2 border-black focus:border-indigo-700
                        rounded focus:outline-none'
              type="password"
              placeholder='senha'
              onChange={e => setPassword(e.target.value)}
              value={password} />

          </div>

          <div className='mb-4' >
            <button className='inline-block w-full px-8 py-4 leading-none text-white bg-indigo-700
                              hover:bg-indigo-900 font-semibold rounded shadow' onClick={handleCreateAccount}>Criar Conta</button>

          </div>

          <div className='flex flex-row-reverse pt-4' >
            <Link to={'/'}>
              <button className='flex justify-center items-center text-indigo-900 font-semibold'>
                <FiArrowLeft className='mr-1' /> Voltar para Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}