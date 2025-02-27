import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
  ButtonGroup,
  Tooltip,
  IconButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Supplier } from '../types';

// This would be replaced with actual chart components in a real implementation
// For example, using recharts, nivo, or visx
const BarChartPlaceholder = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 200,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 1,
        border: `1px dashed ${theme.palette.grey[300]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Bar Chart Visualization
      </Typography>
      <Typography variant="caption" color="text.secondary">
        (Placeholder - would implement with actual chart library)
      </Typography>
    </Box>
  );
};

const LineChartPlaceholder = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 200,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 1,
        border: `1px dashed ${theme.palette.grey[300]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Line Chart Visualization
      </Typography>
      <Typography variant="caption" color="text.secondary">
        (Placeholder - would implement with actual chart library)
      </Typography>
    </Box>
  );
};

const PieChartPlaceholder = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 200,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 1,
        border: `1px dashed ${theme.palette.grey[300]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Pie Chart Visualization
      </Typography>
      <Typography variant="caption" color="text.secondary">
        (Placeholder - would implement with actual chart library)
      </Typography>
    </Box>
  );
};

interface SupplierAnalyticsProps {
  suppliers: Supplier[];
  onTimeRangeChange: (range: string) => void;
  onExportData: () => void;
  onFilterChange: (filter: string) => void;
}

const SupplierAnalytics: React.FC<SupplierAnalyticsProps> = ({
  suppliers,
  onTimeRangeChange,
  onExportData,
  onFilterChange,
}) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = React.useState('12m');
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    onTimeRangeChange(range);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  // Calculate total annual spend
  const totalAnnualSpend = suppliers.reduce((total, supplier) => 
    total + (supplier.annualSpend || supplier.financials?.annualSpend || 0), 0);
  
  // Calculate average performance score
  const averagePerformance = suppliers.length > 0 
    ? suppliers.reduce((total, supplier) => 
        total + (supplier.performance?.overall || 0), 0) / suppliers.length
    : 0;
  
  // Calculate count of high-risk suppliers
  const highRiskSuppliers = suppliers.filter(supplier => 
    supplier.riskAssessment?.resilienceScore < 60
  ).length;

  // Identify trend direction based on mock data
  const spendTrend = 'up'; // Mock trend direction
  const performanceTrend = 'stable'; // Mock trend direction
  const riskTrend = 'down'; // Mock trend direction

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      case 'down':
        return <TrendingDownIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
      case 'stable':
      default:
        return <TrendingFlatIcon fontSize="small" sx={{ color: theme.palette.info.main }} />;
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
        {/* Header with filters */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Supplier Analytics
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ButtonGroup size="small" aria-label="time range selection">
              <Button 
                variant={timeRange === '3m' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('3m')}
              >
                3M
              </Button>
              <Button 
                variant={timeRange === '6m' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('6m')}
              >
                6M
              </Button>
              <Button 
                variant={timeRange === '12m' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('12m')}
              >
                12M
              </Button>
              <Button 
                variant={timeRange === 'all' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('all')}
              >
                All
              </Button>
            </ButtonGroup>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="mechanical">Mechanical</MenuItem>
                <MenuItem value="packaging">Packaging</MenuItem>
              </Select>
            </FormControl>
            
            <Tooltip title="Export analytics data">
              <IconButton onClick={onExportData} size="small">
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Summary metrics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Annual Spend
                </Typography>
                {getTrendIcon(spendTrend)}
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                ${(totalAnnualSpend / 1000000).toFixed(2)}M
              </Typography>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label="+5.2% vs previous" 
                  size="small" 
                  sx={{ 
                    fontSize: '0.625rem', 
                    height: 20, 
                    backgroundColor: theme.palette.success.light,
                    color: theme.palette.success.dark
                  }} 
                />
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="body2" color="text.secondary">
                  Average Performance Score
                </Typography>
                {getTrendIcon(performanceTrend)}
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                {averagePerformance.toFixed(1)}
              </Typography>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label="+0.8 pts vs previous" 
                  size="small" 
                  sx={{ 
                    fontSize: '0.625rem', 
                    height: 20, 
                    backgroundColor: theme.palette.info.light,
                    color: theme.palette.info.dark
                  }} 
                />
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="body2" color="text.secondary">
                  High Risk Suppliers
                </Typography>
                {getTrendIcon(riskTrend)}
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                {highRiskSuppliers}
              </Typography>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label="-2 vs previous" 
                  size="small" 
                  sx={{ 
                    fontSize: '0.625rem', 
                    height: 20, 
                    backgroundColor: theme.palette.success.light,
                    color: theme.palette.success.dark
                  }} 
                />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Spend by Category
                </Typography>
                <Tooltip title="Breakdown of spend across supplier categories">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <BarChartPlaceholder />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Performance Trends
                </Typography>
                <Tooltip title="Performance score trends over time">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <LineChartPlaceholder />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Spend Distribution
                </Typography>
                <Tooltip title="Spend distribution by supplier">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <PieChartPlaceholder />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Risk Assessment
                </Typography>
                <Tooltip title="Risk level distribution across suppliers">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <PieChartPlaceholder />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SupplierAnalytics; 