import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Button,
  Divider,
  Collapse,
  Slider,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AttachMoney as PriceIcon,
  CalendarMonth as DateIcon,
  InventoryOutlined as InventoryIcon,
} from '@mui/icons-material';

// Define category interface locally
export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const FilterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FilterChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export interface InventoryFiltersState {
  search: string;
  category: string[];
  status: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  priceRange: [number, number];
  dateRange: [Date | null, Date | null];
  stockLevel: [number, number];
}

interface InventoryFiltersProps {
  categories: Category[];
  initialFilters?: Partial<InventoryFiltersState>;
  onFilterChange: (filters: InventoryFiltersState) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  categories,
  initialFilters,
  onFilterChange,
  onClearFilters,
  onClose
}) => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filters, setFilters] = useState<InventoryFiltersState>({
    search: initialFilters?.search || '',
    category: initialFilters?.category || [],
    status: initialFilters?.status || [],
    sortBy: initialFilters?.sortBy || 'name',
    sortOrder: initialFilters?.sortOrder || 'asc',
    priceRange: initialFilters?.priceRange || [0, 10000],
    dateRange: initialFilters?.dateRange || [null, null],
    stockLevel: initialFilters?.stockLevel || [0, 1000],
  });
  
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Update filters and notify parent
  const updateFilters = (newFilters: Partial<InventoryFiltersState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    
    // Track active filters
    const active: string[] = [];
    if (updatedFilters.search) active.push('Search');
    if (updatedFilters.category.length > 0) active.push('Category');
    if (updatedFilters.status.length > 0) active.push('Status');
    if (updatedFilters.priceRange[0] > 0 || updatedFilters.priceRange[1] < 10000) active.push('Price');
    if (updatedFilters.dateRange[0] || updatedFilters.dateRange[1]) active.push('Date');
    if (updatedFilters.stockLevel[0] > 0 || updatedFilters.stockLevel[1] < 1000) active.push('Stock');
    
    setActiveFilters(active);
  };
  
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: event.target.value });
  };
  
  // Handle category selection change
  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    updateFilters({ category: value });
  };
  
  // Handle status selection change
  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    updateFilters({ status: value });
  };
  
  // Handle sort by change
  const handleSortByChange = (event: SelectChangeEvent) => {
    updateFilters({ sortBy: event.target.value });
  };
  
  // Handle sort order change
  const handleSortOrderChange = () => {
    updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    updateFilters({ priceRange: newValue as [number, number] });
  };
  
  // Handle stock level change
  const handleStockLevelChange = (event: Event, newValue: number | number[]) => {
    updateFilters({ stockLevel: newValue as [number, number] });
  };
  
  // Clear single filter
  const handleClearFilter = (filterName: string) => {
    switch (filterName) {
      case 'Search':
        updateFilters({ search: '' });
        break;
      case 'Category':
        updateFilters({ category: [] });
        break;
      case 'Status':
        updateFilters({ status: [] });
        break;
      case 'Price':
        updateFilters({ priceRange: [0, 10000] });
        break;
      case 'Date':
        updateFilters({ dateRange: [null, null] });
        break;
      case 'Stock':
        updateFilters({ stockLevel: [0, 1000] });
        break;
      default:
        break;
    }
  };
  
  // Toggle expanded filters
  const handleToggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };
  
  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      search: '',
      category: [],
      status: [],
      sortBy: 'name',
      sortOrder: 'asc',
      priceRange: [0, 10000],
      dateRange: [null, null],
      stockLevel: [0, 1000],
    });
    setActiveFilters([]);
    onClearFilters();
  };

  return (
    <StyledPaper>
      {/* Main filter row */}
      <FilterSection>
        <TextField
          placeholder="Search inventory items..."
          value={filters.search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: filters.search && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => updateFilters({ search: '' })}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={filters.sortBy}
            label="Sort By"
            onChange={handleSortByChange}
            startAdornment={<SortIcon fontSize="small" sx={{ mr: 1 }} />}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
            <MenuItem value="date_added">Date Added</MenuItem>
            <MenuItem value="last_updated">Last Updated</MenuItem>
          </Select>
        </FormControl>
        
        <IconButton 
          onClick={handleSortOrderChange} 
          size="small"
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            transform: filters.sortOrder === 'desc' ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
        
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleToggleFilters}
          endIcon={filtersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
        </Button>
        
        {activeFilters.length > 0 && (
          <Button 
            variant="text" 
            color="error" 
            size="small"
            onClick={handleClearAllFilters}
          >
            Clear All
          </Button>
        )}
      </FilterSection>
      
      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {activeFilters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              onDelete={() => handleClearFilter(filter)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      )}
      
      {/* Expanded filters */}
      <Collapse in={filtersExpanded}>
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Category filter */}
          <FormControl sx={{ minWidth: 200, flexGrow: 1 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              multiple
              value={filters.category}
              onChange={handleCategoryChange}
              label="Category"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const category = categories.find(cat => cat.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={category ? category.name : value} 
                        size="small" 
                      />
                    );
                  })}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Status filter */}
          <FormControl sx={{ minWidth: 200, flexGrow: 1 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              multiple
              value={filters.status}
              onChange={handleStatusChange}
              label="Status"
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              <MenuItem value="On Order">On Order</MenuItem>
              <MenuItem value="Discontinued">Discontinued</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
          {/* Price range filter */}
          <Box sx={{ minWidth: 200, flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PriceIcon fontSize="small" sx={{ mr: 1 }} />
              Price Range
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
              min={0}
              max={10000}
              step={100}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                ${filters.priceRange[0]}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${filters.priceRange[1]}
              </Typography>
            </Box>
          </Box>
          
          {/* Stock level filter */}
          <Box sx={{ minWidth: 200, flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InventoryIcon fontSize="small" sx={{ mr: 1 }} />
              Stock Level
            </Typography>
            <Slider
              value={filters.stockLevel}
              onChange={handleStockLevelChange}
              min={0}
              max={1000}
              step={10}
              valueLabelDisplay="auto"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                {filters.stockLevel[0]} units
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {filters.stockLevel[1]} units
              </Typography>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </StyledPaper>
  );
};

export default InventoryFilters; 