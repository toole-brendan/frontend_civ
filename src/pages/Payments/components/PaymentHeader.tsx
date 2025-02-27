import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  InputAdornment,
  TextField,
  Badge,
  Stack,
  Tooltip,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface PaymentHeaderProps {
  pendingAmount: number;
  criticalPayments: number;
  totalPayments: number;
  onCreatePayment: () => void;
  onApprovePending: () => void;
  onSchedulePayment: () => void;
  onOpenSettings: () => void;
  onViewAll: () => void;
  onSearch?: (query: string) => void;
  onExportData?: () => void;
  onGenerateReport?: () => void;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({
  pendingAmount,
  criticalPayments,
  totalPayments = 0,
  onCreatePayment,
  onApprovePending,
  onSchedulePayment,
  onOpenSettings,
  onViewAll,
  onSearch = () => {},
  onExportData = () => {},
  onGenerateReport = () => {}
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
            Payment Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            ${pendingAmount.toLocaleString()} Pending | {criticalPayments} Critical | {totalPayments} Total Payments
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search payments..."
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
            onClick={onCreatePayment}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Create Payment
          </Button>
          <Button 
            variant="outlined"
            startIcon={<ScheduleIcon />}
            onClick={onSchedulePayment}
          >
            Schedule Payment
          </Button>
          <Button 
            variant="outlined"
            startIcon={<NotificationsIcon />}
            onClick={onApprovePending}
          >
            Approve Pending
          </Button>
          <Button 
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={onViewAll}
          >
            View All Payments
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
          <Tooltip title="Payment Settings">
            <IconButton onClick={onOpenSettings}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PaymentHeader; 