import React from 'react';
import { Tooltip, Box, Typography, useTheme } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface VerificationBadgeProps {
  status: 'verified' | 'pending' | 'unverified';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'medium',
  showLabel = false,
}) => {
  const theme = useTheme();
  
  const getIcon = () => {
    switch (status) {
      case 'verified':
        return <VerifiedIcon fontSize={size} color="success" />;
      case 'pending':
        return <HourglassEmptyIcon fontSize={size} color="warning" />;
      case 'unverified':
        return <ErrorOutlineIcon fontSize={size} color="error" />;
    }
  };
  
  const getLabel = () => {
    switch (status) {
      case 'verified':
        return 'Blockchain Verified';
      case 'pending':
        return 'Verification Pending';
      case 'unverified':
        return 'Not Verified';
    }
  };
  
  const getTooltip = () => {
    switch (status) {
      case 'verified':
        return 'This supplier is verified on the blockchain';
      case 'pending':
        return 'Blockchain verification in progress';
      case 'unverified':
        return 'This supplier is not verified on the blockchain';
    }
  };

  return (
    <Tooltip title={getTooltip()}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {getIcon()}
        {showLabel && (
          <Typography 
            variant="body2" 
            color={
              status === 'verified' ? 'success.main' : 
              status === 'pending' ? 'warning.main' : 
              'error.main'
            }
            fontSize={size === 'small' ? 12 : size === 'medium' ? 14 : 16}
          >
            {getLabel()}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export default VerificationBadge; 