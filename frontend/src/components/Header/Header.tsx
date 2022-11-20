import { useContext } from 'react';
import { Button } from "../Button";
import { Logo } from "./Logo";
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from 'context/auth';

export function Header() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    userContext?.logout();

    navigate('/');
  }

  return (
    <nav className="w-full h-20 bg-zinc-900 border-b border-x-gray-900">
      <div className="w-full h-full max-w-7xl m-auto flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-32">
          <Link className="text-white" to={'/profile'}>PROFILE</Link>

          <Link className="text-white" to={'/new_transaction'}>TRANSAÇÃO</Link>

          <Link className="text-white" to={'/details_transactions'}>HISTÓRICO</Link>
        </div>

        <Button variant="lightRed" onPress={handleLogout}>Sair</Button>

      </div>
    </nav>
  );
}