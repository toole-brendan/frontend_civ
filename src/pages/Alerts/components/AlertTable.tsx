import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Tooltip,
  TablePagination,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent,
  styled,
  useTheme,
  Badge,
  Stack,
  Divider,
  TableSortLabel,
  alpha,
  Avatar,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  ErrorOutline as ErrorOutlineIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Storage as StorageIcon,
  LocalShipping as LocalShippingIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Factory as FactoryIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
  DoneAll as DoneAllIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  GetApp as GetAppIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

// Styled components
const TableHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TableActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexWrap: 'wrap',
}));

const TableFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 'calc(100vh - 300px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.background.paper 
      : theme.palette.grey[50],
    fontWeight: 600,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.action.hover, 0.05)
      : alpha(theme.palette.action.hover, 0.05),
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.action.hover, 0.1)
      : alpha(theme.palette.action.hover, 0.1),
    cursor: 'pointer',
  },
  '&.selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.2)
      : alpha(theme.palette.primary.main, 0.1),
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
  height: '24px',
}));

const SeverityIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Alert type definition
export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info' | 'resolved';
  type: 'inventory' | 'transfer' | 'payment' | 'supplier' | 'system' | 'quality';
  description: string;
  creationTime: string;
  status: 'new' | 'in_progress' | 'pending' | 'resolved';
  impactLevel: 'high' | 'medium' | 'low';
  source: string;
  owner: string | null;
  details: {
    title: string;
    [key: string]: any;
  };
}

interface AlertTableProps {
  alerts: Alert[];
  onSelectAlert: (alertId: string) => void;
  severityFilter?: 'all' | 'critical' | 'warning' | 'info';
  statusFilter?: 'all' | 'new' | 'in_progress' | 'pending' | 'resolved';
  assignmentFilter?: 'all' | 'assigned' | 'unassigned' | 'me';
}

type Order = 'asc' | 'desc';
type OrderBy = keyof Alert | 'owner';

const AlertTable: React.FC<AlertTableProps> = ({
  alerts,
  onSelectAlert,
  severityFilter = 'all',
  statusFilter = 'all',
  assignmentFilter = 'all',
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('creationTime');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Filter alerts based on the current filters
  const filteredAlerts = alerts.filter((alert) => {
    // Apply severity filter
    if (severityFilter !== 'all' && alert.severity !== severityFilter) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter !== 'all' && alert.status !== statusFilter) {
      return false;
    }
    
    // Apply assignment filter
    if (assignmentFilter === 'assigned' && alert.owner === null) {
      return false;
    }
    if (assignmentFilter === 'unassigned' && alert.owner !== null) {
      return false;
    }
    if (assignmentFilter === 'me' && alert.owner !== 'Michael Chen') { // Hardcoded for demo
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        alert.description.toLowerCase().includes(query) ||
        alert.id.toLowerCase().includes(query) ||
        alert.source.toLowerCase().includes(query) ||
        (alert.owner && alert.owner.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Sort the filtered alerts
  const sortedAlerts = filteredAlerts.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    
    if (orderBy === 'owner') {
      const aOwner = a.owner || '';
      const bOwner = b.owner || '';
      return order === 'asc'
        ? aOwner.localeCompare(bOwner)
        : bOwner.localeCompare(aOwner);
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    // Handle null or undefined values
    if (aValue === null || aValue === undefined) return order === 'asc' ? -1 : 1;
    if (bValue === null || bValue === undefined) return order === 'asc' ? 1 : -1;
    
    return order === 'asc'
      ? (aValue > bValue ? 1 : -1)
      : (bValue > aValue ? 1 : -1);
  });

  // Pagination
  const paginatedAlerts = sortedAlerts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Handle sort request
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Toggle filters visibility
  const handleToggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  // Handle alert selection
  const handleSelectAlert = (alert: Alert) => {
    setSelectedAlertId(alert.id);
    onSelectAlert(alert.id);
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, alert: Alert) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedAlert(alert);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAlert(null);
  };

  // Handle alert assignment
  const handleAssignToMe = () => {
    console.log('Assign to me:', selectedAlert?.id);
    handleMenuClose();
  };

  // Handle alert resolution
  const handleResolveAlert = () => {
    console.log('Resolve alert:', selectedAlert?.id);
    handleMenuClose();
  };

  // Handle alert export
  const handleExportAlert = () => {
    console.log('Export alert:', selectedAlert?.id);
    handleMenuClose();
  };

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <SeverityIcon>
            <ErrorOutlineIcon sx={{ color: theme.palette.error.main }} />
          </SeverityIcon>
        );
      case 'warning':
        return (
          <SeverityIcon>
            <WarningIcon sx={{ color: theme.palette.warning.main }} />
          </SeverityIcon>
        );
      case 'info':
        return (
          <SeverityIcon>
            <InfoIcon sx={{ color: theme.palette.info.main }} />
          </SeverityIcon>
        );
      case 'resolved':
        return (
          <SeverityIcon>
            <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
          </SeverityIcon>
        );
      default:
        return null;
    }
  };

  // Get alert type icon
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return <StorageIcon fontSize="small" />;
      case 'transfer':
        return <LocalShippingIcon fontSize="small" />;
      case 'payment':
        return <AccountBalanceWalletIcon fontSize="small" />;
      case 'supplier':
        return <FactoryIcon fontSize="small" />;
      case 'system':
        return <SettingsIcon fontSize="small" />;
      default:
        return <InfoIcon fontSize="small" />;
    }
  };

  // Get status chip
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <StatusChip
            label="New"
            size="small"
            color="error"
          />
        );
      case 'in_progress':
        return (
          <StatusChip
            label="In Progress"
            size="small"
            color="warning"
          />
        );
      case 'pending':
        return (
          <StatusChip
            label="Pending"
            size="small"
            color="info"
          />
        );
      case 'resolved':
        return (
          <StatusChip
            label="Resolved"
            size="small"
            color="success"
          />
        );
      default:
        return null;
    }
  };

  // Get impact level chip
  const getImpactLevelChip = (impactLevel: string) => {
    switch (impactLevel) {
      case 'high':
        return (
          <StatusChip
            label="High"
            size="small"
            sx={{ 
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
              fontWeight: 'bold',
            }}
            variant="outlined"
          />
        );
      case 'medium':
        return (
          <StatusChip
            label="Medium"
            size="small"
            sx={{ 
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              color: theme.palette.warning.main,
              borderColor: theme.palette.warning.main,
              fontWeight: 'bold',
            }}
            variant="outlined"
          />
        );
      case 'low':
        return (
          <StatusChip
            label="Low"
            size="small"
            sx={{ 
              bgcolor: alpha(theme.palette.info.main, 0.1),
              color: theme.palette.info.main,
              borderColor: theme.palette.info.main,
              fontWeight: 'bold',
            }}
            variant="outlined"
          />
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Box>
      {/* Table Header */}
      <TableHeader>
        <Typography variant="h6">Alert Management</Typography>
        <TableActions>
          <TextField
            size="small"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 220 }}
          />
          <Tooltip title="Toggle Filters">
            <IconButton onClick={handleToggleFilters} color={filtersVisible ? 'primary' : 'default'}>
              <Badge color="primary" variant="dot" invisible={!filtersVisible}>
                <FilterListIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </TableActions>
      </TableHeader>

      {/* Filters */}
      <Collapse in={filtersVisible}>
        <FiltersContainer>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Severity</InputLabel>
            <Select
              value={severityFilter}
              label="Severity"
              onChange={(e) => console.log('Severity filter changed:', e.target.value)}
            >
              <MenuItem value="all">All Severities</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="info">Info</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => console.log('Status filter changed:', e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Assignment</InputLabel>
            <Select
              value={assignmentFilter}
              label="Assignment"
              onChange={(e) => console.log('Assignment filter changed:', e.target.value)}
            >
              <MenuItem value="all">All Assignments</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="unassigned">Unassigned</MenuItem>
              <MenuItem value="me">Assigned to Me</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            size="small"
            onClick={() => console.log('Reset filters')}
            sx={{ ml: 'auto' }}
          >
            Reset Filters
          </Button>
        </FiltersContainer>
      </Collapse>

      {/* Table */}
      <StyledTableContainer>
        <Table stickyHeader aria-label="alerts table" size="medium">
          <StyledTableHead>
            <TableRow>
              <TableCell padding="checkbox" width="48px">
                {/* Severity */}
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={orderBy === 'description' ? order : 'asc'}
                  onClick={() => handleRequestSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell width="120px">
                <TableSortLabel
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? order : 'asc'}
                  onClick={() => handleRequestSort('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell width="120px">
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell width="120px">
                <TableSortLabel
                  active={orderBy === 'impactLevel'}
                  direction={orderBy === 'impactLevel' ? order : 'asc'}
                  onClick={() => handleRequestSort('impactLevel')}
                >
                  Impact
                </TableSortLabel>
              </TableCell>
              <TableCell width="150px">
                <TableSortLabel
                  active={orderBy === 'creationTime'}
                  direction={orderBy === 'creationTime' ? order : 'asc'}
                  onClick={() => handleRequestSort('creationTime')}
                >
                  Created
                </TableSortLabel>
              </TableCell>
              <TableCell width="150px">
                <TableSortLabel
                  active={orderBy === 'owner'}
                  direction={orderBy === 'owner' ? order : 'asc'}
                  onClick={() => handleRequestSort('owner')}
                >
                  Owner
                </TableSortLabel>
              </TableCell>
              <TableCell width="48px" align="center">
                Actions
              </TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedAlerts.length > 0 ? (
              paginatedAlerts.map((alert) => (
                <StyledTableRow
                  key={alert.id}
                  onClick={() => handleSelectAlert(alert)}
                  className={selectedAlertId === alert.id ? 'selected' : ''}
                  hover
                >
                  <TableCell padding="checkbox">
                    {getSeverityIcon(alert.severity)}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" fontWeight={500}>
                        {alert.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.source}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getAlertTypeIcon(alert.type)}
                      <Typography variant="body2">
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{getStatusChip(alert.status)}</TableCell>
                  <TableCell>{getImpactLevelChip(alert.impactLevel)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2">{formatDate(alert.creationTime)}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {alert.owner ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          sx={{ width: 24, height: 24, fontSize: '0.75rem' }}
                        >
                          {alert.owner.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{alert.owner}</Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Unassigned
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, alert)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No alerts found matching the current filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Table Footer */}
      <TableFooter>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {filteredAlerts.length} alerts found
          </Typography>
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredAlerts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableFooter>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAssignToMe}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Assign to Me
        </MenuItem>
        <MenuItem onClick={handleResolveAlert}>
          <ListItemIcon>
            <DoneAllIcon fontSize="small" />
          </ListItemIcon>
          Mark as Resolved
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleExportAlert}>
          <ListItemIcon>
            <GetAppIcon fontSize="small" />
          </ListItemIcon>
          Export Details
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AlertTable; 