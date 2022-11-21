import {
  Table as TableMaterial,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

type Transaction = [{
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

export function Table() {
  return (
    <TableContainer>
      <TableMaterial>
        <TableHead >
          <TableRow>
            <TableCell color='#fff'><p className='text-white'>Data</p></TableCell>
            <TableCell color='#fff'><p className='text-white'>Valor da Transação</p></TableCell>
            <TableCell color='#fff'><p className='text-white'>Conta destino</p></TableCell>
          </TableRow>
        </TableHead>

        <TableBody></TableBody>
      </TableMaterial>
    </TableContainer>
  );
}
