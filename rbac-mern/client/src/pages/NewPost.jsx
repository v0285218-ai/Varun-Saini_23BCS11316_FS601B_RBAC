import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import DarkLayout from '../components/DarkLayout';
import http from '../api/http';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [published, setPublished] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await http.post('/posts', { title, body, published });
      nav('/');
    } catch (err) {
      alert(err?.response?.data?.error || 'Failed');
    }
  };

  return (
    <DarkLayout>
      <Box sx={{ maxWidth: 800 }}>
        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => nav(-1)}>← Back</Button>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Create New Post</Typography>
          <form onSubmit={submit}>
            <TextField fullWidth label="Title" sx={{ mb: 2 }} value={title} onChange={e => setTitle(e.target.value)} />
            <TextField fullWidth label="Body" multiline rows={6} sx={{ mb: 2 }} value={body} onChange={e => setBody(e.target.value)} />
            <Box sx={{ display:'flex', gap:2 }}>
              <Button type="submit" variant="contained">Create</Button>
              <Button variant="outlined" onClick={() => nav(-1)}>Cancel</Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </DarkLayout>
  );
}
