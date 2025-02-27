import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Chip, 
  IconButton, 
  Stack,
  Button,
  Divider,
  useTheme,
  Tooltip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import { Supplier } from '../types';
import StandardCard from './shared/StandardCard';
import { getPerformanceColor, getVerificationColor } from '../utils/statusColors';

// Extended supplier type with UI-specific properties
interface ExtendedSupplier extends Supplier {
  logo?: string;
  headquarters?: string;
  performanceScore?: number;
  percentOfTotalSpend?: number;
  annualSpend?: number;
  onTimeDeliveryRate?: number;
  categories?: string[];
  contractExpiration?: string;
  blockchainVerificationStatus?: string;
  shellTokenEnabled?: boolean;
}

interface KeySupplierCardsProps {
  suppliers: ExtendedSupplier[];
  onContactSupplier: (supplier: ExtendedSupplier) => void;
  onCreateOrder: (supplier: ExtendedSupplier) => void;
  onPaySupplier: (supplier: ExtendedSupplier) => void;
  onViewDetails: (supplier: ExtendedSupplier) => void;
}

const KeySupplierCards: React.FC<KeySupplierCardsProps> = ({
  suppliers,
  onContactSupplier,
  onCreateOrder,
  onPaySupplier,
  onViewDetails,
}) => {
  const theme = useTheme();

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: getVerificationColor(theme, 'VERIFIED').main }} />;
      case 'PARTIALLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: getVerificationColor(theme, 'PENDING').main }} />;
      case 'VERIFICATION_PENDING':
        return <WarningIcon fontSize="small" sx={{ color: getVerificationColor(theme, 'PENDING').main }} />;
      default:
        return <WarningIcon fontSize="small" sx={{ color: getVerificationColor(theme, 'REJECTED').main }} />;
    }
  };

  const getVerificationStatusText = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return 'Fully verified';
      case 'PARTIALLY_VERIFIED':
        return 'Partially verified';
      case 'VERIFICATION_PENDING':
        return 'Verification pending';
      default:
        return 'Not verified';
    }
  };

  return (
    <StandardCard 
      title="Key Supplier Cards" 
      tooltip="Showing top 5 suppliers by annual spend"
      icon={<BusinessIcon color="primary" />}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          pb: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[100],
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[300],
            borderRadius: 4,
            '&:hover': {
              backgroundColor: theme.palette.grey[400],
            },
          },
        }}
      >
        {suppliers.slice(0, 5).map((supplier) => (
          <Box
            key={supplier.id}
            sx={{
              minWidth: 300,
              maxWidth: 350,
              flex: '0 0 auto',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              backgroundColor: theme.palette.background.paper,
              transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            {/* Card Header */}
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={supplier.logo}
                  alt={supplier.name}
                  variant="rounded"
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium" noWrap>
                    {supplier.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {supplier.headquarters || supplier.contactInfo.address.city + ', ' + supplier.contactInfo.address.country}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={`Performance: ${supplier.performanceScore || supplier.performance.overall}/100`}
                  size="small"
                  sx={{
                    backgroundColor: getPerformanceColor(theme, supplier.performanceScore || supplier.performance.overall).main,
                    color: getPerformanceColor(theme, supplier.performanceScore || supplier.performance.overall).contrastText,
                    fontWeight: 'bold',
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {supplier.percentOfTotalSpend || Math.round(supplier.businessRelationship.spendYTD / 10000) / 100}% of total spend 
                  (${((supplier.annualSpend || supplier.businessRelationship.spendLastYear) / 1000000).toFixed(2)}M annually)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {supplier.onTimeDeliveryRate || Math.round(supplier.performance.delivery)}% on-time delivery
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" fontWeight="medium" color="text.primary">
                  Product Categories
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                  {(supplier.categories || [supplier.category]).slice(0, 2).map((category: string) => (
                    <Chip
                      key={category}
                      label={category}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.7rem',
                        borderColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
                  {(supplier.categories?.length || 0) > 2 && (
                    <Chip
                      label={`+${(supplier.categories?.length || 0) - 2} more`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>
            
            {/* Card Footer */}
            <Box sx={{ p: 2, backgroundColor: theme.palette.background.default }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarTodayIcon fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Contract expires: {new Date(supplier.contractExpiration || supplier.businessRelationship.contractRenewalDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getVerificationStatusIcon(supplier.blockchainVerificationStatus || (supplier.smartContract ? 'FULLY_VERIFIED' : 'VERIFICATION_PENDING'))}
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  Blockchain status: {getVerificationStatusText(supplier.blockchainVerificationStatus || (supplier.smartContract ? 'FULLY_VERIFIED' : 'VERIFICATION_PENDING'))}
                </Typography>
              </Box>
            </Box>
            
            {/* Actions */}
            <Divider />
            <Box sx={{ 
              p: 1.5, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Contact Supplier">
                  <IconButton
                    size="small"
                    onClick={() => onContactSupplier(supplier)}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <EmailIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Create Order">
                  <IconButton
                    size="small"
                    onClick={() => onCreateOrder(supplier)}
                    sx={{ color: theme.palette.info.main }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Make Payment">
                  <IconButton
                    size="small"
                    onClick={() => onPaySupplier(supplier)}
                    sx={{ color: theme.palette.success.main }}
                    disabled={!(supplier.shellTokenEnabled || (supplier.smartContract?.autoPaymentEnabled))}
                  >
                    <AccountBalanceWalletIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Button
                variant="text"
                size="small"
                endIcon={<ArrowForwardIcon />}
                onClick={() => onViewDetails(supplier)}
                sx={{ fontWeight: 'medium' }}
              >
                View Details
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </StandardCard>
  );
};

export default KeySupplierCards; 