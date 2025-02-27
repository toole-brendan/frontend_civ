import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  styled, 
  CardProps,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontSize: '16px',
    fontWeight: 500,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '14px',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

interface ContentCardProps extends CardProps {
  title: string;
  subheader?: string;
  action?: React.ReactNode;
  showMoreMenu?: boolean;
  onMoreClick?: () => void;
  footer?: React.ReactNode;
  headerProps?: any;
  contentProps?: any;
  actionsProps?: any;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subheader,
  action,
  showMoreMenu = false,
  onMoreClick,
  footer,
  children,
  headerProps = {},
  contentProps = {},
  actionsProps = {},
  ...props
}) => {
  return (
    <StyledCard {...props}>
      <StyledCardHeader
        title={title}
        subheader={subheader}
        action={
          action || (showMoreMenu ? (
            <IconButton size="small" onClick={onMoreClick}>
              <MoreVertIcon />
            </IconButton>
          ) : null)
        }
        {...headerProps}
      />
      <StyledCardContent {...contentProps}>
        {children}
      </StyledCardContent>
      {footer && (
        <StyledCardActions {...actionsProps}>
          {footer}
        </StyledCardActions>
      )}
    </StyledCard>
  );
};

export default ContentCard; 