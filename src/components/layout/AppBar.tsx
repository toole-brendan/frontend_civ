import React from 'react';
import { AppBar as MuiAppBar, styled, useTheme } from '@mui/material';
import { AppBarContent } from './AppBar/AppBarContent';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.9)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'}`,
  boxShadow: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
      : 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)',
    pointerEvents: 'none',
  },
}));

export interface AppBarProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  isMobile,
  onDrawerToggle,
}) => {
  return (
    <StyledAppBar
      position="fixed"
      sx={{
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        '& .MuiToolbar-root': {
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, md: 3 },
        },
      }}
    >
      <AppBarContent
        isMobile={isMobile}
        onDrawerToggle={onDrawerToggle}
      />
    </StyledAppBar>
  );
};

export default AppBar; 