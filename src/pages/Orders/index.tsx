import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  styled,
  Paper,
  Tabs,
  Tab,
  Chip,
  Divider,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Snackbar,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { 
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  FileUpload as UploadIcon,
  FileDownload as DownloadIcon,
  Settings as SettingsIcon,
  PlaylistAddCheck as BatchIcon,
  FilterList as FilterIcon,
  Warning as WarningIcon,
  Storefront as StoreIcon,
  ImportExport as ImportExportIcon,
  Ballot as BallotIcon,
  Archive as ArchiveIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import PageTitle from '../../components/common/PageTitle';

import { Order, OrderFilters as OrderFiltersType } from './types';
import OrderTable from './components/OrderTable';
import OrderFilters from './components/OrderFilters';
import CreateOrderModal from './components/CreateOrderModal';
import OrderDetailsDrawer from './components/OrderDetailsDrawer';

// Import our new components 
// Note: These imports would work if the files were successfully created
// For now, we'll create mocked versions of them inline
// import OrderPerformanceMetrics from './components/OrderPerformanceMetrics';
// import OrderPipeline from './components/OrderPipeline';
// import OrderAnalytics from './components/OrderAnalytics';
// import AdvancedOrderTable from './components/AdvancedOrderTable';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

// Styled header with gradient
const PageHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.info.dark})`,
  padding: theme.spacing(3, 4),
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(0, 0, 0, 0.05)',
    zIndex: 0,
  },
}));

const OrderSummaryBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
  backgroundColor: alpha(theme.palette.primary.light, 0.08),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  borderRadius: theme.shape.borderRadius * 3,
  fontWeight: 500,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 'auto',
  fontSize: '0.85rem',
  fontWeight: 500,
  textTransform: 'none',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orders-tabpanel-${index}`}
      aria-labelledby={`orders-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'PO-12345',
    type: 'purchase',
    status: 'pending',
    supplier: 'ABC Supplies',
    dateCreated: '2023-10-15',
    dateUpdated: '2023-10-15',
    expectedDelivery: '2023-10-30',
    totalAmount: 2499.99,
    paymentStatus: 'unpaid',
    items: [
      {
        id: '1-1',
        productId: '1',
        sku: 'WA-1234',
        name: 'Widget A',
        quantity: 50,
        unitPrice: 29.99,
        discount: 0,
        tax: 149.95,
        total: 1499.50,
        totalPrice: 1499.50,
        status: 'pending',
      },
      {
        id: '1-2',
        productId: '2',
        sku: 'GB-5678',
        name: 'Gadget B',
        quantity: 20,
        unitPrice: 49.99,
        discount: 0,
        tax: 99.98,
        total: 999.80,
        totalPrice: 999.80,
        status: 'pending',
      },
    ],
    blockchainVerified: true,
    smartContractId: 'sc_123456',
  },
  {
    id: '2',
    orderNumber: 'SO-67890',
    type: 'sales',
    status: 'processing',
    customer: 'XYZ Corp',
    dateCreated: '2023-10-16',
    dateUpdated: '2023-10-17',
    expectedDelivery: '2023-10-25',
    totalAmount: 1299.95,
    paymentStatus: 'paid',
    items: [
      {
        id: '2-1',
        productId: '3',
        sku: 'PC-9012',
        name: 'Component C',
        quantity: 15,
        unitPrice: 32.99,
        discount: 0,
        tax: 49.49,
        total: 494.85,
        totalPrice: 494.85,
        status: 'allocated',
      },
      {
        id: '2-2',
        productId: '4',
        sku: 'TD-3456',
        name: 'Tool D',
        quantity: 10,
        unitPrice: 80.97,
        discount: 0,
        tax: 80.97,
        total: 809.70,
        totalPrice: 809.70,
        status: 'allocated',
      },
    ],
    blockchainVerified: true,
    smartContractId: 'sc_789012',
  },
  {
    id: '3',
    orderNumber: 'RO-24680',
    type: 'return',
    status: 'pending',
    customer: 'ABC Customer',
    dateCreated: '2023-10-18',
    dateUpdated: '2023-10-18',
    totalAmount: 249.99,
    paymentStatus: 'refunded',
    items: [
      {
        id: '3-1',
        productId: '5',
        sku: 'GB-5678',
        name: 'Gadget B',
        quantity: 5,
        unitPrice: 49.99,
        discount: 0,
        tax: 0,
        total: 249.95,
        status: 'returned',
      }
    ],
    blockchainVerified: false,
  }
];

// Mock data for performance metrics
const mockMetricsData = {
  fulfillmentRate: 94.3,
  fulfillmentTrend: 2.1,
  cycleTimes: {
    average: 4.2,
    byType: [
      { name: 'Purchase', value: 5.1 },
      { name: 'Sales', value: 3.6 },
      { name: 'Return', value: 2.2 },
    ],
    industryComparison: -21,
  },
  paymentStatus: [
    { status: 'Pending', percentage: 12, color: '#FFC107' },
    { status: 'Processing', percentage: 8, color: '#2196F3' },
    { status: 'Complete', percentage: 75, color: '#4CAF50' },
    { status: 'Disputed', percentage: 5, color: '#F44336' },
  ],
  orderValue: {
    active: 1247890,
    pipeline: 842340,
    mtd: 2164520,
    yoyChange: 18.3,
  },
};

// Mock components - these would be replaced by the actual components
const OrderPerformanceMetrics = ({ 
  fulfillmentRate, 
  fulfillmentTrend, 
  cycleTimes, 
  paymentStatus, 
  orderValue 
}: any) => (
  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mb: 3 }}>
    <Typography variant="h6" gutterBottom>Order Performance Metrics</Typography>
    <Typography variant="body2">Placeholder for OrderPerformanceMetrics component</Typography>
  </Box>
);

const OrderPipeline = ({ orders, onOrderClick, onOrderMove }: any) => (
  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mb: 3 }}>
    <Typography variant="h6" gutterBottom>Order Pipeline</Typography>
    <Typography variant="body2">Placeholder for OrderPipeline component</Typography>
  </Box>
);

const OrderAnalytics = ({ onTimeRangeChange }: any) => (
  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mb: 3 }}>
    <Typography variant="h6" gutterBottom>Order Analytics</Typography>
    <Typography variant="body2">Placeholder for OrderAnalytics component</Typography>
  </Box>
);

const Orders: React.FC = () => {
  const theme = useTheme();
  // State for tab selection
  const [currentTab, setCurrentTab] = useState(0);

  // State for filtered orders
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);

  // State for order filters
  const [filters, setFilters] = useState<OrderFiltersType>({
    search: '',
    type: '',
    status: '',
    dateRange: {
      start: null,
      end: null,
    },
    customer: '',
    supplier: '',
    paymentStatus: '',
    minAmount: null,
    maxAmount: null,
  });

  // State for modal visibility
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // State for snackbar notifications
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // State for action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  // Handlers for tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Handler for filter changes
  const handleFilterChange = (newFilters: OrderFiltersType) => {
    setFilters(newFilters);

    // Apply filters to orders
    const filtered = mockOrders.filter((order) => {
      // Filter by type
      if (newFilters.type && order.type !== newFilters.type) {
        return false;
      }

      // Filter by status
      if (newFilters.status && order.status !== newFilters.status) {
        return false;
      }

      // Filter by customer
      if (newFilters.customer && order.customer !== newFilters.customer) {
        return false;
      }

      // Filter by supplier
      if (newFilters.supplier && order.supplier !== newFilters.supplier) {
        return false;
      }

      // Filter by payment status
      if (newFilters.paymentStatus && order.paymentStatus !== newFilters.paymentStatus) {
        return false;
      }

      // Filter by amount range
      if (
        (newFilters.minAmount && order.totalAmount < newFilters.minAmount) ||
        (newFilters.maxAmount && order.totalAmount > newFilters.maxAmount)
      ) {
        return false;
      }

      // Filter by date range
      if (newFilters.dateRange.start && newFilters.dateRange.end) {
        const orderDate = new Date(order.dateCreated);
        const startDate = newFilters.dateRange.start;
        const endDate = newFilters.dateRange.end;

        if (orderDate < startDate || orderDate > endDate) {
          return false;
        }
      }

      // Filter by search term
      if (newFilters.search) {
        const searchTerm = newFilters.search.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(searchTerm) ||
          (order.customer && order.customer.toLowerCase().includes(searchTerm)) ||
          (order.supplier && order.supplier.toLowerCase().includes(searchTerm)) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchTerm))
        );
      }

      return true;
    });

    setFilteredOrders(filtered);
  };

  // Handlers for order actions
  const handleViewOrder = (orderId: string) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsOrderDetailsOpen(true);
    }
  };

  const handleCreateOrder = () => {
    setIsCreateOrderOpen(true);
  };

  const handleCloseCreateOrder = () => {
    setIsCreateOrderOpen(false);
  };

  const handleCloseOrderDetails = () => {
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveOrder = (order: Order) => {
    // In a real app, you would save the order to your backend here
    console.log('Saving order:', order);
    setSnackbar({
      open: true,
      message: 'Order saved successfully',
      severity: 'success',
    });
    setIsOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleCreateNewOrder = (orderData: Partial<Order>) => {
    // In a real app, you would create a new order in your backend
    console.log('Creating new order:', orderData);
    setSnackbar({
      open: true,
      message: 'Order created successfully',
      severity: 'success',
    });
    setIsCreateOrderOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEditOrder = (orderId: string) => {
    const order = mockOrders.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsOrderDetailsOpen(true);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log('Deleting order:', orderId);
    setSnackbar({
      open: true,
      message: 'Order deleted successfully',
      severity: 'success',
    });
  };

  const handleDuplicateOrder = (orderId: string) => {
    console.log('Duplicating order:', orderId);
    setSnackbar({
      open: true,
      message: 'Order duplicated successfully',
      severity: 'success',
    });
  };

  const handleCancelOrder = (orderId: string) => {
    console.log('Canceling order:', orderId);
    setSnackbar({
      open: true,
      message: 'Order canceled successfully',
      severity: 'success',
    });
  };

  const handleShipOrder = (orderId: string) => {
    console.log('Shipping order:', orderId);
    setSnackbar({
      open: true,
      message: 'Order marked as shipped',
      severity: 'success',
    });
  };

  const handlePrintOrder = (orderId: string) => {
    console.log('Printing order:', orderId);
  };

  const handlePrintInvoice = (orderId: string) => {
    console.log('Printing invoice for order:', orderId);
  };

  const handleProcessPayment = (orderId: string) => {
    console.log('Processing payment for order:', orderId);
    setSnackbar({
      open: true,
      message: 'Payment processed successfully',
      severity: 'success',
    });
  };

  // Handle actions menu
  const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
  };

  // Handle order pipeline events
  const handleOrderClick = (orderId: string) => {
    handleViewOrder(orderId);
  };

  const handleOrderMove = (orderId: string, fromStage: string, toStage: string) => {
    console.log(`Moving order ${orderId} from ${fromStage} to ${toStage}`);
    setSnackbar({
      open: true,
      message: `Order moved to ${toStage}`,
      severity: 'success',
    });
  };

  return (
    <Container maxWidth={false}>
      {/* Enhanced Page Header */}
      <PageHeader>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingCartIcon sx={{ fontSize: 36, mr: 2 }} />
              <Box>
                <PageTitle variant="h4">Order Management</PageTitle>
                <Typography variant="subtitle1">
                  Manage purchase orders, sales orders, and returns
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex' }}>
              <ActionButton
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleCreateOrder}
                sx={{ boxShadow: theme.shadows[8] }}
              >
                Create New Order
              </ActionButton>
              <IconButton
                color="inherit"
                onClick={handleOpenActionMenu}
                sx={{ ml: 1 }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </PageHeader>

      {/* Order Summary Banner */}
      <OrderSummaryBanner>
        <SummaryItem>
          <Badge badgeContent={48} color="primary">
            <ShoppingCartIcon color="primary" />
          </Badge>
          <Box>
            <Typography variant="body2" color="textSecondary">Active Purchase Orders</Typography>
            <Typography variant="subtitle2" fontWeight="bold">48</Typography>
          </Box>
        </SummaryItem>
        
        <SummaryItem>
          <Badge badgeContent={67} color="success">
            <StorefrontIcon color="success" />
          </Badge>
          <Box>
            <Typography variant="body2" color="textSecondary">Active Sales Orders</Typography>
            <Typography variant="subtitle2" fontWeight="bold">67</Typography>
          </Box>
        </SummaryItem>
        
        <SummaryItem>
          <Badge badgeContent={14} color="error">
            <WarningIcon color="error" />
          </Badge>
          <Box>
            <Typography variant="body2" color="textSecondary">Orders Requiring Attention</Typography>
            <Typography variant="subtitle2" fontWeight="bold">14</Typography>
          </Box>
        </SummaryItem>
        
        <Box>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<SettingsIcon />}
            sx={{ borderRadius: theme.shape.borderRadius * 2 }}
          >
            Settings
          </Button>
        </Box>
      </OrderSummaryBanner>

      {/* Global Quick Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <ActionButton
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleCreateOrder}
        >
          Create New Order
        </ActionButton>
        
        <ActionButton
          variant="outlined"
          size="small"
          startIcon={<UploadIcon />}
        >
          Import Orders
        </ActionButton>
        
        <ActionButton
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
        >
          Export Data
        </ActionButton>
        
        <ActionButton
          variant="outlined"
          size="small"
          startIcon={<BatchIcon />}
        >
          Batch Process
        </ActionButton>
        
        <ActionButton
          variant="outlined"
          size="small"
          startIcon={<SettingsIcon />}
        >
          Settings
        </ActionButton>
      </Box>

      {/* Order Performance Metrics Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Order Performance
        </Typography>
        <OrderPerformanceMetrics
          fulfillmentRate={mockMetricsData.fulfillmentRate}
          fulfillmentTrend={mockMetricsData.fulfillmentTrend}
          cycleTimes={mockMetricsData.cycleTimes}
          paymentStatus={mockMetricsData.paymentStatus}
          orderValue={mockMetricsData.orderValue}
        />
      </Box>

      {/* View Selector Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <StyledTab
            label="All Orders"
            icon={<BallotIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="Purchase Orders"
            icon={<ShoppingCartIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="Sales Orders"
            icon={<StoreIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="Pending Approvals"
            icon={<VerifiedIcon />}
            iconPosition="start"
          />
          <StyledTab
            label="Archived"
            icon={<ArchiveIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Order Pipeline Section - Kanban View */}
      <Box sx={{ mb: 4 }}>
        <OrderPipeline
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
          onOrderMove={handleOrderMove}
        />
      </Box>

      {/* Order Analytics Dashboard */}
      <Box sx={{ mb: 4 }}>
        <OrderAnalytics
          onTimeRangeChange={(range: string) => 
            console.log('Time range changed:', range)
          }
        />
      </Box>

      {/* Main Orders Table */}
      <Box sx={{ mb: 3 }}>
        <DashboardCard elevation={0}>
          <Box className="card-header">
            <Typography variant="h6">Order Management</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <OrderFilters 
              initialFilters={filters} 
              onFilterChange={handleFilterChange} 
              onClearFilters={() => {
                setFilters({
                  search: '',
                  type: '',
                  status: '',
                  dateRange: {
                    start: null,
                    end: null,
                  },
                  customer: '',
                  supplier: '',
                  paymentStatus: '',
                  minAmount: null,
                  maxAmount: null,
                });
              }}
              customers={[
                { id: '1', name: 'XYZ Corp' },
                { id: '2', name: 'ABC Customer' },
                { id: '3', name: 'Global Distributors' },
              ]}
              suppliers={[
                { id: '1', name: 'ABC Supplies' },
                { id: '2', name: 'Premium Widgets Inc.' },
                { id: '3', name: 'Quality Components Ltd.' },
              ]}
            />
            <OrderTable
              orders={filteredOrders}
              loading={false}
              onViewOrder={handleViewOrder}
              onEditOrder={handleEditOrder}
              onDeleteOrder={handleDeleteOrder}
              onDuplicateOrder={handleDuplicateOrder}
              onCancelOrder={handleCancelOrder}
              onShipOrder={handleShipOrder}
              onPrintOrder={handlePrintOrder}
              onPrintInvoice={handlePrintInvoice}
              onProcessPayment={handleProcessPayment}
            />
          </Box>
        </DashboardCard>
      </Box>

      {/* Modals & Drawers */}
      <CreateOrderModal
        open={isCreateOrderOpen}
        onClose={handleCloseCreateOrder}
        onCreateOrder={(orderData: any) => handleCreateNewOrder(orderData)}
        customers={[
          { id: '1', name: 'XYZ Corp' },
          { id: '2', name: 'ABC Customer' },
          { id: '3', name: 'Global Distributors' },
        ]}
        suppliers={[
          { id: '1', name: 'ABC Supplies' },
          { id: '2', name: 'Premium Widgets Inc.' },
          { id: '3', name: 'Quality Components Ltd.' },
        ]}
        products={[
          { id: '1', name: 'Widget A', sku: 'WA-1234', price: 29.99 },
          { id: '2', name: 'Gadget B', sku: 'GB-5678', price: 49.99 },
          { id: '3', name: 'Component C', sku: 'PC-9012', price: 32.99 },
          { id: '4', name: 'Tool D', sku: 'TD-3456', price: 80.97 },
        ]}
      />

      {selectedOrder && (
        <OrderDetailsDrawer
          open={isOrderDetailsOpen}
          order={selectedOrder}
          onClose={handleCloseOrderDetails}
          onSave={handleSaveOrder}
          onShip={handleShipOrder}
          onCancel={handleCancelOrder}
          onDelete={handleDeleteOrder}
          onDuplicate={handleDuplicateOrder}
          onPrintOrder={handlePrintOrder}
          onPrintInvoice={handlePrintInvoice}
          onProcessPayment={handleProcessPayment}
        />
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={() => {
          handleCreateOrder();
          handleCloseActionMenu();
        }}>
          <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
          Create New Order
        </MenuItem>
        <MenuItem onClick={handleCloseActionMenu}>
          <ListItemIcon><UploadIcon fontSize="small" /></ListItemIcon>
          Import Orders
        </MenuItem>
        <MenuItem onClick={handleCloseActionMenu}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          Export Data
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseActionMenu}>
          <ListItemIcon><BatchIcon fontSize="small" /></ListItemIcon>
          Batch Process
        </MenuItem>
        <MenuItem onClick={handleCloseActionMenu}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          Settings
        </MenuItem>
      </Menu>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Orders; 