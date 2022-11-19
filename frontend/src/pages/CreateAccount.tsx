import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import logo from '../assets/logoWrite.png';
import api from 'services/api';

export function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreateAccount() {

    if (username.length < 3 || username === '') {
      return alert('Seu usuário deve ter no mínimo três caracteres!');
    }

    const { data } = await api.post('/create_user', {
      "username": username,
      "password": password
    });

    try {

      alert(data.message);
      <Link to={'/'} />

      return data;

    } catch (error) {
      alert(data.message)
    }

  }

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
              value={username} 
              onChange={e => setUsername(e.target.value)}
              />

          </div>
          <div className='mb-4'>
            <input className='appearance-none block w-full px-10 py-3 leading-tight text-white
                        bg-black border-2 border-black focus:border-indigo-700
                        rounded focus:outline-none'
              type="password"
              placeholder='senha'
              value={password} 
              onChange={e => setPassword(e.target.value)}
              />

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