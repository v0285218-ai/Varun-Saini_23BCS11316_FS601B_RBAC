import { useEffect, useState } from 'react';
import http from '../api/http';
import Can from '../components/Can';
import Layout from '../components/Layout';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert, Grid, Card, CardContent, CardActions, Button, Typography, Chip, Skeleton, Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Posts() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      const { data } = await http.get('/posts');
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

  return (
    <Layout>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Posts</Typography>

        <Can do="posts:create">
          <Button variant="contained" startIcon={<AddIcon />} component={RouterLink} to="/posts/new">
            New Post
          </Button>
        </Can>
      </Stack>

      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

      {!items ? (
        <Grid container spacing={2}>
          {[1,2,3].map(x => (
            <Grid item xs={12} md={6} key={x}>
              <Skeleton variant="rounded" height={130} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {items.map(p => (
            <Grid item xs={12} md={6} key={p._id}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>{p.title}</Typography>
                    {p.published && <Chip label="Published" size="small" color="success" />}
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 1, opacity:0.8 }}>
                    {p.body}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Can do="posts:update">
                    <Button component={RouterLink} to={`/posts/${p._id}`} size="small" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                  </Can>

                  <Can do="posts:delete">
                    <Button onClick={() => remove(p._id)} size="small" color="error" startIcon={<DeleteOutlineIcon />}>
                      Delete
                    </Button>
                  </Can>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
