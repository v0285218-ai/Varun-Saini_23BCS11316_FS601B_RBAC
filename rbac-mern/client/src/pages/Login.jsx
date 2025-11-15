import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <Box sx={{ minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center', bgcolor:'background.default', p:2 }}>
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <Paper sx={{ width: 420, p: 4, bgcolor: 'rgba(255,255,255,0.03)' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Welcome back</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Sign in to access the admin dashboard</Typography>

          {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

          <form onSubmit={submit}>
            <TextField fullWidth label="Email" sx={{ mb: 2 }} value={email} onChange={e=>setEmail(e.target.value)} />
            <TextField fullWidth label="Password" type="password" sx={{ mb: 2 }} value={password} onChange={e=>setPassword(e.target.value)} />
            <Button fullWidth variant="contained" size="large" type="submit">Sign in</Button>
          </form>

          <Typography variant="caption" color="text.secondary" sx={{ mt:2, display:'block' }}>
            Demo accounts: admin@cu.test / Admin#123 • editor@cu.test / Editor#123 • viewer@cu.test / Viewer#123
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
