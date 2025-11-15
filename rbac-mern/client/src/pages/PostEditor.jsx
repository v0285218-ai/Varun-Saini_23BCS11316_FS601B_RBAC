import React, { useEffect, useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Switch, FormControlLabel } from '@mui/material';
import DarkLayout from '../components/DarkLayout';
import http from '../api/http';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function PostEditor() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await http.get(`/posts`);
        const found = data.find(p => p._id === id);
        setPost(found || null);
      } catch (err) {
        alert('Failed to load');
      }
    };
    load();
  }, [id]);

  if (!post) return (
    <DarkLayout>
      <Typography>Loading...</Typography>
    </DarkLayout>
  );

  const canEdit = user?.role === 'ADMIN' || (user?.role === 'EDITOR' && String(post.authorId) === String(user.id));

  const save = async () => {
    if (!canEdit) return alert('Not allowed');
    try {
      await http.patch(`/posts/${id}`, { title: post.title, body: post.body, published: post.published });
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
          <Typography variant="h5" sx={{ mb: 2 }}>Edit Post</Typography>

          <TextField fullWidth label="Title" sx={{ mb: 2 }} value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
          <TextField fullWidth label="Body" multiline rows={8} sx={{ mb: 2 }} value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} />
          <FormControlLabel control={<Switch checked={!!post.published} onChange={e => setPost({ ...post, published: e.target.checked })} />} label="Published" />

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={save} disabled={!canEdit}>Save</Button>
            <Button variant="outlined" onClick={() => nav(-1)}>Cancel</Button>
          </Box>
        </Paper>
      </Box>
    </DarkLayout>
  );
}
