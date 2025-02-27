import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Divider, 
  Button, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Badge,
  Tooltip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Supplier, Contact } from '../types';

interface SupplierProfileSummaryProps {
  supplier: Supplier | null;
  onContactSupplier: (supplier: Supplier) => void;
  onScheduleCall: (supplier: Supplier) => void;
  onSendMessage: (supplier: Supplier) => void;
  onViewContract: (supplier: Supplier) => void;
}

const SupplierProfileSummary: React.FC<SupplierProfileSummaryProps> = ({
  supplier,
  onContactSupplier,
  onScheduleCall,
  onSendMessage,
  onViewContract,
}) => {
  const theme = useTheme();

  if (!supplier) {
    return (
      <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body1" color="text.secondary" align="center">
          Select a supplier to view details
        </Typography>
      </Paper>
    );
  }

  const getContactPreferenceIcon = (preference: string) => {
    switch (preference) {
      case 'EMAIL':
        return <EmailIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />;
      case 'PHONE':
        return <PhoneIcon fontSize="small" sx={{ color: theme.palette.info.main }} />;
      case 'VIDEO':
        return <VideocamIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      case 'IN_PERSON':
        return <BusinessIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      default:
        return <EmailIcon fontSize="small" />;
    }
  };

  const getContactPreferenceText = (preference: string) => {
    switch (preference) {
      case 'EMAIL':
        return 'Prefers email';
      case 'PHONE':
        return 'Prefers phone calls';
      case 'VIDEO':
        return 'Prefers video calls';
      case 'IN_PERSON':
        return 'Prefers in-person meetings';
      default:
        return 'No preference set';
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isWithinBusinessHours = () => {
    if (!supplier.businessHours) return false;
    
    // Get the current time in the supplier's timezone
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      timeZone: supplier.businessHours.timezone.split(' ')[0], 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: false
    };
    
    // This is a simplified check and would need more robust timezone handling in production
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    const currentHour = parseInt(currentTime.split(':')[0], 10);
    
    // Simplified business hours check (9am-6pm)
    return currentHour >= 9 && currentHour < 18;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      {/* Header with supplier name and actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={supplier.logo}
          alt={supplier.name}
          variant="rounded"
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {supplier.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {supplier.headquarters}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Primary contacts */}
      <Typography variant="h6" gutterBottom>
        Primary Contacts
      </Typography>
      
      {supplier.primaryContacts?.map((contact: Contact) => (
        <Box key={contact.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Tooltip title={getContactPreferenceText(contact.preferredCommunication)} placement="top">
                {getContactPreferenceIcon(contact.preferredCommunication)}
              </Tooltip>
            }
          >
            <Avatar src={contact.photo} alt={contact.name} sx={{ width: 56, height: 56 }} />
          </Badge>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1">{contact.name}</Typography>
            <Typography variant="body2" color="text.secondary">{contact.role}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <EmailIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{contact.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <PhoneIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{contact.phone}</Typography>
            </Box>
          </Box>
        </Box>
      ))}

      {/* Quick communication buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EmailIcon />}
          onClick={() => onContactSupplier(supplier)}
          fullWidth
        >
          Email
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<VideocamIcon />}
          onClick={() => onScheduleCall(supplier)}
          fullWidth
        >
          Schedule
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PhoneIcon />}
          onClick={() => onSendMessage(supplier)}
          fullWidth
        >
          Message
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Business hours */}
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
        Business Information
      </Typography>
      
      <List dense sx={{ mb: 2 }}>
        <ListItem sx={{ px: 0 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <AccessTimeIcon color="action" fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">Business Hours</Typography>
                {isWithinBusinessHours() ? (
                  <Chip 
                    label="Open Now" 
                    size="small" 
                    sx={{ 
                      ml: 1, 
                      height: 20, 
                      fontSize: '0.625rem',
                      backgroundColor: theme.palette.success.light,
                      color: theme.palette.success.dark,
                    }} 
                  />
                ) : (
                  <Chip 
                    label="Closed Now" 
                    size="small" 
                    sx={{ 
                      ml: 1, 
                      height: 20, 
                      fontSize: '0.625rem',
                      backgroundColor: theme.palette.grey[200],
                      color: theme.palette.grey[700],
                    }} 
                  />
                )}
              </Box>
            }
            secondary={
              <>
                <Typography variant="caption" display="block">
                  Weekdays: {supplier.businessHours?.weekdays || 'N/A'}
                </Typography>
                <Typography variant="caption" display="block">
                  Weekend: {supplier.businessHours?.weekend || 'N/A'}
                </Typography>
              </>
            }
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <ScheduleIcon color="action" fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography variant="body2">Current Local Time</Typography>}
            secondary={
              <Typography variant="caption">
                {new Date().toLocaleTimeString('en-US', { 
                  timeZone: supplier.businessHours?.timezone?.split(' ')[0] || 'UTC',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  timeZoneName: 'short'
                })}
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ px: 0 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <EventIcon color="action" fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography variant="body2">Contract Status</Typography>}
            secondary={
              <Typography variant="caption">
                Expires: {supplier.contractExpiration ? new Date(supplier.contractExpiration).toLocaleDateString() : 'N/A'}
              </Typography>
            }
          />
        </ListItem>
      </List>

      <Button
        variant="outlined"
        size="small"
        onClick={() => onViewContract(supplier)}
        fullWidth
        sx={{ mb: 3 }}
      >
        View Contract Details
      </Button>
      
      <Divider sx={{ my: 2 }} />

      {/* Relationship timeline */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Relationship History
        </Typography>
        <Chip 
          label={`Since ${supplier.relationshipHistory?.[0]?.date.substring(0, 4) || 'N/A'}`} 
          size="small" 
          sx={{ 
            height: 20, 
            fontSize: '0.625rem',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          }}
        />
      </Box>
      
      <Box sx={{ position: 'relative', pl: 2, mb: 2 }}>
        <Box 
          sx={{ 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            bottom: 0, 
            width: 2, 
            backgroundColor: theme.palette.grey[200],
            borderRadius: 2,
          }} 
        />
        
        {supplier.relationshipHistory?.slice(0, 3).map((event, index) => (
          <Box 
            key={`${event.date}-${index}`}
            sx={{ 
              position: 'relative', 
              mb: 2, 
              pl: 2,
              '&:last-child': {
                mb: 0,
              },
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                left: -6, 
                top: 0, 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                backgroundColor: index === 0 ? theme.palette.success.main : theme.palette.primary.main,
                border: `2px solid ${theme.palette.background.paper}`,
                zIndex: 1,
              }} 
            />
            <Typography variant="caption" color="text.secondary">
              {formatEventDate(event.date)}
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {event.event}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              {event.description}
            </Typography>
          </Box>
        ))}
        
        {supplier.relationshipHistory && supplier.relationshipHistory.length > 3 && (
          <Button 
            variant="text" 
            size="small" 
            sx={{ mt: 1, pl: 2 }}
          >
            View All History
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default SupplierProfileSummary; 