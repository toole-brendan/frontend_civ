import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Autocomplete,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  useTheme,
  SelectChangeEvent,
  OutlinedInput
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { InventoryFilters, SavedFilter } from '../types';

interface AdvancedSearchPanelProps {
  onClose: () => void;
  open?: boolean;
  onSearch?: (filters: InventoryFilters) => void;
  onSaveSearch?: (name: string, filters: InventoryFilters) => void;
  onClearFilters?: () => void;
  savedFilters: SavedFilter[];
  onLoadSavedFilter: (filter: SavedFilter) => void;
  suppliers: string[];
  categories: string[];
  subcategories: string[];
  locations: string[];
  initialFilters: InventoryFilters;
}

export const AdvancedSearchPanel: React.FC<AdvancedSearchPanelProps> = ({
  onClose,
  open = false,
  onSearch = () => {},
  onSaveSearch = (name, filters) => {},
  onClearFilters = () => {},
  savedFilters,
  onLoadSavedFilter,
  suppliers,
  categories,
  subcategories,
  locations,
  initialFilters
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<InventoryFilters>(initialFilters);
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveFilter, setShowSaveFilter] = useState(false);

  const handleFilterChange = (field: keyof InventoryFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStockRangeChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilters(prev => ({
        ...prev,
        stockLevelRange: {
          min: newValue[0],
          max: newValue[1]
        }
      }));
    }
  };

  const handleDateChange = (field: 'start' | 'end', date: Date | null) => {
    setFilters(prev => ({
      ...prev,
      receivedDateRange: {
        ...prev.receivedDateRange,
        [field]: date ? date.toISOString().split('T')[0] : null
      }
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      search: '',
      sku: '',
      description: '',
      suppliers: [],
      categories: [],
      subcategories: [],
      locations: [],
      stockLevelRange: {
        min: 0,
        max: 10000
      },
      receivedDateRange: {
        start: null,
        end: null
      },
      lifecycleStatus: [],
      blockchainVerified: null
    });
    onClearFilters();
  };

  const handleSaveFilter = () => {
    if (saveFilterName.trim()) {
      onSaveSearch(saveFilterName, filters);
      setSaveFilterName('');
      setShowSaveFilter(false);
    }
  };

  const handleLoadFilter = (filter: SavedFilter) => {
    setFilters(filter.filters);
    onLoadSavedFilter(filter);
  };

  const lifecycleStatusOptions = [
    'new',
    'active',
    'mature',
    'declining',
    'end-of-life',
    'obsolete'
  ];

  if (!open) return null;

  return (
    <Collapse in={open}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Advanced Search
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<SaveIcon />}
              onClick={() => setShowSaveFilter(!showSaveFilter)}
              sx={{ mr: 1 }}
            >
              Save Search
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              onClick={handleClear}
              sx={{ mr: 1 }}
            >
              Clear All
            </Button>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Save Filter Input */}
        <Collapse in={showSaveFilter}>
          <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
            <TextField
              fullWidth
              size="small"
              label="Filter Name"
              value={saveFilterName}
              onChange={(e) => setSaveFilterName(e.target.value)}
              placeholder="Enter a name for this search filter"
              sx={{ mr: 2 }}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSaveFilter}
              disabled={!saveFilterName.trim()}
            >
              Save
            </Button>
          </Box>
        </Collapse>

        {/* Saved Filters */}
        {savedFilters.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Saved Searches
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {savedFilters.map((filter) => (
                <Chip
                  key={filter.id}
                  label={filter.name}
                  icon={<BookmarkIcon />}
                  onClick={() => handleLoadFilter(filter)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        <Grid container spacing={3}>
          {/* First Row */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="General Search"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search across all fields"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="SKU / Part Number"
              value={filters.sku}
              onChange={(e) => handleFilterChange('sku', e.target.value)}
              placeholder="Enter exact SKU or part number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Description / Keywords"
              value={filters.description}
              onChange={(e) => handleFilterChange('description', e.target.value)}
              placeholder="Search in component descriptions"
            />
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={suppliers}
              value={filters.suppliers}
              onChange={(_, newValue) => handleFilterChange('suppliers', newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Supplier" placeholder="Select suppliers" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={categories}
              value={filters.categories}
              onChange={(_, newValue) => handleFilterChange('categories', newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Category" placeholder="Select categories" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={subcategories}
              value={filters.subcategories}
              onChange={(_, newValue) => handleFilterChange('subcategories', newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Subcategory" placeholder="Select subcategories" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Grid>

          {/* Third Row */}
          <Grid item xs={12} md={4}>
            <Autocomplete
              multiple
              options={locations}
              value={filters.locations}
              onChange={(_, newValue) => handleFilterChange('locations', newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Location" placeholder="Select locations" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="lifecycle-status-label">Lifecycle Status</InputLabel>
              <Select
                labelId="lifecycle-status-label"
                multiple
                value={filters.lifecycleStatus}
                onChange={(e) => handleFilterChange('lifecycleStatus', e.target.value)}
                input={<OutlinedInput label="Lifecycle Status" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {lifecycleStatusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="blockchain-verified-label">Blockchain Verified</InputLabel>
              <Select
                labelId="blockchain-verified-label"
                value={filters.blockchainVerified === null ? '' : filters.blockchainVerified.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    handleFilterChange('blockchainVerified', null);
                  } else {
                    handleFilterChange('blockchainVerified', value === 'true');
                  }
                }}
                label="Blockchain Verified"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="true">Verified</MenuItem>
                <MenuItem value="false">Not Verified</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Fourth Row */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Stock Level Range
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={[filters.stockLevelRange.min, filters.stockLevelRange.max]}
                onChange={handleStockRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Min: {filters.stockLevelRange.min}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Max: {filters.stockLevelRange.max}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Last Received Date Range
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="From"
                  value={filters.receivedDateRange.start ? new Date(filters.receivedDateRange.start) : null}
                  onChange={(date) => handleDateChange('start', date)}
                  slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                />
                <DatePicker
                  label="To"
                  value={filters.receivedDateRange.end ? new Date(filters.receivedDateRange.end) : null}
                  onChange={(date) => handleDateChange('end', date)}
                  slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                />
              </Box>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            size="large"
          >
            Search
          </Button>
        </Box>
      </Paper>
    </Collapse>
  );
};

export default AdvancedSearchPanel; 