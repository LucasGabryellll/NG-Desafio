import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to={'/profile'}>
      <button className="w-16">
        <img src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" alt="logo"></img>
      </button>
    </Link>
  )
}