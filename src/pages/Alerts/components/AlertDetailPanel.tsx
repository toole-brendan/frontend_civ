import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  styled,
  useTheme,
  Paper,
  Tab,
  Tabs,
  Grid,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  ErrorOutline as ErrorOutlineIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Storage as StorageIcon,
  LocalShipping as LocalShippingIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Factory as FactoryIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  FolderOpen as FolderOpenIcon,
  Message as MessageIcon,
  VerifiedUser as VerifiedUserIcon,
  FindInPage as FindInPageIcon,
  LocationOn as LocationOnIcon,
  AttachFile as AttachFileIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ReportProblem as ReportProblemIcon,
  Lightbulb as LightbulbIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { Alert } from './AlertTable';

interface AlertDetailPanelProps {
  alert: Alert;
  activeTab: number;
}

// Styled components
const DetailSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const DetailItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
  height: '24px',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 100,
    fontWeight: 500,
    fontSize: '0.875rem',
  },
}));

const StyledTimeline = styled(Timeline)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  '& .MuiTimelineItem-root': {
    minHeight: 'auto',
  },
  '& .MuiTimelineContent-root': {
    padding: theme.spacing(1, 2),
  },
  '& .MuiTimelineOppositeContent-root': {
    padding: theme.spacing(1),
    flex: 0.2,
  },
}));

const AlertDetailPanel: React.FC<AlertDetailPanelProps> = ({ alert, activeTab }) => {
  const theme = useTheme();

  // Helper functions for rendering
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ErrorOutlineIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      case 'resolved':
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return <StorageIcon />;
      case 'transfer':
        return <LocalShippingIcon />;
      case 'payment':
        return <AccountBalanceWalletIcon />;
      case 'supplier':
        return <FactoryIcon />;
      case 'system':
        return <SettingsIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'resolved':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return theme.palette.error.main;
      case 'in_progress':
        return theme.palette.warning.main;
      case 'pending':
        return theme.palette.info.main;
      case 'resolved':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now.getTime() - alertTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMins / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  // Tab content rendering
  const renderOverviewTab = () => (
    <Box>
      <DetailSection>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 1.5 }}>
            {getSeverityIcon(alert.severity)}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              {alert.details.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {alert.description}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <StyledChip
            label={alert.severity}
            size="small"
            sx={{
              backgroundColor: `${getSeverityColor(alert.severity)}20`,
              color: getSeverityColor(alert.severity),
              textTransform: 'capitalize',
            }}
          />
          <StyledChip
            label={alert.type}
            size="small"
            icon={getTypeIcon(alert.type)}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.08)',
              textTransform: 'capitalize',
            }}
          />
          <StyledChip
            label={alert.status.replace('_', ' ')}
            size="small"
            sx={{
              backgroundColor: `${getStatusColor(alert.status)}20`,
              color: getStatusColor(alert.status),
              textTransform: 'capitalize',
            }}
          />
          <StyledChip
            label={`Impact: ${alert.impactLevel}`}
            size="small"
            sx={{
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.08)',
              textTransform: 'capitalize',
            }}
          />
        </Box>
      </DetailSection>

      <DetailSection>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Alert Details
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DetailItem>
              <DetailLabel>Created</DetailLabel>
              <DetailValue>
                {formatTime(alert.creationTime)} ({getRelativeTime(alert.creationTime)})
              </DetailValue>
            </DetailItem>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <DetailItem>
              <DetailLabel>Source</DetailLabel>
              <DetailValue>{alert.source}</DetailValue>
            </DetailItem>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <DetailItem>
              <DetailLabel>Assigned To</DetailLabel>
              <DetailValue>
                {alert.owner ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      alt={alert.owner}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {alert.owner}
                  </Box>
                ) : (
                  <StyledChip
                    label="Unassigned"
                    size="small"
                    variant="outlined"
                  />
                )}
              </DetailValue>
            </DetailItem>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <DetailItem>
              <DetailLabel>Location</DetailLabel>
              <DetailValue>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                  {alert.details.location || 'N/A'}
                </Box>
              </DetailValue>
            </DetailItem>
          </Grid>
        </Grid>
      </DetailSection>

      {alert.details.itemCount && (
        <DetailSection>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Inventory Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DetailItem>
                <DetailLabel>Item Count</DetailLabel>
                <DetailValue>{alert.details.itemCount}</DetailValue>
              </DetailItem>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DetailItem>
                <DetailLabel>Threshold</DetailLabel>
                <DetailValue>{alert.details.threshold}</DetailValue>
              </DetailItem>
            </Grid>
            
            {alert.details.impact && (
              <Grid item xs={12}>
                <DetailItem>
                  <DetailLabel>Business Impact</DetailLabel>
                  <DetailValue>{alert.details.impact}</DetailValue>
                </DetailItem>
              </Grid>
            )}
            
            {alert.details.rootCause && (
              <Grid item xs={12}>
                <DetailItem>
                  <DetailLabel>Root Cause</DetailLabel>
                  <DetailValue>{alert.details.rootCause}</DetailValue>
                </DetailItem>
              </Grid>
            )}
          </Grid>
        </DetailSection>
      )}

      <DetailSection>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Recommended Actions
        </Typography>
        
        <List disablePadding>
          {alert.type === 'inventory' && (
            <>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Contact supplier to expedite shipment"
                  secondary="Korea Chip Manufacturing: +82-2-555-1234"
                />
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Notify affected customers of potential delay"
                  secondary="Robotics Solutions: Account Manager - Sarah Johnson"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Check alternative suppliers for emergency stock"
                  secondary="Approved alternatives: Taiwan Semiconductor, Global Electronics"
                />
              </ListItem>
            </>
          )}
          
          {alert.type === 'transfer' && (
            <>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Verify transfer documentation"
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon fontSize="small" color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Contact logistics coordinator"
                />
              </ListItem>
            </>
          )}
        </List>
      </DetailSection>

      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Assign to Me
        </Button>
        <Button 
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Mark as In Progress
        </Button>
      </Box>
    </Box>
  );

  const renderRelatedItemsTab = () => (
    <Box p={2}>
      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        Related Items
      </Typography>
      
      <List>
        {alert.type === 'inventory' && (
          <>
            <ListItem divider>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText 
                primary="RF Amplifier IC - SKU: RF-AMP-2023-X"
                secondary="Current Stock: 112 units | Minimum Threshold: 500 units"
              />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <FactoryIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Korea Chip Manufacturing"
                secondary="Supplier ID: SUP-KCM-001 | Last Order: 14 days ago"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Inbound Shipment #INB-23789"
                secondary="Status: Delayed | ETA: 5 days"
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const renderCommunicationTab = () => (
    <Box p={2}>
      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        Communication History
      </Typography>
      
      <StyledTimeline position="right">
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            2 hours ago
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <EmailIcon fontSize="small" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2" fontWeight="medium">
              Email sent to Korea Chip Manufacturing
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Requesting expedited shipment and updated ETA
            </Typography>
          </TimelineContent>
        </TimelineItem>
        
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            1 day ago
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="warning">
              <NotificationsIcon fontSize="small" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2" fontWeight="medium">
              Alert created
            </Typography>
            <Typography variant="caption" color="text.secondary">
              System detected inventory below threshold
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </StyledTimeline>
      
      <Box mt={2}>
        <Button 
          variant="outlined" 
          startIcon={<EmailIcon />}
          sx={{ textTransform: 'none', mr: 1 }}
        >
          Send Email
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<PhoneIcon />}
          sx={{ textTransform: 'none' }}
        >
          Log Call
        </Button>
      </Box>
    </Box>
  );

  const renderResolutionTab = () => (
    <Box p={2}>
      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        Resolution Plan
      </Typography>
      
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" fontWeight="medium" gutterBottom>
          Current Status
        </Typography>
        <Typography variant="body2" paragraph>
          This alert is currently {alert.status.replace('_', ' ')}. 
          {alert.owner 
            ? ` Assigned to ${alert.owner}.` 
            : ' Not yet assigned to a team member.'}
        </Typography>
        
        <Typography variant="body2" fontWeight="medium" gutterBottom>
          Root Cause
        </Typography>
        <Typography variant="body2" paragraph>
          {alert.details.rootCause || 'Root cause analysis in progress.'}
        </Typography>
        
        <Typography variant="body2" fontWeight="medium" gutterBottom>
          Resolution Steps
        </Typography>
        <List dense disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primary="Contact supplier to expedite shipment" />
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ReportProblemIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText primary="Evaluate alternative suppliers for emergency stock" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <InfoIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText primary="Update inventory thresholds for seasonal demand" />
          </ListItem>
        </List>
      </Paper>
      
      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        Preventive Measures
      </Typography>
      <List>
        <ListItem divider>
          <ListItemIcon>
            <LightbulbIcon color="warning" />
          </ListItemIcon>
          <ListItemText 
            primary="Increase safety stock levels for critical components"
            secondary="Recommended: Increase by 20% for Q4 seasonal demand"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LightbulbIcon color="warning" />
          </ListItemIcon>
          <ListItemText 
            primary="Establish backup supplier relationships"
            secondary="Identify and onboard at least one additional supplier by end of quarter"
          />
        </ListItem>
      </List>
    </Box>
  );

  const renderSimilarAlertsTab = () => (
    <Box p={2}>
      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        Similar Alerts
      </Typography>
      
      <List>
        <ListItem 
          button 
          divider
          sx={{ 
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            pl: 2,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
            }
          }}
        >
          <ListItemText 
            primary="Power Regulator ICs below threshold"
            secondary="Created 3 days ago | Status: In Progress"
          />
        </ListItem>
        <ListItem 
          button 
          divider
          sx={{ 
            borderLeft: `4px solid ${theme.palette.success.main}`,
            pl: 2,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
            }
          }}
        >
          <ListItemText 
            primary="Microcontroller shortage - STM32 Series"
            secondary="Created 2 weeks ago | Status: Resolved"
          />
        </ListItem>
        <ListItem 
          button
          sx={{ 
            borderLeft: `4px solid ${theme.palette.error.main}`,
            pl: 2,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
            }
          }}
        >
          <ListItemText 
            primary="FPGA inventory critical - Xilinx Artix-7"
            secondary="Created today | Status: New"
          />
        </ListItem>
      </List>
      
      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Historical Patterns
        </Typography>
        <Typography variant="body2">
          This component has triggered 3 similar alerts in the past 6 months, 
          suggesting a recurring supply chain issue that may require a long-term solution.
        </Typography>
      </Box>
    </Box>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderOverviewTab();
      case 1:
        return renderRelatedItemsTab();
      case 2:
        return renderCommunicationTab();
      case 3:
        return renderResolutionTab();
      case 4:
        return renderSimilarAlertsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        {renderTabContent()}
      </Box>
    </Paper>
  );
};

export default AlertDetailPanel; 