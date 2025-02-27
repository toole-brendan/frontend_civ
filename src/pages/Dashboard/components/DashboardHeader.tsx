import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Tooltip,
  useTheme,
  Badge,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import PageHeader from '../../../components/common/PageHeader';

interface DashboardHeaderProps {
  userName: string;
  notificationCount: number;
  onNotificationsClick?: () => void;
  onExportClick?: () => void;
  onGenerateReport?: () => void;
  onRefreshData?: () => void;
  onSearch?: (query: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  notificationCount,
  onNotificationsClick = () => {},
  onExportClick = () => {},
  onGenerateReport = () => {},
  onRefreshData = () => {},
  onSearch = () => {}
}) => {
  const theme = useTheme();
  const [warehouse, setWarehouse] = useState<string>('all');
  const [date, setDate] = useState<Date | null>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const handleWarehouseChange = (event: SelectChangeEvent) => {
    setWarehouse(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  // Get current day of week and date
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = today.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <PageHeader>
      {/* Title and Stats Row */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Welcome back, {userName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            Here's your overview for {dayOfWeek}, {formattedDate}
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search dashboard..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <TuneIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Box>

      {/* Actions Row */}
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="warehouse-select-label">Location</InputLabel>
            <Select
              labelId="warehouse-select-label"
              id="warehouse-select"
              value={warehouse}
              label="Location"
              onChange={handleWarehouseChange}
            >
              <MenuItem value="all">All Locations</MenuItem>
              <MenuItem value="austin">Austin</MenuItem>
              <MenuItem value="sanJose">San Jose</MenuItem>
              <MenuItem value="guadalajara">Guadalajara</MenuItem>
            </Select>
          </FormControl>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Range"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{ 
                textField: { 
                  size: 'small',
                  sx: { width: 150 }
                } 
              }}
            />
          </LocalizationProvider>
          
          <Button 
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRefreshData}
          >
            Refresh Data
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={onGenerateReport}
          >
            Analytics
          </Button>
          
          <Button 
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={onGenerateReport}
          >
            Generate Report
          </Button>
          
          <Button 
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={onExportClick}
          >
            Export Data
          </Button>
          
          <Tooltip title="Notifications">
            <IconButton onClick={onNotificationsClick}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Learn more about the dashboard">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </PageHeader>
  );
};

export default DashboardHeader;

 