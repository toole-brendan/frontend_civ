import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Typography,
  Box,
  styled,
  Theme,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeContext';

const DRAWER_WIDTH = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: DRAWER_WIDTH,
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#F5F5F5',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: '800px',
  transition: theme.transitions.create(
    ['border-color', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.24)' : 'rgba(0, 0, 0, 0.24)',
  },
  '&:focus-within': {
    borderColor: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    '& .SearchIconWrapper': {
      color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    },
  },
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    minWidth: '500px',
  },
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    left: 'auto',
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    letterSpacing: '0.02em',
    fontSize: '0.9375rem',
    fontWeight: 400,
    '&::placeholder': {
      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      opacity: 1,
      letterSpacing: '0.02em',
      fontWeight: 300,
    },
    '&:focus': {
      '&::placeholder': {
        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 2),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
}));

const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.7)' 
    : 'rgba(0, 0, 0, 0.7)'}`,
  padding: theme.spacing(0.75, 2),
  marginRight: theme.spacing(2),
  '& h1': {
    fontSize: '1.125rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    margin: 0,
    fontFamily: 'Georgia, serif',
    textTransform: 'none',
  },
}));

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF3B3B',
    color: '#FFFFFF',
    boxShadow: '0 0 0 2px #000000',
  },
}));

// Mock data for user
const mockUser = {
  name: 'Michael Chen',
  role: 'Operations Director',
  company: 'TechComponents International',
  avatar: '',
};

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.03)' 
    : 'rgba(0, 0, 0, 0.03)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'}`,
  transition: theme.transitions.create(
    ['background-color', 'transform', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-1px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 2px 4px rgba(0, 0, 0, 0.5)'
      : '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
}));

interface AppBarContentProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
}

export const AppBarContent: React.FC<AppBarContentProps> = ({
  isMobile,
  onDrawerToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogoClick = () => {
    navigate('/defense/dashboard');
  };

  return (
    <Toolbar sx={{ position: 'relative' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{
            marginRight: 2,
            color: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.7)' 
              : 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              color: mode === 'dark' ? '#FFFFFF' : '#000000',
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <LogoContainer onClick={handleLogoClick}>
        <LogoBox>
          <h1>HandReceipt</h1>
        </LogoBox>
      </LogoContainer>

      <Search>
        <SearchIconWrapper className="SearchIconWrapper">
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <StyledInputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </form>
      </Search>

      <Box sx={{ flexGrow: 1 }} />

      {/* Theme Toggle Button */}
      <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            mr: 1,
            color: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.9)' 
              : 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>

      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          mr: 1,
        }}
      >
        <StyledBadge badgeContent={3} color="error">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>

      <UserInfo>
        <Avatar
          src={mockUser.avatar}
          alt={mockUser.name}
          sx={{
            width: 32,
            height: 32,
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
          }}
        >
          {mockUser.name.charAt(0)}
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: mode === 'dark' ? '#FFFFFF' : '#000000',
            }}
          >
            {mockUser.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              letterSpacing: '0.02em',
              fontSize: '0.7rem',
              color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            }}
          >
            {mockUser.role} • {mockUser.company}
          </Typography>
        </Box>
      </UserInfo>
    </Toolbar>
  );
};

export default AppBarContent; 