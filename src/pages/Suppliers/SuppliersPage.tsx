import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  useTheme,
  Paper,
  Typography,
  Chip,
  IconButton,
  Button,
  useMediaQuery,
  Drawer,
  Divider,
  Alert,
  styled,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SupplierHeader from './components/SupplierHeader';
import SupplierHealthDashboard from './components/SupplierHealthDashboard';
import KeySupplierCards from './components/KeySupplierCards';
import SupplierOrderStatusPanel from './components/SupplierOrderStatusPanel';
import SupplierTable from './components/SupplierTable';
import SupplierProfileSummary from './components/SupplierProfileSummary';
import SmartContractStatusPanel from './components/SmartContractStatusPanel';
import ComponentQualityTracking from './components/ComponentQualityTracking';
import SupplierMapView from './components/SupplierMapView';
import SupplierAnalytics from './components/SupplierAnalytics';
import SupplierFilter from './components/SupplierFilter';
import SupplierRiskManagement from './components/SupplierRiskManagement';
import { Supplier } from './types';

// Icons
import TableChartIcon from '@mui/icons-material/TableChart';
import MapIcon from '@mui/icons-material/Map';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BarChartIcon from '@mui/icons-material/BarChart';
import ViewListIcon from '@mui/icons-material/ViewList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { 
  mockSuppliers, 
  mockSupplierMetrics, 
  mockOrderStatuses, 
  mockQualityMetrics,
  mockUser 
} from './mockData';

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

// Main component
const SuppliersPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [activeOrderStatusFilter, setActiveOrderStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'map' | 'analytics' | 'risk'>('table');
  const [activeSection, setActiveSection] = useState<'overview' | 'suppliers' | 'analytics' | 'risk'>('overview');
  const [viewMenuAnchorEl, setViewMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  // Get the selected supplier
  const selectedSupplier = selectedSupplierId ? 
    mockSuppliers.find(s => s.id === selectedSupplierId) : 
    null;

  // Handler for selecting a supplier
  const handleSupplierSelect = (supplierOrId: Supplier | string) => {
    const supplierId = typeof supplierOrId === 'string' ? supplierOrId : supplierOrId.id;
    setSelectedSupplierId(supplierId);
    if (isMobile) {
      setDrawerOpen(true);
    }
  };

  // Handler for order status filter changes
  const handleOrderStatusFilterChange = (status: string | null) => {
    setActiveOrderStatusFilter(status === activeOrderStatusFilter ? null : status);
  };

  // Handler for metric card clicks
  const handleMetricCardClick = (section: 'suppliers' | 'analytics' | 'risk') => {
    setActiveSection(section);
  };

  // Handler for view menu
  const handleViewMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setViewMenuAnchorEl(event.currentTarget);
  };

  const handleViewMenuClose = () => {
    setViewMenuAnchorEl(null);
  };

  const handleViewModeChange = (mode: 'table' | 'map' | 'analytics' | 'risk') => {
    setViewMode(mode);
    handleViewMenuClose();
  };

  // Various action handlers
  const handleSearch = (query: string) => console.log('Search:', query);
  const handleExportData = () => console.log('Export data');
  const handleAddSupplier = () => console.log('Add supplier');
  const handleSupplierAssessment = () => console.log('Supplier assessment');
  const handleGenerateReport = () => console.log('Generate report');
  const handleRegionFilter = (region: string) => console.log('Filter by region:', region);
  const handleTimeRangeChange = () => console.log('Time range changed');
  const handleViewFullscreen = () => console.log('View fullscreen');
  const handleContactSupplier = (supplier: Supplier) => console.log('Contact supplier', supplier.id);
  const handleCreateOrder = (supplier: Supplier) => console.log('Create order', supplier.id);
  const handleSendMessage = () => console.log('Send message');
  const handleScheduleCall = () => console.log('Schedule call');
  const handleViewContract = () => console.log('View contract');
  const handleMakePayment = (supplier: Supplier) => console.log('Make payment', supplier.id);
  const handleViewTransactions = () => console.log('View transactions');
  const handleViewIncident = () => console.log('View incident');
  const handleViewAllMetrics = () => console.log('View all metrics');
  const handleFilterChange = (filters: any) => console.log('Filter changed:', filters);

  // Render the overview dashboard
  const renderOverviewDashboard = () => (
    <Grid container spacing={3}>
      {/* KPI Cards Row */}
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard onClick={() => handleMetricCardClick('suppliers')}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  mr: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'primary.lighter',
                }}
              >
                <BusinessIcon color="primary" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Total Suppliers</Typography>
                <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.totalCount}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip 
                size="small" 
                label={`${mockSupplierMetrics.activeSuppliers} active`} 
                color="primary"
              />
              <ArrowForwardIcon fontSize="small" color="action" />
            </Box>
          </CardContent>
        </MetricCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard onClick={() => handleMetricCardClick('analytics')}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  mr: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'success.lighter',
                }}
              >
                <BarChartIcon color="success" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Average Performance</Typography>
                <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.averagePerformance}%</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip 
                size="small" 
                label="+3.2% this month" 
                color="success"
              />
              <ArrowForwardIcon fontSize="small" color="action" />
            </Box>
          </CardContent>
        </MetricCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard onClick={() => handleMetricCardClick('risk')}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  mr: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'warning.lighter',
                }}
              >
                <VerifiedUserIcon color="warning" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Verified Suppliers</Typography>
                <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.verifiedCount}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip 
                size="small" 
                label={`${Math.round((mockSupplierMetrics.verifiedCount / mockSupplierMetrics.totalCount) * 100)}% of total`} 
                color="warning"
              />
              <ArrowForwardIcon fontSize="small" color="action" />
            </Box>
          </CardContent>
        </MetricCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard onClick={() => handleMetricCardClick('suppliers')}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  mr: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'info.lighter',
                }}
              >
                <AccountBalanceWalletIcon color="info" />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Smart Contracts</Typography>
                <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.smartContractCount}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip 
                size="small" 
                label={`${mockSupplierMetrics.annualSavings}% savings`} 
                color="info"
              />
              <ArrowForwardIcon fontSize="small" color="action" />
            </Box>
          </CardContent>
        </MetricCard>
      </Grid>

      {/* Order Status Panel */}
      <Grid item xs={12}>
        <DashboardCard>
          <CardHeader title="Order Status" />
          <CardContent>
            <SupplierOrderStatusPanel
              orderStatuses={mockOrderStatuses}
              activeFilter={activeOrderStatusFilter}
              onStatusClick={handleOrderStatusFilterChange}
            />
          </CardContent>
        </DashboardCard>
      </Grid>

      {/* Key Supplier Cards */}
      <Grid item xs={12}>
        <DashboardCard>
          <CardHeader 
            title="Key Suppliers" 
            action={
              <Button 
                endIcon={<ArrowForwardIcon />} 
                onClick={() => handleMetricCardClick('suppliers')}
                sx={{ textTransform: 'none' }}
              >
                View All
              </Button>
            }
          />
          <CardContent>
            <KeySupplierCards 
              suppliers={mockSuppliers.slice(0, 4)} 
              onSupplierSelect={handleSupplierSelect}
            />
          </CardContent>
        </DashboardCard>
      </Grid>
    </Grid>
  );

  // Render the suppliers section
  const renderSuppliersSection = () => {
    // Convert mockSuppliers to ExtendedSupplier type
    const extendedSuppliers = mockSuppliers.map(supplier => ({
      ...supplier,
      contactName: supplier.contactInfo?.primaryContact?.name || '',
      email: supplier.contactInfo?.email || '',
      phone: supplier.contactInfo?.phone || '',
      status: supplier.status || 'Active',
      performanceScore: supplier.metrics?.onTimeDelivery || 0,
      categories: supplier.categories || [],
      annualSpend: supplier.financials?.annualSpend || 0
    }));

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionHeader>
            <Typography variant="h6">All Suppliers</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                startIcon={<FilterListIcon />} 
                variant={showFilters ? "contained" : "outlined"} 
                size="small"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <IconButton size="small" onClick={handleViewMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </SectionHeader>
        </Grid>

        {/* Filters (collapsible) */}
        {showFilters && (
          <Grid item xs={12}>
            <DashboardCard>
              <CardContent>
                <SupplierFilter
                  onFilterChange={handleFilterChange}
                  onSaveFilter={() => {}}
                  onLoadFilter={() => {}}
                  savedFilters={[]}
                />
              </CardContent>
            </DashboardCard>
          </Grid>
        )}

        {/* Main Content and Sidebar */}
        <Grid item xs={12} md={8}>
          <DashboardCard>
            <CardContent>
              {viewMode === 'table' && (
                <SupplierTable 
                  suppliers={extendedSuppliers}
                  onViewDetails={handleSupplierSelect}
                  onContactSupplier={handleContactSupplier}
                  onCreateOrder={handleCreateOrder}
                  onPaySupplier={handleMakePayment}
                  onExpandRow={(supplierId) => setSelectedSupplierId(supplierId)}
                  expandedSupplierId={selectedSupplierId}
                />
              )}
              {viewMode === 'map' && (
                <SupplierMapView 
                  suppliers={mockSuppliers}
                  onRegionFilter={handleRegionFilter}
                  onSupplierSelect={handleSupplierSelect}
                  onViewFullscreen={handleViewFullscreen}
                />
              )}
            </CardContent>
          </DashboardCard>
        </Grid>
        
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <DashboardCard sx={{ height: '100%' }}>
              <CardHeader title="Supplier Details" />
              <CardContent>
                {renderSupplierDetails()}
              </CardContent>
            </DashboardCard>
          </Grid>
        )}
      </Grid>
    );
  };

  // Render the analytics section
  const renderAnalyticsSection = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SectionHeader>
          <Typography variant="h6">Supplier Analytics</Typography>
        </SectionHeader>
      </Grid>
      <Grid item xs={12}>
        <DashboardCard>
          <CardContent>
            <SupplierAnalytics 
              suppliers={mockSuppliers}
              onTimeRangeChange={handleTimeRangeChange}
              onExportData={handleExportData}
              onFilterChange={handleFilterChange}
            />
          </CardContent>
        </DashboardCard>
      </Grid>
    </Grid>
  );

  // Render the risk management section
  const renderRiskSection = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SectionHeader>
          <Typography variant="h6">Risk Management</Typography>
        </SectionHeader>
      </Grid>
      <Grid item xs={12}>
        <DashboardCard>
          <CardContent>
            <SupplierRiskManagement 
              suppliers={mockSuppliers}
              onSupplierSelect={handleSupplierSelect}
            />
          </CardContent>
        </DashboardCard>
      </Grid>
    </Grid>
  );

  // Render the supplier details view
  const renderSupplierDetails = () => {
    if (!selectedSupplier) {
      return (
        <Alert 
          severity="info" 
          sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 0,
            textAlign: 'center'
          }}
        >
          Select a supplier to view detailed information
        </Alert>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <SupplierProfileSummary 
          supplier={selectedSupplier} 
          onContactSupplier={handleContactSupplier}
          onScheduleCall={handleScheduleCall}
          onSendMessage={handleSendMessage}
          onViewContract={handleViewContract}
        />
        
        {selectedSupplier.smartContract && (
          <SmartContractStatusPanel 
            contract={selectedSupplier.smartContract}
            onViewTransactions={handleViewTransactions}
            onViewContract={handleViewContract}
            onMakePayment={() => handleMakePayment(selectedSupplier)}
          />
        )}
        
        <ComponentQualityTracking 
          qualityMetrics={{
            ...mockQualityMetrics,
            averageFailureRate: mockQualityMetrics.failureRate || 0,
            failureRateTrend: mockQualityMetrics.failureRateTrend || [],
            rmaTrend: mockQualityMetrics.rmaTrend || [],
            mtbfTrend: mockQualityMetrics.mtbfTrend || [],
          }}
          onViewIncident={handleViewIncident}
          onViewAllMetrics={handleViewAllMetrics}
        />
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header with search and actions */}
      <SupplierHeader 
        onAddSupplier={handleAddSupplier}
        onSupplierAssessment={handleSupplierAssessment}
        onGenerateReport={handleGenerateReport}
        onExportData={handleExportData}
        onSearch={handleSearch}
      />

      {/* Sub-navigation */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        mt: 3, 
        mb: 3, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 1
      }}>
        <NavButton 
          variant={activeSection === 'overview' ? 'contained' : 'text'} 
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </NavButton>
        <NavButton 
          variant={activeSection === 'suppliers' ? 'contained' : 'text'} 
          onClick={() => setActiveSection('suppliers')}
        >
          All Suppliers
        </NavButton>
        <NavButton 
          variant={activeSection === 'analytics' ? 'contained' : 'text'} 
          onClick={() => setActiveSection('analytics')}
        >
          Analytics
        </NavButton>
        <NavButton 
          variant={activeSection === 'risk' ? 'contained' : 'text'} 
          onClick={() => setActiveSection('risk')}
        >
          Risk Management
        </NavButton>
      </Box>

      {/* Main Content Area */}
      {activeSection === 'overview' && renderOverviewDashboard()}
      {activeSection === 'suppliers' && renderSuppliersSection()}
      {activeSection === 'analytics' && renderAnalyticsSection()}
      {activeSection === 'risk' && renderRiskSection()}

      {/* View Mode Menu */}
      <Menu
        anchorEl={viewMenuAnchorEl}
        open={Boolean(viewMenuAnchorEl)}
        onClose={handleViewMenuClose}
      >
        <MenuItem onClick={() => handleViewModeChange('table')}>
          <ListItemIcon>
            <TableChartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Table View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleViewModeChange('map')}>
          <ListItemIcon>
            <MapIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Map View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleViewModeChange('analytics')}>
          <ListItemIcon>
            <AssessmentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Analytics View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleViewModeChange('risk')}>
          <ListItemIcon>
            <SecurityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Risk View</ListItemText>
        </MenuItem>
      </Menu>

      {/* Mobile drawer for supplier details */}
      <Drawer
        anchor="right"
        open={isMobile && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: '85%', maxWidth: 500 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {selectedSupplier ? selectedSupplier.name : 'Supplier Details'}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {renderSupplierDetails()}
        </Box>
      </Drawer>
    </Container>
  );
};

export default SuppliersPage; 