import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Login, CreateAccount, Profile, Transaction, DetailsTransactions } from '../pages';

import { AuthContext } from '../context/auth';

type Props = {
  children: JSX.Element
}

export function AppRoutes() {
  const Private = ({ children }: Props) => {
    const userContext = useContext(AuthContext);

    if (userContext?.loading) {
      return <div className="loading">Carregando...</div>
    }

    if (!userContext?.token) {
      return <Navigate to={'/'} />
    }

    return children
  }

  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Login />} />

        <Route path='/create_account' element={<CreateAccount />} />

        <Route path='/profile' element={<Private>
          <Profile /></Private>} />

        <Route path='/new_transaction' element={<Private><Transaction /></Private>} />

        <Route path='/details_transactions' element={<Private><DetailsTransactions /></Private>} />
      </Routes>
    </Router>
  );
}