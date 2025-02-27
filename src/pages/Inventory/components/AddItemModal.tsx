import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Avatar,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  Close as CloseIcon,
  AddPhotoAlternate as AddPhotoIcon,
  QrCode as QrCodeIcon,
  Save as SaveIcon,
  AddCircleOutline as AddIcon,
  AttachMoney as PriceIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { Category } from './InventoryFilters';

// Define the inventory item interface
export interface NewInventoryItem {
  name: string;
  sku: string;
  categoryId: string;
  quantity: number;
  locationId: string;
  unitPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order' | 'Discontinued';
  minimumQuantity?: number;
  description?: string;
  imageUrl?: string;
}

// Component props
interface AddItemModalProps {
  open: boolean;
  categories: Category[];
  locations: Array<{ id: string; name: string; path: string[] }>;
  onClose: () => void;
  onAddItem: (item: NewInventoryItem) => void;
  onSave: (item: Partial<TechComponentsInventoryItem>) => void;
  onCancel: () => void;
}

// Styled components
const ImagePreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
}));

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  minHeight: 300,
}));

export const AddItemModal: React.FC<AddItemModalProps> = ({
  open,
  categories,
  locations,
  onClose,
  onAddItem,
  onSave,
  onCancel
}) => {
  // State for the active step
  const [activeStep, setActiveStep] = useState(0);
  
  // State for form data
  const [itemData, setItemData] = useState<NewInventoryItem>({
    name: '',
    sku: '',
    categoryId: '',
    quantity: 0,
    locationId: '',
    unitPrice: 0,
    status: 'In Stock',
    minimumQuantity: 0,
    description: '',
    imageUrl: '',
  });
  
  // State for form validation
  const [errors, setErrors] = useState<Partial<Record<keyof NewInventoryItem, string>>>({});
  
  // Steps for the stepper
  const steps = ['Basic Information', 'Inventory Details', 'Additional Information'];
  
  // Handle next step
  const handleNext = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length === 0) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setErrors(newErrors);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Handle text field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: name === 'unitPrice' || name === 'quantity' || name === 'minimumQuantity'
        ? parseFloat(value) || 0
        : value,
    });
    
    // Clear error for the field
    if (errors[name as keyof NewInventoryItem]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Handle select field changes
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
    
    // Clear error for the field
    if (errors[name as keyof NewInventoryItem]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Handle final submit
  const handleSubmit = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length === 0) {
      onAddItem(itemData);
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };
  
  // Handle modal close and reset form
  const handleClose = () => {
    setItemData({
      name: '',
      sku: '',
      categoryId: '',
      quantity: 0,
      locationId: '',
      unitPrice: 0,
      status: 'In Stock',
      minimumQuantity: 0,
      description: '',
      imageUrl: '',
    });
    setActiveStep(0);
    setErrors({});
    onClose();
  };
  
  // Generate a random SKU
  const generateSku = () => {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const sku = `ITEM-${randomPart}`;
    setItemData({
      ...itemData,
      sku,
    });
  };
  
  // Handle image upload
  const handleImageUpload = () => {
    // In a real application, this would open a file dialog
    // For now, we'll just set a placeholder image
    const dummyImageUrl = 'https://via.placeholder.com/300';
    setItemData({
      ...itemData,
      imageUrl: dummyImageUrl,
    });
  };
  
  // Validate the current step
  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof NewInventoryItem, string>> = {};
    
    switch (step) {
      case 0:
        // Validate basic information
        if (!itemData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        if (!itemData.sku.trim()) {
          newErrors.sku = 'SKU is required';
        }
        if (!itemData.categoryId) {
          newErrors.categoryId = 'Category is required';
        }
        break;
      case 1:
        // Validate inventory details
        if (itemData.quantity < 0) {
          newErrors.quantity = 'Quantity must be a positive number';
        }
        if (!itemData.locationId) {
          newErrors.locationId = 'Location is required';
        }
        if (itemData.unitPrice < 0) {
          newErrors.unitPrice = 'Price must be a positive number';
        }
        break;
      case 2:
        // Validate additional information
        if (itemData.minimumQuantity !== undefined && itemData.minimumQuantity < 0) {
          newErrors.minimumQuantity = 'Minimum quantity must be a positive number';
        }
        break;
      default:
        break;
    }
    
    return newErrors;
  };
  
  // Render the current step content
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={itemData.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="SKU"
                  name="sku"
                  value={itemData.sku}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.sku}
                  helperText={errors.sku}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={generateSku}
                          size="small"
                          variant="text"
                        >
                          Generate
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.categoryId}>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    name="categoryId"
                    value={itemData.categoryId}
                    label="Category *"
                    onChange={handleSelectChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.categoryId && (
                    <Typography variant="caption" color="error">
                      {errors.categoryId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ImagePreview onClick={handleImageUpload}>
                  {itemData.imageUrl ? (
                    <Box
                      component="img"
                      src={itemData.imageUrl}
                      alt="Item Preview"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <>
                      <AddPhotoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Click to upload an image
                      </Typography>
                    </>
                  )}
                </ImagePreview>
              </Grid>
            </Grid>
          </StepContent>
        );
      case 1:
        return (
          <StepContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={itemData.quantity}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InventoryIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Minimum Quantity"
                  name="minimumQuantity"
                  type="number"
                  value={itemData.minimumQuantity}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.minimumQuantity}
                  helperText={errors.minimumQuantity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Unit Price"
                  name="unitPrice"
                  type="number"
                  value={itemData.unitPrice}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!errors.unitPrice}
                  helperText={errors.unitPrice}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PriceIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={itemData.status}
                    label="Status"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="In Stock">In Stock</MenuItem>
                    <MenuItem value="Low Stock">Low Stock</MenuItem>
                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                    <MenuItem value="On Order">On Order</MenuItem>
                    <MenuItem value="Discontinued">Discontinued</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.locationId}>
                  <InputLabel id="location-label">Location *</InputLabel>
                  <Select
                    labelId="location-label"
                    name="locationId"
                    value={itemData.locationId}
                    label="Location *"
                    onChange={handleSelectChange}
                  >
                    {locations.map((location) => (
                      <MenuItem key={location.id} value={location.id}>
                        {location.path.join(' > ')}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.locationId && (
                    <Typography variant="caption" color="error">
                      {errors.locationId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </StepContent>
        );
      case 2:
        return (
          <StepContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={itemData.description}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<QrCodeIcon />}
                    sx={{ minWidth: 140 }}
                  >
                    Generate QR
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    Generate a QR code for quick scanning of this item
                  </Typography>
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
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {activeStep === steps.length ? 'Item Added Successfully' : 'Add New Inventory Item'}
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
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
        
        {activeStep === steps.length ? (
          <Box sx={{ 
            mt: 3, 
            mb: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2 
          }}>
            <Avatar sx={{ bgcolor: 'success.main', width: 60, height: 60 }}>
              <SaveIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography variant="h6">
              Item has been added successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              The inventory item has been added to your system.
              You can now view it in your inventory list.
            </Typography>
          </Box>
        ) : (
          renderStepContent(activeStep)
        )}
      </DialogContent>
      
      <DialogActions>
        {activeStep === steps.length ? (
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        ) : (
          <>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add Item
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal; 