import React from 'react';
import { Box, Typography } from '@mui/material';
import { Home, Analytics, Dashboard } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import FontSizeToggle from './FontSizeToggle';

export default function TopBar() {
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname;

    if (path === '/') {
      return {
        title: 'Home',
        icon: <Home sx={{ fontSize: 20 }} />,
      };
    }

    if (path.startsWith('/charts')) {
      return {
        title: 'Charts',
        icon: <Analytics sx={{ fontSize: 20 }} />,
      };
    }

    if (path.startsWith('/dashboard')) {
      const dashboardId = path.split('/')[2] || 'default';
      return {
        title: `Dashboard: ${dashboardId}`,
        icon: <Dashboard sx={{ fontSize: 20 }} />,
      };
    }

    return {
      title: 'Unknown Page',
      icon: null,
    };
  };

  const pageInfo = getPageInfo();

  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: 3,
        pr: 1,
        py: 1,
      }}
    >
      {/* Left side - Page info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {pageInfo.icon}
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {pageInfo.title}
        </Typography>
      </Box>

      {/* Right side - Font size toggle */}
      <Box sx={{ ml: 'auto' }}>
        <FontSizeToggle />
      </Box>
    </Box>
  );
}
