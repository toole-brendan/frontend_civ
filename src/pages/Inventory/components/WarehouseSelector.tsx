import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import {
  Warehouse as WarehouseIcon,
  Storage as SectionIcon,
  ViewModule as AisleIcon,
  ViewStream as ShelfIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ArrowBack as ArrowBackIcon,
  Map as MapIcon,
} from '@mui/icons-material';
import { WarehouseStructure } from '../types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(0, 1),
}));

interface WarehouseSelectorProps {
  warehouses?: WarehouseStructure[];
  onLocationSelect?: (locationPath: string[]) => void;
  selectedPath?: string[];
  selectedWarehouse: string;
  onChange: (warehouseId: string) => void;
}

export const WarehouseSelector: React.FC<WarehouseSelectorProps> = ({
  warehouses = [],
  onLocationSelect = () => {},
  selectedPath = [],
  selectedWarehouse,
  onChange
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(selectedPath);
  const [currentItems, setCurrentItems] = useState<WarehouseStructure[]>(warehouses);
  
  // Get the icon for a specific warehouse level
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'warehouse':
        return <WarehouseIcon />;
      case 'section':
        return <SectionIcon />;
      case 'aisle':
        return <AisleIcon />;
      case 'shelf':
        return <ShelfIcon />;
      default:
        return <WarehouseIcon />;
    }
  };
  
  // Handle the expansion of a warehouse item
  const handleToggleExpand = (itemId: string) => {
    setExpandedItems((prev) => 
      prev.includes(itemId) 
        ? prev.filter((id) => id !== itemId) 
        : [...prev, itemId]
    );
  };
  
  // Navigate to a specific path in the warehouse hierarchy
  const handleNavigate = (index: number) => {
    if (index < 0) {
      // Navigate to root
      setCurrentPath([]);
      setCurrentItems(warehouses);
      return;
    }
    
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    
    // Find the correct items to display at this level
    let items = warehouses;
    for (let i = 0; i < newPath.length; i++) {
      const currentId = newPath[i];
      const currentItem = items.find(item => item.id === currentId);
      if (currentItem && currentItem.children) {
        items = currentItem.children;
      } else {
        break;
      }
    }
    
    setCurrentItems(items);
  };
  
  // Handle selection of a specific location
  const handleSelectLocation = (item: WarehouseStructure) => {
    const newPath = [...currentPath, item.id];
    setCurrentPath(newPath);
    onLocationSelect(newPath);
    
    // If the item has children, navigate to them
    if (item.children && item.children.length > 0) {
      setCurrentItems(item.children);
    }
  };
  
  // Recursive function to render warehouse items and their children
  const renderWarehouseItems = (items: WarehouseStructure[], depth = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.includes(item.id);
      
      return (
        <React.Fragment key={item.id}>
          <ListItem
            disablePadding
            sx={{ pl: depth * 2 }}
          >
            <ListItemButton
              onClick={() => handleSelectLocation(item)}
              selected={selectedPath.includes(item.id)}
            >
              <ListItemIcon>
                {getLevelIcon(item.level)}
              </ListItemIcon>
              <ListItemText 
                primary={item.name}
                secondary={item.level.charAt(0).toUpperCase() + item.level.slice(1)}
              />
              {hasChildren && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(item.id);
                  }}
                  size="small"
                >
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
            </ListItemButton>
          </ListItem>
          {hasChildren && isExpanded && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {renderWarehouseItems(item.children || [], depth + 1)}
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };
  
  // Find breadcrumb names for the current path
  const getBreadcrumbNames = () => {
    const breadcrumbs: string[] = [];
    let currentItems = warehouses || [];
    
    for (const itemId of currentPath) {
      const item = currentItems.find(i => i.id === itemId);
      if (item) {
        breadcrumbs.push(item.name);
        if (item.children) {
          currentItems = item.children;
        }
      }
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbNames = getBreadcrumbNames();
  
  return (
    <StyledPaper>
      <Header>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {currentPath.length > 0 && (
            <Tooltip title="Back to root">
              <IconButton
                size="small"
                onClick={() => handleNavigate(-1)}
                sx={{ mr: 1 }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6">Warehouse Locations</Typography>
        </Box>
        <Tooltip title="Map View">
          <IconButton size="small">
            <MapIcon />
          </IconButton>
        </Tooltip>
      </Header>
      
      {currentPath.length > 0 && (
        <Breadcrumbs sx={{ px: 2, py: 1 }}>
          <Link 
            color="inherit" 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleNavigate(-1);
            }}
          >
            All Warehouses
          </Link>
          {breadcrumbNames.map((name, index) => (
            <Link
              key={index}
              color={index === breadcrumbNames.length - 1 ? 'textPrimary' : 'inherit'}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(index);
              }}
              sx={{ 
                fontWeight: index === breadcrumbNames.length - 1 ? 'bold' : 'normal',
                pointerEvents: index === breadcrumbNames.length - 1 ? 'none' : 'auto'
              }}
            >
              {name}
            </Link>
          ))}
        </Breadcrumbs>
      )}
      
      <Content>
        <List>
          {currentItems.length > 0 ? (
            renderWarehouseItems(currentItems)
          ) : (
            <ListItem>
              <ListItemText
                primary="No locations found"
                secondary="Please add warehouse locations to get started"
              />
            </ListItem>
          )}
        </List>
      </Content>
    </StyledPaper>
  );
};

export default WarehouseSelector; 