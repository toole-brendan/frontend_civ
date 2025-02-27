import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import { BusinessMetrics } from '../types';

interface AnalyticsHeaderProps {
  metrics: Partial<BusinessMetrics>;
  onSearch?: (query: string) => void;
  onExportData?: () => void;
  onGenerateReport?: () => void;
  onSaveReport?: () => void;
  onShareReport?: () => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  metrics = {},
  onSearch = () => {},
  onExportData = () => {},
  onGenerateReport = () => {},
  onSaveReport = () => {},
  onShareReport = () => {},
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  // Format numbers with commas and dollar signs where appropriate
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Format percentages
  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <Box 
      sx={{ 
        mb: 3, 
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
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
            Analytics Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            {metrics.totalRevenue ? formatCurrency(metrics.totalRevenue) : '$0'} Revenue | 
            {metrics.profitMargin ? formatPercent(metrics.profitMargin) : '0%'} Margin | 
            {metrics.totalOrders ? metrics.totalOrders.toLocaleString() : '0'} Orders
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search analytics..."
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
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={onGenerateReport}
          >
            Custom Report
          </Button>
          <Button 
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={onSaveReport}
          >
            Save Dashboard
          </Button>
          <Button 
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={onShareReport}
          >
            Share Report
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={onGenerateReport}
          >
            Generate PDF
          </Button>
          <Button 
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={onExportData}
          >
            Export Data
          </Button>
          <Tooltip title="Learn more about analytics">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AnalyticsHeader; 