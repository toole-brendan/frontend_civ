import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  useTheme,
  alpha,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { InventoryMetrics } from '../types';

interface InventoryMetricsStripProps {
  metrics: InventoryMetrics;
  onReorderClick: () => void;
  onValueDetailsClick: () => void;
  onStockoutReportClick: () => void;
}

export const InventoryMetricsStrip: React.FC<InventoryMetricsStripProps> = ({
  metrics,
  onReorderClick = () => {},
  onValueDetailsClick = () => {},
  onStockoutReportClick = () => {}
}) => {
  const theme = useTheme();

  const metricCards = [
    {
      icon: <InventoryIcon fontSize="large" />,
      label: 'Low Stock Items',
      value: metrics.slowMovingItems,
      tooltip: 'Items below reorder point that need attention',
      color: theme.palette.warning.main,
      actionLabel: 'Create Reorder',
      action: onReorderClick,
      bgColor: alpha(theme.palette.warning.main, 0.1)
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      label: 'Total Inventory Value',
      value: `$${metrics.totalValue.toLocaleString()}`,
      tooltip: 'Current total value of all inventory items',
      color: theme.palette.primary.main,
      actionLabel: 'View Details',
      action: onValueDetailsClick,
      bgColor: alpha(theme.palette.primary.main, 0.1)
    },
    {
      icon: <ErrorOutlineIcon fontSize="large" />,
      label: 'Stockout Events',
      value: metrics.stockoutEvents,
      tooltip: 'Number of stockout events in the last 30 days',
      color: theme.palette.error.main,
      actionLabel: 'View Report',
      action: onStockoutReportClick,
      bgColor: alpha(theme.palette.error.main, 0.1)
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {metricCards.map((card, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: card.bgColor,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4]
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                    mr: 2,
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: alpha(card.color, 0.1)
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="h6" color="text.secondary">
                  {card.label}
                </Typography>
              </Box>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: card.color,
                  mb: 1
                }}
              >
                {card.value}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                {card.tooltip}
              </Typography>
            </CardContent>
            
            <Divider />
            
            <CardActions>
              <Button 
                color="inherit"
                onClick={card.action}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  color: card.color,
                  '&:hover': {
                    backgroundColor: alpha(card.color, 0.1)
                  }
                }}
              >
                {card.actionLabel}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoryMetricsStrip; 