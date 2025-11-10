import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Can from './Can';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => { await logout(); nav('/login'); };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RBAC • Posts
          </Typography>
          {user ? (
            <>
              <Can do="users:manage">
                <Button component={RouterLink} to="/admin/users" color="inherit">Users</Button>
              </Can>
              <Typography variant="body2" sx={{ mx: 2, opacity: 0.8 }}>
                {user.name} • {user.role}
              </Typography>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </>
          ) : (
            <Button component={RouterLink} to="/login" color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
