import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useAuth } from '../auth/AuthContext';
import Can from './Can';
import { motion } from 'framer-motion';
import { useThemeMode } from '../ThemeContext';

const navItems = [
  { to: '/', label: 'Posts', icon: <ArticleIcon /> },
  { to: '/posts/new', label: 'New Post', icon: <HomeIcon /> }
];

export default function DarkLayout({ children }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { toggleMode } = useThemeMode();

  const handleLogout = async () => {
    await logout();
    nav('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: '#071022',
            borderRight: '1px solid rgba(255,255,255,0.03)'
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>{user?.name?.[0] || 'U'}</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{user?.name || 'Guest'}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.role || 'Not logged'}</Typography>
          </Box>
        </Box>

        <List sx={{ mt: 1 }}>
          {navItems.map(i => (
            <ListItemButton
              key={i.to}
              component={NavLink}
              to={i.to}
              sx={{
                color: 'text.primary',
                '&.active': { bgcolor: 'rgba(124,77,255,0.12)' }
              }}
            >
              <ListItemIcon sx={{ color: 'secondary.main' }}>{i.icon}</ListItemIcon>
              <ListItemText primary={i.label} />
            </ListItemButton>
          ))}

          <Can do="users:manage">
            <ListItemButton component={NavLink} to="/admin/users" sx={{ color: 'text.primary' }}>
              <ListItemIcon sx={{ color: 'secondary.main' }}><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>
          </Can>
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Tooltip title="Toggle theme">
              <IconButton size="small" onClick={toggleMode}>
                <Brightness4Icon sx={{ color: 'secondary.main' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton size="small" onClick={handleLogout}>
                <LogoutIcon sx={{ color: 'error.main' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: '260px' } // push content right by drawer width to avoid overlap
        }}
      >
        <Box component={motion.div} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
