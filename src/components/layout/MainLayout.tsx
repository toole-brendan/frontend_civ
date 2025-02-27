import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { NAV_ITEMS } from '../../app/routes';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar 
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
      />
      
      <Sidebar 
        variant={isMobile ? "temporary" : "permanent"}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        navItems={NAV_ITEMS}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Height of AppBar
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 