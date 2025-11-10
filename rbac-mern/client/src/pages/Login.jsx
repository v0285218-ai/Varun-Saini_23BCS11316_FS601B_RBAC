import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@cu.test');
  const [password, setPassword] = useState('Admin#123');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (e) {
      setErr(e?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>Sign in</Typography>
          {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
          <Stack component="form" onSubmit={submit} spacing={2}>
            <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} fullWidth />
            <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} fullWidth />
            <Button type="submit" variant="contained" size="large">Login</Button>
          </Stack>
          <Alert sx={{ mt: 2 }} severity="info">
            Try: admin@cu.test / Admin#123 • editor@cu.test / Editor#123 • viewer@cu.test / Viewer#123
          </Alert>
        </Paper>
      </Box>
    </Layout>
  );
}
