import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Guarded({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
