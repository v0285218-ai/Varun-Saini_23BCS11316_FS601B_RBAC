import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';

export default function RoleBadge({ author }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 13 }}>{author?.[0] || 'U'}</Avatar>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{author}</Typography>
    </Stack>
  );
}
