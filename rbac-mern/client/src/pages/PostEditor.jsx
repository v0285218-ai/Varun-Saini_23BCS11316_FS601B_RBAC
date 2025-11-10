import { useEffect, useState } from 'react';
import http from '../api/http';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField, Typography, Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function PostEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const [form, setForm] = useState({ title: '', body: '', published: false });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (!isNew) {
      http.get('/posts')
        .then(({ data }) => {
          const p = data.find(x => x._id === id);
          if (p) setForm(p);
        })
        .catch(() => setErr('Failed to load post'));
    }
  }, [id, isNew]);

  const save = async () => {
    try {
      if (isNew) await http.post('/posts', form);
      else await http.patch(`/posts/${id}`, form);
      nav('/');
    } catch (e) {
      setErr('Save failed');
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {isNew ? 'Create Post' : 'Edit Post'}
          </Typography>

          {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

          <Stack spacing={2}>
            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="Body"
              multiline
              rows={6}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
              }
              label="Published"
            />
            <Button variant="contained" startIcon={<SaveIcon />} onClick={save}>
              Save
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
}
