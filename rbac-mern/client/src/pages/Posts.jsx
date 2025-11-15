import React, { useEffect, useState } from 'react';
import http from '../api/http';
import DarkLayout from '../components/DarkLayout';
import PostCard from '../components/PostCard';
import Can from '../components/Can';
import { Grid, Stack, Button, Typography, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Posts() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const { user } = useAuth();

  const load = async () => {
    try {
      const { data } = await http.get('/posts');
      // server returns posts with authorId; keep as-is (we'll show authorId short)
      setItems(data);
    } catch (e) {
      setErr('Failed to load posts');
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this post?')) return;
    await http.delete(`/posts/${id}`);
    load();
  };

  const canEditFor = (post) => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    if (user.role === 'EDITOR') return String(post.authorId) === String(user.id) || post.published; // editors can edit own OR published? adjust as needed
    return false;
  };

  const canDeleteFor = (post) => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    return false;
  };

  return (
    <DarkLayout>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">All Posts</Typography>
        <Can do="posts:create">
          <Button variant="contained" startIcon={<AddIcon />} component={RouterLink} to="/posts/new">New Post</Button>
        </Can>
      </Stack>

      {err && <Typography color="error">{err}</Typography>}

      {!items ? (
        <Grid container spacing={3}>
          {[1,2,3,4].map(i => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Skeleton variant="rounded" height={150} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {items.map(p => (
            <Grid item xs={12} md={6} lg={4} key={p._id}>
              <PostCard
                post={{ ...p, authorName: p.authorName || (p.authorId?.name || `User`) }}
                onDelete={remove}
                canEdit={canEditFor(p)}
                canDelete={canDeleteFor(p)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </DarkLayout>
  );
}
