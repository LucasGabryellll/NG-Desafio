import { AppRoutes } from './routes';
import AuthProvider from 'context/auth';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
