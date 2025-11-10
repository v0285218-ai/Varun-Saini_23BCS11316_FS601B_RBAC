import { useEffect, useState } from 'react';
import http from '../api/http';
import Can from '../components/Can';
import Layout from '../components/Layout';
import {
  Alert, Box, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography
} from '@mui/material';

export default function AdminUsers() {
  const [users, setUsers] = useState(null);
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      const { data } = await http.get('/users');
      setUsers(data);
    } catch (e) {
      setErr('Failed to load users');
    }
  };

  const changeRole = async (id, role) => {
    await http.patch(`/users/${id}/role`, { role });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <Layout>
      <Can do="users:manage" fallback={<Alert severity="error">403: Only Admin can view this page.</Alert>}>
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Manage Users</Typography>

            {err && <Alert severity="error">{err}</Alert>}

            {!users ? (
              <Typography>Loading...</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(u => (
                    <TableRow key={u._id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>
                        {['ADMIN','EDITOR','VIEWER'].map(r => (
                          <Button
                            key={r}
                            size="small"
                            onClick={() => changeRole(u._id, r)}
                            disabled={u.role === r}
                            sx={{ mr: 1 }}
                          >
                            {r}
                          </Button>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Box>
      </Can>
    </Layout>
  );
}
