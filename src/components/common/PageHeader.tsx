import React from 'react';
import { Box, useTheme } from '@mui/material';

interface PageHeaderProps {
  children: React.ReactNode;
}

/**
 * PageHeader component that provides consistent spacing and styling for all page headers
 * This component ensures that all page headers (Dashboard, Inventory, Transfers, etc.)
 * have the same spacing from the sidebar and app bar.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        mb: 3, 
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {children}
    </Box>
  );
};

export default PageHeader; 