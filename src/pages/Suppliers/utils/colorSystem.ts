import { Theme } from '@mui/material';

// Status colors
export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'success';
    case 'pending':
    case 'in progress':
      return 'warning';
    case 'inactive':
    case 'disabled':
      return 'default';
    case 'problem':
    case 'error':
    case 'failed':
      return 'error';
    default:
      return 'default';
  }
};

// Performance colors
export const getPerformanceColor = (score: number) => {
  if (score >= 90) return 'success';
  if (score >= 70) return 'info';
  if (score >= 50) return 'warning';
  return 'error';
};

// Risk level colors
export const getRiskColor = (level: string | number) => {
  if (typeof level === 'string') {
    switch (level.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  } else {
    // Numeric risk score
    if (level <= 25) return 'success';
    if (level <= 50) return 'info';
    if (level <= 75) return 'warning';
    return 'error';
  }
};

// Get color with opacity
export const getColorWithAlpha = (theme: Theme, color: string, alpha: number) => {
  const colorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    default: theme.palette.grey[500],
  };
  
  const selectedColor = colorMap[color] || color;
  
  // Convert hex to rgba
  if (selectedColor.startsWith('#')) {
    const r = parseInt(selectedColor.slice(1, 3), 16);
    const g = parseInt(selectedColor.slice(3, 5), 16);
    const b = parseInt(selectedColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  return selectedColor;
}; 