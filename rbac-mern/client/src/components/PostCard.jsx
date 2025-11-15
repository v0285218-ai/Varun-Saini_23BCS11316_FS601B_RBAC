import React from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import RoleBadge from './RoleBadge';
import { Link as RouterLink } from 'react-router-dom';

export default function PostCard({ post, onDelete, canEdit, canDelete }) {
  return (
    <motion.div whileHover={{ y: -6 }} style={{ borderRadius: 12 }}>
      <Card sx={{
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(124,77,255,0.06)',
        borderRadius: 2,
        minHeight: 150
      }}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{post.title}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {post.published ? <Chip label="Published" size="small" color="secondary" /> : <Chip label="Draft" size="small" />}
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {post.body?.length > 160 ? post.body.slice(0, 160) + '…' : post.body}
          </Typography>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }} alignItems="center">
            <RoleBadge author={post.authorName || (post.authorId?.name || 'User')} />
            <Typography variant="caption" color="text.secondary">{new Date(post.createdAt).toLocaleString()}</Typography>
          </Stack>
        </CardContent>

        <CardActions>
          {canEdit && <Button size="small" startIcon={<EditIcon />} component={RouterLink} to={`/posts/${post._id}`}>Edit</Button>}
          {canDelete && <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(post._id)}>Delete</Button>}
        </CardActions>
      </Card>
    </motion.div>
  );
}
