import React, { useState, useContext } from 'react';

import logo from '../assets/logoWrite.png';
import { Link, useNavigate } from 'react-router-dom';
import api from 'services/api';

import { AuthContext } from 'context/auth';

export function Login() {
  const userContext = useContext(AuthContext);
  const navigation = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handlerLogin() {

    try {
      const { data } = await api.post('/login', {
        "username": username,
        "password": password
      });

      userContext?.signInContext(username, password, data, data?.token);
      userContext?.setToken(data?.token);
      
      navigation('/profile');
    } catch (e: any) {
      alert(e.response.data.message);
    }
  }

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

        <div>
          <div className='mb-4'>
            <input
              className='appearance-none block w-full px-10 py-3 leading-tight text-white
              bg-black border-2 border-black focus:border-indigo-700
                      rounded focus:outline-none'
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <input className='appearance-none block w-full px-10 py-3 leading-tight text-white
                      bg-black border-2 border-black focus:border-indigo-700
                      rounded focus:outline-none'
              type="password"
              placeholder='senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mb-4' >
            <button className='inline-block w-full px-8 py-4 leading-none text-white bg-indigo-700
                            hover:bg-indigo-900 font-semibold rounded shadow'
              type='submit'
              onClick={handlerLogin}>Entrar</button>
          </div>

          <div className='nb-4'>
            <p>Não tem uma conta?
              <Link to={'/create_account'}>
                <button className='ml-2 text-indigo-600 font-semibold'>Registre-se</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}
