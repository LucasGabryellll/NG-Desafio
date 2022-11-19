import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Login, CreateAccount, Profile, Transaction, DetailsTransactions } from '../pages';

export function AppRoutes() {

  return (
    <Router>
        <Routes>
          <Route index path='/' element={<Login />} />

          <Route path='/create_account' element={<CreateAccount />} />

          <Route path='/profile' element={<Profile />} />

          <Route path='/new_transaction' element={<Transaction />} />

          <Route path='/details_transactions' element={<DetailsTransactions />} />
        </Routes>
    </Router>
  );
}