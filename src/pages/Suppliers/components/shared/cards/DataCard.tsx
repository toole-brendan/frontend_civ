import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  styled, 
  CardProps,
  Typography,
  Box,
  Divider
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  overflow: 'hidden',
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.background.default,
  '& .MuiCardHeader-title': {
    fontSize: '14px',
    fontWeight: 500,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(0),
  '&:last-child': {
    paddingBottom: 0,
  },
}));

interface DataCardProps extends CardProps {
  title?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  action,
  noPadding = false,
  children,
  ...props
}) => {
  return (
    <StyledCard {...props}>
      {title && (
        <>
          <StyledCardHeader
            title={title}
            action={action}
          />
          <Divider />
        </>
      )}
      <StyledCardContent sx={noPadding ? {} : { p: 2 }}>
        {children}
      </StyledCardContent>
    </StyledCard>
  );
};

export default DataCard; 