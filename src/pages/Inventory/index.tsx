import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  styled,
  Paper,
  Drawer,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Card,
  CardContent,
  Stack,
  Chip,
  alpha
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Add as AddIcon, FilterList as FilterListIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import PageTitle from '../../components/common/PageTitle';

// Import the components
import { WarehouseSelector } from './components/WarehouseSelector';
import { InventoryFilters } from './components/InventoryFilters';
import { ItemDetailsDrawer } from './components/ItemDetailsDrawer';
import { AddItemModal } from './components/AddItemModal';
import { InventoryItem, WarehouseStructure } from './types';
import InventoryHeader from './components/InventoryHeader';
import CategoryScrollBar from './components/CategoryScrollBar';
import InventoryMetricsStrip from './components/InventoryMetricsStrip';
import TechComponentsInventoryTable from './components/TechComponentsInventoryTable';
import InventoryInsights from './components/InventoryInsights';
import AdvancedSearchPanel from './components/AdvancedSearchPanel';

// Import types and mock data
import { 
  TechComponentsInventoryData, 
  TechComponentsInventoryItem,
  SavedFilter,
  InventoryCategory,
  InventoryMetrics
} from './types';
import { techComponentsInventoryData, inventoryCategories, mockTechComponentsInventoryData } from './mockData';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

// Information display card - flat, light background
const InfoCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  height: '100%',
  border: `1px solid ${theme.palette.divider}`,
}));

// Action area card - subtle shadow, white background
const ActionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  height: '100%',
}));

interface AlertCardProps {
  severity?: 'warning' | 'error' | 'success' | 'info';
}

// Alert/notification card - colored border, light colored background
const AlertCard = styled(Paper)<AlertCardProps>(({ theme, severity = 'info' }) => ({
  backgroundColor: 
    severity === 'warning' 
      ? alpha(theme.palette.warning.main, 0.05)
      : severity === 'error' 
        ? alpha(theme.palette.error.main, 0.05)
        : severity === 'success'
          ? alpha(theme.palette.success.main, 0.05)
          : alpha(theme.palette.info.main, 0.05),
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  height: '100%',
  border: `1px solid ${
    severity === 'warning' 
      ? theme.palette.warning.main
      : severity === 'error' 
        ? theme.palette.error.main
        : severity === 'success'
          ? theme.palette.success.main
          : theme.palette.info.main
  }`,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

// Custom TabPanel component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, overflow: 'hidden' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `inventory-tab-${index}`,
    'aria-controls': `inventory-tabpanel-${index}`,
  };
}

const Inventory = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedWarehouse, setSelectedWarehouse] = useState('wh-001');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TechComponentsInventoryItem | null>(null);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // Use mock data
  const [inventoryData, setInventoryData] = useState(mockTechComponentsInventoryData);
  const { items, categories, metrics } = inventoryData;
  
  // Ensure warehouses have the correct type for the level property
  const typedWarehouses: WarehouseStructure[] = mockTechComponentsInventoryData.warehouses.map(warehouse => ({
    id: warehouse.id,
    name: warehouse.name,
    level: 'warehouse' as const,
    children: warehouse.children?.map(section => ({
      id: section.id,
      name: section.name,
      level: 'section' as const,
      children: section.children?.map(aisle => ({
        id: aisle.id,
        name: aisle.name,
        level: 'aisle' as const,
        children: aisle.children?.map(shelf => ({
          id: shelf.id,
          name: shelf.name,
          level: 'shelf' as const,
          children: shelf.children || []
        })) || []
      })) || []
    })) || []
  }));
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleWarehouseChange = (warehouseId: string) => {
    setSelectedWarehouse(warehouseId);
  };

  const handleFilterToggle = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const handleAdvancedSearchToggle = () => {
    setAdvancedSearchOpen(!advancedSearchOpen);
  };

  const handleItemClick = (item: TechComponentsInventoryItem) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const handleAddItemClick = () => {
    setAddItemOpen(true);
  };

  const handleCloseAddItem = () => {
    setAddItemOpen(false);
  };

  const handleSaveItem = (item: Partial<TechComponentsInventoryItem>) => {
    // Logic to save new item
    setInventoryData({
      ...inventoryData,
      items: [...items, { ...item, id: `item-${Date.now()}` } as TechComponentsInventoryItem]
    });
    setAddItemOpen(false);
    setSnackbarOpen(true);
    setSnackbarMessage('Item added successfully');
    setSnackbarSeverity('success');
  };

  const handleEditItem = (item: TechComponentsInventoryItem) => {
    setSelectedItem(item);
    // Open edit modal or drawer
  };

  const handleDeleteItem = (itemId: string) => {
    setItemToDelete(itemId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const newData = items.filter(item => item.id !== itemToDelete);
    setInventoryData({
      ...inventoryData,
      items: newData
    });
    setDeleteDialogOpen(false);
    setSnackbarOpen(true);
    setSnackbarMessage('Item deleted successfully');
    setSnackbarSeverity('success');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    // Logic to filter by category
    console.log(`Filtering by category: ${categoryId}`);
    // Implement filtering logic here
  };

  const handleReorderClick = () => {
    // Logic to create reorder
    console.log('Creating reorder for low stock items');
    // Implement reorder creation logic here
  };

  const handleValueDetailsClick = () => {
    // Logic to view value details
    console.log('Viewing inventory value details');
    // Implement value details view logic here
  };

  const handleStockoutReportClick = () => {
    // Logic to view stockout report
    console.log('Viewing stockout report');
    // Implement stockout report view logic here
  };

  const handleScanClick = () => {
    // Logic to open scanner
    console.log('Opening QR scanner');
    // Implement scanner logic here
  };

  return (
    <Box sx={{ 
      width: '100%', 
      overflow: 'hidden',
      maxWidth: '100%'
    }}>
      {/* Header with title and actions */}
      <InventoryHeader
        metrics={metrics}
        activeFilters={0}
        onAdvancedSearchClick={handleAdvancedSearchToggle}
        onFilterClick={handleFilterToggle}
        onAddItemClick={handleAddItemClick}
        onImportClick={() => console.log('Import clicked')}
        onExportClick={() => console.log('Export clicked')}
        onScanClick={handleScanClick}
        onSettingsClick={() => console.log('Settings clicked')}
      />

      {/* Key Metrics Strip */}
      <InventoryMetricsStrip 
        metrics={metrics} 
        onReorderClick={handleReorderClick}
        onValueDetailsClick={handleValueDetailsClick}
        onStockoutReportClick={handleStockoutReportClick}
      />

      {/* Category Scroll Bar */}
      <CategoryScrollBar 
        categories={categories} 
        onCategoryClick={handleCategoryClick} 
      />

      {/* Tabs for Inventory Management and Blockchain Verification */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="inventory tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              minHeight: 48,
              px: 3
            }
          }}
        >
          <Tab 
            icon={<InventoryIcon />} 
            iconPosition="start" 
            label="Inventory Management" 
            {...a11yProps(0)} 
          />
          <Tab 
            icon={<VerifiedUserIcon />} 
            iconPosition="start" 
            label="Blockchain Verification" 
            {...a11yProps(1)} 
          />
          <Tab 
            icon={<QrCodeScannerIcon />} 
            iconPosition="start" 
            label="Digital Twins" 
            {...a11yProps(2)} 
          />
        </Tabs>
      </Box>

      {/* Main content */}
      <Box sx={{ mt: 3, overflow: 'hidden' }}>
        <TabPanel value={tabValue} index={0}>
          <Box>
            <Grid container spacing={3}>
              {/* Main inventory table */}
              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    height: '100%',
                    overflow: 'auto'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Inventory Items</Typography>
                    <Box>
                      <WarehouseSelector
                        selectedWarehouse={selectedWarehouse}
                        onChange={handleWarehouseChange}
                        warehouses={typedWarehouses}
                        onLocationSelect={() => {}}
                      />
                    </Box>
                  </Box>
                  
                  <TechComponentsInventoryTable 
                    items={items}
                    onItemClick={handleItemClick}
                    onEditItem={handleEditItem}
                    onDeleteItem={handleDeleteItem}
                  />
                </Paper>
              </Grid>
              
              {/* Insights panel */}
              <Grid item xs={12} md={4}>
                <InventoryInsights 
                  items={items}
                  onActionClick={(actionType, itemId) => {
                    console.log(`Action ${actionType} for item ${itemId}`);
                    // Handle different action types here
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        
        {/* Blockchain Verification Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3} sx={{ overflow: 'hidden' }}>
            <Grid item xs={12}>
              <AlertCard severity="success">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Blockchain Verification Active</Typography>
                </Box>
                <Typography variant="body1">
                  All inventory items are being tracked on the blockchain for enhanced security and transparency.
                  Each item has a unique digital signature that can be verified at any time.
                </Typography>
              </AlertCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Box className="card-header">
                  <Typography variant="h6">Verification Statistics</Typography>
                </Box>
                <Box className="card-content">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Total Items</Typography>
                        <Typography variant="h4">{items.length}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Verified Items</Typography>
                        <Typography variant="h4">
                          {items.filter(item => item.blockchainVerified).length}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Verification Rate</Typography>
                        <Typography variant="h4">
                          {Math.round((items.filter(item => item.blockchainVerified).length / items.length) * 100)}%
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Last Sync</Typography>
                        <Typography variant="h6">Today, 2:30 PM</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </DashboardCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Box className="card-header">
                  <Typography variant="h6">Verification Actions</Typography>
                </Box>
                <Box className="card-content">
                  <Stack spacing={2}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      startIcon={<RefreshIcon />}
                    >
                      Sync with Blockchain
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      startIcon={<QrCodeScannerIcon />}
                    >
                      Verify Item via QR Code
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                    >
                      View Verification History
                    </Button>
                  </Stack>
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Digital Twins Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3} sx={{ overflow: 'hidden' }}>
            <Grid item xs={12}>
              <AlertCard severity="info">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InventoryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Digital Twins Management</Typography>
                </Box>
                <Typography variant="body1">
                  Digital twins provide a virtual representation of your physical inventory items.
                  Each digital twin is linked to the blockchain for secure and transparent tracking.
                </Typography>
              </AlertCard>
            </Grid>
            
            <Grid item xs={12}>
              <DashboardCard>
                <Box className="card-header">
                  <Typography variant="h6">Digital Twins Registry</Typography>
                </Box>
                <Box className="card-content" sx={{ p: 0, overflow: 'auto' }}>
                  <TechComponentsInventoryTable
                    items={items.filter(item => item.blockchainVerified)}
                    onItemClick={handleItemClick}
                    onEditItem={handleEditItem}
                    onDeleteItem={handleDeleteItem}
                    showBlockchainColumns={true}
                  />
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      {/* Drawers and Modals */}
      <Drawer
        anchor="right"
        open={selectedItem !== null}
        onClose={handleCloseDetails}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 500 } },
        }}
      >
        {selectedItem && (
          <ItemDetailsDrawer item={selectedItem} onClose={handleCloseDetails} />
        )}
      </Drawer>

      <Dialog
        open={addItemOpen}
        onClose={handleCloseAddItem}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Inventory Item</DialogTitle>
        <DialogContent>
          <AddItemModal 
            onSave={handleSaveItem} 
            onCancel={handleCloseAddItem} 
            open={addItemOpen}
            categories={categories.map((c: InventoryCategory) => ({ id: c.id, name: c.name }))}
            locations={typedWarehouses.map(w => ({ id: w.id, name: w.name, path: [w.id] }))}
            onClose={handleCloseAddItem}
            onAddItem={() => {}}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={handleFilterToggle}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 450 }, p: 3 }
        }}
      >
        <InventoryFilters 
          onClose={handleFilterToggle} 
          categories={categories.map((c: InventoryCategory) => ({ id: c.id, name: c.name }))}
          onFilterChange={() => {}}
          onClearFilters={() => {}}
        />
      </Drawer>

      <Drawer
        anchor="right"
        open={advancedSearchOpen}
        onClose={handleAdvancedSearchToggle}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 600 }, p: 0 }
        }}
      >
        <AdvancedSearchPanel 
          onClose={handleAdvancedSearchToggle} 
          savedFilters={[]}
          onLoadSavedFilter={() => {}}
          suppliers={[]}
          categories={[]}
          subcategories={[]}
          locations={[]}
          initialFilters={{
            search: '',
            sku: '',
            description: '',
            suppliers: [],
            categories: [],
            subcategories: [],
            locations: [],
            stockLevelRange: { min: 0, max: 1000 },
            receivedDateRange: { start: null, end: null },
            lifecycleStatus: [],
            blockchainVerified: null
          }}
        />
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Inventory; 