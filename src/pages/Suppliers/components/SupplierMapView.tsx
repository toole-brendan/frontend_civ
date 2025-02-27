import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  useTheme
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Supplier } from '../types';

// This would be replaced with an actual map component in a real implementation
// For example, using Google Maps, Mapbox, or Leaflet
const MapPlaceholder = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 400,
        backgroundColor: theme.palette.grey[50],
        borderRadius: 1,
        border: `1px dashed ${theme.palette.grey[300]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 2,
        position: 'relative',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Interactive Map Visualization
      </Typography>
      <Typography variant="caption" color="text.secondary">
        (Placeholder - would implement with actual map library)
      </Typography>
      
      {/* Sample map markers */}
      <Box sx={{ position: 'absolute', top: '30%', left: '20%' }}>
        <LocationMarker label="Tokyo Components" count={2} />
      </Box>
      <Box sx={{ position: 'absolute', top: '40%', left: '60%' }}>
        <LocationMarker label="Korea Chip Manufacturing" count={1} />
      </Box>
      <Box sx={{ position: 'absolute', top: '60%', left: '75%' }}>
        <LocationMarker label="Malaysia Circuit Systems" count={3} />
      </Box>
      <Box sx={{ position: 'absolute', top: '25%', left: '40%' }}>
        <LocationMarker label="European Suppliers" count={5} />
      </Box>
      <Box sx={{ position: 'absolute', top: '45%', left: '15%' }}>
        <LocationMarker label="US Suppliers" count={4} />
      </Box>
    </Box>
  );
};

// Helper component for map markers
const LocationMarker = ({ label, count }: { label: string; count: number }) => {
  const theme = useTheme();
  return (
    <Tooltip title={label}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: theme.shadows[3],
            position: 'relative',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s',
          }}
        >
          {count}
        </Box>
        <Typography variant="caption" sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          px: 0.5,
          borderRadius: 0.5,
          mt: 0.5
        }}>
          {label}
        </Typography>
      </Box>
    </Tooltip>
  );
};

interface SupplierMapViewProps {
  suppliers: Supplier[];
  onRegionFilter: (region: string) => void;
  onSupplierSelect: (supplierId: string) => void;
  onViewFullscreen: () => void;
}

const SupplierMapView: React.FC<SupplierMapViewProps> = ({
  suppliers,
  onRegionFilter,
  onSupplierSelect,
  onViewFullscreen,
}) => {
  const theme = useTheme();
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [mapView, setMapView] = React.useState('suppliers');

  const handleRegionFilterChange = (event: SelectChangeEvent) => {
    setRegionFilter(event.target.value);
    onRegionFilter(event.target.value);
  };

  const handleMapViewChange = (event: SelectChangeEvent) => {
    setMapView(event.target.value);
  };

  // Helper function to check if a supplier is in a country
  const isSupplierInCountry = (supplier: Supplier, country: string): boolean => {
    if (!supplier.location) return false;
    
    // Check if includes method exists
    if (supplier.location.includes) {
      return supplier.location.includes(country);
    }
    
    // Fallback to checking country property
    return supplier.location.country === country;
  };

  // Group suppliers by region (in a real app this would use geolocation data)
  const regions = {
    asia: suppliers.filter(s => ['Japan', 'South Korea', 'Malaysia', 'Taiwan', 'China'].some(c => isSupplierInCountry(s, c))).length,
    europe: suppliers.filter(s => ['Germany', 'France', 'UK', 'Italy', 'Spain'].some(c => isSupplierInCountry(s, c))).length,
    americas: suppliers.filter(s => ['USA', 'Canada', 'Mexico', 'Brazil'].some(c => isSupplierInCountry(s, c))).length,
    other: suppliers.filter(s => !['Japan', 'South Korea', 'Malaysia', 'Taiwan', 'China', 'Germany', 'France', 'UK', 'Italy', 'Spain', 'USA', 'Canada', 'Mexico', 'Brazil'].some(c => isSupplierInCountry(s, c))).length,
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
        {/* Header with filters */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" fontWeight="bold">
              Supplier Locations
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="region-filter-label">Region</InputLabel>
              <Select
                labelId="region-filter-label"
                value={regionFilter}
                onChange={handleRegionFilterChange}
                label="Region"
              >
                <MenuItem value="all">All Regions</MenuItem>
                <MenuItem value="asia">Asia</MenuItem>
                <MenuItem value="europe">Europe</MenuItem>
                <MenuItem value="americas">Americas</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="map-view-label">View</InputLabel>
              <Select
                labelId="map-view-label"
                value={mapView}
                onChange={handleMapViewChange}
                label="View"
              >
                <MenuItem value="suppliers">Suppliers</MenuItem>
                <MenuItem value="risk">Risk Levels</MenuItem>
                <MenuItem value="spend">Annual Spend</MenuItem>
                <MenuItem value="shipments">Active Shipments</MenuItem>
              </Select>
            </FormControl>
            
            <Tooltip title="Filter map">
              <IconButton size="small">
                <FilterAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Refresh data">
              <IconButton size="small">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="View fullscreen">
              <IconButton size="small" onClick={onViewFullscreen}>
                <FullscreenIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Region summary */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip 
            icon={<LocationOnIcon />} 
            label={`Asia: ${regions.asia} suppliers`} 
            variant={regionFilter === 'asia' ? 'filled' : 'outlined'}
            onClick={() => onRegionFilter('asia')}
            sx={{ 
              backgroundColor: regionFilter === 'asia' ? theme.palette.primary.light : undefined,
              borderColor: theme.palette.primary.main
            }}
          />
          <Chip 
            icon={<LocationOnIcon />} 
            label={`Europe: ${regions.europe} suppliers`} 
            variant={regionFilter === 'europe' ? 'filled' : 'outlined'}
            onClick={() => onRegionFilter('europe')}
            sx={{ 
              backgroundColor: regionFilter === 'europe' ? theme.palette.primary.light : undefined,
              borderColor: theme.palette.primary.main
            }}
          />
          <Chip 
            icon={<LocationOnIcon />} 
            label={`Americas: ${regions.americas} suppliers`} 
            variant={regionFilter === 'americas' ? 'filled' : 'outlined'}
            onClick={() => onRegionFilter('americas')}
            sx={{ 
              backgroundColor: regionFilter === 'americas' ? theme.palette.primary.light : undefined,
              borderColor: theme.palette.primary.main
            }}
          />
          <Chip 
            icon={<LocationOnIcon />} 
            label={`Other: ${regions.other} suppliers`} 
            variant={regionFilter === 'other' ? 'filled' : 'outlined'}
            onClick={() => onRegionFilter('other')}
            sx={{ 
              backgroundColor: regionFilter === 'other' ? theme.palette.primary.light : undefined,
              borderColor: theme.palette.primary.main
            }}
          />
        </Box>
        
        {/* Map visualization */}
        <Box sx={{ position: 'relative' }}>
          <MapPlaceholder />
          
          <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
            <Tooltip title="Map data is updated daily">
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Legend */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  mr: 1,
                }}
              />
              <Typography variant="caption">Supplier Location</Typography>
            </Box>
            {mapView === 'risk' && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.success.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption">Low Risk</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.warning.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption">Medium Risk</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.error.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption">High Risk</Typography>
                </Box>
              </>
            )}
            {mapView === 'spend' && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption">$1M+</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption">$500K-$1M</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption">$0-$500K</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SupplierMapView; 