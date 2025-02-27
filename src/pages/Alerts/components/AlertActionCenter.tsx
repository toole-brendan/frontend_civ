import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
  Chip,
  Stack,
  useTheme,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  Person as PersonIcon,
  Send as SendIcon,
  Autorenew as AutorenewIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  NotificationsActive as NotificationsActiveIcon,
  ArrowUpward as ArrowUpwardIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { Alert } from './AlertTable';

// Styled components
const ActionPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  fontSize: '0.9rem',
}));

interface AlertActionCenterProps {
  alert: Alert;
}

const AlertActionCenter: React.FC<AlertActionCenterProps> = ({ alert }) => {
  const theme = useTheme();
  
  // State for form controls
  const [status, setStatus] = useState(alert.status);
  const [priority, setPriority] = useState(alert.impactLevel);
  const [assignee, setAssignee] = useState<string>(alert.owner || '');
  const [notifyStakeholders, setNotifyStakeholders] = useState(false);
  const [comment, setComment] = useState('');

  // Handle status change
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Alert['status']);
  };

  // Handle priority change
  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as Alert['impactLevel']);
  };

  // Handle assignee change
  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssignee(event.target.value);
  };

  // Handle notification toggle
  const handleNotifyToggle = () => {
    setNotifyStakeholders(!notifyStakeholders);
  };

  // Handle comment input
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  // Get background color by alert type
  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'inventory':
        return theme.palette.primary.light;
      case 'transfer':
        return theme.palette.info.light;
      case 'payment':
        return theme.palette.success.light;
      case 'supplier':
        return theme.palette.warning.light;
      case 'system':
        return theme.palette.secondary.light;
      default:
        return theme.palette.grey[200];
    }
  };

  return (
    <ActionPanel>
      <SectionTitle>Alert Action Center</SectionTitle>
      <Divider sx={{ mb: 2 }} />

      {/* Status Update */}
      <Box mb={3}>
        <InputLabel shrink>Update Status</InputLabel>
        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <Select
            value={status}
            onChange={handleStatusChange}
            displayEmpty
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" alignItems="center">
          <Chip 
            size="small" 
            icon={<CheckCircleIcon fontSize="small" />} 
            label="Blockchain verification will be triggered" 
            variant="outlined" 
            color="success" 
          />
        </Box>
      </Box>

      {/* Assignment */}
      <Box mb={3}>
        <InputLabel shrink>Assign To</InputLabel>
        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <Select
            value={assignee}
            onChange={handleAssigneeChange}
            displayEmpty
          >
            <MenuItem value="">Unassigned</MenuItem>
            <MenuItem value="Michael Chen">Michael Chen (You)</MenuItem>
            <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
            <MenuItem value="David Lee">David Lee</MenuItem>
            <MenuItem value="Jennifer Wong">Jennifer Wong</MenuItem>
            <MenuItem value="Team">Entire Team</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Priority Adjustment */}
      <Box mb={3}>
        <InputLabel shrink>Priority</InputLabel>
        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          <Select
            value={priority}
            onChange={handlePriorityChange}
            displayEmpty
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Notification Controls */}
      <Box mb={3}>
        <FormControlLabel
          control={
            <Switch 
              checked={notifyStakeholders} 
              onChange={handleNotifyToggle} 
              color="primary" 
            />
          }
          label="Notify stakeholders of changes"
        />
      </Box>

      {/* Comment & Update */}
      <Box mb={3}>
        <TextField
          fullWidth
          size="small"
          multiline
          rows={2}
          label="Add comment"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          fullWidth
        >
          Update Alert
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Quick Actions */}
      <SectionTitle>Quick Actions</SectionTitle>
      <Stack spacing={1}>
        {alert.type === 'inventory' && (
          <>
            <Button size="small" variant="outlined" startIcon={<AutorenewIcon />}>
              Initiate Transfer
            </Button>
            <Button size="small" variant="outlined" startIcon={<PersonIcon />}>
              Contact Supplier
            </Button>
          </>
        )}

        {alert.type === 'transfer' && (
          <>
            <Button size="small" variant="outlined" startIcon={<PersonIcon />}>
              Contact Shipping Agent
            </Button>
            <Button size="small" variant="outlined" startIcon={<ArrowUpwardIcon />}>
              Escalate to Management
            </Button>
          </>
        )}

        {alert.type === 'payment' && (
          <>
            <Button size="small" variant="outlined" startIcon={<ScheduleIcon />}>
              Set Payment Reminder
            </Button>
            <Button size="small" variant="outlined" startIcon={<AutorenewIcon />}>
              Process Payment
            </Button>
          </>
        )}

        <Button size="small" variant="outlined" startIcon={<NotificationsActiveIcon />}>
          Set Custom Notification
        </Button>

        <Button size="small" variant="outlined" color="error" startIcon={<BlockIcon />}>
          Ignore Alert
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Escalation Pathway */}
      <SectionTitle>Escalation Pathway</SectionTitle>
      <Box
        sx={{
          height: 60,
          bgcolor: 'background.paper',
          borderRadius: 1,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Chip
          label="L1: Operations Team"
          size="small"
          variant="filled"
          sx={{ bgcolor: theme.palette.success.light }}
        />
        <Box sx={{ width: 20, borderTop: '1px dashed', borderColor: 'divider' }} />
        <Chip
          label="L2: Dept. Manager"
          size="small"
          variant="outlined"
        />
        <Box sx={{ width: 20, borderTop: '1px dashed', borderColor: 'divider' }} />
        <Chip
          label="L3: Executive"
          size="small"
          variant="outlined"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Automation Recommendations */}
      <SectionTitle>Automation Recommendations</SectionTitle>
      <Box
        sx={{
          p: 1.5,
          borderRadius: 1,
          bgcolor: getAlertTypeColor(alert.type),
          mb: 1,
        }}
      >
        <Typography variant="body2" gutterBottom>
          {alert.type === 'inventory' && 
            'Similar inventory alerts occur monthly for these components. Consider adjusting reorder points.'}
          {alert.type === 'transfer' && 
            'This customs broker frequently causes delays. Consider alternative options.'}
          {alert.type === 'payment' && 
            'Set up automated reminders 3 days before payment due for this supplier.'}
          {alert.type === 'supplier' && 
            'This supplier has had 5 similar issues in the past 60 days. Consider supplier review.'}
          {alert.type === 'system' && 
            'Blockchain verification delays happen frequently. Consider delegating verification authority.'}
        </Typography>
        <Button 
          size="small" 
          variant="text" 
          startIcon={<AutorenewIcon />}
          sx={{ color: 'text.primary' }}
        >
          Create Automation Rule
        </Button>
      </Box>
    </ActionPanel>
  );
};

export default AlertActionCenter; 