import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  IconButton,
  Tab,
  Tabs,
  styled,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  InputAdornment,
  Tooltip,
  ButtonGroup,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import PageTitle from '../../components/common/PageTitle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FactoryIcon from '@mui/icons-material/Factory';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GetAppIcon from '@mui/icons-material/GetApp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';
import AlertTable, { Alert } from './components/AlertTable';
import AlertDetailPanel from './components/AlertDetailPanel';
import AlertActionCenter from './components/AlertActionCenter';
import AlertTrendAnalysis from './components/AlertTrendAnalysis';
import AlertResponsePerformance from './components/AlertResponsePerformance';
import ComponentAlertCorrelationMap from './components/ComponentAlertCorrelationMap';
import AlertImpactAssessment from './components/AlertImpactAssessment';
import ComplianceQualityAlertCenter from './components/ComplianceQualityAlertCenter';
import { useTitle } from '../../hooks/useTitle';

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
}));

const MetricCard = styled(DashboardCard)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.2)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
}));

const ViewToggleButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(0.5, 1.5),
  minWidth: 'auto',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const AlertIndicator = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4px',
  position: 'absolute',
  top: 0,
  left: 0,
}));

const SummaryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  fontWeight: 'bold',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 100,
    fontWeight: 500,
    fontSize: '0.875rem',
  },
}));

// Mock data for the alerts page
const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    type: 'inventory',
    description: 'RF Amplifier ICs below critical threshold',
    creationTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    impactLevel: 'high',
    source: 'Inventory Management System',
    owner: null,
    details: {
      title: 'RF Amplifier ICs Critically Low',
      itemCount: 112,
      threshold: '22% of minimum threshold',
      impact: '3 customer orders at risk - Robotics Solutions ($42K value)',
      location: 'San Jose Warehouse',
      rootCause: 'Delayed shipment from Korea Chip Manufacturing',
      suggestedActions: ['Transfer 200 units from Austin', 'Expedite PO-4855'],
      affectedBusinessAreas: ['fulfillment', 'revenue']
    }
  },
  {
    id: 'alert-002',
    severity: 'critical',
    type: 'transfer',
    description: 'Taiwan Semiconductor shipment delayed in customs',
    creationTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    impactLevel: 'high',
    source: 'Logistics System',
    owner: 'Sarah Johnson',
    details: {
      title: 'Customs Delay: Taiwan Semiconductor Shipment',
      shipmentId: 'TECI-9542',
      delayDuration: '3 days (exceeds normal timeframe)',
      impact: 'Contains critical components for MediTech order due March 15',
      status: 'Missing documentation - Commercial Invoice discrepancy',
      suggestedAction: 'Contact customs broker with corrected documentation',
      affectedBusinessAreas: ['fulfillment', 'customer_satisfaction']
    }
  },
  {
    id: 'alert-003',
    severity: 'critical',
    type: 'payment',
    description: 'Invoice #TCB-2842 payment due tomorrow',
    creationTime: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    impactLevel: 'high',
    source: 'Finance System',
    owner: null,
    details: {
      title: 'Critical Payment Due Tomorrow',
      invoiceNumber: 'TCB-2842',
      amount: 78500,
      supplier: 'Shenzhen Electronics Ltd',
      impact: 'Future shipments contingent on payment receipt',
      opportunity: 'Save $2,355 using Shell token payment',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      affectedBusinessAreas: ['supplier_relations', 'inventory']
    }
  },
  {
    id: 'alert-004',
    severity: 'warning',
    type: 'inventory',
    description: 'Schottky Diodes approaching minimum threshold',
    creationTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    impactLevel: 'medium',
    source: 'Inventory Management System',
    owner: null,
    details: {
      title: 'Schottky Diodes Approaching Minimum Threshold',
      itemCount: 520,
      threshold: '15% above minimum threshold',
      impact: 'May affect production schedule in 2 weeks',
      location: 'Austin Warehouse',
      suggestedAction: 'Initiate purchase order',
      affectedBusinessAreas: ['production', 'inventory']
    }
  },
  {
    id: 'alert-005',
    severity: 'warning',
    type: 'supplier',
    description: 'Korea Chip Manufacturing lead times increased by 10 days',
    creationTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    impactLevel: 'medium',
    source: 'Supplier Management System',
    owner: 'David Lee',
    details: {
      title: 'Increased Lead Times from Korea Chip Manufacturing',
      supplier: 'Korea Chip Manufacturing',
      previousLeadTime: '15 days',
      newLeadTime: '25 days',
      impact: 'May affect production schedule for Q2 orders',
      affectedComponents: ['RF Amplifier ICs', 'Power Management ICs'],
      suggestedAction: 'Adjust procurement schedule and evaluate alternative suppliers',
      affectedBusinessAreas: ['procurement', 'production']
    }
  },
  {
    id: 'alert-006',
    severity: 'warning',
    type: 'system',
    description: 'Blockchain verification required for Austin inventory adjustment',
    creationTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    impactLevel: 'medium',
    source: 'HandReceipt Blockchain System',
    owner: null,
    details: {
      title: 'Blockchain Verification Required',
      location: 'Austin Warehouse',
      adjustment: 'Inventory reconciliation +45 units of MEMS Sensors',
      status: 'Pending verification signature',
      impact: 'Inventory records not finalized, may affect reporting accuracy',
      suggestedAction: 'Authorized manager verification needed',
      affectedBusinessAreas: ['compliance', 'reporting']
    }
  },
  {
    id: 'alert-007',
    severity: 'info',
    type: 'transfer',
    description: 'Quality check pending for Tokyo Components shipment',
    creationTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    impactLevel: 'low',
    source: 'Quality Management System',
    owner: null,
    details: {
      title: 'Quality Check Required',
      shipmentId: 'TOKI-5678',
      components: 'Precision resistors and capacitors',
      location: 'San Jose Receiving Bay 3',
      impact: 'Regular quality procedure, no expected issues',
      suggestedAction: 'Schedule quality engineer inspection',
      affectedBusinessAreas: ['quality']
    }
  }
];

// Summary calculations
const criticalCount = mockAlerts.filter(alert => alert.severity === 'critical').length;
const warningCount = mockAlerts.filter(alert => alert.severity === 'warning').length;
const infoCount = mockAlerts.filter(alert => alert.severity === 'info').length;

// Types for the filter state
type SeverityFilter = 'all' | 'critical' | 'warning' | 'info';
type StatusFilter = 'all' | 'new' | 'in_progress' | 'pending' | 'resolved';
type AssignmentFilter = 'all' | 'assigned' | 'unassigned' | 'me';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`alert-tabpanel-${index}`}
      aria-labelledby={`alert-tab-${index}`}
      {...other}
      style={{ paddingTop: '16px' }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `alert-tab-${index}`,
    'aria-controls': `alert-tabpanel-${index}`,
  };
}

const AlertsPage: React.FC = () => {
  useTitle('Alerts');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [assignmentFilter, setAssignmentFilter] = useState<AssignmentFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'analytics' | 'trends' | 'performance'>('table');
  const [viewMenuAnchorEl, setViewMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Mock summary stats
  const summaryStats = [
    { title: 'Active Alerts', value: '24', change: '+4', status: 'warning' },
    { title: 'Critical Issues', value: '7', change: '+2', status: 'error' },
    { title: 'Escalations', value: '3', change: '0', status: 'info' },
    { title: 'Compliance', value: '92%', change: '-3%', status: 'success' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAlertSelect = (alertId: string) => {
    setSelectedAlert(alertId);
  };

  // Filter handlers
  const handleSeverityFilter = (filter: SeverityFilter) => {
    setSeverityFilter(filter);
  };

  const handleStatusFilter = (filter: StatusFilter) => {
    setStatusFilter(filter);
  };

  const handleAssignmentFilter = (filter: AssignmentFilter) => {
    setAssignmentFilter(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleViewMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setViewMenuAnchorEl(event.currentTarget);
  };

  const handleViewMenuClose = () => {
    setViewMenuAnchorEl(null);
  };

  const handleViewModeChange = (mode: 'table' | 'analytics' | 'trends' | 'performance') => {
    setViewMode(mode);
    handleViewMenuClose();
  };

  // Action handlers
  const handleCreateAlert = () => console.log('Create alert');
  const handleExportData = () => console.log('Export data');
  const handleGenerateReport = () => console.log('Generate report');
  const handleBulkResolve = () => console.log('Bulk resolve');

  // Get the selected alert details
  const selectedAlertData = selectedAlert ? mockAlerts.find(alert => alert.id === selectedAlert) : null;

  // For triage cards, get the critical alerts
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'critical');

  // Helper function to get icon by alert type
  const getAlertTypeIcon = (type: string) => {
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

  // Helper function to get color by severity
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

  // Alert Header Component
  const AlertHeader = () => (
    <Box 
      sx={{ 
        mb: 3, 
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Title and Stats Row */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Alert Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            {criticalCount} Critical | {warningCount} Warning | {infoCount} Info
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <TuneIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Box>

      {/* Actions Row */}
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateAlert}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Create Alert
          </Button>
          <Button 
            variant="outlined"
            startIcon={<DoneAllIcon />}
            onClick={handleBulkResolve}
          >
            Bulk Resolve
          </Button>
          <Button 
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
          <Button 
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </Stack>
        <Box>
          <ButtonGroup variant="outlined" aria-label="view mode">
            <Tooltip title="Table View">
              <Button 
                onClick={() => handleViewModeChange('table')}
                variant={viewMode === 'table' ? 'contained' : 'outlined'}
              >
                <TableChartIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Analytics View">
              <Button 
                onClick={() => handleViewModeChange('analytics')}
                variant={viewMode === 'analytics' ? 'contained' : 'outlined'}
              >
                <BarChartIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Trends View">
              <Button 
                onClick={() => handleViewModeChange('trends')}
                variant={viewMode === 'trends' ? 'contained' : 'outlined'}
              >
                <TimelineIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Performance View">
              <Button 
                onClick={() => handleViewModeChange('performance')}
                variant={viewMode === 'performance' ? 'contained' : 'outlined'}
              >
                <SpeedIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Stack>
    </Box>
  );

  // Render different views based on viewMode
  const renderContent = () => {
    switch (viewMode) {
      case 'table':
        return (
          <Grid container spacing={3}>
            {/* Alert Table and Detail Panel */}
            <Grid item xs={12} lg={8}>
              <DashboardCard sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
                <AlertTable 
                  alerts={mockAlerts}
                  onSelectAlert={handleAlertSelect}
                  severityFilter={severityFilter}
                  statusFilter={statusFilter}
                  assignmentFilter={assignmentFilter}
                />
              </DashboardCard>
            </Grid>
            
            {/* Alert Detail and Action Center */}
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <DashboardCard sx={{ height: '100%' }}>
                    {selectedAlert ? (
                      <AlertDetailPanel alertId={selectedAlert} />
                    ) : (
                      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                        <InfoIcon sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
                        <Typography variant="h6">No Alert Selected</Typography>
                        <Typography variant="body2">
                          Select an alert from the table to view details
                        </Typography>
                      </Box>
                    )}
                  </DashboardCard>
                </Grid>
                <Grid item xs={12}>
                  <DashboardCard sx={{ height: '100%' }}>
                    {selectedAlert && selectedAlertData ? (
                      <AlertActionCenter alert={selectedAlertData} />
                    ) : (
                      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                        <Typography variant="body2">
                          Select an alert to view available actions
                        </Typography>
                      </Box>
                    )}
                  </DashboardCard>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Impact Assessment and Correlation Map */}
            <Grid item xs={12} md={6}>
              <DashboardCard sx={{ height: '100%' }}>
                <AlertImpactAssessment />
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard sx={{ height: '100%' }}>
                <ComponentAlertCorrelationMap />
              </DashboardCard>
            </Grid>
          </Grid>
        );
      case 'analytics':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard sx={{ height: '100%' }}>
                <ComplianceQualityAlertCenter />
              </DashboardCard>
            </Grid>
          </Grid>
        );
      case 'trends':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard sx={{ height: '100%' }}>
                <AlertTrendAnalysis />
              </DashboardCard>
            </Grid>
          </Grid>
        );
      case 'performance':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard sx={{ height: '100%' }}>
                <AlertResponsePerformance />
              </DashboardCard>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <AlertHeader />
      
      {/* Main Content */}
      <Box sx={{ mt: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AlertsPage; 