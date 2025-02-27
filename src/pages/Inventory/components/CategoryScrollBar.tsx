import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
  Tooltip,
  Badge,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { InventoryCategory } from '../types';

// Import icons for different categories
import MemoryIcon from '@mui/icons-material/Memory';
import DevicesIcon from '@mui/icons-material/Devices';
import RouterIcon from '@mui/icons-material/Router';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import CableIcon from '@mui/icons-material/Cable';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SensorsIcon from '@mui/icons-material/Sensors';

interface CategoryScrollBarProps {
  categories: InventoryCategory[];
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryScrollBar: React.FC<CategoryScrollBarProps> = ({
  categories,
  onCategoryClick
}) => {
  const theme = useTheme();

  // Map category names to icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'memory':
        return <MemoryIcon />;
      case 'devices':
        return <DevicesIcon />;
      case 'router':
        return <RouterIcon />;
      case 'storage':
        return <StorageIcon />;
      case 'components':
        return <SettingsInputComponentIcon />;
      case 'cable':
        return <CableIcon />;
      case 'battery':
        return <BatteryFullIcon />;
      case 'sensors':
        return <SensorsIcon />;
      default:
        return <DevicesIcon />;
    }
  };

  // Get color based on stock health
  const getHealthColor = (health: 'good' | 'warning' | 'critical') => {
    switch (health) {
      case 'good':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'critical':
        return theme.palette.error.main;
      default:
        return theme.palette.success.main;
    }
  };

  return (
    <Box
      sx={{
        mb: 4,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '40px',
          background: `linear-gradient(to right, ${alpha(theme.palette.background.default, 0)}, ${theme.palette.background.default})`,
          zIndex: 1,
          pointerEvents: 'none'
        }
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Categories
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 1,
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none' // Chrome, Safari, Edge
          },
          '-ms-overflow-style': 'none', // IE
        }}
      >
        {categories.map((category) => {
          const healthColor = getHealthColor(category.stockHealth);
          
          return (
            <Card
              key={category.id}
              elevation={0}
              sx={{
                minWidth: 200,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[3]
                }
              }}
              onClick={() => onCategoryClick(category.id)}
            >
              {/* Health indicator dot */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: healthColor,
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[1]
                }}
              />
              
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      mr: 1.5
                    }}
                  >
                    {getCategoryIcon(category.icon)}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {category.name}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Items:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {category.skuCount}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Value:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    ${category.totalValue.toLocaleString()}
                  </Typography>
                </Box>
                
                {category.lowStockCount > 0 && (
                  <Tooltip title="Items below reorder point">
                    <Badge
                      badgeContent={category.lowStockCount}
                      color="error"
                      sx={{ 
                        display: 'block',
                        '& .MuiBadge-badge': {
                          right: -3,
                          top: 3
                        }
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        color="error" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 1
                        }}
                      >
                        Low Stock Items
                        <IconButton 
                          size="small" 
                          sx={{ p: 0, color: theme.palette.error.main }}
                        >
                          <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                      </Typography>
                    </Badge>
                  </Tooltip>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryScrollBar; 