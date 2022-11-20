import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/auth';
import api from 'services/api';
import { Header, CardFinances } from "../components";

type transaction = [{
  "user": {
    "id": number,
    "username": string,
    "cash_out": [
      {
        "id": number,
        "value": number,
        "createdAt": Date,
        "accountOrigin": {
          "id": number,
          "balance": number
        },
        "accountDestiny": {
          "id": number,
        }
      }
    ],
    "cash_in": [
      {
        "id": number,
        "value": number,
        "createdAt": Date,
        "accountOrigin": {
          "id": number,
        },
        "accountDestiny": {
          "id": number,
          "balance": number
        }
      }
    ]
  }
}]

export function DetailsTransactions() {
  const userContext = useContext(AuthContext);
  const [transactions, setTransacations] = useState<transaction | null>(null);

  async function loadTransactionsHistory() {
    const { data } = await api.get('/transactions', {
      headers: {
        'Authorization': `Bearer ${userContext?.token}`
      }
    });

    setTransacations(data);
  }

  useEffect(() => {
    loadTransactionsHistory();
    totalCash_In();
  }, []);

  const totalInAccount = transactions?.[0]?.user?.cash_out?.[0]?.accountOrigin?.balance

  const totalCash_In = () => {
    let valueTotal = 0;

    transactions?.[0]?.user?.cash_in.map((index) => {
      let valueCurrent = index.value;

      let valueTotalCurrent = valueCurrent + valueTotal;
      valueTotal = valueTotalCurrent;
      
    });

    return valueTotal;
  }

  const totalCash_Out = () => {
    let valueTotal = 0;

    transactions?.[0]?.user?.cash_out.map((index) => {
      let valueCurrent = index.value;

      let valueTotalCurrent = valueCurrent + valueTotal;
      valueTotal = valueTotalCurrent;
      
    });

    return valueTotal;
  }

  return (
    <>
      <Header />

      <div className='bg-zinc-800 h-screen flex flex-1 flex-col'>
        <div className='pt-5 w-full items-center justify-start'>
          <div className='border-2 p-16'>
            <p className='font-semibold text-gray-300 text-center text-lg pb-6'>RESUMO DE TRANSAÇÕES</p>
          </div>

          <CardFinances totalCash_in={`${totalCash_In().toString()} R$`} totalCash_out={`${totalCash_Out().toString()} R$`} valueInAccount={`${totalInAccount} R$`}/>
        
        </div>
      </div>
    </>
  );
}