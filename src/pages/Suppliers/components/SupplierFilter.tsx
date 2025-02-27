import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Button,
  Collapse,
  Divider,
  useTheme,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
  InputAdornment,
  Badge,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TuneIcon from '@mui/icons-material/Tune';
import StandardCard from './shared/StandardCard';

// Available filter options for the component
const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];
const CATEGORIES = ['Electronics', 'Mechanical', 'Chemical', 'Packaging', 'Raw Materials', 'Software', 'Services'];
const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'South America', 'Middle East', 'Africa'];
const VERIFICATION_STATUS = ['Verified', 'Pending', 'Rejected', 'Expired'];
const SHELL_TOKEN_STATUS = ['Enabled', 'Disabled', 'Pending'];

interface SupplierFilterProps {
  onFilterChange: (filters: FilterState) => void;
  onSaveFilter: (filterName: string, filters: FilterState) => void;
  onLoadFilter: (filterName: string) => void;
  savedFilters: { name: string; filters: FilterState }[];
}

interface FilterState {
  searchQuery: string;
  riskLevels: string[];
  categories: string[];
  regions: string[];
  verificationStatus: string[];
  shellTokenStatus: string[];
  minPerformanceScore: number;
  maxPerformanceScore: number;
  minAnnualSpend: number;
  maxAnnualSpend: number;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  riskLevels: [],
  categories: [],
  regions: [],
  verificationStatus: [],
  shellTokenStatus: [],
  minPerformanceScore: 0,
  maxPerformanceScore: 100,
  minAnnualSpend: 0,
  maxAnnualSpend: 1000000,
};

const SupplierFilter: React.FC<SupplierFilterProps> = ({
  onFilterChange,
  onSaveFilter,
  onLoadFilter,
  savedFilters,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [filterState, setFilterState] = React.useState<FilterState>(initialFilterState);
  const [filterName, setFilterName] = React.useState('');
  const [activeFiltersCount, setActiveFiltersCount] = React.useState(0);
  const [showSavedFilters, setShowSavedFilters] = React.useState(false);

  // Calculate the number of active filters
  React.useEffect(() => {
    let count = 0;
    if (filterState.searchQuery) count++;
    if (filterState.riskLevels.length > 0) count++;
    if (filterState.categories.length > 0) count++;
    if (filterState.regions.length > 0) count++;
    if (filterState.verificationStatus.length > 0) count++;
    if (filterState.shellTokenStatus.length > 0) count++;
    if (filterState.minPerformanceScore > 0 || filterState.maxPerformanceScore < 100) count++;
    if (filterState.minAnnualSpend > 0 || filterState.maxAnnualSpend < 1000000) count++;
    setActiveFiltersCount(count);
  }, [filterState]);

  // Handle changes to multi-select filters
  const handleMultiSelectChange = (
    event: SelectChangeEvent<string[]>,
    filterKey: keyof FilterState
  ) => {
    const {
      target: { value },
    } = event;
    
    setFilterState({
      ...filterState,
      [filterKey]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Handle changes to performance score range
  const handlePerformanceScoreChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFilterState({
      ...filterState,
      minPerformanceScore: min,
      maxPerformanceScore: max,
    });
  };

  // Handle changes to annual spend range
  const handleAnnualSpendChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFilterState({
      ...filterState,
      minAnnualSpend: min,
      maxAnnualSpend: max,
    });
  };

  // Handle changes to search query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      searchQuery: event.target.value,
    });
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange(filterState);
  };

  // Reset filters to initial state
  const resetFilters = () => {
    setFilterState(initialFilterState);
    onFilterChange(initialFilterState);
  };

  // Save current filter configuration
  const saveFilter = () => {
    if (filterName.trim()) {
      onSaveFilter(filterName, filterState);
      setFilterName('');
    }
  };

  // Format currency values for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 3, 
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
      }}
    >
      {/* Quick Filters - Always Visible */}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search suppliers..."
              value={filterState.searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: filterState.searchQuery && (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={() => setFilterState({...filterState, searchQuery: ''})}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="risk-level-label">Risk Level</InputLabel>
              <Select
                labelId="risk-level-label"
                multiple
                value={filterState.riskLevels}
                onChange={(e) => handleMultiSelectChange(e, 'riskLevels')}
                input={<OutlinedInput label="Risk Level" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {RISK_LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={filterState.riskLevels.indexOf(level) > -1} />
                    <ListItemText primary={level} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                multiple
                value={filterState.categories}
                onChange={(e) => handleMultiSelectChange(e, 'categories')}
                input={<OutlinedInput label="Category" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Checkbox checked={filterState.categories.indexOf(category) > -1} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setExpanded(!expanded)}
                startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                size="small"
                fullWidth
              >
                <Badge badgeContent={activeFiltersCount} color="primary" sx={{ mr: 1 }}>
                  <TuneIcon />
                </Badge>
                {expanded ? 'Less' : 'More'}
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                onClick={applyFilters}
                size="small"
              >
                Apply
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      {/* Advanced Filters - Expandable */}
      <Collapse in={expanded}>
        <Divider />
        <Box sx={{ p: 2, bgcolor: theme.palette.background.default }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Performance Score
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={[filterState.minPerformanceScore, filterState.maxPerformanceScore]}
                  onChange={handlePerformanceScoreChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 25, label: '25' },
                    { value: 50, label: '50' },
                    { value: 75, label: '75' },
                    { value: 100, label: '100' },
                  ]}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Annual Spend
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={[filterState.minAnnualSpend, filterState.maxAnnualSpend]}
                  onChange={handleAnnualSpendChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000000}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 250000, label: '$250K' },
                    { value: 500000, label: '$500K' },
                    { value: 750000, label: '$750K' },
                    { value: 1000000, label: '$1M' },
                  ]}
                  valueLabelFormat={(value) => formatCurrency(value)}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="region-label">Region</InputLabel>
                <Select
                  labelId="region-label"
                  multiple
                  value={filterState.regions}
                  onChange={(e) => handleMultiSelectChange(e, 'regions')}
                  input={<OutlinedInput label="Region" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {REGIONS.map((region) => (
                    <MenuItem key={region} value={region}>
                      <Checkbox checked={filterState.regions.indexOf(region) > -1} />
                      <ListItemText primary={region} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="verification-status-label">Verification Status</InputLabel>
                <Select
                  labelId="verification-status-label"
                  multiple
                  value={filterState.verificationStatus}
                  onChange={(e) => handleMultiSelectChange(e, 'verificationStatus')}
                  input={<OutlinedInput label="Verification Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {VERIFICATION_STATUS.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={filterState.verificationStatus.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="shell-token-status-label">Shell Token Status</InputLabel>
                <Select
                  labelId="shell-token-status-label"
                  multiple
                  value={filterState.shellTokenStatus}
                  onChange={(e) => handleMultiSelectChange(e, 'shellTokenStatus')}
                  input={<OutlinedInput label="Shell Token Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {SHELL_TOKEN_STATUS.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={filterState.shellTokenStatus.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<BookmarkIcon />}
                onClick={() => setShowSavedFilters(!showSavedFilters)}
                size="small"
              >
                Saved Filters
              </Button>
              
              {showSavedFilters && (
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value=""
                    displayEmpty
                    onChange={(e) => onLoadFilter(e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Select a filter
                    </MenuItem>
                    {savedFilters.map((filter) => (
                      <MenuItem key={filter.name} value={filter.name}>
                        {filter.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {activeFiltersCount > 0 && (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={resetFilters}
                  size="small"
                >
                  Reset
                </Button>
              )}
              
              <TextField
                placeholder="Filter name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                size="small"
                sx={{ width: 150 }}
              />
              
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SaveAltIcon />}
                onClick={saveFilter}
                disabled={!filterName.trim()}
                size="small"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default SupplierFilter; 