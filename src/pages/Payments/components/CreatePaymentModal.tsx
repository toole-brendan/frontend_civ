import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Divider,
  styled,
  SelectChangeEvent,
  InputAdornment,
  Chip,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
  X, 
  DollarSign, 
  CreditCard, 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Building,
  FileCheck
} from 'lucide-react';
import { PaymentMethod, PaymentStatus, PaymentUrgency } from '../types';
import { format, addDays } from 'date-fns';

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2, 3),
  },
}));

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

// Interface for a new payment
interface NewPayment {
  invoiceNumber: string;
  supplierName: string;
  amount: number;
  dueDate: Date | null;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  linkedOrderNumber: string;
  products: string[];
  urgency: PaymentUrgency;
  notes: string;
}

interface CreatePaymentModalProps {
  open: boolean;
  onClose: () => void;
  onCreatePayment: (payment: NewPayment) => void;
}

const initialPayment: NewPayment = {
  invoiceNumber: '',
  supplierName: '',
  amount: 0,
  dueDate: null,
  status: 'Draft',
  paymentMethod: 'Shell Token',
  linkedOrderNumber: '',
  products: [],
  urgency: 'medium',
  notes: ''
};

// Mock data for suppliers and orders
const mockSuppliers = [
  'Acme Electronics',
  'TechPro Solutions',
  'Global Logistics Inc.',
  'Quantum Components',
  'Precision Manufacturing',
  'Secure Systems Ltd.',
  'Advanced Materials Co.',
  'Digital Networks',
  'Integrated Circuits Inc.',
  'Smart Solutions'
];

const mockOrders = [
  'ORD-2023-001',
  'ORD-2023-002',
  'ORD-2023-003',
  'ORD-2023-004',
  'ORD-2023-005'
];

const mockProducts = [
  'Microprocessors',
  'Memory Modules',
  'Power Supplies',
  'Display Panels',
  'Sensor Arrays',
  'Network Adapters',
  'Storage Devices',
  'Battery Systems',
  'Cooling Solutions',
  'Security Modules'
];

export const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({
  open,
  onClose,
  onCreatePayment
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [payment, setPayment] = useState<NewPayment>(initialPayment);
  const [errors, setErrors] = useState<Partial<Record<keyof NewPayment, string>>>({});
  const [product, setProduct] = useState('');

  const steps = ['Payment Details', 'Supplier & Order', 'Review & Submit'];

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setPayment(initialPayment);
    setActiveStep(0);
    setErrors({});
    onClose();
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      onCreatePayment(payment);
      handleClose();
    }
  };

  const handleChange = (field: keyof NewPayment, value: any) => {
    setPayment((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleAddProduct = () => {
    if (product && !payment.products.includes(product)) {
      setPayment((prev) => ({
        ...prev,
        products: [...prev.products, product]
      }));
      setProduct('');
    }
  };

  const handleRemoveProduct = (productToRemove: string) => {
    setPayment((prev) => ({
      ...prev,
      products: prev.products.filter(p => p !== productToRemove)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof NewPayment, string>> = {};
    let isValid = true;

    if (step === 0) {
      if (!payment.invoiceNumber) {
        newErrors.invoiceNumber = 'Invoice number is required';
        isValid = false;
      }
      
      if (payment.amount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
        isValid = false;
      }
      
      if (!payment.dueDate) {
        newErrors.dueDate = 'Due date is required';
        isValid = false;
      }
      
      if (!payment.paymentMethod) {
        newErrors.paymentMethod = 'Payment method is required';
        isValid = false;
      }
    } else if (step === 1) {
      if (!payment.supplierName) {
        newErrors.supplierName = 'Supplier name is required';
        isValid = false;
      }
      
      if (!payment.linkedOrderNumber) {
        newErrors.linkedOrderNumber = 'Order number is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateFees = (): { fee: number, savings: number } => {
    const traditionalFeeRate = 0.025; // 2.5%
    const shellTokenFeeRate = 0.005; // 0.5%
    const usdcFeeRate = 0.01; // 1%
    
    let feeRate;
    switch (payment.paymentMethod) {
      case 'Shell Token':
        feeRate = shellTokenFeeRate;
        break;
      case 'USDC':
        feeRate = usdcFeeRate;
        break;
      case 'Traditional Wire':
        feeRate = traditionalFeeRate;
        break;
      default:
        feeRate = traditionalFeeRate;
    }
    
    const fee = payment.amount * feeRate;
    const traditionalFee = payment.amount * traditionalFeeRate;
    const savings = payment.paymentMethod !== 'Traditional Wire' ? traditionalFee - fee : 0;
    
    return { fee, savings };
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Invoice Number"
                  value={payment.invoiceNumber}
                  onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                  error={!!errors.invoiceNumber}
                  helperText={errors.invoiceNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FileText size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={payment.amount === 0 ? '' : payment.amount}
                  onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DollarSign size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={payment.dueDate}
                    onChange={(date) => handleChange('dueDate', date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dueDate,
                        helperText: errors.dueDate,
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Calendar size={20} />
                            </InputAdornment>
                          ),
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.paymentMethod}>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={payment.paymentMethod}
                    label="Payment Method"
                    onChange={(e: SelectChangeEvent) => handleChange('paymentMethod', e.target.value as PaymentMethod)}
                    startAdornment={
                      <InputAdornment position="start">
                        <CreditCard size={20} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Shell Token">Shell Token</MenuItem>
                    <MenuItem value="USDC">USDC</MenuItem>
                    <MenuItem value="Traditional Wire">Traditional Wire</MenuItem>
                  </Select>
                  {errors.paymentMethod && <FormHelperText>{errors.paymentMethod}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Urgency</InputLabel>
                  <Select
                    value={payment.urgency}
                    label="Urgency"
                    onChange={(e: SelectChangeEvent) => handleChange('urgency', e.target.value as PaymentUrgency)}
                  >
                    <MenuItem value="critical">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} color={theme.palette.error.main} style={{ marginRight: 8 }} />
                        Critical
                      </Box>
                    </MenuItem>
                    <MenuItem value="high">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} color={theme.palette.warning.main} style={{ marginRight: 8 }} />
                        High
                      </Box>
                    </MenuItem>
                    <MenuItem value="medium">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} color={theme.palette.info.main} style={{ marginRight: 8 }} />
                        Medium
                      </Box>
                    </MenuItem>
                    <MenuItem value="low">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AlertCircle size={16} color={theme.palette.success.main} style={{ marginRight: 8 }} />
                        Low
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={payment.status}
                    label="Status"
                    onChange={(e: SelectChangeEvent) => handleChange('status', e.target.value as PaymentStatus)}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Pending Approval">Pending Approval</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </StepContent>
        );
      
      case 1:
        return (
          <StepContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.supplierName}>
                  <InputLabel>Supplier</InputLabel>
                  <Select
                    value={payment.supplierName}
                    label="Supplier"
                    onChange={(e: SelectChangeEvent) => handleChange('supplierName', e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Building size={20} />
                      </InputAdornment>
                    }
                  >
                    {mockSuppliers.map((supplier) => (
                      <MenuItem key={supplier} value={supplier}>{supplier}</MenuItem>
                    ))}
                  </Select>
                  {errors.supplierName && <FormHelperText>{errors.supplierName}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.linkedOrderNumber}>
                  <InputLabel>Order Number</InputLabel>
                  <Select
                    value={payment.linkedOrderNumber}
                    label="Order Number"
                    onChange={(e: SelectChangeEvent) => handleChange('linkedOrderNumber', e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <FileCheck size={20} />
                      </InputAdornment>
                    }
                  >
                    {mockOrders.map((order) => (
                      <MenuItem key={order} value={order}>{order}</MenuItem>
                    ))}
                  </Select>
                  {errors.linkedOrderNumber && <FormHelperText>{errors.linkedOrderNumber}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Products</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControl fullWidth sx={{ mr: 1 }}>
                    <InputLabel>Add Product</InputLabel>
                    <Select
                      value={product}
                      label="Add Product"
                      onChange={(e: SelectChangeEvent) => setProduct(e.target.value)}
                    >
                      {mockProducts.map((prod) => (
                        <MenuItem key={prod} value={prod}>{prod}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button 
                    variant="contained" 
                    onClick={handleAddProduct}
                    disabled={!product}
                  >
                    Add
                  </Button>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  {payment.products.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {payment.products.map((prod) => (
                        <Chip 
                          key={prod} 
                          label={prod} 
                          onDelete={() => handleRemoveProduct(prod)}
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No products added yet
                    </Typography>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={4}
                  value={payment.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />
              </Grid>
            </Grid>
          </StepContent>
        );
      
      case 2:
        const { fee, savings } = calculateFees();
        return (
          <StepContent>
            <Typography variant="h6" gutterBottom>
              Payment Summary
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Invoice Number
                  </Typography>
                  <Typography variant="body1">
                    {payment.invoiceNumber}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${payment.amount.toLocaleString()}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Due Date
                  </Typography>
                  <Typography variant="body1">
                    {payment.dueDate ? format(payment.dueDate, 'MMMM d, yyyy') : 'Not specified'}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip 
                    label={payment.status} 
                    size="small"
                    sx={{ 
                      backgroundColor: theme.palette.primary.main,
                      color: '#fff',
                      fontWeight: 'medium',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Supplier
                  </Typography>
                  <Typography variant="body1">
                    {payment.supplierName}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order Number
                  </Typography>
                  <Typography variant="body1">
                    {payment.linkedOrderNumber}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    {payment.paymentMethod}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Urgency
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    {payment.urgency === 'critical' && <AlertCircle size={16} color={theme.palette.error.main} style={{ marginRight: 8 }} />}
                    {payment.urgency === 'high' && <AlertCircle size={16} color={theme.palette.warning.main} style={{ marginRight: 8 }} />}
                    {payment.urgency === 'medium' && <AlertCircle size={16} color={theme.palette.info.main} style={{ marginRight: 8 }} />}
                    {payment.urgency === 'low' && <AlertCircle size={16} color={theme.palette.success.main} style={{ marginRight: 8 }} />}
                    {payment.urgency.charAt(0).toUpperCase() + payment.urgency.slice(1)}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Products
                  </Typography>
                  {payment.products.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {payment.products.map((prod) => (
                        <Chip 
                          key={prod} 
                          label={prod} 
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No products specified
                    </Typography>
                  )}
                </Box>
                
                {payment.notes && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="body2">
                      {payment.notes}
                    </Typography>
                  </Box>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Fee Summary
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Amount
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        ${payment.amount.toLocaleString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Transaction Fee
                      </Typography>
                      <Typography variant="body1" color="error.main">
                        -${fee.toFixed(2)}
                      </Typography>
                    </Grid>
                    
                    {savings > 0 && (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Traditional Wire Fee (for comparison)
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            ${(payment.amount * 0.025).toFixed(2)}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Your Savings
                          </Typography>
                          <Typography variant="body1" color="success.main" fontWeight="bold">
                            ${savings.toFixed(2)}
                          </Typography>
                        </Grid>
                      </>
                    )}
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="subtitle1">
                          Total Amount
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                          ${(payment.amount + fee).toFixed(2)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </StepContent>
        );
      
      default:
        return null;
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Create New Payment</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {renderStepContent(activeStep)}
      </DialogContent>
      
      <DialogActions>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length - 1 ? (
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            startIcon={<CheckCircle size={18} />}
          >
            Create Payment
          </Button>
        ) : (
          <Button 
            variant="contained" 
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default CreatePaymentModal; 