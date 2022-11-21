import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/auth';
import api from 'services/api';
import { Header, CardFinances } from "../components";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

type transaction = [{
  "user": {
    "id": number,
    "username": string,
    "cash_out": [
      {
        "id": number,
        "value": number,
        "createdAt": string,
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
        "createdAt": string,
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

  const totalInAccount = transactions?.[0]?.user?.cash_out?.[0]?.accountOrigin?.balance;

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

  const userAccount = async(id: number) => {
    const { data } = await api.post('/userById', {
      "id": id
    });

    return data;
  }

  return(
    <>
      <Header />

      <div className='bg-zinc-800 h-screen flex flex-1 flex-col'>
        <div className='pt-5 w-full items-center justify-start'>
          <div className='border-2 p-16'>
            <p className='font-semibold text-gray-300 text-center text-lg pb-6'>RESUMO DE TRANSAÇÕES</p>
          </div>

          <CardFinances totalCash_in={`${totalCash_In().toString()} R$`} totalCash_out={`${totalCash_Out().toString()} R$`} valueInAccount={`${totalInAccount} R$`} />

          <div className='flex flex-1 border-2 border-white mt-10 bo'></div>
          <div className='flex flex-1 h-screen pb-4 bg-zinc-800 items-center justify-start'>
            <TableContainer>
              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell color='#fff'><p className='text-white'>Data</p></TableCell>
                    <TableCell color='#fff'><p className='text-white'>Valor da Transação</p></TableCell>
                    <TableCell color='#fff'><p className='text-white'>Conta destino</p></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions?.[0]?.user?.cash_out?.map( (row) => (
                    <TableRow key={row?.id}>
                      <TableCell><p className='text-white font-bold' >{row?.createdAt}</p></TableCell>

                      <TableCell><p className='text-red-600 font-bold'>- {row.value} R$</p></TableCell>

                      <TableCell><p className='text-white font-bold' >{row?.accountDestiny?.id}</p></TableCell>
                    </TableRow>
                  ))}
                  {transactions?.[0]?.user?.cash_in?.map((row) => (
                    <TableRow key={row?.id}>
                      <TableCell><p className='text-white font-bold' >{row?.createdAt}</p></TableCell>

                      <TableCell><p className='text-green-600 font-bold'>+ {row.value} R$</p></TableCell>

                      <TableCell><p className='text-white font-bold' >{row?.accountOrigin?.id}</p></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}