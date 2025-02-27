import React from 'react';
import { Chip, ChipProps, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';
import { getStatusColor } from '../../utils/colorSystem';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: string;
  showIcon?: boolean;
}

const StatusChip: React.FC<StatusChipProps> = ({ 
  status, 
  showIcon = true, 
  ...props 
}) => {
  const theme = useTheme();
  const color = getStatusColor(status) as ChipProps['color'];
  
  const getStatusIcon = () => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon fontSize="small" />;
      case 'pending':
      case 'in progress':
        return <HourglassEmptyIcon fontSize="small" />;
      case 'inactive':
      case 'disabled':
        return <BlockIcon fontSize="small" />;
      case 'problem':
      case 'error':
      case 'failed':
        return <ErrorIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Chip
      label={status}
      color={color}
      size="small"
      icon={showIcon ? getStatusIcon() : undefined}
      {...props}
    />
  );
};

export default StatusChip; 