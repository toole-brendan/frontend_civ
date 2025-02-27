import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useTheme,
  alpha,
  styled,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Import components
import AnalyticsHeader from './components/AnalyticsHeader';
import AnalyticsCard from './components/AnalyticsCard';
import SalesChart from './components/SalesChart';
import ProductPerformance from './components/ProductPerformance';
import AnalyticsFilters from './components/AnalyticsFilters';
import { AnalyticsFilters as AnalyticsFiltersType, TimePeriod, ComparisonType, BusinessMetrics } from './types';

// Mock data for sales chart
const monthlySalesData = [
  { month: 'Jan', sales: 65000, costs: 38000, profit: 27000 },
  { month: 'Feb', sales: 59000, costs: 39000, profit: 20000 },
  { month: 'Mar', sales: 80000, costs: 40000, profit: 40000 },
  { month: 'Apr', sales: 81000, costs: 41000, profit: 40000 },
  { month: 'May', sales: 56000, costs: 36000, profit: 20000 },
  { month: 'Jun', sales: 55000, costs: 35000, profit: 20000 },
  { month: 'Jul', sales: 67000, costs: 39000, profit: 28000 },
  { month: 'Aug', sales: 75000, costs: 42000, profit: 33000 },
  { month: 'Sep', sales: 80000, costs: 45000, profit: 35000 },
  { month: 'Oct', sales: 90000, costs: 48000, profit: 42000 },
  { month: 'Nov', sales: 100000, costs: 52000, profit: 48000 },
  { month: 'Dec', sales: 115000, costs: 58000, profit: 57000 },
];

// Mock data for product performance
const productPerformanceData = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    imageUrl: '',
    origin: 'Ethiopia',
    category: 'Single Origin',
    sales: 2500,
    revenue: 62500,
    profit: 25000,
    profitMargin: 40,
    inventory: 1200,
    trend: 12,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    imageUrl: '',
    origin: 'Colombia',
    category: 'Single Origin',
    sales: 2200,
    revenue: 48400,
    profit: 16940,
    profitMargin: 35,
    inventory: 800,
    trend: 8,
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Morning Blend',
    imageUrl: '',
    origin: 'Various',
    category: 'Blend',
    sales: 3100,
    revenue: 55800,
    profit: 13950,
    profitMargin: 25,
    inventory: 1500,
    trend: -3,
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Dark Roast Espresso',
    imageUrl: '',
    origin: 'Brazil',
    category: 'Espresso',
    sales: 1800,
    revenue: 43200,
    profit: 12960,
    profitMargin: 30,
    inventory: 600,
    trend: 15,
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Decaf Sumatra',
    imageUrl: '',
    origin: 'Indonesia',
    category: 'Decaf',
    sales: 900,
    revenue: 22500,
    profit: 2700,
    profitMargin: 12,
    inventory: 400,
    trend: -8,
    rating: 4.0,
  },
  {
    id: '6',
    name: 'Kenyan AA',
    imageUrl: '',
    origin: 'Kenya',
    category: 'Specialty',
    sales: 1200,
    revenue: 36000,
    profit: 14400,
    profitMargin: 40,
    inventory: 300,
    trend: 22,
    rating: 4.9,
  },
];

// Mock data for business metrics
const businessMetrics: BusinessMetrics = {
  totalRevenue: 923000,
  lastMonthRevenue: 78500,
  totalCost: 615000,
  grossProfit: 308000,
  profitMargin: 0.334,
  totalOrders: 1245,
  averageOrderValue: 741,
  returnRate: 0.023,
  totalCustomers: 387,
  newCustomers: 42,
  repeatRate: 0.68,
};

// Tab Panel Component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

// Tab props
function a11yProps(index: number) {
  return {
    id: `analytics-tab-${index}`,
    'aria-controls': `analytics-tabpanel-${index}`,
  };
}

// Styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&.Mui-focusVisible': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  textTransform: 'none',
}));

const Analytics: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<AnalyticsFiltersType>({
    timePeriod: 'last30Days',
    comparison: 'previousPeriod',
    products: [],
    origins: [],
    customers: [],
    suppliers: [],
    certifications: [],
    dateRange: {
      startDate: null,
      endDate: null,
    },
  });

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle more menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    console.log('Filters updated:', { ...filters, ...newFilters });
  };

  const handleClearFilters = () => {
    setFilters({
      timePeriod: 'last30Days',
      comparison: 'previousPeriod',
      products: [],
      origins: [],
      customers: [],
      suppliers: [],
      certifications: [],
      dateRange: {
        startDate: null,
        endDate: null,
      },
    });
  };

  const handleSaveReport = () => {
    console.log('Saving report with current configuration');
    handleMenuClose();
  };

  const handleExportData = () => {
    console.log('Exporting data');
    handleMenuClose();
  };

  const handleGenerateReport = () => {
    console.log('Generating PDF report');
    handleMenuClose();
  };

  const handleShareReport = () => {
    console.log('Sharing report');
    handleMenuClose();
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <Container maxWidth="xl">
      <AnalyticsHeader 
        metrics={businessMetrics}
        onSearch={handleSearch}
        onExportData={handleExportData}
        onGenerateReport={handleGenerateReport}
        onSaveReport={handleSaveReport}
        onShareReport={handleShareReport}
      />
      
      {/* Rest of the component */}
      <Box sx={{ mb: 4 }}>
        <AnalyticsFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </Box>

      {/* Key Business Metrics */}
      <Typography variant="h6" sx={{ mb: 2 }}>Key Business Metrics</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Total Revenue"
            value={businessMetrics.totalRevenue}
            suffix="USD"
            icon={<AttachMoneyIcon />}
            trend={{
              value: 12.5,
              label: 'vs previous period',
              isPercentage: true
            }}
            comparePeriod={filters.timePeriod}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Profit Margin"
            value={`${businessMetrics.profitMargin}%`}
            icon={<TrendingUpIcon />}
            trend={{
              value: 2.8,
              label: "vs last period",
              isPercentage: true
            }}
            comparePeriod={filters.timePeriod}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Total Orders"
            value={businessMetrics.totalOrders}
            icon={<StorefrontIcon />}
            trend={{
              value: 8.3,
              label: 'vs previous period',
              isPercentage: true
            }}
            comparePeriod={filters.timePeriod}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Inventory Value"
            value={320500}
            suffix="USD"
            icon={<InventoryIcon />}
            trend={{
              value: -5.2,
              label: "vs last period",
              isPercentage: true,
              isPositiveBetter: false
            }}
            comparePeriod={filters.timePeriod}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Tabs for different analytics views */}
      <Paper sx={{ width: '100%', mb: 4, border: `1px solid ${theme.palette.divider}`, borderRadius: 0 }}>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="analytics tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <StyledTab label="Sales Performance" {...a11yProps(0)} />
          <StyledTab label="Product Analytics" {...a11yProps(1)} />
          <StyledTab label="Customer Insights" {...a11yProps(2)} />
          <StyledTab label="Supply Chain" {...a11yProps(3)} />
          <StyledTab label="Inventory" {...a11yProps(4)} />
        </StyledTabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SalesChart
                  data={monthlySalesData}
                  title="Revenue, Costs, and Profit Trends"
                  xAxisDataKey="month"
                  series={[
                    { name: 'Revenue', dataKey: 'sales', color: theme.palette.primary.main },
                    { name: 'Costs', dataKey: 'costs', color: theme.palette.error.main },
                    { name: 'Profit', dataKey: 'profit', color: theme.palette.success.main },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AnalyticsCard
                  title="Average Order Value"
                  value={businessMetrics.averageOrderValue}
                  suffix="USD"
                  trend={{
                    value: 3.2,
                    label: "vs last period",
                    isPercentage: true
                  }}
                  comparePeriod={filters.timePeriod}
                  color="primary.main"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AnalyticsCard
                  title="Return Rate"
                  value={`${businessMetrics.returnRate}%`}
                  trend={{
                    value: -0.3,
                    label: "vs last period",
                    isPercentage: true,
                    isPositiveBetter: false
                  }}
                  comparePeriod={filters.timePeriod}
                  color="success.main"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AnalyticsCard
                  title="Customer Acquisition Cost"
                  value={42.75}
                  suffix="USD"
                  trend={{
                    value: -5.1,
                    label: "vs last period",
                    isPercentage: true,
                    isPositiveBetter: false
                  }}
                  comparePeriod={filters.timePeriod}
                  color="info.main"
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ProductPerformance
                  title="Product Performance"
                  data={productPerformanceData}
                  onProductClick={(id) => alert(`View product ${id} details (mock function)`)}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Customer Insights</Typography>
            <Typography variant="body2">
              Customer analytics would be displayed here, including customer segments, retention rates, and lifetime value.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Supply Chain Analytics</Typography>
            <Typography variant="body2">
              Supply chain performance metrics would be displayed here, including supplier performance, logistics costs, and lead times.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Inventory Analytics</Typography>
            <Typography variant="body2">
              Inventory metrics would be displayed here, including stock levels, turnover rates, and product freshness for coffee beans.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Analytics; 