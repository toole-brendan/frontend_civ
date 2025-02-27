import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Chip,
  Tooltip,
  Avatar,
  Collapse,
  Typography,
  useTheme,
  Button,
  alpha,
  Grid,
  Checkbox,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  Badge,
  Stack,
  Tabs,
  Tab,
  LinearProgress,
  Divider,
  useMediaQuery,
  Skeleton,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import TokenIcon from '@mui/icons-material/Token';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HistoryIcon from '@mui/icons-material/History';
import { Supplier } from '../types';
import { FixedSizeList as VirtualizedList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { DataTable, StatusChip, VerificationBadge, PerformanceBadge } from './shared';
import type { Column as BaseColumn } from './shared/DataTable';

// Extend the Column type to include 'select'
type Column<T> = Omit<BaseColumn<T>, 'id'> & {
  id: keyof T | 'actions' | 'select';
};

// Define additional properties that are used in the table but not in the Supplier type
interface ExtendedSupplier extends Omit<Supplier, 'contactInfo' | 'metrics'> {
  performanceScore?: number;
  categories?: string[];
  annualSpend?: number;
  percentOfTotalSpend?: number;
  logo?: string;
  activeOrders?: number | { count: number; value: number };
  paymentTerms?: string;
  shellTokenStatus?: string;
  contractExpiration?: string;
  blockchainVerificationStatus?: string;
  contactInfo?: {
    email: string;
    phone: string;
    primaryContact: string;
  };
  metrics?: {
    onTimeDelivery: number;
    defectRate: number;
    responseTime: number;
  };
  needsAttention?: boolean;
  contactName?: string;
  email?: string;
  phone?: string;
  status: string;
}

interface HeadCell {
  id: keyof ExtendedSupplier | 'actions' | 'select';
  label: string;
  numeric: boolean;
  sortable: boolean;
  align: 'left' | 'right' | 'center';
  width?: string;
  visible: boolean;
}

interface SupplierTableProps {
  suppliers: ExtendedSupplier[];
  onViewDetails: (supplier: ExtendedSupplier) => void;
  onContactSupplier: (supplier: ExtendedSupplier) => void;
  onCreateOrder: (supplier: ExtendedSupplier) => void;
  onPaySupplier: (supplier: ExtendedSupplier) => void;
  onExpandRow: (supplierId: string) => void;
  expandedSupplierId: string | null;
  isLoading?: boolean;
}

interface SavedViewType {
  id: string;
  name: string;
  columns: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

type Order = 'asc' | 'desc';

const defaultHeadCells: HeadCell[] = [
  { id: 'select', label: '', numeric: false, sortable: false, align: 'center', width: '48px', visible: true },
  { id: 'name', label: 'Supplier', numeric: false, sortable: true, align: 'left', visible: true },
  { id: 'performanceScore', label: 'Performance', numeric: true, sortable: true, align: 'center', width: '120px', visible: true },
  { id: 'categories', label: 'Categories', numeric: false, sortable: false, align: 'left', visible: true },
  { id: 'annualSpend', label: 'Annual Spend', numeric: true, sortable: true, align: 'right', width: '140px', visible: true },
  { id: 'activeOrders', label: 'Active Orders', numeric: true, sortable: true, align: 'center', width: '120px', visible: true },
  { id: 'paymentTerms', label: 'Payment Terms', numeric: false, sortable: true, align: 'center', width: '130px', visible: true },
  { id: 'shellTokenStatus', label: 'Shell Token', numeric: false, sortable: true, align: 'center', width: '120px', visible: true },
  { id: 'contractExpiration', label: 'Contract Expiration', numeric: false, sortable: true, align: 'center', width: '150px', visible: true },
  { id: 'blockchainVerificationStatus', label: 'Verification', numeric: false, sortable: true, align: 'center', width: '120px', visible: true },
  { id: 'actions', label: 'Actions', numeric: false, sortable: false, align: 'center', width: '120px', visible: true },
];

const savedViewsPreset: SavedViewType[] = [
  { id: '1', name: 'Default View', columns: ['name', 'performanceScore', 'categories', 'annualSpend', 'activeOrders', 'paymentTerms', 'shellTokenStatus', 'contractExpiration', 'blockchainVerificationStatus'], sortBy: 'annualSpend', sortOrder: 'desc' },
  { id: '2', name: 'Payment Focus', columns: ['name', 'annualSpend', 'paymentTerms', 'shellTokenStatus', 'contractExpiration'], sortBy: 'annualSpend', sortOrder: 'desc' },
  { id: '3', name: 'Performance View', columns: ['name', 'performanceScore', 'contractExpiration', 'blockchainVerificationStatus'], sortBy: 'performanceScore', sortOrder: 'desc' },
];

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  onViewDetails,
  onContactSupplier,
  onCreateOrder,
  onPaySupplier,
  onExpandRow,
  expandedSupplierId,
  isLoading = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof ExtendedSupplier>('annualSpend');
  const [selected, setSelected] = useState<string[]>([]);
  const [headCells, setHeadCells] = useState<HeadCell[]>(defaultHeadCells);
  const [density, setDensity] = useState<'compact' | 'standard'>('standard');
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);
  const [viewMenuAnchorEl, setViewMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [saveViewOpen, setSaveViewOpen] = useState(false);
  const [newViewName, setNewViewName] = useState('');
  const [savedViews, setSavedViews] = useState<SavedViewType[]>(savedViewsPreset);
  const [currentViewId, setCurrentViewId] = useState<string>('1');
  const [expandedContent, setExpandedContent] = useState<'details' | 'profile' | 'orders' | 'payments' | 'history'>('details');

  useEffect(() => {
    // Apply the current saved view configuration
    const currentView = savedViews.find(v => v.id === currentViewId);
    if (currentView) {
      setOrderBy(currentView.sortBy as keyof ExtendedSupplier);
      setOrder(currentView.sortOrder);
      
      setHeadCells(prevHeadCells => 
        prevHeadCells.map(cell => ({
          ...cell,
          visible: cell.id === 'select' || cell.id === 'actions' || currentView.columns.includes(cell.id as string)
        }))
      );
    }
  }, [currentViewId, savedViews]);

  const handleRequestSort = (property: keyof ExtendedSupplier | 'actions' | 'select') => {
    if (property === 'actions' || property === 'select') return; // Skip sorting for actions column
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property as keyof ExtendedSupplier);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = suppliers.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsAnchorEl(null);
  };

  const handleViewMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setViewMenuAnchorEl(event.currentTarget);
  };

  const handleViewMenuClose = () => {
    setViewMenuAnchorEl(null);
  };

  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setColumnMenuAnchorEl(null);
  };

  const handleToggleFilters = () => {
    console.log('Toggle filters');
    // Implement filter toggle logic here
  };

  const handleBulkExport = () => {
    console.log('Exporting', selected.length, 'suppliers');
    handleActionsMenuClose();
  };

  const handleBulkDelete = () => {
    console.log('Deleting', selected.length, 'suppliers');
    setSelected([]);
    handleActionsMenuClose();
  };

  const handleDensityChange = (
    event: React.MouseEvent<HTMLElement>,
    newDensity: 'compact' | 'standard',
  ) => {
    if (newDensity !== null) {
      setDensity(newDensity);
    }
  };

  const handleColumnVisibilityChange = (columnId: string) => {
    setHeadCells(prevHeadCells =>
      prevHeadCells.map(cell => ({
        ...cell,
        visible: cell.id === columnId ? !cell.visible : cell.visible
      }))
    );
  };

  const handleSaveViewDialogOpen = () => {
    setSaveViewOpen(true);
    handleViewMenuClose();
  };

  const handleSaveViewDialogClose = () => {
    setSaveViewOpen(false);
    setNewViewName('');
  };

  const handleSaveView = () => {
    if (newViewName.trim()) {
      const visibleColumns = headCells
        .filter(cell => cell.visible && cell.id !== 'select' && cell.id !== 'actions')
        .map(cell => cell.id as string);
      
      const newView: SavedViewType = {
        id: Date.now().toString(),
        name: newViewName,
        columns: visibleColumns,
        sortBy: orderBy as string,
        sortOrder: order
      };
      
      setSavedViews([...savedViews, newView]);
      setCurrentViewId(newView.id);
      handleSaveViewDialogClose();
    }
  };

  const handleLoadView = (viewId: string) => {
    setCurrentViewId(viewId);
    handleViewMenuClose();
  };

  const handleDeleteView = (viewId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSavedViews(savedViews.filter(view => view.id !== viewId));
    if (currentViewId === viewId) {
      setCurrentViewId('1'); // Reset to default view
    }
  };

  const handleExpandedContentChange = (
    event: React.SyntheticEvent,
    newValue: 'details' | 'profile' | 'orders' | 'payments' | 'history',
  ) => {
    setExpandedContent(newValue);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const getComparator = <T extends keyof ExtendedSupplier>(
    order: Order,
    orderBy: T
  ): ((a: ExtendedSupplier, b: ExtendedSupplier) => number) => {
    return order === 'desc'
      ? (a, b) => {
          if (orderBy === 'activeOrders') {
            // Handle nested object using the type guard
            const aValue = isActiveOrdersObject(a.activeOrders) ? a.activeOrders.value : 0;
            const bValue = isActiveOrdersObject(b.activeOrders) ? b.activeOrders.value : 0;
            return bValue - aValue;
          }
          
          if (orderBy === 'categories') {
            // Handle array
            return (b.categories?.length || 0) - (a.categories?.length || 0);
          }

          // Safely handle potentially undefined values
          const bValue = b[orderBy] ?? '';
          const aValue = a[orderBy] ?? '';
          
          if (bValue < aValue) {
            return -1;
          }
          if (bValue > aValue) {
            return 1;
          }
          return 0;
        }
      : (a, b) => {
          if (orderBy === 'activeOrders') {
            // Handle nested object using the type guard
            const aValue = isActiveOrdersObject(a.activeOrders) ? a.activeOrders.value : 0;
            const bValue = isActiveOrdersObject(b.activeOrders) ? b.activeOrders.value : 0;
            return aValue - bValue;
          }
          
          if (orderBy === 'categories') {
            // Handle array
            return (a.categories?.length || 0) - (b.categories?.length || 0);
          }

          // Safely handle potentially undefined values
          const aValue = a[orderBy] ?? '';
          const bValue = b[orderBy] ?? '';
          
          if (aValue < bValue) {
            return -1;
          }
          if (aValue > bValue) {
            return 1;
          }
          return 0;
        };
  };

  const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const getPerformanceColor = (score: number | undefined) => {
    if (!score) return theme.palette.error.main;
    if (score >= 95) return theme.palette.success.main;
    if (score >= 90) return theme.palette.success.light;
    if (score >= 85) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      case 'PARTIALLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      case 'VERIFICATION_PENDING':
        return <WarningIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      default:
        return <WarningIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
    }
  };

  const getVerificationStatusText = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return 'Fully verified';
      case 'PARTIALLY_VERIFIED':
        return 'Partially verified';
      case 'VERIFICATION_PENDING':
        return 'Verification pending';
      default:
        return 'Not verified';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    
    // Add expiration warning if it's within 30 days
    if (diffDays <= 30 && diffDays > 0) {
      return (
        <Tooltip title="Expiring soon">
          <Typography component="span" sx={{ color: theme.palette.warning.main }}>
            {formattedDate} <span style={{ fontWeight: 'bold' }}>(in {diffDays} days)</span>
          </Typography>
        </Tooltip>
      );
    }
    
    // Add expired warning if it's past
    if (diffDays <= 0) {
      return (
        <Tooltip title="Contract expired">
          <Typography component="span" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            {formattedDate} (Expired)
          </Typography>
        </Tooltip>
      );
    }
    
    return formattedDate;
  };

  const getShellTokenStatus = (status: string) => {
    switch (status) {
      case 'ENABLED':
        return (
          <Chip 
            label="Enabled" 
            size="small" 
            sx={{ 
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark,
              fontWeight: 'medium',
            }} 
          />
        );
      case 'PENDING':
        return (
          <Chip 
            label="Pending" 
            size="small" 
            sx={{ 
              backgroundColor: theme.palette.warning.light,
              color: theme.palette.warning.dark,
              fontWeight: 'medium',
            }} 
          />
        );
      default:
        return (
          <Chip 
            label="Not Available" 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderColor: theme.palette.grey[400],
              color: theme.palette.grey[600],
              fontWeight: 'medium',
            }} 
          />
        );
    }
  };

  // Helper function to check if activeOrders is an object with value property
  const isActiveOrdersObject = (
    activeOrders: number | { count: number; value: number } | undefined
  ): activeOrders is { count: number; value: number } => {
    return typeof activeOrders === 'object' && activeOrders !== null && 'value' in activeOrders;
  };

  const formatOrderValue = (row: ExtendedSupplier) => {
    if (!row.activeOrders) return '0';
    if (isActiveOrdersObject(row.activeOrders)) {
      return formatCurrency(row.activeOrders.value);
    }
    return '';
  };

  const renderOrderCount = (row: ExtendedSupplier) => {
    if (!row.activeOrders) return '0';
    if (isActiveOrdersObject(row.activeOrders)) {
      return row.activeOrders.count.toString();
    }
    return row.activeOrders.toString();
  };

  // Determine if supplier needs attention based on various criteria
  const needsAttention = (supplier: ExtendedSupplier): boolean => {
    // Contract expiration within 30 days
    if (supplier.contractExpiration) {
      const expiryDate = new Date(supplier.contractExpiration);
      const now = new Date();
      const diffTime = expiryDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 30 && diffDays > 0) return true;
    }
    
    // Verification pending
    if (supplier.blockchainVerificationStatus === 'VERIFICATION_PENDING') return true;
    
    // Shell token status pending
    if (supplier.shellTokenStatus === 'PENDING') return true;
    
    // Low performance score
    if (supplier.performanceScore && supplier.performanceScore < 85) return true;
    
    return supplier.needsAttention || false;
  };

  // Render the expanded detail content
  const renderExpandedContent = (supplier: ExtendedSupplier) => {
    return (
      <Box sx={{ p: 3, backgroundColor: alpha(theme.palette.primary.light, 0.05) }}>
        <Tabs
          value={expandedContent}
          onChange={handleExpandedContentChange}
          aria-label="supplier expanded details tabs"
          sx={{ mb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Tab 
            icon={<InfoIcon fontSize="small" />}
            iconPosition="start"
            label="Overview" 
            value="details"
          />
          <Tab 
            icon={<FactCheckIcon fontSize="small" />}
            iconPosition="start"
            label="Profile" 
            value="profile"
          />
          <Tab 
            icon={<ShoppingCartIcon fontSize="small" />}
            iconPosition="start"
            label="Orders" 
            value="orders"
          />
          <Tab 
            icon={<AccountBalanceWalletIcon fontSize="small" />}
            iconPosition="start"
            label="Payments" 
            value="payments"
          />
          <Tab 
            icon={<HistoryIcon fontSize="small" />}
            iconPosition="start"
            label="History" 
            value="history"
          />
        </Tabs>
        
        {expandedContent === 'details' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Supplier Overview
                </Typography>
                <Typography variant="body2">
                  {supplier.name} is a {supplier.categories?.join(', ')} supplier with an annual spend of {formatCurrency(supplier.annualSpend)}.
                  This represents {supplier.percentOfTotalSpend}% of your total annual spend.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Performance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: getPerformanceColor(supplier.performanceScore),
                      color: '#fff',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {supplier.performanceScore || 'N/A'}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Overall Score
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last evaluated on {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Contract Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Expiration
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {supplier.contractExpiration ? formatDate(supplier.contractExpiration) : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Terms
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {supplier.paymentTerms || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Verification Status
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {supplier.blockchainVerificationStatus ? (
                        <>
                          {getVerificationStatusIcon(supplier.blockchainVerificationStatus)}
                          <Typography variant="body2" fontWeight="medium">
                            {getVerificationStatusText(supplier.blockchainVerificationStatus)}
                          </Typography>
                        </>
                      ) : 'N/A'}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Shell Token Status
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {supplier.shellTokenStatus || 'Not Available'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onViewDetails(supplier)}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    mr: 1
                  }}
                >
                  View Full Profile
                </Button>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={() => onPaySupplier(supplier)}
                  disabled={supplier.shellTokenStatus !== 'ENABLED'}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                  }}
                >
                  Make Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        
        {expandedContent === 'profile' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Profile details would be displayed here. This would include company information, contacts, certifications, etc.
            </Typography>
          </Box>
        )}
        
        {expandedContent === 'orders' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Order history and active orders would be displayed here.
            </Typography>
          </Box>
        )}
        
        {expandedContent === 'payments' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Payment history and scheduled payments would be displayed here.
            </Typography>
          </Box>
        )}
        
        {expandedContent === 'history' && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Relationship history and important events would be displayed here.
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  // Render a loading skeleton when data is loading
  const renderLoadingSkeleton = () => {
    return Array.from(new Array(5)).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell padding="checkbox">
          <Skeleton variant="rectangular" width={20} height={20} />
        </TableCell>
        {headCells.filter(cell => cell.visible).map((cell, cellIndex) => (
          <TableCell key={`cell-skeleton-${cellIndex}`} align={cell.align}>
            {cell.id === 'name' ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="circular" width={36} height={36} sx={{ mr: 1.5 }} />
                <Box sx={{ width: '100%' }}>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="50%" height={16} />
                </Box>
              </Box>
            ) : cell.id === 'performanceScore' ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : cell.id === 'categories' ? (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Skeleton variant="rounded" width={60} height={22} />
                <Skeleton variant="rounded" width={60} height={22} />
              </Box>
            ) : (
              <Skeleton variant="text" width={cell.id === 'actions' ? 100 : '80%'} height={24} />
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const visibleHeadCells = headCells.filter(cell => cell.visible);
  const currentView = savedViews.find(view => view.id === currentViewId);
  
  const renderCellContent = (supplier: ExtendedSupplier, cellId: keyof ExtendedSupplier | 'actions' | 'select') => {
    const value = supplier[cellId as keyof typeof supplier];
    
    // Handle null or undefined
    if (value === null || value === undefined) {
      return 'N/A';
    }
    
    // Handle objects by converting to string
    if (typeof value === 'object' && value !== null) {
      // You can implement specific formatting for known object types
      if ('count' in value && 'value' in value) {
        return `${value.count} (${formatCurrency(value.value)})`;
      }
      
      // For arrays, join elements
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      
      // For other objects, convert to string representation
      return JSON.stringify(value);
    }
    
    // Return primitive values directly
    return value;
  };

  // Add proper types for the Row component
  interface RowProps {
    index: number;
    style: React.CSSProperties;
  }

  // Row renderer function for virtualized list
  const Row = ({ index, style }: RowProps) => {
    const supplier = suppliers[index];
    const isItemSelected = isSelected(supplier.id);
    const isExpanded = expandedSupplierId === supplier.id;
    const supplierNeedsAttention = needsAttention(supplier);
    
    return (
      <TableRow 
        hover 
        key={supplier.id} 
        style={{ ...style, display: 'flex' }}
      >
        <TableCell component="div" style={{ flex: 1 }}>
          {supplier.name}
        </TableCell>
        <TableCell component="div" style={{ flex: 1 }}>
          {supplier.contactName}
        </TableCell>
        <TableCell component="div" style={{ flex: 1 }}>
          {supplier.email}
        </TableCell>
        <TableCell component="div" style={{ flex: 1 }}>
          {supplier.phone}
        </TableCell>
        <TableCell component="div" style={{ flex: 1 }}>
          <Chip 
            label={supplier.status} 
            color={getStatusColor(supplier.status)} 
            size="small" 
          />
        </TableCell>
        <TableCell component="div" style={{ flex: 1 }}>
          {/* Action buttons */}
          <IconButton size="small" onClick={() => onViewDetails(supplier)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onContactSupplier(supplier)}>
            <EmailIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onCreateOrder(supplier)}>
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onPaySupplier(supplier)}>
            <AccountBalanceWalletIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  // Add the missing getStatusColor function
  const getStatusColor = (status: string | undefined): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    if (!status) return "default";
    
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'INACTIVE':
        return 'error';
      case 'ONBOARDING':
        return 'info';
      case 'SUSPENDED':
        return 'error';
      default:
        return 'default';
    }
  };

  // Add the missing action handlers
  const onEdit = (supplier: ExtendedSupplier) => {
    console.log('Edit supplier', supplier.id);
  };

  const onDelete = (id: string) => {
    console.log('Delete supplier', id);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <DataTable
        columns={headCells.filter(cell => cell.visible).map(cell => ({
          ...cell,
          id: cell.id === 'select' ? 'actions' : cell.id,
        }))}
        data={suppliers}
        keyField="id"
        title="Suppliers"
        selectable
        onSelectionChange={(selectedIds) => setSelected(selectedIds.map(id => String(id)))}
        onRowClick={(supplier) => onViewDetails(supplier)}
        loading={isLoading}
        emptyMessage="No suppliers found"
        toolbarActions={
          <>
            <Button
              size="small"
              variant="outlined"
              onClick={handleViewMenuOpen}
              startIcon={<BookmarkIcon />}
            >
              Views
            </Button>
          </>
        }
        showColumnToggle
        showFilter
        onFilterClick={handleToggleFilters}
      />
      
      {/* Saved Views Menu */}
      <Menu
        anchorEl={viewMenuAnchorEl}
        open={Boolean(viewMenuAnchorEl)}
        onClose={handleViewMenuClose}
      >
        <MenuItem onClick={handleSaveViewDialogOpen}>
          <ListItemIcon>
            <SaveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Save Current View</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarkIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Default View</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Save View Dialog */}
      <Dialog open={saveViewOpen} onClose={handleSaveViewDialogClose}>
        <DialogTitle>Save Current View</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="view-name"
            label="View Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newViewName}
            onChange={(e) => setNewViewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveViewDialogClose}>Cancel</Button>
          <Button onClick={handleSaveView} variant="contained" disabled={!newViewName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierTable;