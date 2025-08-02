import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import {
  Home,
  Analytics,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Folder,
  Add,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../stores/dashboardStore';
import miracleLogo from '../assets/logos/miracle-logo.svg';

const drawerWidth = 240;

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { layouts, createNewLayout } = useDashboardStore();
  const [dashboardOpen, setDashboardOpen] = useState(true);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleCreateNewDashboard = () => {
    const newLayoutId = createNewLayout(`Dashboard ${layouts.length}`);
    navigate(`/dashboard/${newLayoutId}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo Section */}
          <Box
            sx={{
              p: 2,
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Box
              component="img"
              src={miracleLogo}
              alt="Miracle Logo"
              sx={{
                height: 50,
                width: 'auto',
              }}
            />
          </Box>

          {/* Navigation Menu */}
          <List sx={{ pt: 1, flexGrow: 1 }}>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: isActive('/') ? 'primary.main' : 'transparent',
                color: isActive('/') ? 'primary.contrastText' : 'inherit',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                }}
              >
                <Home
                  sx={{
                    fontSize: 20,
                    color: isActive('/') ? 'primary.contrastText' : 'inherit',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: isActive('/') ? 'primary.contrastText' : 'inherit',
                  }}
                >
                  Home
                </Typography>
              </Box>
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/charts"
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: isActive('/charts')
                  ? 'primary.main'
                  : 'transparent',
                color: isActive('/charts') ? 'primary.contrastText' : 'inherit',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                }}
              >
                <Analytics
                  sx={{
                    fontSize: 20,
                    color: isActive('/charts')
                      ? 'primary.contrastText'
                      : 'inherit',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: isActive('/charts')
                      ? 'primary.contrastText'
                      : 'inherit',
                  }}
                >
                  Charts
                </Typography>
              </Box>
            </ListItemButton>

            <ListItemButton
              onClick={() => setDashboardOpen(!dashboardOpen)}
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: isActive('/dashboard')
                  ? 'primary.main'
                  : 'transparent',
                color: isActive('/dashboard')
                  ? 'primary.contrastText'
                  : 'inherit',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                }}
              >
                <Dashboard
                  sx={{
                    fontSize: 20,
                    color: isActive('/dashboard')
                      ? 'primary.contrastText'
                      : 'inherit',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: isActive('/dashboard')
                      ? 'primary.contrastText'
                      : 'inherit',
                  }}
                >
                  Dashboards
                </Typography>
              </Box>
              {dashboardOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={dashboardOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {layouts.map(layout => (
                  <ListItemButton
                    key={layout.id}
                    component={Link}
                    to={`/dashboard/${layout.id}`}
                    sx={{
                      pl: 4,
                      mx: 1,
                      borderRadius: 1,
                      mb: 0.5,
                      backgroundColor:
                        location.pathname === `/dashboard/${layout.id}`
                          ? 'primary.light'
                          : 'transparent',
                      color:
                        location.pathname === `/dashboard/${layout.id}`
                          ? 'primary.contrastText'
                          : 'inherit',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Folder sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary={layout.id} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>

          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <ListItemButton
              onClick={handleCreateNewDashboard}
              sx={{
                borderRadius: 1,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                }}
              >
                <Add sx={{ fontSize: 20 }} />
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  Add Dashboard
                </Typography>
              </Box>
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
