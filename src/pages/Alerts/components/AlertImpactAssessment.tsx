import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
  useTheme,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  Timer as TimerIcon,
  VerifiedUser as VerifiedUserIcon,
  Speed as SpeedIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

// Styled components
const ImpactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  lineHeight: 1.2,
  marginBottom: theme.spacing(0.5),
}));

const MetricTrend = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(0.5),
  fontSize: '0.75rem',
}));

const ProgressLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(0.5),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  marginBottom: theme.spacing(2),
  position: 'relative',
  paddingBottom: theme.spacing(1),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
  height: '24px',
}));

// Assessment Item Interface
interface AssessmentItem {
  id: string;
  name: string;
  value: string;
  percentage: number;
  trend: 'up' | 'down' | 'neutral';
  change: string;
}

const AlertImpactAssessment: React.FC = () => {
  const theme = useTheme();

  // Mock impact assessment data
  const impactMetrics = [
    {
      id: 'revenue',
      label: 'Revenue at Risk',
      value: '$145,000',
      icon: <AttachMoneyIcon color="error" />,
      description: 'Potential revenue impact from current alerts',
      trend: 'up',
      change: '+12% from last week',
    },
    {
      id: 'orders',
      label: 'Customer Orders Affected',
      value: '12',
      icon: <ShoppingCartIcon color="warning" />,
      description: 'Orders that may face delays or issues',
      trend: 'up',
      change: '+3 since yesterday',
    },
    {
      id: 'production',
      label: 'Production Impact',
      value: '3 Days',
      icon: <TimerIcon color="warning" />,
      description: 'Potential delay to key assembly schedules',
      trend: 'neutral',
      change: 'Unchanged',
    },
    {
      id: 'compliance',
      label: 'Compliance Risk',
      value: 'Low',
      icon: <VerifiedUserIcon color="success" />,
      description: 'Current regulatory compliance status',
      trend: 'down',
      change: 'Improved from Medium',
    },
  ];

  const assessmentItems: AssessmentItem[] = [
    {
      id: 'item-1',
      name: 'RF Amplifier IC Shortage',
      value: '$42,000',
      percentage: 75,
      trend: 'up',
      change: '+15%',
    },
    {
      id: 'item-2',
      name: 'Delayed Shipment from Korea',
      value: '$38,500',
      percentage: 65,
      trend: 'up',
      change: '+8%',
    },
    {
      id: 'item-3',
      name: 'Quality Issues - Power Regulators',
      value: '$27,000',
      percentage: 45,
      trend: 'down',
      change: '-12%',
    },
    {
      id: 'item-4',
      name: 'Customs Clearance Delay',
      value: '$18,500',
      percentage: 30,
      trend: 'neutral',
      change: '0%',
    },
    {
      id: 'item-5',
      name: 'Supplier Payment Issue',
      value: '$12,000',
      percentage: 20,
      trend: 'down',
      change: '-5%',
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return theme.palette.error.main;
      case 'down':
        return theme.palette.success.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon fontSize="small" sx={{ color: getTrendColor(trend) }} />;
      case 'down':
        return <TrendingDownIcon fontSize="small" sx={{ color: getTrendColor(trend) }} />;
      default:
        return <TrendingUpIcon fontSize="small" sx={{ color: getTrendColor(trend), opacity: 0.5 }} />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) {
      return theme.palette.error.main;
    } else if (percentage >= 40) {
      return theme.palette.warning.main;
    } else {
      return theme.palette.success.main;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Alert Impact Assessment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comprehensive analysis of business impact from current alerts
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {impactMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <ImpactCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: '8px', 
                    mr: 1.5,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.05)',
                  }}>
                    {metric.icon}
                  </Box>
                  <Box>
                    <MetricLabel>{metric.label}</MetricLabel>
                    <MetricValue>{metric.value}</MetricValue>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  {metric.description}
                </Typography>
                <MetricTrend>
                  {getTrendIcon(metric.trend)}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      ml: 0.5, 
                      color: getTrendColor(metric.trend),
                      fontWeight: 500,
                    }}
                  >
                    {metric.change}
                  </Typography>
                </MetricTrend>
              </CardContent>
            </ImpactCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 3 }}>
        <SectionTitle>
          Business Impact Breakdown
        </SectionTitle>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <List disablePadding>
          {assessmentItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem 
                sx={{ 
                  py: 1.5,
                  px: 0,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {index === 0 && <InventoryIcon color="error" />}
                  {index === 1 && <LocalShippingIcon color="warning" />}
                  {index === 2 && <WarningIcon color="warning" />}
                  {index === 3 && <BusinessIcon color="info" />}
                  {index === 4 && <AttachMoneyIcon color="info" />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {item.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
                          {item.value}
                        </Typography>
                        <StyledChip
                          size="small"
                          label={item.change}
                          sx={{
                            backgroundColor: `${getTrendColor(item.trend)}20`,
                            color: getTrendColor(item.trend),
                          }}
                          icon={getTrendIcon(item.trend)}
                        />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <ProgressLabel>
                        <Typography variant="caption" color="text.secondary">
                          Impact Level
                        </Typography>
                        <Typography variant="caption" fontWeight="medium">
                          {item.percentage}%
                        </Typography>
                      </ProgressLabel>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.05)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundColor: getProgressColor(item.percentage),
                          },
                        }}
                      />
                    </Box>
                  }
                />
              </ListItem>
              {index < assessmentItems.length - 1 && (
                <Divider component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <SectionTitle>
          Mitigation Recommendations
        </SectionTitle>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Short-Term Actions
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <SpeedIcon fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Expedite shipments from alternative suppliers"
                  secondary="Estimated cost: $8,500 | Time savings: 5 days"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <SpeedIcon fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Prioritize production for high-value orders"
                  secondary="Protects $85,000 in revenue | Affects 3 lower-priority orders"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <SpeedIcon fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Implement temporary quality inspection process"
                  secondary="Reduces defect rate by 35% | Additional labor cost: $3,200"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Long-Term Strategies
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssessmentIcon fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Diversify supplier base for critical components"
                  secondary="Implementation time: 3 months | Risk reduction: 65%"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssessmentIcon fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Increase safety stock levels for high-risk items"
                  secondary="Additional inventory cost: $125,000 | ROI: 3.2x annually"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AssessmentIcon fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Implement advanced predictive analytics for demand forecasting"
                  secondary="Forecast accuracy improvement: 22% | Implementation cost: $65,000"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlertImpactAssessment; 