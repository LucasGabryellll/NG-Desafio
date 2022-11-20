import { useEffect, useState, useContext } from 'react';

import { Header } from "../components";

import { AuthContext } from '../context/auth';

import api from "services/api";


export function Transaction() {
  const userContext = useContext(AuthContext);
  const [userAccountDestiny, setUserAccountDestiny] = useState('');
  const [valueTransafery, setValueTransafery] = useState(0.0);

  async function newTransfer() {
    try {
      const { data } = await api.post('/accomplish_transaction', {
        "value": valueTransafery,
        "username": userAccountDestiny
      }, {
        headers: {
          'Authorization': `Bearer ${userContext?.token}`
        }
      });

      alert(data.message);
      setUserAccountDestiny('');
      setValueTransafery(0);
      
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <Header />

      <div className='bg-zinc-800 h-screen flex flex-1 flex-col'>
        <div className='pt-5 w-full items-center justify-start'>
          <div className='border-2 p-10'>
            <p className='font-semibold text-gray-300 text-center text-lg'>REALIZE SUA TRANSFERÊNCIA</p>
          </div>
        </div>

        <div className='min-h-screen flex flex-row'>
          <div className='mx-auto max-w-md py-8 px-10 shadow rounded-lg'>


            <div className='mb-4'>
              <input className='appearance-none block w-full px-10 py-3 leading-tight text-white
                        bg-black border-2 border-black focus:border-indigo-700
                        rounded focus:outline-none'
                type="text"
                placeholder='Conta de Destino'
                value={userAccountDestiny}
                onChange={e => setUserAccountDestiny(e.target.value)}
              />

            </div>

            <div className='mb-4'>
              <input className='appearance-none block w-full px-10 py-3 leading-tight text-white
                        bg-black border-2 border-black focus:border-indigo-700
                        rounded focus:outline-none'
                type="number"
                placeholder='Valor R$'
                value={valueTransafery}
                onChange={e => setValueTransafery(parseFloat(e.target.value))}
              />

            </div>

            <div className='mb-4' >
              <button className='inline-block w-full px-8 py-4 leading-none text-white bg-indigo-700
                              hover:bg-indigo-900 font-semibold rounded shadow' onClick={newTransfer}>TRANSFERIR</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}