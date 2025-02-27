import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { InventoryRecommendation, TechComponentsInventoryItem } from '../types';

interface InventoryInsightsProps {
  items: TechComponentsInventoryItem[];
  onActionClick?: (actionType: string, itemId: string) => void;
}

export const InventoryInsights: React.FC<InventoryInsightsProps> = ({ 
  items,
  onActionClick = () => {} 
}) => {
  const theme = useTheme();
  
  // Generate recommendations based on items
  const recommendations = useMemo(() => {
    const result: InventoryRecommendation[] = [];
    
    // Add reorder recommendations for low stock items
    items.forEach(item => {
      if (item.currentStock <= item.reorderPoint) {
        result.push({
          id: `reorder-${item.id}`,
          type: 'reorder',
          item: {
            id: item.id,
            sku: item.sku,
            name: item.name
          },
          description: `Stock level (${item.currentStock}) is below reorder point (${item.reorderPoint})`,
          impact: `Lead time: ${item.leadTime} days`,
          suggestedAction: 'Place order immediately'
        });
      }
      
      // Add excess inventory recommendations
      if (item.currentStock > item.maxLevel * 1.2) {
        result.push({
          id: `excess-${item.id}`,
          type: 'excess',
          item: {
            id: item.id,
            sku: item.sku,
            name: item.name
          },
          description: `Stock level (${item.currentStock}) is significantly above maximum (${item.maxLevel})`,
          impact: `Excess inventory value: $${((item.currentStock - item.maxLevel) * item.unitCost).toFixed(2)}`,
          potentialSavings: Number(((item.currentStock - item.maxLevel) * item.unitCost).toFixed(2)),
          suggestedAction: 'Consider transferring to another location'
        });
      }
    });
    
    // Return top 5 recommendations
    return result.slice(0, 5);
  }, [items]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'reorder':
        return <ShoppingCartIcon color="primary" />;
      case 'rebalance':
        return <CompareArrowsIcon color="info" />;
      case 'excess':
        return <InventoryIcon color="warning" />;
      case 'alternative':
        return <TrendingUpIcon color="success" />;
      default:
        return <InventoryIcon />;
    }
  };

  const getChipColor = (type: string) => {
    switch (type) {
      case 'reorder':
        return {
          bg: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main
        };
      case 'rebalance':
        return {
          bg: alpha(theme.palette.info.main, 0.1),
          color: theme.palette.info.main
        };
      case 'excess':
        return {
          bg: alpha(theme.palette.warning.main, 0.1),
          color: theme.palette.warning.main
        };
      case 'alternative':
        return {
          bg: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.main
        };
      default:
        return {
          bg: alpha(theme.palette.grey[500], 0.1),
          color: theme.palette.grey[700]
        };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'reorder':
        return 'Reorder';
      case 'rebalance':
        return 'Rebalance';
      case 'excess':
        return 'Excess Stock';
      case 'alternative':
        return 'Alternative';
      default:
        return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const getActionButton = (recommendation: InventoryRecommendation) => {
    switch (recommendation.type) {
      case 'reorder':
        return (
          <Button 
            size="small" 
            variant="outlined" 
            color="primary"
            onClick={() => onActionClick('order', recommendation.item.id)}
            startIcon={<ShoppingCartIcon />}
          >
            Order Now
          </Button>
        );
      case 'excess':
        return (
          <Button 
            size="small" 
            variant="outlined" 
            color="warning"
            onClick={() => onActionClick('transfer', recommendation.item.id)}
            startIcon={<LocalShippingIcon />}
          >
            Transfer
          </Button>
        );
      case 'rebalance':
        return (
          <Button 
            size="small" 
            variant="outlined" 
            color="info"
            onClick={() => onActionClick('rebalance', recommendation.item.id)}
            startIcon={<CompareArrowsIcon />}
          >
            Rebalance
          </Button>
        );
      case 'alternative':
        return (
          <Button 
            size="small" 
            variant="outlined" 
            color="success"
            onClick={() => onActionClick('substitute', recommendation.item.id)}
            startIcon={<TrendingUpIcon />}
          >
            Substitute
          </Button>
        );
      default:
        return (
          <Button 
            size="small" 
            variant="outlined"
            onClick={() => onActionClick('view', recommendation.item.id)}
            startIcon={<InventoryIcon />}
          >
            View Details
          </Button>
        );
    }
  };

  const getTitle = (recommendation: InventoryRecommendation) => {
    return `${recommendation.item.name} (${recommendation.item.sku})`;
  };

  return (
    <Paper sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" component="h2">
          Actionable Insights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recommendations based on inventory analysis
        </Typography>
      </Box>
      
      <List sx={{ overflow: 'auto', flexGrow: 1, p: 0 }}>
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => {
            const chipColor = getChipColor(recommendation.type);
            
            return (
              <React.Fragment key={recommendation.id}>
                {index > 0 && <Divider />}
                <ListItem 
                  alignItems="flex-start" 
                  sx={{ 
                    py: 2,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon sx={{ mt: 0 }}>
                    {getIconForType(recommendation.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle2" component="span">
                          {getTitle(recommendation)}
                        </Typography>
                        <Chip 
                          label={getTypeLabel(recommendation.type)} 
                          size="small"
                          sx={{ 
                            backgroundColor: chipColor.bg,
                            color: chipColor.color,
                            fontWeight: 'medium',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                          {recommendation.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {recommendation.impact}
                            {recommendation.potentialSavings && (
                              <span> | Potential savings: ${recommendation.potentialSavings.toLocaleString()}</span>
                            )}
                            {recommendation.riskLevel && (
                              <span> | Risk: {recommendation.riskLevel}</span>
                            )}
                          </Typography>
                          {getActionButton(recommendation)}
                        </Box>
                      </Box>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
              </React.Fragment>
            );
          })
        ) : (
          <ListItem>
            <ListItemText 
              primary="No recommendations available"
              secondary="All inventory items are within optimal levels"
            />
          </ListItem>
        )}
      </List>
      
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
        <Button 
          variant="text" 
          color="primary"
          onClick={() => onActionClick('view_all', '')}
        >
          View All Recommendations
        </Button>
      </Box>
    </Paper>
  );
};

export default InventoryInsights; 