import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  Checkbox,
  IconButton,
  useTheme,
  alpha,
  styled,
  Skeleton,
  Chip,
  Tooltip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  height: '100%',
  maxHeight: '100%',
  overflow: 'auto',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  '& .MuiTableCell-head': {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: '0.875rem',
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  fontSize: '0.875rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TableToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Types
export interface Column<T> {
  id: keyof T | 'actions';
  label: string;
  numeric?: boolean;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => React.ReactNode;
  visible?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  title?: string;
  selectable?: boolean;
  sortable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedIds: Array<T[keyof T]>) => void;
  initialSortBy?: keyof T;
  initialSortDirection?: 'asc' | 'desc';
  actions?: React.ReactNode;
  toolbarActions?: React.ReactNode;
  showColumnToggle?: boolean;
  onColumnToggle?: (columns: Column<T>[]) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  rowsPerPage?: number;
  page?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  getRowId?: (row: T) => string | number;
  isRowSelectable?: (row: T) => boolean;
  isRowSelected?: (row: T) => boolean;
  getRowProps?: (row: T) => any;
  getCellProps?: (column: Column<T>, row: T) => any;
}

function DataTable<T>({
  columns,
  data,
  keyField,
  title,
  selectable = false,
  sortable = true,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  onSelectionChange,
  initialSortBy,
  initialSortDirection = 'asc',
  actions,
  toolbarActions,
  showColumnToggle = false,
  onColumnToggle,
  showFilter = false,
  onFilterClick,
  getRowId = (row: T) => String(row[keyField]),
  isRowSelectable = () => true,
  isRowSelected = () => false,
  getRowProps = () => ({}),
  getCellProps = () => ({}),
}: DataTableProps<T>) {
  const theme = useTheme();
  const [orderBy, setOrderBy] = React.useState<keyof T | ''>(initialSortBy || '');
  const [order, setOrder] = React.useState<'asc' | 'desc'>(initialSortDirection);
  const [selected, setSelected] = React.useState<Array<T[keyof T]>>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<Column<T>[]>(
    columns.filter(col => col.visible !== false)
  );

  // Handle sort
  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle select all
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data
        .filter(isRowSelectable)
        .map(n => n[keyField]);
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
      return;
    }
    setSelected([]);
    onSelectionChange?.([]);
  };

  // Handle row selection
  const handleRowSelect = (id: T[keyof T]) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<T[keyof T]> = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  // Check if row is selected
  const isSelected = (id: T[keyof T]) => selected.indexOf(id) !== -1;

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <>
      {Array.from(new Array(5)).map((_, index) => (
        <StyledTableRow key={`skeleton-${index}`}>
          {selectable && (
            <StyledTableCell padding="checkbox">
              <Skeleton variant="rectangular" width={24} height={24} />
            </StyledTableCell>
          )}
          {visibleColumns.map((column, colIndex) => (
            <StyledTableCell
              key={`skeleton-cell-${colIndex}`}
              align={column.align || (column.numeric ? 'right' : 'left')}
            >
              <Skeleton variant="text" width="80%" />
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </>
  );

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {(title || toolbarActions || showFilter || showColumnToggle) && (
        <TableToolbar>
          {title && (
            <Typography variant="subtitle1" fontWeight="medium">
              {title}
              {selected.length > 0 && (
                <Chip
                  size="small"
                  label={`${selected.length} selected`}
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {toolbarActions}
            {showFilter && (
              <Tooltip title="Filter">
                <IconButton size="small" onClick={onFilterClick}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}
            {showColumnToggle && (
              <Tooltip title="Show/Hide Columns">
                <IconButton size="small" onClick={() => onColumnToggle?.(columns)}>
                  <ViewColumnIcon />
                </IconButton>
              </Tooltip>
            )}
            {actions && (
              <Tooltip title="More Actions">
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </TableToolbar>
      )}
      <StyledTableContainer>
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              {selectable && (
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.filter(isRowSelectable).length}
                    checked={data.length > 0 && selected.length === data.filter(isRowSelectable).length}
                    onChange={handleSelectAllClick}
                    size="small"
                  />
                </StyledTableCell>
              )}
              {visibleColumns.map(column => (
                <StyledTableCell
                  key={String(column.id)}
                  align={column.align || (column.numeric ? 'right' : 'left')}
                  style={{ width: column.width }}
                >
                  {sortable && column.sortable !== false && column.id !== 'actions' ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id as keyof T)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {loading ? (
              renderLoadingSkeleton()
            ) : data.length === 0 ? (
              <TableRow>
                <StyledTableCell
                  colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </StyledTableCell>
              </TableRow>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row);
                const rowIsSelected = isRowSelected(row) || isSelected(row[keyField]);
                const rowIsSelectable = isRowSelectable(row);
                
                return (
                  <StyledTableRow
                    hover
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    role={onRowClick ? 'button' : undefined}
                    tabIndex={onRowClick ? -1 : undefined}
                    key={String(rowId)}
                    selected={rowIsSelected}
                    {...getRowProps(row)}
                  >
                    {selectable && (
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          checked={rowIsSelected}
                          onClick={e => e.stopPropagation()}
                          onChange={() => handleRowSelect(row[keyField])}
                          disabled={!rowIsSelectable}
                          size="small"
                        />
                      </StyledTableCell>
                    )}
                    {visibleColumns.map(column => {
                      const value = column.id !== 'actions' ? row[column.id as keyof T] : null;
                      return (
                        <StyledTableCell
                          key={`${rowId}-${String(column.id)}`}
                          align={column.align || (column.numeric ? 'right' : 'left')}
                          {...getCellProps(column, row)}
                        >
                          {column.format ? column.format(value) : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Paper>
  );
}

export default DataTable; 