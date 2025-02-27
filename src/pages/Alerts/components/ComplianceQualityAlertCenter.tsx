import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Paper,
  styled,
  useTheme,
} from '@mui/material';
import {
  VerifiedUser as VerifiedUserIcon,
  Shield as ShieldIcon,
  CrisisAlert as CrisisAlertIcon,
  GppMaybe as GppMaybeIcon,
  NewReleases as NewReleasesIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  PriorityHigh as PriorityHighIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';

// Styled components
const ComplianceBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const AlertItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'medium',
  fontSize: '0.75rem',
}));

// Compliance Alert Interface
interface ComplianceAlert {
  id: string;
  type: 'quality' | 'compliance' | 'counterfeit' | 'certification' | 'restriction' | 'safety';
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'new' | 'in_progress' | 'resolved';
  timestamp: string;
}

const ComplianceQualityAlertCenter: React.FC = () => {
  const theme = useTheme();

  // Mock compliance alerts data
  const complianceAlerts: ComplianceAlert[] = [
    {
      id: 'COMP-001',
      type: 'quality',
      title: 'Failed Quality Inspection',
      description: 'Batch J7842 of MEMS sensors failed precision test',
      severity: 'critical',
      status: 'new',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'COMP-002',
      type: 'compliance',
      title: 'RoHS Compliance Update',
      description: 'New cadmium limits affecting 3 component families',
      severity: 'warning',
      status: 'in_progress',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'COMP-003',
      type: 'certification',
      title: 'ISO 9001 Certification Expiring',
      description: 'Renewal required in 30 days for Austin facility',
      severity: 'info',
      status: 'in_progress',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'COMP-004',
      type: 'counterfeit',
      title: 'Potential Counterfeit Detection',
      description: 'Suspicious RF Amplifiers from unauthorized distributor',
      severity: 'critical',
      status: 'in_progress',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'COMP-005',
      type: 'restriction',
      title: 'Export Restriction Change',
      description: 'New controls on high-performance ICs to certain regions',
      severity: 'warning',
      status: 'new',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'COMP-006',
      type: 'safety',
      title: 'Manufacturer Safety Notice',
      description: 'Thermal performance advisory on power components',
      severity: 'warning',
      status: 'new',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Get icon by alert type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quality':
        return <CheckCircleIcon color="primary" />;
      case 'compliance':
        return <VerifiedUserIcon color="secondary" />;
      case 'counterfeit':
        return <CrisisAlertIcon color="error" />;
      case 'certification':
        return <VerifiedIcon color="info" />;
      case 'restriction':
        return <ShieldIcon color="warning" />;
      case 'safety':
        return <GppMaybeIcon color="error" />;
      default:
        return <InfoIcon />;
    }
  };

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'error';
      case 'in_progress':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay}d ago`;
    } else if (diffHour > 0) {
      return `${diffHour}h ago`;
    } else if (diffMin > 0) {
      return `${diffMin}m ago`;
    } else {
      return 'Just now';
    }
  };

  // Count alerts by severity
  const criticalCount = complianceAlerts.filter(alert => alert.severity === 'critical').length;
  const warningCount = complianceAlerts.filter(alert => alert.severity === 'warning').length;
  const infoCount = complianceAlerts.filter(alert => alert.severity === 'info').length;

  return (
    <ComplianceBox>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Compliance & Quality</Typography>
        <ShieldIcon color="primary" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Electronics-specific monitoring for regulatory and quality issues
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Summary stats */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <StatusChip 
          icon={<ErrorIcon />} 
          label={`${criticalCount} Critical`} 
          color="error" 
          variant="outlined" 
        />
        <StatusChip 
          icon={<WarningIcon />} 
          label={`${warningCount} Warnings`} 
          color="warning" 
          variant="outlined" 
        />
        <StatusChip 
          icon={<InfoIcon />} 
          label={`${infoCount} Info`} 
          color="info" 
          variant="outlined" 
        />
      </Box>
      
      {/* Alert list */}
      <List sx={{ p: 0, flex: 1, overflow: 'auto' }}>
        {complianceAlerts.map((alert) => (
          <AlertItem key={alert.id} disablePadding>
            <ListItemIcon sx={{ minWidth: 40, ml: 1 }}>
              {getTypeIcon(alert.type)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  {getSeverityIcon(alert.severity)}
                  <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                    {alert.title}
                  </Typography>
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="caption" display="block">
                    {alert.description}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <Chip 
                      size="small" 
                      label={alert.status.replace('_', ' ')} 
                      color={getStatusColor(alert.status as any)} 
                      sx={{ height: 20, fontSize: '0.7rem', mr: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {getRelativeTime(alert.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              }
              sx={{ my: 0.5 }}
            />
          </AlertItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Certification status */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Critical Certification Status
        </Typography>
        <Paper variant="outlined" sx={{ p: 1.5, bgcolor: theme.palette.background.default }}>
          <Box display="flex" alignItems="center" mb={1}>
            <PriorityHighIcon color="warning" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={500}>
              ISO 9001 - Austin Facility
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" color="text.secondary">
              Renewal Required By:
            </Typography>
            <Typography variant="caption" fontWeight={500}>
              April 15, 2023
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Documentation Status:
            </Typography>
            <Chip 
              size="small" 
              label="In Progress" 
              color="warning" 
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          </Box>
        </Paper>
      </Box>
      
      {/* RoHS/REACH status */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Regulatory Compliance Updates
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Recent changes affecting electronics components:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip size="small" label="RoHS 3.0" variant="outlined" color="primary" />
          <Chip size="small" label="REACH 2023" variant="outlined" color="primary" />
          <Chip size="small" label="Conflict Minerals" variant="outlined" color="primary" />
          <Chip size="small" label="Battery Directive" variant="outlined" color="primary" />
        </Box>
      </Box>
      
      <Button 
        fullWidth 
        variant="outlined" 
        color="primary" 
        size="small"
        startIcon={<ShieldIcon />}
      >
        Run Compliance Risk Assessment
      </Button>
    </ComplianceBox>
  );
};

export default ComplianceQualityAlertCenter; 