import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Stack,
  Chip,
  styled,
  useTheme,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Storage as StorageIcon,
  LocalShipping as LocalShippingIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Factory as FactoryIcon,
  Settings as SettingsIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

// Styled components
const TrendBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 180,
  position: 'relative',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const BarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
}));

interface BarProps {
  height: number;
  color: string;
  label: string;
  value: number;
}

const Bar = ({ height, color, label, value }: BarProps) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '7%' }}>
      <Box
        sx={{
          height: `${height}%`,
          width: '100%',
          backgroundColor: color,
          borderRadius: '4px 4px 0 0',
          minHeight: 4,
          transition: 'height 0.3s ease',
        }}
      />
      <Typography variant="caption" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  );
};

const AlertTrendAnalysis: React.FC = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<string>('30');

  // Mock data for alert trends
  const alertTrends = {
    // Last 30 days trend data
    '30': {
      labels: ['1', '5', '10', '15', '20', '25', '30'],
      inventory: [12, 15, 8, 10, 18, 20, 14],
      transfer: [8, 6, 10, 7, 9, 11, 13],
      payment: [5, 8, 6, 4, 7, 5, 8],
      supplier: [3, 5, 7, 6, 4, 8, 6],
      system: [2, 3, 1, 2, 4, 3, 5],
    },
    // Last 60 days trend data
    '60': {
      labels: ['10', '20', '30', '40', '50', '60'],
      inventory: [10, 14, 12, 16, 20, 14],
      transfer: [7, 8, 10, 9, 11, 13],
      payment: [4, 7, 6, 5, 5, 8],
      supplier: [6, 5, 3, 7, 8, 6],
      system: [2, 4, 2, 3, 3, 5],
    },
    // Last 90 days trend data
    '90': {
      labels: ['15', '30', '45', '60', '75', '90'],
      inventory: [8, 10, 15, 12, 20, 14],
      transfer: [6, 7, 10, 8, 11, 13],
      payment: [3, 4, 6, 7, 5, 8],
      supplier: [4, 6, 5, 7, 8, 6],
      system: [1, 2, 3, 4, 3, 5],
    },
  };

  const currentData = alertTrends[timeRange as keyof typeof alertTrends];

  // Mock data for metrics
  const resolutionMetrics = [
    { name: 'Inventory Alerts', avgTime: '4.2 hrs', category: 'inventory', value: 4.2 },
    { name: 'Transfer Alerts', avgTime: '8.5 hrs', category: 'transfer', value: 8.5 },
    { name: 'Payment Alerts', avgTime: '3.1 hrs', category: 'payment', value: 3.1 },
    { name: 'Supplier Alerts', avgTime: '12.4 hrs', category: 'supplier', value: 12.4 },
    { name: 'System Alerts', avgTime: '2.8 hrs', category: 'system', value: 2.8 },
  ];

  // Mock data for most frequent sources
  const frequentSources = [
    { name: 'Inventory System - Stock Thresholds', count: 42, percentage: 28 },
    { name: 'Customs Clearance Status API', count: 36, percentage: 24 },
    { name: 'Blockchain Verification Service', count: 24, percentage: 16 },
    { name: 'Supplier Management System', count: 18, percentage: 12 },
    { name: 'Payment Processing Gateway', count: 15, percentage: 10 },
  ];

  // Get color for alert category
  const getCategoryColor = (category: string, opacity: number = 1) => {
    const alpha = opacity < 1 ? opacity.toString(16).split('.')[1] : '';
    
    switch (category) {
      case 'inventory':
        return `${theme.palette.primary.main}${alpha}`;
      case 'transfer':
        return `${theme.palette.info.main}${alpha}`;
      case 'payment':
        return `${theme.palette.success.main}${alpha}`;
      case 'supplier':
        return `${theme.palette.warning.main}${alpha}`;
      case 'system':
        return `${theme.palette.secondary.main}${alpha}`;
      default:
        return `${theme.palette.grey[500]}${alpha}`;
    }
  };

  // Get icon for alert category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inventory':
        return <StorageIcon color="primary" />;
      case 'transfer':
        return <LocalShippingIcon color="info" />;
      case 'payment':
        return <AccountBalanceWalletIcon color="success" />;
      case 'supplier':
        return <FactoryIcon color="warning" />;
      case 'system':
        return <SettingsIcon color="secondary" />;
      default:
        return null;
    }
  };

  // Handle time range change
  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: string | null,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  // Calculate max value for scaling the chart
  const maxValue = Math.max(
    ...currentData.inventory,
    ...currentData.transfer,
    ...currentData.payment,
    ...currentData.supplier,
    ...currentData.system
  );

  // Calculate stacked values for each time period
  const stackedValues = currentData.labels.map((_, index) => {
    return {
      inventory: currentData.inventory[index],
      transfer: currentData.transfer[index],
      payment: currentData.payment[index],
      supplier: currentData.supplier[index],
      system: currentData.system[index],
      total: currentData.inventory[index] +
             currentData.transfer[index] +
             currentData.payment[index] +
             currentData.supplier[index] +
             currentData.system[index],
    };
  });

  // Find highest total for scaling
  const maxTotal = Math.max(...stackedValues.map(v => v.total));

  return (
    <TrendBox>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Alert Trend Analysis</Typography>
        <TimelineIcon color="primary" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Historical patterns to identify systemic issues
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Time range toggle */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" fontWeight={500}>
          Alert Volume Trends
        </Typography>
        <ToggleButtonGroup
          size="small"
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          aria-label="time range"
        >
          <ToggleButton value="30" aria-label="30 days">
            30d
          </ToggleButton>
          <ToggleButton value="60" aria-label="60 days">
            60d
          </ToggleButton>
          <ToggleButton value="90" aria-label="90 days">
            90d
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Chart */}
      <ChartContainer>
        <BarContainer>
          {stackedValues.map((stack, index) => (
            <Bar 
              key={index}
              height={(stack.total / maxTotal) * 100}
              color={getCategoryColor('inventory')}
              label={currentData.labels[index]}
              value={stack.total}
            />
          ))}
        </BarContainer>
        
        {/* Legend */}
        <Box display="flex" justifyContent="center" mt={1} gap={2} flexWrap="wrap">
          <Box display="flex" alignItems="center">
            <Box width={12} height={12} bgcolor={getCategoryColor('inventory')} borderRadius="50%" mr={0.5} />
            <Typography variant="caption">Inventory</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box width={12} height={12} bgcolor={getCategoryColor('transfer')} borderRadius="50%" mr={0.5} />
            <Typography variant="caption">Transfer</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box width={12} height={12} bgcolor={getCategoryColor('payment')} borderRadius="50%" mr={0.5} />
            <Typography variant="caption">Payment</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box width={12} height={12} bgcolor={getCategoryColor('supplier')} borderRadius="50%" mr={0.5} />
            <Typography variant="caption">Supplier</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box width={12} height={12} bgcolor={getCategoryColor('system')} borderRadius="50%" mr={0.5} />
            <Typography variant="caption">System</Typography>
          </Box>
        </Box>
      </ChartContainer>
      
      {/* Average resolution time */}
      <Typography variant="subtitle2" gutterBottom>
        Average Resolution Time by Alert Type
      </Typography>
      <Box sx={{ mb: 2 }}>
        {resolutionMetrics.map((metric, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Box display="flex" alignItems="center">
                {getCategoryIcon(metric.category)}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {metric.name}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={500}>
                {metric.avgTime}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(metric.value / 14) * 100} // Scale to percentage (14 is assumed max for this example)
              sx={{ 
                height: 6, 
                borderRadius: 3,
                backgroundColor: getCategoryColor(metric.category, 0.2),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getCategoryColor(metric.category),
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        ))}
      </Box>
      
      {/* Most frequent alert sources */}
      <Typography variant="subtitle2" gutterBottom>
        Most Frequent Alert Sources
      </Typography>
      <List dense sx={{ mb: 2 }}>
        {frequentSources.map((source, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Box sx={{ 
                width: 24, 
                height: 24, 
                borderRadius: '50%', 
                bgcolor: index === 0 ? theme.palette.error.light : 
                         index === 1 ? theme.palette.warning.light : 
                         theme.palette.info.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.getContrastText(
                  index === 0 ? theme.palette.error.light : 
                  index === 1 ? theme.palette.warning.light : 
                  theme.palette.info.light
                ),
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {index + 1}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={source.name}
              secondary={`${source.count} alerts (${source.percentage}%)`}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        ))}
      </List>
      
      {/* Industry comparison */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
        <SpeedIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
        <Typography variant="body2">
          Your alert resolution time is <strong>15% faster</strong> than industry average
        </Typography>
      </Box>
    </TrendBox>
  );
};

export default AlertTrendAnalysis; 