import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  useTheme, 
  Tabs, 
  Tab, 
  Badge,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PageTitle from '../../components/common/PageTitle';
import { 
  Plus, 
  AlertCircle, 
  MoreVertical, 
  Clock, 
  FileText, 
  BarChart2,
  ChevronDown
} from 'lucide-react';

// Import components
import PaymentStatusCards from './components/PaymentStatusCards';
import PaymentMethodComparison from './components/PaymentMethodComparison';
import PaymentTrendsChart from './components/PaymentTrendsChart';
import PaymentTable from './components/PaymentTable';
import PaymentFilters from './components/PaymentFilters';
import CreatePaymentModal from './components/CreatePaymentModal';
import PaymentHeader from './components/PaymentHeader';

// Import mock data
import { 
  mockPayments, 
  mockPaymentStatusSummary, 
  mockPaymentMethodComparison,
  mockPaymentTrends,
  mockUser
} from './mockData';

// Import types
import { PaymentFilterState } from './types';

// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Tab accessibility props
const a11yProps = (index: number) => {
  return {
    id: `payment-tab-${index}`,
    'aria-controls': `payment-tabpanel-${index}`,
  };
};

const PaymentsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // State for payment filters
  const [filters, setFilters] = useState<PaymentFilterState>({
    status: [],
    dateRange: {
      start: null,
      end: null,
    },
    suppliers: [],
    amountRange: {
      min: null,
      max: null,
    },
    paymentMethods: [],
    urgency: [],
  });
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle filter change
  const handleFilterChange = useCallback((newFilters: PaymentFilterState) => {
    setFilters(newFilters);
  }, []);
  
  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Implement search logic here
    console.log('Searching for:', query);
  }, []);
  
  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    setFilters({
      status: [],
      dateRange: {
        start: null,
        end: null,
      },
      suppliers: [],
      amountRange: {
        min: null,
        max: null,
      },
      paymentMethods: [],
      urgency: [],
    });
  }, []);
  
  // Handle create payment
  const handleCreatePayment = () => {
    setIsCreateModalOpen(true);
  };
  
  // Handle close create modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  // Handle submit create payment
  const handleSubmitCreatePayment = (paymentData: any) => {
    console.log('Creating payment:', paymentData);
    setIsCreateModalOpen(false);
    // Implement create payment logic here
  };
  
  // Handle view payment
  const handleViewPayment = (paymentId: string) => {
    console.log('Viewing payment:', paymentId);
    // Implement view payment logic here
  };
  
  // Handle edit payment
  const handleEditPayment = (paymentId: string) => {
    console.log('Editing payment:', paymentId);
    // Implement edit payment logic here
  };
  
  // Handle cancel payment
  const handleCancelPayment = (paymentId: string) => {
    console.log('Cancelling payment:', paymentId);
    // Implement cancel payment logic here
  };
  
  // Handle process payment
  const handleProcessPayment = (paymentId: string) => {
    console.log('Processing payment:', paymentId);
    // Implement process payment logic here
  };
  
  // Handle pay now
  const handlePayNow = () => {
    console.log('Pay now clicked');
    // Implement pay now logic here
  };
  
  // Handle review schedule
  const handleReviewSchedule = () => {
    console.log('Review schedule clicked');
    // Implement review schedule logic here
  };
  
  // Handle view receipts
  const handleViewReceipts = () => {
    console.log('View receipts clicked');
    // Implement view receipts logic here
  };
  
  // Handle actions menu
  const handleActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };
  
  // Handle actions close
  const handleActionsClose = () => {
    setActionsAnchorEl(null);
  };
  
  // Handle approve pending
  const handleApprovePending = () => {
    console.log('Approve pending clicked');
    // Implement approve pending logic here
    handleActionsClose();
  };
  
  // Handle schedule payment
  const handleSchedulePayment = () => {
    console.log('Schedule payment clicked');
    // Implement schedule payment logic here
    handleActionsClose();
  };
  
  // Handle bulk payment
  const handleBulkPayment = () => {
    console.log('Bulk payment clicked');
    // Implement bulk payment logic here
    handleActionsClose();
  };
  
  // Handle view reports
  const handleViewReports = () => {
    console.log('View reports clicked');
    // Implement view reports logic here
    handleActionsClose();
  };
  
  // Handle manage suppliers
  const handleManageSuppliers = () => {
    console.log('Manage suppliers clicked');
    // Implement manage suppliers logic here
    handleActionsClose();
  };
  
  // Handle open settings
  const handleOpenSettings = () => {
    console.log('Open settings clicked');
    // Implement open settings logic here
    handleActionsClose();
  };

  // Calculate urgent payments count
  const urgentPaymentsCount = mockPaymentStatusSummary.dueToday.amount > 0 ? 1 : 0;
  
  // Get top 5 urgent payments
  const urgentPayments = mockPayments
    .filter(payment => payment.urgency === 'critical' || payment.urgency === 'high')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" sx={{ pb: 6 }}>
        {/* Replace simplified header with PaymentHeader component */}
        <PaymentHeader
          pendingAmount={mockPaymentStatusSummary.dueToday.amount + mockPaymentStatusSummary.dueThisWeek.amount}
          criticalPayments={urgentPaymentsCount}
          totalPayments={mockPayments.length}
          onCreatePayment={handleCreatePayment}
          onApprovePending={handleApprovePending}
          onSchedulePayment={handleSchedulePayment}
          onOpenSettings={handleOpenSettings}
          onViewAll={() => setTabValue(1)}
          onSearch={handleSearch}
          onExportData={() => console.log('Export data clicked')}
          onGenerateReport={() => console.log('Generate report clicked')}
        />
        
        {/* Tab Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="payment dashboard tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab 
              label={
                <Badge 
                  badgeContent={urgentPaymentsCount} 
                  color="error"
                  sx={{ '& .MuiBadge-badge': { right: -15, top: 5 } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AlertCircle size={16} style={{ marginRight: 8 }} />
                    Immediate Action
                  </Box>
                </Badge>
              } 
              {...a11yProps(0)} 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FileText size={16} style={{ marginRight: 8 }} />
                  Payment Management
                </Box>
              } 
              {...a11yProps(1)} 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BarChart2 size={16} style={{ marginRight: 8 }} />
                  Analytics & Insights
                </Box>
              } 
              {...a11yProps(2)} 
            />
          </Tabs>
        </Box>
        
        {/* Immediate Action Hub */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PaymentStatusCards 
                statusSummary={mockPaymentStatusSummary}
                onPayNow={handlePayNow}
                onReviewSchedule={handleReviewSchedule}
                onViewReceipts={handleViewReceipts}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Urgent Payments
                </Typography>
                
                <PaymentTable 
                  payments={urgentPayments}
                  onViewPayment={handleViewPayment}
                  onEditPayment={handleEditPayment}
                  onCancelPayment={handleCancelPayment}
                  onProcessPayment={handleProcessPayment}
                  simplified={true}
                />
                
                {urgentPayments.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="text" 
                      endIcon={<ChevronDown size={16} />}
                      onClick={() => setTabValue(1)}
                    >
                      View All Payments
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Payment Management */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <PaymentFilters 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                  onReset={handleResetFilters}
                />
              </Box>
              
              <PaymentTable 
                payments={mockPayments}
                onViewPayment={handleViewPayment}
                onEditPayment={handleEditPayment}
                onCancelPayment={handleCancelPayment}
                onProcessPayment={handleProcessPayment}
                simplified={false}
              />
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Analytics & Insights */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PaymentMethodComparison 
                comparisonData={mockPaymentMethodComparison}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <PaymentTrendsChart 
                trends={mockPaymentTrends}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Shell Token Performance
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Shell Token transactions have saved your organization ${mockUser.ytdSavings.toLocaleString()} in fees this year.
                  Based on your current payment volume, we project annual savings of approximately 
                  ${(mockUser.ytdSavings * 2.5).toLocaleString()}.
                </Typography>
                
                {/* Placeholder for Shell Token performance metrics */}
                <Box sx={{ height: 200, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Shell Token Performance Metrics
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Create Payment Modal */}
        <CreatePaymentModal
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onCreatePayment={handleSubmitCreatePayment}
        />
      </Container>
    </LocalizationProvider>
  );
};

export default PaymentsPage; 