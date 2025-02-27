import React from 'react';
import { Box, Tooltip, Typography, LinearProgress, useTheme } from '@mui/material';
import { getPerformanceColor } from '../../utils/colorSystem';

interface PerformanceBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
}

const PerformanceBadge: React.FC<PerformanceBadgeProps> = ({
  score,
  showLabel = true,
  size = 'medium',
  showProgress = true,
}) => {
  const theme = useTheme();
  const color = getPerformanceColor(score);
  
  const getScoreLabel = () => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Average';
    return 'Poor';
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small': return '0.75rem';
      case 'large': return '1rem';
      default: return '0.875rem';
    }
  };
  
  const getProgressHeight = () => {
    switch (size) {
      case 'small': return 4;
      case 'large': return 8;
      default: return 6;
    }
  };

  return (
    <Tooltip title={`Performance Score: ${score}%`}>
      <Box sx={{ width: '100%' }}>
        {showLabel && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography 
              variant="body2" 
              fontSize={getFontSize()}
              fontWeight={500}
              color={`${color}.main`}
            >
              {getScoreLabel()}
            </Typography>
            <Typography 
              variant="body2" 
              fontSize={getFontSize()}
              fontWeight={600}
            >
              {score}%
            </Typography>
          </Box>
        )}
        {showProgress && (
          <LinearProgress
            variant="determinate"
            value={score}
            color={color as any}
            sx={{ 
              height: getProgressHeight(),
              borderRadius: theme.shape.borderRadius,
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
};

export default PerformanceBadge; 