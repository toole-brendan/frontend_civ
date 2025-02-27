import { Theme } from '@mui/material';

// Centralized color system for status indicators
export const getStatusColors = (theme: Theme) => ({
  // Performance and quality status colors
  performance: {
    excellent: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.success.main, 0.1)
    },
    good: {
      main: theme.palette.success.light,
      light: alpha(theme.palette.success.light, 0.7),
      dark: theme.palette.success.main,
      contrastText: theme.palette.success.dark,
      background: alpha(theme.palette.success.light, 0.2)
    },
    average: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: '#000',
      background: alpha(theme.palette.warning.main, 0.1)
    },
    poor: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.error.main, 0.1)
    }
  },
  
  // Risk level colors
  risk: {
    low: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.success.main, 0.1)
    },
    medium: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: '#000',
      background: alpha(theme.palette.warning.main, 0.1)
    },
    high: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.error.main, 0.1)
    },
    critical: {
      main: theme.palette.error.dark,
      light: theme.palette.error.main,
      dark: '#8B0000',
      contrastText: '#fff',
      background: alpha(theme.palette.error.dark, 0.15)
    }
  },
  
  // Verification status colors
  verification: {
    verified: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.success.main, 0.1),
      icon: 'VerifiedIcon'
    },
    pending: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.info.main, 0.1),
      icon: 'HourglassTopIcon'
    },
    rejected: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.error.main, 0.1),
      icon: 'CancelIcon'
    },
    expired: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: '#000',
      background: alpha(theme.palette.warning.main, 0.1),
      icon: 'WarningIcon'
    }
  },
  
  // Contract status colors
  contract: {
    active: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.success.main, 0.1)
    },
    pending: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.info.main, 0.1)
    },
    expiring: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: '#000',
      background: alpha(theme.palette.warning.main, 0.1)
    },
    expired: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
      contrastText: '#fff',
      background: alpha(theme.palette.error.main, 0.1)
    }
  },
  
  // Trend colors
  trend: {
    improving: {
      main: theme.palette.success.main,
      icon: 'TrendingUpIcon'
    },
    stable: {
      main: theme.palette.info.main,
      icon: 'TrendingFlatIcon'
    },
    worsening: {
      main: theme.palette.error.main,
      icon: 'TrendingDownIcon'
    }
  }
});

// Helper functions to get specific status colors
export const getPerformanceColor = (theme: Theme, score: number) => {
  const colors = getStatusColors(theme);
  if (score >= 90) return colors.performance.excellent;
  if (score >= 80) return colors.performance.good;
  if (score >= 70) return colors.performance.average;
  return colors.performance.poor;
};

export const getRiskColor = (theme: Theme, level: string) => {
  const colors = getStatusColors(theme);
  switch (level.toUpperCase()) {
    case 'LOW':
      return colors.risk.low;
    case 'MEDIUM':
      return colors.risk.medium;
    case 'HIGH':
      return colors.risk.high;
    case 'CRITICAL':
      return colors.risk.critical;
    default:
      return colors.risk.medium;
  }
};

export const getVerificationColor = (theme: Theme, status: string) => {
  const colors = getStatusColors(theme);
  switch (status.toUpperCase()) {
    case 'VERIFIED':
    case 'FULLY_VERIFIED':
      return colors.verification.verified;
    case 'PENDING':
    case 'VERIFICATION_PENDING':
      return colors.verification.pending;
    case 'REJECTED':
      return colors.verification.rejected;
    case 'EXPIRED':
      return colors.verification.expired;
    default:
      return colors.verification.pending;
  }
};

export const getContractColor = (theme: Theme, status: string) => {
  const colors = getStatusColors(theme);
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return colors.contract.active;
    case 'PENDING':
      return colors.contract.pending;
    case 'EXPIRING':
      return colors.contract.expiring;
    case 'EXPIRED':
    case 'INACTIVE':
      return colors.contract.expired;
    default:
      return colors.contract.pending;
  }
};

export const getTrendColor = (theme: Theme, trend: string) => {
  const colors = getStatusColors(theme);
  switch (trend.toUpperCase()) {
    case 'IMPROVING':
    case 'UP':
      return colors.trend.improving;
    case 'STABLE':
    case 'FLAT':
      return colors.trend.stable;
    case 'WORSENING':
    case 'DOWN':
      return colors.trend.worsening;
    default:
      return colors.trend.stable;
  }
};

// Don't forget to import alpha
import { alpha } from '@mui/material/styles';
