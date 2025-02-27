import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  Tooltip,
  LinearProgress,
  Collapse,
  Grid,
  Divider,
  useTheme
} from '@mui/material';
import { 
  CreditCard, 
  Edit, 
  Eye, 
  XCircle, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { format, isAfter, isBefore, parseISO, addDays } from 'date-fns';
import { Payment } from '../mockData';
import { PaymentStatus, PaymentMethod, PaymentUrgency } from '../types';

interface PaymentTableProps {
  payments: Payment[];
  onViewPayment: (paymentId: string) => void;
  onEditPayment: (paymentId: string) => void;
  onCancelPayment: (paymentId: string) => void;
  onProcessPayment: (paymentId: string) => void;
  simplified?: boolean; // Optional prop for simplified view
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onViewPayment,
  onEditPayment,
  onCancelPayment,
  onProcessPayment,
  simplified = false // Default to full view
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  // Handle pagination
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Toggle expanded row
  const handleToggleRow = (paymentId: string) => {
    setExpandedRow(expandedRow === paymentId ? null : paymentId);
  };
  
  // Get status chip color
  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'Draft':
        return theme.palette.grey[500];
      case 'Scheduled':
        return theme.palette.info.main;
      case 'Pending Approval':
        return theme.palette.warning.main;
      case 'Processing':
        return theme.palette.primary.main;
      case 'Completed':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };
  
  // Get payment method icon
  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'Shell Token':
        return <DollarSign size={16} />;
      case 'USDC':
        return <DollarSign size={16} />;
      case 'Traditional Wire':
        return <CreditCard size={16} />;
      default:
        return <CreditCard size={16} />;
    }
  };
  
  // Get urgency indicator
  const getUrgencyIndicator = (urgency: PaymentUrgency, dueDate: string) => {
    const today = new Date();
    const parsedDueDate = parseISO(dueDate);
    
    if (isAfter(today, parsedDueDate)) {
      return (
        <Tooltip title="Overdue">
          <AlertTriangle size={16} color={theme.palette.error.main} />
        </Tooltip>
      );
    }
    
    if (isAfter(today, addDays(parsedDueDate, -2)) && isBefore(today, parsedDueDate)) {
      return (
        <Tooltip title="Due soon">
          <Clock size={16} color={theme.palette.warning.main} />
        </Tooltip>
      );
    }
    
    switch (urgency) {
      case 'critical':
        return (
          <Tooltip title="Critical">
            <AlertTriangle size={16} color={theme.palette.error.main} />
          </Tooltip>
        );
      case 'high':
        return (
          <Tooltip title="High urgency">
            <AlertTriangle size={16} color={theme.palette.warning.main} />
          </Tooltip>
        );
      case 'medium':
        return (
          <Tooltip title="Medium urgency">
            <Clock size={16} color={theme.palette.info.main} />
          </Tooltip>
        );
      case 'low':
        return (
          <Tooltip title="Low urgency">
            <Clock size={16} color={theme.palette.success.main} />
          </Tooltip>
        );
      default:
        return null;
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden'
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: simplified ? 700 : 1100 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}>
              {!simplified && <TableCell sx={{ width: 50 }}></TableCell>}
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Invoice/Reference</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Supplier</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Due Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Status</Typography>
              </TableCell>
              {!simplified && (
                <>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">Payment Method</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">Fee/Savings</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">PO Number</Typography>
                  </TableCell>
                </>
              )}
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight="bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : payments
            ).map((payment) => (
              <React.Fragment key={payment.id}>
                <TableRow 
                  hover 
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' 
                    },
                    cursor: 'pointer',
                    borderLeft: payment.urgency === 'critical' ? `4px solid ${theme.palette.error.main}` : 'none'
                  }}
                >
                  {!simplified && (
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRow(payment.id);
                        }}
                      >
                        {expandedRow === payment.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </IconButton>
                    </TableCell>
                  )}
                  <TableCell 
                    onClick={() => onViewPayment(payment.id)}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FileText size={16} style={{ marginRight: 8 }} />
                      <Typography variant="body2">
                        {payment.invoiceNumber}
                      </Typography>
                    </Box>
                    {getUrgencyIndicator(payment.urgency, payment.dueDate)}
                  </TableCell>
                  <TableCell onClick={() => onViewPayment(payment.id)}>
                    <Typography variant="body2">{payment.supplierName}</Typography>
                  </TableCell>
                  <TableCell onClick={() => onViewPayment(payment.id)}>
                    <Typography variant="body2" fontWeight="medium">
                      ${payment.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => onViewPayment(payment.id)}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} style={{ marginRight: 8 }} />
                      <Typography variant="body2">
                        {format(parseISO(payment.dueDate), 'MMM d, yyyy')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell onClick={() => onViewPayment(payment.id)}>
                    <Chip 
                      label={payment.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(payment.status),
                        color: '#fff',
                        fontWeight: 'medium',
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  {!simplified && (
                    <>
                      <TableCell onClick={() => onViewPayment(payment.id)}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {payment.paymentMethod}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => onViewPayment(payment.id)}>
                        <Box>
                          <Typography variant="body2" color="error.main">
                            -${payment.feeAmount.toLocaleString()}
                          </Typography>
                          {payment.savingsAmount > 0 && (
                            <Typography variant="body2" color="success.main">
                              +${payment.savingsAmount.toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => onViewPayment(payment.id)}>
                        <Typography variant="body2">
                          {payment.linkedOrderNumber}
                        </Typography>
                      </TableCell>
                    </>
                  )}
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="View details">
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewPayment(payment.id);
                          }}
                          sx={{ mr: 1 }}
                        >
                          <Eye size={18} />
                        </IconButton>
                      </Tooltip>
                      
                      {payment.status !== 'Completed' && (
                        <>
                          {payment.status !== 'Processing' && (
                            <Tooltip title="Edit payment">
                              <IconButton 
                                size="small" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditPayment(payment.id);
                                }}
                                sx={{ mr: 1 }}
                              >
                                <Edit size={18} />
                              </IconButton>
                            </Tooltip>
                          )}
                          
                          {payment.status === 'Draft' || payment.status === 'Scheduled' ? (
                            <Tooltip title="Cancel payment">
                              <IconButton 
                                size="small" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onCancelPayment(payment.id);
                                }}
                                sx={{ mr: simplified ? 0 : 1 }}
                              >
                                <XCircle size={18} />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                          
                          {!simplified && payment.status === 'Pending Approval' && (
                            <Tooltip title="Process payment">
                              <IconButton 
                                size="small" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onProcessPayment(payment.id);
                                }}
                              >
                                <CheckCircle size={18} />
                              </IconButton>
                            </Tooltip>
                          )}
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                
                {!simplified && expandedRow === payment.id && (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ py: 0 }}>
                      <Collapse in={expandedRow === payment.id} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 3, px: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                                Payment Details
                              </Typography>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Creation Date
                                </Typography>
                                <Typography variant="body1">
                                  {format(parseISO(payment.creationDate), 'MMMM d, yyyy')}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Products
                                </Typography>
                                {payment.products.map((product, index) => (
                                  <Typography key={index} variant="body1">
                                    • {product}
                                  </Typography>
                                ))}
                              </Box>
                              
                              {payment.status === 'Pending Approval' && payment.paymentMethod === 'Traditional Wire' && (
                                <Box sx={{ mt: 3 }}>
                                  <Typography variant="subtitle2" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                                    Payment Method Recommendation
                                  </Typography>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    Switch to Shell Token payment to save ${payment.savingsAmount.toLocaleString()} in fees.
                                  </Typography>
                                  <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    size="small"
                                    startIcon={<DollarSign size={16} />}
                                    sx={{ mt: 1 }}
                                  >
                                    Switch to Shell Tokens
                                  </Button>
                                </Box>
                              )}
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              {payment.status === 'Processing' && payment.blockchainConfirmations && (
                                <Box sx={{ mb: 3 }}>
                                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                                    Blockchain Verification Status
                                  </Typography>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                      <Typography variant="body2" color="text.secondary">
                                        Confirmation Progress
                                      </Typography>
                                      <Typography variant="body2" fontWeight="medium">
                                        {payment.blockchainConfirmations.current}/{payment.blockchainConfirmations.required}
                                      </Typography>
                                    </Box>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={(payment.blockchainConfirmations.current / payment.blockchainConfirmations.required) * 100}
                                      sx={{ 
                                        height: 8, 
                                        borderRadius: 4,
                                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                      }}
                                    />
                                  </Box>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      Transaction Hash
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                      0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9
                                    </Typography>
                                  </Box>
                                  
                                  <Button 
                                    variant="outlined" 
                                    size="small"
                                    startIcon={<Eye size={16} />}
                                    sx={{ mt: 1 }}
                                  >
                                    View on Blockchain Explorer
                                  </Button>
                                </Box>
                              )}
                              
                              {payment.status === 'Completed' && payment.blockchainConfirmations && (
                                <Box sx={{ mb: 3 }}>
                                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2, color: theme.palette.success.main, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircle size={18} />
                                    Payment Verified on Blockchain
                                  </Typography>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      Confirmation Count
                                    </Typography>
                                    <Typography variant="body1" fontWeight="medium">
                                      {payment.blockchainConfirmations.current} confirmations (complete)
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      Transaction Hash
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                      0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9
                                    </Typography>
                                  </Box>
                                  
                                  <Button 
                                    variant="outlined" 
                                    size="small"
                                    startIcon={<FileText size={16} />}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Download Receipt
                                  </Button>
                                  
                                  <Button 
                                    variant="outlined" 
                                    size="small"
                                    startIcon={<Eye size={16} />}
                                    sx={{ mt: 1 }}
                                  >
                                    View on Blockchain Explorer
                                  </Button>
                                </Box>
                              )}
                              
                              {payment.status === 'Scheduled' && (
                                <Box sx={{ mb: 3 }}>
                                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Calendar size={18} />
                                    Scheduled Payment
                                  </Typography>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      Scheduled Date
                                    </Typography>
                                    <Typography variant="body1" fontWeight="medium">
                                      {format(parseISO(payment.dueDate), 'MMMM d, yyyy')}
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      Payment Method
                                    </Typography>
                                    <Typography variant="body1">
                                      {payment.paymentMethod}
                                    </Typography>
                                  </Box>
                                  
                                  <Button 
                                    variant="outlined" 
                                    color="primary"
                                    size="small"
                                    startIcon={<Edit size={16} />}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Modify Schedule
                                  </Button>
                                  
                                  <Button 
                                    variant="outlined" 
                                    color="error"
                                    size="small"
                                    startIcon={<XCircle size={16} />}
                                    sx={{ mt: 1 }}
                                  >
                                    Cancel Schedule
                                  </Button>
                                </Box>
                              )}
                            </Grid>
                            
                            <Grid item xs={12}>
                              <Divider sx={{ my: 2 }} />
                              
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                {payment.status !== 'Completed' && (
                                  <Button 
                                    variant="contained" 
                                    color="primary"
                                    startIcon={<CreditCard size={18} />}
                                    onClick={() => onProcessPayment(payment.id)}
                                  >
                                    Process Payment
                                  </Button>
                                )}
                                
                                <Button 
                                  variant="outlined"
                                  startIcon={<Eye size={18} />}
                                  onClick={() => onViewPayment(payment.id)}
                                >
                                  View Full Details
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {!simplified && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={payments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default PaymentTable; 