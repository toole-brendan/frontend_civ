import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  styled,
  useTheme,
} from '@mui/material';
import {
  AccountTree as AccountTreeIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Devices as DevicesIcon,
  Memory as MemoryIcon,
  SettingsInputComponent as SettingsInputComponentIcon,
  Cable as CableIcon,
  Share as ShareIcon,
  BugReport as BugReportIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

// Styled components
const ComponentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MapContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  marginTop: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const Node = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'nodeColor',
})<{ nodeColor: string }>(({ theme, nodeColor }) => ({
  position: 'absolute',
  padding: theme.spacing(1),
  backgroundColor: nodeColor,
  color: theme.palette.getContrastText(nodeColor),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  width: '120px',
  textAlign: 'center',
  zIndex: 2,
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

const Line = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.divider,
  zIndex: 1,
}));

// Interface for correlation type
interface Correlation {
  id: string;
  description: string;
  type: 'component' | 'supplier' | 'quality' | 'logistics';
  severity: 'critical' | 'warning' | 'info';
  relatedComponents: string[];
}

const ComponentAlertCorrelationMap: React.FC = () => {
  const theme = useTheme();

  // Mock correlations data
  const correlations: Correlation[] = [
    {
      id: 'COR-001',
      description: 'Multiple RF component alerts from Korea Chip Manufacturing',
      type: 'component',
      severity: 'critical',
      relatedComponents: ['RF Amplifier ICs', 'RF Mixers', 'Power Amplifiers'],
    },
    {
      id: 'COR-002',
      description: 'Quality issues with recent shipments from Taiwan Semiconductor',
      type: 'quality',
      severity: 'warning',
      relatedComponents: ['MEMS Sensors', 'MCUs'],
    },
    {
      id: 'COR-003',
      description: 'Customs clearance delays affecting multiple Asian suppliers',
      type: 'logistics',
      severity: 'warning',
      relatedComponents: ['Multiple component families'],
    },
  ];

  // Get color by severity
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

  // Get icon by correlation type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'component':
        return <MemoryIcon />;
      case 'supplier':
        return <BuildIcon />;
      case 'quality':
        return <BugReportIcon />;
      case 'logistics':
        return <ShareIcon />;
      default:
        return <SettingsInputComponentIcon />;
    }
  };

  // Node positions for the visualization
  const nodePositions = [
    { top: '30%', left: '5%' },
    { top: '20%', left: '40%' },
    { top: '60%', left: '25%' },
    { top: '70%', left: '60%' },
    { top: '30%', left: '70%' },
  ];

  return (
    <ComponentBox>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Component Alert Correlation</Typography>
        <AccountTreeIcon color="primary" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Visualizing relationships between electronic component alerts
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <MapContainer>
        {/* Center node - main issue */}
        <Node
          nodeColor={theme.palette.error.main}
          sx={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '140px' }}
        >
          RF Amplifier ICs Critical Shortage
        </Node>
        
        {/* Connected nodes */}
        <Node nodeColor={theme.palette.warning.main} sx={{ top: '20%', left: '30%' }}>
          Korea Chip Manufacturing Lead Time
        </Node>
        
        <Node nodeColor={theme.palette.warning.main} sx={{ top: '20%', left: '70%' }}>
          Power Amplifier Low Stock
        </Node>
        
        <Node nodeColor={theme.palette.info.main} sx={{ top: '70%', left: '30%' }}>
          RF Mixers Reorder Point
        </Node>
        
        <Node nodeColor={theme.palette.error.main} sx={{ top: '70%', left: '70%' }}>
          Customs Delay Taiwan Shipment
        </Node>
        
        {/* Connecting lines */}
        <Line sx={{ width: '20%', height: '1px', top: '32%', left: '30%', transform: 'rotate(45deg)' }} />
        <Line sx={{ width: '20%', height: '1px', top: '32%', left: '50%', transform: 'rotate(-45deg)' }} />
        <Line sx={{ width: '20%', height: '1px', top: '58%', left: '30%', transform: 'rotate(-45deg)' }} />
        <Line sx={{ width: '20%', height: '1px', top: '58%', left: '50%', transform: 'rotate(45deg)' }} />
      </MapContainer>
      
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Identified Correlations</Typography>
      
      <List dense>
        {correlations.map((correlation) => (
          <ListItem key={correlation.id} divider>
            <ListItemIcon>
              {getTypeIcon(correlation.type)}
            </ListItemIcon>
            <ListItemText 
              primary={correlation.description}
              secondary={`Related: ${correlation.relatedComponents.join(', ')}`}
            />
            <Chip 
              size="small" 
              label={correlation.severity} 
              sx={{ 
                bgcolor: getSeverityColor(correlation.severity),
                color: '#fff',
                textTransform: 'capitalize' 
              }} 
            />
          </ListItem>
        ))}
      </List>
      
      <Typography variant="body2" color="primary" sx={{ mt: 2, cursor: 'pointer', textAlign: 'center' }}>
        Show Advanced Correlation Analysis
      </Typography>
    </ComponentBox>
  );
};

export default ComponentAlertCorrelationMap; 