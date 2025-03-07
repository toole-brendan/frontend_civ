import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Badge,
  Tooltip,
  Stack,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PageHeader from '../../../components/common/PageHeader';

interface TransferHeaderProps {
  onCreateTransfer: () => void;
  onScanQR: () => void;
  onViewPendingApprovals: () => void;
  onFilterChange: (filter: string) => void;
  onSearch?: (query: string) => void;
  onExportData?: () => void;
  onGenerateReport?: () => void;
  pendingCount?: number;
  inboundCount?: number;
  outboundCount?: number;
}

const TransferHeader: React.FC<TransferHeaderProps> = ({
  onCreateTransfer,
  onScanQR,
  onViewPendingApprovals,
  onFilterChange,
  onSearch = () => {},
  onExportData = () => {},
  onGenerateReport = () => {},
  pendingCount = 0,
  inboundCount = 0,
  outboundCount = 0,
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
  
  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
  };

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
            Transfer Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            {pendingCount} Pending | {inboundCount} Inbound | {outboundCount} Outbound
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search transfers..."
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
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateTransfer}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Create Transfer
          </Button>
          <Button 
            variant="outlined"
            startIcon={<QrCodeScannerIcon />}
            onClick={onScanQR}
          >
            Scan QR Code
          </Button>
          <Button 
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => handleFilterSelect('all')}
          >
            Filter Transfers
          </Button>
          <Button 
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={onGenerateReport}
          >
            Analytics
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
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
            onClick={onExportData}
          >
            Export Data
          </Button>
          <Tooltip title="Pending Approvals">
            <IconButton onClick={onViewPendingApprovals}>
              <Badge badgeContent={pendingCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Learn more about transfers">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </PageHeader>
  );
};

export default TransferHeader; 