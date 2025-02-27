import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs, Paper, useTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HistoryIcon from '@mui/icons-material/History';
import RecommendIcon from '@mui/icons-material/Recommend';

// Components
import TransferHeader from './components/TransferHeader';
import TransferStatsStrip from './components/TransferStatsStrip';
import TransferFilters, { TransferFilterValues } from './components/TransferFilters';
import AdvancedTransferTable from './components/AdvancedTransferTable';
import TransferStatusPipeline from './components/TransferStatusPipeline';
import CriticalTransfersPanel from './components/CriticalTransfersPanel';
import TransferAnalyticsPanel from './components/TransferAnalyticsPanel';
import TransferActionsPanel from './components/TransferActionsPanel';

// Mock data
import {
  mockTransfers,
  mockTransferMetrics,
  criticalTransfers,
  mockAnalyticsMetrics,
} from './mockData';

// Types
import { Transfer } from './types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`transfer-tabpanel-${index}`}
      aria-labelledby={`transfer-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const TransfersPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>(mockTransfers);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle transfer selection
  const handleTransferSelect = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
  };

  // Handle filter changes
  const handleFilterChange = (filters: TransferFilterValues) => {
    // In a real app, this would filter the transfers based on the filter values
    console.log('Filters applied:', filters);
    
    // For demo purposes, just return all transfers
    setFilteredTransfers(mockTransfers);
  };

  // Handle search
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredTransfers(mockTransfers);
      return;
    }
    
    const filtered = mockTransfers.filter(
      (transfer) =>
        transfer.id.toLowerCase().includes(query.toLowerCase()) ||
        transfer.from.name.toLowerCase().includes(query.toLowerCase()) ||
        transfer.to.name.toLowerCase().includes(query.toLowerCase()) ||
        transfer.items.some((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredTransfers(filtered);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilteredTransfers(mockTransfers);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // Handle view transfer details
  const handleViewTransferDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    console.log('View transfer details:', transfer.id);
  };

  // Handle view transfer by ID (for components that only have the ID)
  const handleViewTransferById = (transferId: string) => {
    const transfer = mockTransfers.find(t => t.id === transferId);
    if (transfer) {
      setSelectedTransfer(transfer);
      console.log('View transfer details by ID:', transferId);
    }
  };

  // Handle update transfer status
  const handleUpdateTransferStatus = (transfer: Transfer, newStatus: string) => {
    console.log('Update transfer status:', transfer.id, 'to', newStatus);
  };

  // Handle process receipt
  const handleProcessReceipt = (transfer: Transfer) => {
    console.log('Process receipt for transfer:', transfer.id);
  };

  // Handle trigger payment
  const handleTriggerPayment = (transfer: Transfer) => {
    console.log('Trigger payment for transfer:', transfer.id);
  };

  // Handle view documents
  const handleViewDocuments = (transfer: Transfer) => {
    console.log('View documents for transfer:', transfer.id);
  };

  // Handle create transfer
  const handleCreateTransfer = () => {
    console.log('Create new transfer');
  };

  // Handle scan QR code
  const handleScanQR = () => {
    console.log('Scan QR code');
  };

  // Handle view pending approvals
  const handleViewPendingApprovals = () => {
    console.log('View pending approvals');
  };

  // Handle filter view change
  const handleFilterViewChange = (filter: string) => {
    console.log('Change filter view to:', filter);
  };

  // Handle critical transfer action
  const handleCriticalTransferAction = (transferId: string, action: string) => {
    console.log('Take action on critical transfer:', transferId, 'Action:', action);
  };

  // Handle add tracking
  const handleAddTracking = (transfer: Transfer) => {
    console.log('Add tracking for transfer:', transfer.id);
  };

  // Handle verify contents
  const handleVerifyContents = (transfer: Transfer) => {
    console.log('Verify contents for transfer:', transfer.id);
  };

  // Handle generate documents
  const handleGenerateDocuments = (transfer: Transfer) => {
    console.log('Generate documents for transfer:', transfer.id);
  };

  // Handle request verification
  const handleRequestVerification = (transfer: Transfer, step: string) => {
    console.log('Request verification for transfer:', transfer.id, 'Step:', step);
  };

  // Handle metric click
  const handleMetricClick = (metricKey: string) => {
    console.log('Metric clicked:', metricKey);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <TransferHeader
        onCreateTransfer={handleCreateTransfer}
        onScanQR={handleScanQR}
        onViewPendingApprovals={handleViewPendingApprovals}
        onFilterChange={handleFilterViewChange}
      />

      {/* Stats Strip */}
      <TransferStatsStrip metrics={mockTransferMetrics} onMetricClick={handleMetricClick} />

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiTab-root': {
              minHeight: 64,
              py: 2,
            },
          }}
        >
          <Tab
            icon={<LocalShippingIcon />}
            label="Active Transfers"
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<WarningIcon />}
            label="Critical Transfers"
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<AnalyticsIcon />}
            label="Analytics"
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<HistoryIcon />}
            label="Completed Transfers"
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            icon={<RecommendIcon />}
            label="Suggested Transfers"
            iconPosition="start"
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
      </Paper>

      {/* Active Transfers Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TransferFilters
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onReset={handleResetFilters}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <AdvancedTransferTable
              transfers={filteredTransfers}
              onViewDetails={handleViewTransferDetails}
              onUpdateStatus={handleUpdateTransferStatus}
              onProcessReceipt={handleProcessReceipt}
              onTriggerPayment={handleTriggerPayment}
              onViewDocuments={handleViewDocuments}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={filteredTransfers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TransferActionsPanel
              selectedTransfer={selectedTransfer}
              onUpdateStatus={handleUpdateTransferStatus}
              onAddTracking={handleAddTracking}
              onProcessReceipt={handleProcessReceipt}
              onVerifyContents={handleVerifyContents}
              onGenerateDocuments={handleGenerateDocuments}
              onTriggerPayment={handleTriggerPayment}
              onRequestVerification={handleRequestVerification}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Critical Transfers Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TransferStatusPipeline
              transfers={mockTransfers.filter((t) => t.isCritical)}
              onTransferClick={handleViewTransferDetails}
            />
          </Grid>

          <Grid item xs={12}>
            <CriticalTransfersPanel
              onViewTransfer={handleViewTransferById}
              onTakeAction={handleCriticalTransferAction}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TransferAnalyticsPanel metrics={mockAnalyticsMetrics} />
          </Grid>

          <Grid item xs={12} md={4}>
            <CriticalTransfersPanel
              onViewTransfer={handleViewTransferById}
              onTakeAction={handleCriticalTransferAction}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Completed Transfers Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TransferFilters
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onReset={handleResetFilters}
            />
          </Grid>

          <Grid item xs={12}>
            {/* In a real app, this would be a table of completed transfers */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <h3>Completed Transfers</h3>
                <p>This tab would display a table of completed transfers with verification status.</p>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Suggested Transfers Tab */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* In a real app, this would be a table of suggested transfers */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <h3>Suggested Transfers</h3>
                <p>This tab would display a table of suggested transfers based on inventory optimization.</p>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default TransfersPage; 