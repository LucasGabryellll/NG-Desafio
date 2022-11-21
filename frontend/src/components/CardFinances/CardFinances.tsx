import React from 'react';

import { CardItems } from '../CardItems';

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign
} from 'react-icons/fa';

type Props = {
  totalCash_in: string
  totalCash_out: string
  valueInAccount: string
}

export function CardFinances({ totalCash_in, totalCash_out, valueInAccount }: Props) {
  return(
    <div className='max-w-5xl w-11/12 m-auto flex gap-5 -mt-12 justify-between'>
      <CardItems title="Entradas" value={totalCash_in} color={"#000"} icon={FaRegArrowAltCircleUp} />
      <CardItems title="Saídas" value={totalCash_out} color={"green"} icon={FaRegArrowAltCircleDown} />
      <CardItems title="Balance Atual" value={valueInAccount} color={"#000"} icon={FaDollarSign} />
    </div>
  );
};