import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Badge,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Paper,
  Tooltip,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import PageHeader from '../../../components/common/PageHeader';
import { InventoryMetrics } from '../types';

interface InventoryHeaderProps {
  metrics: InventoryMetrics;
  activeFilters: number;
  onAdvancedSearchClick: () => void;
  onFilterClick: () => void;
  onAddItemClick: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
  onScanClick?: () => void;
  onSettingsClick?: () => void;
  onSearch?: (query: string) => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  metrics,
  activeFilters,
  onAdvancedSearchClick,
  onFilterClick,
  onAddItemClick,
  onImportClick,
  onExportClick,
  onScanClick = () => {},
  onSettingsClick = () => {},
  onSearch = () => {}
}) => {
  const theme = useTheme();
  const [importExportAnchorEl, setImportExportAnchorEl] = useState<null | HTMLElement>(null);
  const importExportMenuOpen = Boolean(importExportAnchorEl);
  const [searchQuery, setSearchQuery] = useState('');

  const handleImportExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setImportExportAnchorEl(event.currentTarget);
  };

  const handleImportExportClose = () => {
    setImportExportAnchorEl(null);
  };

  const handleImportClick = () => {
    handleImportExportClose();
    onImportClick();
  };

  const handleExportClick = () => {
    handleImportExportClose();
    onExportClick();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Inventory Management
            </Typography>
            <Tooltip title="All inventory items are verified on blockchain for authenticity and chain of custody">
              <Chip 
                icon={<VerifiedIcon fontSize="small" />}
                label="Blockchain Verified"
                size="small"
                color="success"
                sx={{ ml: 2, height: 24 }}
              />
            </Tooltip>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            {metrics.totalSKUs.toLocaleString()} Items | {metrics.slowMovingItems} Low Stock | ${metrics.totalValue.toLocaleString()} Total Value
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search inventory..."
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
            onClick={onAddItemClick}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Add New Item
          </Button>
          <Button 
            variant="outlined"
            startIcon={<QrCodeScannerIcon />}
            onClick={onScanClick}
          >
            Scan Item
          </Button>
          <Button 
            variant={activeFilters > 0 ? "contained" : "outlined"}
            startIcon={<FilterListIcon />}
            onClick={onFilterClick}
            color={activeFilters > 0 ? 'primary' : 'inherit'}
            endIcon={activeFilters > 0 ? (
              <Badge badgeContent={activeFilters} color="error">
                <Box />
              </Badge>
            ) : undefined}
          >
            Filters
          </Button>
          <Button 
            variant="outlined"
            startIcon={<FileUploadIcon />}
            onClick={onImportClick}
          >
            Import
          </Button>
          <Button 
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={onExportClick}
          >
            Export
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Inventory Settings">
            <IconButton onClick={onSettingsClick}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Learn more about inventory management">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </PageHeader>
  );
};

export default InventoryHeader; 