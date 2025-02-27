import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Chip,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  CircularProgress,
  styled,
  Collapse,
  Button,
  Grid,
  Divider,
  useTheme,
  alpha,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  FileCopy as DuplicateIcon,
  QrCode as QrCodeIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShipIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  ShoppingCart as ShoppingCartIcon,
  VerifiedUser as VerifiedUserIcon,
  FilterList as FilterListIcon,
  ViewColumn as ViewColumnIcon,
} from '@mui/icons-material';
import { TechComponentsInventoryItem } from '../types';

// Define table props
export interface TechComponentsInventoryTableProps {
  items: TechComponentsInventoryItem[];
  loading?: boolean;
  onItemClick: (item: TechComponentsInventoryItem) => void;
  onEditItem?: (item: TechComponentsInventoryItem) => void;
  onDeleteItem?: (itemId: string) => void;
  showBlockchainColumns?: boolean;
}

// Column preset type
interface ColumnPreset {
  id: string;
  name: string;
  columns: string[];
}

// Column definition
interface ColumnDef {
  id: keyof TechComponentsInventoryItem | string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, item: TechComponentsInventoryItem) => React.ReactNode;
}

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 650,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
    height: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: 4,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    cursor: 'pointer',
  },
}));

interface StatusDotProps {
  status: string;
}

const StatusDot = styled('span')<StatusDotProps>(({ theme, status }) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%',
  marginRight: theme.spacing(1),
  backgroundColor: 
    status === 'critical' ? theme.palette.error.main :
    status === 'warning' ? theme.palette.warning.main :
    status === 'good' ? theme.palette.success.main :
    theme.palette.grey[400],
}));

// Main component
export const TechComponentsInventoryTable: React.FC<TechComponentsInventoryTableProps> = ({
  items,
  loading = false,
  onItemClick,
  onEditItem,
  onDeleteItem,
  showBlockchainColumns = true,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string>('default');

  // Column presets
  const columnPresets: ColumnPreset[] = [
    {
      id: 'default',
      name: 'Default View',
      columns: ['name', 'sku', 'currentStock', 'status', 'actions'],
    },
    {
      id: 'ordering',
      name: 'Ordering View',
      columns: ['name', 'sku', 'supplier', 'currentStock', 'reorderPoint', 'leadTime', 'actions'],
    },
    {
      id: 'warehouse',
      name: 'Warehouse View',
      columns: ['name', 'sku', 'category', 'locations', 'currentStock', 'actions'],
    },
    {
      id: 'blockchain',
      name: 'Blockchain View',
      columns: ['name', 'sku', 'blockchainVerified', 'lastReceived', 'lastShipped', 'actions'],
    },
  ];

  // All possible columns
  const allColumns: ColumnDef[] = [
    { 
      id: 'name', 
      label: 'Item Name', 
      minWidth: 200,
      format: (value, item) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getStockStatusDot(item)}
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        </Box>
      )
    },
    { 
      id: 'sku', 
      label: 'SKU', 
      minWidth: 120,
      format: (value) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {value}
        </Typography>
      )
    },
    { 
      id: 'category', 
      label: 'Category', 
      minWidth: 150,
      format: (value, item) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">
            {value}
          </Typography>
        </Box>
      )
    },
    { 
      id: 'subcategory', 
      label: 'Subcategory', 
      minWidth: 150 
    },
    { 
      id: 'supplier', 
      label: 'Supplier', 
      minWidth: 180 
    },
    { 
      id: 'currentStock', 
      label: 'Current Stock', 
      minWidth: 130, 
      align: 'right',
      format: (value) => value.toLocaleString()
    },
    { 
      id: 'minLevel', 
      label: 'Min Level', 
      minWidth: 110, 
      align: 'right',
      format: (value) => value.toLocaleString()
    },
    { 
      id: 'reorderPoint', 
      label: 'Reorder Point', 
      minWidth: 130, 
      align: 'right',
      format: (value) => value.toLocaleString()
    },
    { 
      id: 'leadTime', 
      label: 'Lead Time', 
      minWidth: 110, 
      align: 'right',
      format: (value) => `${value} days`
    },
    { 
      id: 'unitCost', 
      label: 'Unit Cost', 
      minWidth: 110, 
      align: 'right',
      format: (value) => `$${value.toFixed(2)}`
    },
    { 
      id: 'totalValue', 
      label: 'Total Value', 
      minWidth: 120, 
      align: 'right',
      format: (value) => `$${value.toLocaleString()}`
    },
    { 
      id: 'lastReceived', 
      label: 'Last Received', 
      minWidth: 150,
      format: (value) => new Date(value).toLocaleDateString()
    },
    { 
      id: 'lastShipped', 
      label: 'Last Shipped', 
      minWidth: 150,
      format: (value) => new Date(value).toLocaleDateString()
    },
    { 
      id: 'locations', 
      label: 'Locations', 
      minWidth: 150,
      format: (value, item) => (
        <Typography variant="body2">
          {item.locations.length} location{item.locations.length !== 1 ? 's' : ''}
        </Typography>
      )
    },
    { 
      id: 'blockchainVerified', 
      label: 'Blockchain', 
      minWidth: 120,
      format: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {value ? (
            <VerifiedUserIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
          ) : (
            <StatusDot status="warning" />
          )}
          <Typography variant="body2">
            {value ? 'Verified' : 'Unverified'}
          </Typography>
        </Box>
      )
    },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 120,
      format: (value, item) => {
        const status = getStockStatus(item);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StatusDot status={status.severity} />
            <Typography variant="body2">
              {status.label}
            </Typography>
          </Box>
        );
      }
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      format: (value, item) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              handleExpandRow(item.id);
            }}
          >
            {expandedRow === item.id ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      )
    },
  ];

  // Get visible columns based on active preset
  const getVisibleColumns = () => {
    const preset = columnPresets.find(p => p.id === activePreset);
    if (!preset) return allColumns;
    return allColumns.filter(col => preset.columns.includes(col.id));
  };

  // Handle preset change
  const handlePresetChange = (event: SelectChangeEvent) => {
    setActivePreset(event.target.value);
  };

  // Get stock status
  const getStockStatus = (item: TechComponentsInventoryItem) => {
    if (item.currentStock === 0) {
      return { label: 'Out of Stock', severity: 'critical' };
    } else if (item.currentStock < item.reorderPoint) {
      return { label: 'Low Stock', severity: 'warning' };
    } else if (item.currentStock < item.minLevel) {
      return { label: 'Below Min', severity: 'warning' };
    } else {
      return { label: 'In Stock', severity: 'good' };
    }
  };

  // Get stock status dot
  const getStockStatusDot = (item: TechComponentsInventoryItem) => {
    const status = getStockStatus(item);
    return <StatusDot status={status.severity} />;
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle row click
  const handleRowClick = (item: TechComponentsInventoryItem) => {
    onItemClick(item);
  };

  // Handle row expansion
  const handleExpandRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle select all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);
      setSelectedItems(newSelected);
      return;
    }
    setSelectedItems([]);
  };

  // Handle checkbox click
  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1),
      );
    }

    setSelectedItems(newSelected);
  };

  // Check if item is selected
  const isSelected = (id: string) => selectedItems.indexOf(id) !== -1;

  // Empty rows
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  // Visible columns
  const visibleColumns = getVisibleColumns();

  // Helper function to safely render cell values
  const renderCellValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return '';
    }
    
    if (typeof value === 'object' && !React.isValidElement(value)) {
      if (Array.isArray(value)) {
        return JSON.stringify(value);
      }
      return JSON.stringify(value);
    }
    
    return value;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Table toolbar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Box>
          {selectedItems.length > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                {selectedItems.length} selected
              </Typography>
              <ButtonGroup size="small" variant="outlined">
                <Button startIcon={<ShoppingCartIcon />}>
                  Order
                </Button>
                <Button startIcon={<ShipIcon />}>
                  Transfer
                </Button>
                <Button startIcon={<QrCodeIcon />}>
                  QR Codes
                </Button>
              </ButtonGroup>
            </Box>
          ) : (
            <Typography variant="subtitle1">
              Inventory Items
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150, mr: 1 }}>
            <InputLabel id="column-preset-label">View</InputLabel>
            <Select
              labelId="column-preset-label"
              id="column-preset"
              value={activePreset}
              onChange={handlePresetChange}
              label="View"
            >
              {columnPresets.map((preset) => (
                <MenuItem key={preset.id} value={preset.id}>
                  {preset.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Table */}
      <StyledTableContainer>
        <Table stickyHeader aria-label="inventory table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
                  checked={items.length > 0 && selectedItems.length === items.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all items' }}
                />
              </TableCell>
              {visibleColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={40} />
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">No items found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isItemSelected = isSelected(item.id);
                  
                  return (
                    <React.Fragment key={item.id}>
                      <StyledTableRow
                        hover
                        onClick={() => handleRowClick(item)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={(event) => handleCheckboxClick(event, item.id)}
                            inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${item.id}` }}
                          />
                        </TableCell>
                        {visibleColumns.map((column) => {
                          const value = item[column.id as keyof TechComponentsInventoryItem];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value, item) : renderCellValue(value)}
                            </TableCell>
                          );
                        })}
                      </StyledTableRow>
                      
                      {/* Expanded details row */}
                      <TableRow>
                        <TableCell 
                          style={{ paddingBottom: 0, paddingTop: 0 }} 
                          colSpan={visibleColumns.length + 1}
                        >
                          <Collapse in={expandedRow === item.id} timeout="auto" unmountOnExit>
                            <Box sx={{ p: 3, backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Item Details
                                  </Typography>
                                  <Divider sx={{ mb: 1 }} />
                                  <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Category
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.category}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Subcategory
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.subcategory}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Supplier
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.supplier}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Lifecycle
                                      </Typography>
                                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                        {item.lifecycleStatus}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Stock Information
                                  </Typography>
                                  <Divider sx={{ mb: 1 }} />
                                  <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Current Stock
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.currentStock.toLocaleString()}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Min Level
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.minLevel.toLocaleString()}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Reorder Point
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.reorderPoint.toLocaleString()}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Lead Time
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.leadTime} days
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Financial & Blockchain
                                  </Typography>
                                  <Divider sx={{ mb: 1 }} />
                                  <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Unit Cost
                                      </Typography>
                                      <Typography variant="body2">
                                        ${item.unitCost.toFixed(2)}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Total Value
                                      </Typography>
                                      <Typography variant="body2">
                                        ${item.totalValue.toLocaleString()}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Last Received
                                      </Typography>
                                      <Typography variant="body2">
                                        {new Date(item.lastReceived).toLocaleDateString()}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Blockchain
                                      </Typography>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {item.blockchainVerified ? (
                                          <VerifiedUserIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
                                        ) : (
                                          <StatusDot status="warning" />
                                        )}
                                        <Typography variant="body2">
                                          {item.blockchainVerified ? 'Verified' : 'Unverified'}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                
                                <Grid item xs={12}>
                                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                    <Button 
                                      variant="outlined" 
                                      size="small" 
                                      startIcon={<EditIcon />}
                                      sx={{ mr: 1 }}
                                    >
                                      Edit
                                    </Button>
                                    <Button 
                                      variant="outlined" 
                                      size="small" 
                                      startIcon={<ShoppingCartIcon />}
                                      sx={{ mr: 1 }}
                                    >
                                      Order
                                    </Button>
                                    <Button 
                                      variant="outlined" 
                                      size="small" 
                                      startIcon={<ShipIcon />}
                                      sx={{ mr: 1 }}
                                    >
                                      Transfer
                                    </Button>
                                    <Button 
                                      variant="outlined" 
                                      size="small" 
                                      startIcon={<QrCodeIcon />}
                                    >
                                      QR Code
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={visibleColumns.length + 1} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TechComponentsInventoryTable; 