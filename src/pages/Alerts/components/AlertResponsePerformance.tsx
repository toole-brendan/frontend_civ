import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Tooltip,
  styled,
  useTheme,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Person as PersonIcon,
  AutoGraph as AutoGraphIcon,
  EventBusy as EventBusyIcon,
  EmojiEvents as EmojiEventsIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';

// Styled components
const PerformanceBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CircularProgressBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  marginRight: theme.spacing(1),
}));

const CircularProgressLabel = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  fontWeight: 'bold',
}));

const MemberAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  fontSize: '0.8rem',
  backgroundColor: theme.palette.primary.main,
}));

// Team member performance interface
interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  resolvedCount: number;
  avgResponseTime: string;
  performance: number;
}

// Unresolved alert interface
interface UnresolvedAlert {
  id: string;
  description: string;
  age: string;
  ageHours: number;
  severity: 'critical' | 'warning' | 'info';
}

const AlertResponsePerformance: React.FC = () => {
  const theme = useTheme();

  // Mock team performance data
  const teamMembers: TeamMember[] = [
    { 
      id: 'TM-001', 
      name: 'Michael Chen', 
      initials: 'MC', 
      role: 'Operations Director',
      resolvedCount: 32,
      avgResponseTime: '2.8 hrs',
      performance: 94,
    },
    { 
      id: 'TM-002', 
      name: 'Sarah Johnson', 
      initials: 'SJ', 
      role: 'Logistics Manager',
      resolvedCount: 28,
      avgResponseTime: '3.2 hrs',
      performance: 91,
    },
    { 
      id: 'TM-003', 
      name: 'David Lee', 
      initials: 'DL', 
      role: 'Procurement Specialist',
      resolvedCount: 24,
      avgResponseTime: '4.1 hrs',
      performance: 86,
    },
    { 
      id: 'TM-004', 
      name: 'Jennifer Wong', 
      initials: 'JW', 
      role: 'Quality Control',
      resolvedCount: 18,
      avgResponseTime: '3.8 hrs',
      performance: 88,
    },
  ];

  // Unresolved alert aging data
  const unresolvedAlerts: UnresolvedAlert[] = [
    { 
      id: 'UA-001', 
      description: 'Taiwan Semiconductor shipment delayed in customs',
      age: '2d 4h',
      ageHours: 52,
      severity: 'critical',
    },
    { 
      id: 'UA-002', 
      description: 'Korea Chip Manufacturing lead times increased',
      age: '3d 2h',
      ageHours: 74,
      severity: 'warning',
    },
    { 
      id: 'UA-003', 
      description: 'Blockchain verification required for Austin inventory',
      age: '12h',
      ageHours: 12,
      severity: 'warning',
    },
    { 
      id: 'UA-004', 
      description: 'Quality check pending for Tokyo Components',
      age: '5h',
      ageHours: 5,
      severity: 'info',
    },
  ];

  // Performance metrics data
  const performanceMetrics = [
    { name: 'Avg. Response Time', value: '3.2 hrs', trend: 'down', change: '-15%' },
    { name: 'Resolution Rate', value: '87%', trend: 'up', change: '+4%' },
    { name: 'Escalation Rate', value: '12%', trend: 'down', change: '-3%' },
    { name: 'Automation Rate', value: '42%', trend: 'up', change: '+8%' },
  ];

  // Get color for severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Get icon for severity
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
        return <AccessTimeIcon color="info" />;
      default:
        return <AccessTimeIcon />;
    }
  };

  // Get color based on age hours
  const getAgeColor = (hours: number) => {
    if (hours >= 48) return theme.palette.error.main;
    if (hours >= 24) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  // Get background color based on performance
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return theme.palette.success.main;
    if (performance >= 75) return theme.palette.info.main;
    return theme.palette.warning.main;
  };

  // Get icon for trend
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpwardIcon fontSize="small" color="success" />;
      case 'down':
        return <ArrowDownwardIcon fontSize="small" color="error" />;
      default:
        return null;
    }
  };

  return (
    <PerformanceBox>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Alert Response Performance</Typography>
        <SpeedIcon color="primary" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Team and system performance metrics
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Performance metrics grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {performanceMetrics.map((metric, index) => (
          <Grid item xs={6} key={index}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {metric.name}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" fontWeight="medium">
                  {metric.value}
                </Typography>
                <Box display="flex" alignItems="center" ml={1}>
                  {getTrendIcon(metric.trend)}
                  <Typography variant="caption" sx={{ ml: 0.5 }} color={metric.trend === 'up' ? 'success.main' : 'error.main'}>
                    {metric.change}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      {/* Team performance */}
      <Typography variant="subtitle2" gutterBottom>
        Team Performance
      </Typography>
      <List dense sx={{ mb: 3 }}>
        {teamMembers.map((member) => (
          <ListItem key={member.id} sx={{ px: 0 }}>
            <ListItemAvatar>
              <Tooltip title={member.role}>
                <MemberAvatar>{member.initials}</MemberAvatar>
              </Tooltip>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2">{member.name}</Typography>
                  <CircularProgressBox>
                    <CircularProgress
                      variant="determinate"
                      value={member.performance}
                      size={32}
                      thickness={4}
                      sx={{ color: getPerformanceColor(member.performance) }}
                    />
                    <CircularProgressLabel>
                      {member.performance}%
                    </CircularProgressLabel>
                  </CircularProgressBox>
                </Box>
              }
              secondary={
                <Box display="flex" justifyContent="space-between" mt={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Resolved: {member.resolvedCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg: {member.avgResponseTime}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      
      {/* Unresolved alert aging */}
      <Typography variant="subtitle2" gutterBottom>
        Unresolved Alert Aging
      </Typography>
      <List dense sx={{ mb: 3 }}>
        {unresolvedAlerts.map((alert) => (
          <ListItem key={alert.id} sx={{ px: 0 }}>
            <Box sx={{ minWidth: 24, mr: 1 }}>
              {getSeverityIcon(alert.severity)}
            </Box>
            <ListItemText
              primary={
                <Typography variant="body2" noWrap sx={{ maxWidth: 240 }}>
                  {alert.description}
                </Typography>
              }
              secondary={
                <Box display="flex" alignItems="center" mt={0.5}>
                  <Chip
                    label={alert.age}
                    size="small"
                    sx={{ 
                      height: 20, 
                      fontSize: '0.7rem',
                      backgroundColor: getAgeColor(alert.ageHours),
                      color: theme.palette.getContrastText(getAgeColor(alert.ageHours))
                    }}
                  />
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      
      {/* Additional metrics */}
      <Box sx={{ bgcolor: theme.palette.background.paper, p: 1.5, borderRadius: 1, mb: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <AutoGraphIcon fontSize="small" sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Automation Effectiveness
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  92% Success Rate
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <EventBusyIcon fontSize="small" sx={{ color: theme.palette.error.main, mr: 1 }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  SLA Breaches
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  3 in Last 30 Days
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      {/* Performance overview */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          icon={<EmojiEventsIcon />}
          label="A- Performance Rating"
          color="success"
          variant="outlined"
        />
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          See Full Report
        </Typography>
      </Box>
    </PerformanceBox>
  );
};

export default AlertResponsePerformance; 