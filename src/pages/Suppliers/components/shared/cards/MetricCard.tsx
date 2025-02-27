import React from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Chip, 
  styled, 
  CardProps,
  useTheme
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
}));

interface MetricCardProps extends CardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  trend,
  color = 'primary',
  onClick,
  ...props
}) => {
  const theme = useTheme();
  
  const getColorShade = (color: string) => {
    switch (color) {
      case 'primary': return theme.palette.primary.light;
      case 'success': return theme.palette.success.light;
      case 'warning': return theme.palette.warning.light;
      case 'error': return theme.palette.error.light;
      case 'info': return theme.palette.info.light;
      default: return theme.palette.primary.light;
    }
  };
  
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <ArrowUpwardIcon fontSize="small" />;
      case 'down': return <ArrowDownwardIcon fontSize="small" />;
      default: return undefined;
    }
  };
  
  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'success';
      case 'down': return 'error';
      default: return 'default';
    }
  };

  return (
    <StyledCard onClick={onClick} {...props}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              mr: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: getColorShade(color),
            }}
          >
            {React.cloneElement(icon as React.ReactElement, { color })}
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" fontWeight="bold">{value}</Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {trend && (
            <Chip 
              size="small" 
              icon={getTrendIcon(trend.direction)}
              label={trend.label} 
              color={getTrendColor(trend.direction) as any}
            />
          )}
          <ArrowForwardIcon fontSize="small" color="action" />
        </Box>
      </Box>
    </StyledCard>
  );
};

export default MetricCard; 