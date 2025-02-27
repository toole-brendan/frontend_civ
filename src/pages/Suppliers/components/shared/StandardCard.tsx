import React, { ReactNode } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface StandardCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  tooltip?: string;
  actions?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
  minHeight?: number | string;
  headerDivider?: boolean;
}

const StandardCard: React.FC<StandardCardProps> = ({
  title,
  subtitle,
  icon,
  tooltip,
  actions,
  children,
  noPadding = false,
  minHeight,
  headerDivider = true
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease-in-out',
        overflow: 'hidden',
        minHeight,
        '&:hover': {
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(2),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon && (
            <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
              {icon}
            </Box>
          )}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="medium" color="text.primary">
                {title}
              </Typography>
              {tooltip && (
                <Tooltip title={tooltip}>
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        {actions && (
          <Box>
            {actions}
          </Box>
        )}
      </Box>
      
      {headerDivider && <Divider />}
      
      <Box 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: noPadding ? 0 : theme.spacing(2),
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default StandardCard; 