import { useAuth } from '../auth/AuthContext';

const MATRIX = {
  ADMIN: ['posts:create','posts:read','posts:update','posts:delete','users:manage'],
  EDITOR: ['posts:create','posts:read','posts:update'],
  VIEWER: ['posts:read']
};

export default function Can({ do: perm, children, fallback=null }) {
  const { user } = useAuth();
  if (!user) return null;
  const allowed = MATRIX[user.role]?.includes(perm);
  return allowed ? children : fallback;
}
