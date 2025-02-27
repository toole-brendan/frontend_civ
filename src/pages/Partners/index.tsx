import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SyncIcon from '@mui/icons-material/Sync';
import PartnerFilters from './components/PartnerFilters';
import PartnersList from './components/PartnersList';
import { Partner, PartnerFilters as PartnerFiltersType, PartnerTab } from './types';

// Mock data for partners
const MOCK_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'Ethiopian Coffee Cooperative',
    type: 'SUPPLIER',
    status: 'ACTIVE',
    country: 'Ethiopia',
    email: 'contact@ethcoffee.com',
    phone: '+251 11 551 7700',
    contactName: 'Abebe Bikila',
    logoUrl: '',
    isVerified: true,
    rating: 4.8,
    partnerSince: '2018-03-15',
    certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
    tags: ['Premium', 'Single Origin'],
    isFairTrade: true,
    isOrganic: true,
    metrics: {
      totalOrders: 187,
      totalRevenue: 532000,
      averageOrderValue: 2845.99,
      returnRate: 0.3,
    },
    contacts: [
      {
        id: '1-1',
        name: 'Abebe Bikila',
        position: 'Director',
        email: 'abebe@ethcoffee.com',
        phone: '+251 11 551 7701',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '1-1',
        name: 'Supply Agreement',
        type: 'CONTRACT',
        url: '/documents/supply-agreement-1.pdf',
        uploadDate: '2021-03-01'
      }
    ],
    billingAddress: {
      street: '123 Coffee Lane',
      city: 'Addis Ababa',
      state: 'Oromia',
      postalCode: '1000',
      country: 'Ethiopia'
    }
  },
  {
    id: '2',
    name: 'Cafe Imports',
    type: 'DISTRIBUTOR',
    status: 'ACTIVE',
    country: 'USA',
    email: 'info@cafeimports.com',
    phone: '+1 612 870 9575',
    contactName: 'Andrew Miller',
    logoUrl: '',
    isVerified: true,
    rating: 4.9,
    partnerSince: '2017-08-10',
    certifications: ['B Corp', 'Sustainable Trade'],
    tags: ['Specialty', 'Global'],
    metrics: {
      totalOrders: 235,
      totalRevenue: 872000,
      averageOrderValue: 3710.64,
      returnRate: 0.4,
    },
    contacts: [
      {
        id: '2-1',
        name: 'Michael Johnson',
        position: 'Sales Director',
        email: 'michael@cafeimports.com',
        phone: '+1 612 555 1235',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '2-1',
        name: 'Distribution Agreement',
        type: 'CONTRACT',
        url: '/documents/dist-agreement-2.pdf',
        uploadDate: '2020-11-15'
      }
    ],
    billingAddress: {
      street: '2810 Coffee Avenue',
      city: 'Minneapolis',
      state: 'MN',
      postalCode: '55413',
      country: 'USA'
    }
  },
  {
    id: '3',
    name: 'Colombia Coffee Growers Federation',
    type: 'SUPPLIER',
    status: 'ACTIVE',
    country: 'Colombia',
    email: 'info@fedecafe.com',
    phone: '+57 1 313 6600',
    contactName: 'Roberto Vélez',
    logoUrl: '',
    isVerified: true,
    rating: 4.7,
    partnerSince: '2019-02-01',
    tags: ['Premium', 'Sustainable'],
    metrics: {
      totalOrders: 142,
      totalRevenue: 427000,
      averageOrderValue: 3007.04,
    },
    contacts: [
      {
        id: '3-1',
        name: 'Ana Martinez',
        position: 'Export Manager',
        email: 'ana@fedecafe.co',
        phone: '+57 1 313 6701',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '3-1',
        name: 'Supply Contract',
        type: 'CONTRACT',
        url: '/documents/supply-contract-3.pdf',
        uploadDate: '2021-01-20'
      }
    ],
    billingAddress: {
      street: '73 Calle 8',
      city: 'Bogotá',
      state: 'Cundinamarca',
      postalCode: '110231',
      country: 'Colombia'
    }
  },
  {
    id: '4',
    name: 'Urban Roasters',
    type: 'CUSTOMER',
    status: 'ACTIVE',
    country: 'UK',
    email: 'orders@urbanroasters.co.uk',
    phone: '+44 20 7946 0892',
    contactName: 'Emma Williams',
    companyRegistration: 'UK12345678',
    isVerified: false,
    rating: 4.2,
    partnerSince: '2020-05-17',
    tags: ['Artisan', 'Small Batch'],
    metrics: {
      totalOrders: 53,
      totalRevenue: 87000,
      averageOrderValue: 1641.51,
      lastOrderDate: '2023-02-10',
    },
    contacts: [
      {
        id: '4-1',
        name: 'Emma Williams',
        position: 'Owner',
        email: 'emma@urbanroasters.co.uk',
        phone: '+44 20 7946 0893',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '4-1',
        name: 'Purchase Agreement',
        type: 'CONTRACT',
        url: '/documents/purchase-agreement-4.pdf',
        uploadDate: '2022-01-05'
      }
    ],
    billingAddress: {
      street: '15 Roasting Lane',
      city: 'London',
      state: '',
      postalCode: 'EC1V 7LQ',
      country: 'UK'
    }
  },
  {
    id: '5',
    name: 'Organic Bean Co-op',
    type: 'SUPPLIER',
    status: 'PENDING',
    country: 'Peru',
    email: 'info@organicbean.pe',
    phone: '+51 1 234 5678',
    contactName: 'Carlos Mendoza',
    isVerified: false,
    rating: 3.8,
    partnerSince: '2022-01-31',
    certifications: ['Organic', 'Rainforest Alliance'],
    tags: ['Sustainable', 'Small Farms'],
    isOrganic: true,
    metrics: {
      totalOrders: 9,
      totalRevenue: 27000,
      averageOrderValue: 3000.00,
    },
    contacts: [
      {
        id: '5-1',
        name: 'Carlos Mendoza',
        position: 'Co-op Director',
        email: 'carlos@organicbean.pe',
        phone: '+51 1 234 5679',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '5-1',
        name: 'Organic Certification',
        type: 'CERTIFICATE',
        url: '/documents/organic-cert-5.pdf',
        uploadDate: '2022-01-15'
      }
    ],
    billingAddress: {
      street: '45 Avenida Los Incas',
      city: 'Lima',
      state: '',
      postalCode: '15073',
      country: 'Peru'
    }
  },
  {
    id: '6',
    name: 'Java Distributors',
    type: 'DISTRIBUTOR',
    status: 'ACTIVE',
    country: 'Indonesia',
    email: 'sales@javadist.com',
    phone: '+1 415 555 7890',
    contactName: 'Jennifer Wong',
    logoUrl: '',
    isVerified: true,
    rating: 4.5,
    partnerSince: '2020-11-05',
    certifications: ['ISO 9001', 'HACCP'],
    tags: ['Wholesale', 'Specialty'],
    isOrganic: true,
    metrics: {
      totalOrders: 76,
      totalRevenue: 294000,
      averageOrderValue: 3868.42,
    },
    contacts: [
      {
        id: '6-1',
        name: 'Budi Santoso',
        position: 'CEO',
        email: 'budi@javadist.id',
        phone: '+62 21 2988 7767',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '6-1',
        name: 'Distribution Contract',
        type: 'CONTRACT',
        url: '/documents/dist-contract-6.pdf',
        uploadDate: '2021-08-20'
      }
    ],
    billingAddress: {
      street: '88 Jalan Merdeka',
      city: 'Jakarta',
      state: '',
      postalCode: '10110',
      country: 'Indonesia'
    }
  },
  {
    id: '7',
    name: 'Coffee Bean Storage Facilities',
    type: 'LOGISTICS',
    status: 'ACTIVE',
    country: 'Germany',
    email: 'info@cbsf.org',
    phone: '+1 510 555 1234',
    contactName: 'Marcus Johnson',
    logoUrl: '',
    isVerified: true,
    rating: 4.6,
    partnerSince: '2019-07-22',
    tags: ['Warehouse', 'Logistics'],
    metrics: {
      totalOrders: 98,
      totalRevenue: 216000,
      averageOrderValue: 2204.08,
    },
    contacts: [
      {
        id: '7-1',
        name: 'Hans Mueller',
        position: 'Operations Manager',
        email: 'hans@cbsf.de',
        phone: '+49 30 123 4568',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '7-1',
        name: 'Storage Agreement',
        type: 'CONTRACT',
        url: '/documents/storage-agreement-7.pdf',
        uploadDate: '2020-12-05'
      }
    ],
    billingAddress: {
      street: '25 Kaffestrasse',
      city: 'Berlin',
      state: '',
      postalCode: '10115',
      country: 'Germany'
    }
  },
  {
    id: '8',
    name: 'Specialty Cafe Chain',
    type: 'CUSTOMER',
    status: 'INACTIVE',
    country: 'Canada',
    email: 'purchasing@specialtycafe.ca',
    phone: '+1 416 555 9876',
    contactName: 'Sarah Thompson',
    isVerified: false,
    rating: 3.7,
    partnerSince: '2021-03-11',
    tags: ['Retail', 'Multiple Locations'],
    metrics: {
      totalOrders: 27,
      totalRevenue: 58000,
      averageOrderValue: 2148.15,
      lastOrderDate: '2022-09-15',
    },
    contacts: [
      {
        id: '8-1',
        name: 'Sarah Thompson',
        position: 'Purchasing Manager',
        email: 'sarah@specialtycafe.ca',
        phone: '+1 416 555 9877',
        isPrimary: true
      }
    ],
    documents: [
      {
        id: '8-1',
        name: 'Sales Agreement',
        type: 'CONTRACT',
        url: '/documents/sales-agreement-8.pdf',
        uploadDate: '2021-03-20'
      }
    ],
    billingAddress: {
      street: '123 Queen Street West',
      city: 'Toronto',
      state: 'ON',
      postalCode: 'M5H 2M9',
      country: 'Canada'
    }
  },
];

// Styled components
const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const TabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

const Partners: React.FC = () => {
  // States
  const [partners, setPartners] = useState<Partner[]>(MOCK_PARTNERS);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>(MOCK_PARTNERS);
  const [currentTab, setCurrentTab] = useState<PartnerTab>('ALL');
  const [filters, setFilters] = useState<PartnerFiltersType>({
    search: '',
    type: '',
    status: '',
    country: '',
    tags: [],
    certifications: [],
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [isLoading, setIsLoading] = useState(false);

  // Effect to filter partners based on selected tab and filters
  useEffect(() => {
    let result = [...partners];

    // Filter by tab
    if (currentTab !== 'ALL') {
      result = result.filter(partner => {
        switch (currentTab) {
          case 'SUPPLIERS':
            return partner.type === 'SUPPLIER';
          case 'CUSTOMERS':
            return partner.type === 'CUSTOMER';
          case 'DISTRIBUTORS':
            return partner.type === 'DISTRIBUTOR';
          case 'OTHER':
            return partner.type !== 'SUPPLIER' && partner.type !== 'CUSTOMER' && partner.type !== 'DISTRIBUTOR';
          default:
            return true;
        }
      });
    }

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        partner => 
          partner.name.toLowerCase().includes(searchTerm) || 
          partner.contactName.toLowerCase().includes(searchTerm) ||
          partner.email.toLowerCase().includes(searchTerm) ||
          partner.phone.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.type) {
      result = result.filter(partner => partner.type === filters.type);
    }

    if (filters.status) {
      result = result.filter(partner => partner.status === filters.status);
    }

    if (filters.country) {
      result = result.filter(partner => partner.country === filters.country);
    }

    if (filters.tags.length > 0) {
      result = result.filter(partner => 
        partner.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    if (filters.certifications.length > 0) {
      result = result.filter(partner => 
        partner.certifications?.some(cert => filters.certifications.includes(cert))
      );
    }

    if (filters.isFairTrade) {
      result = result.filter(partner => partner.isFairTrade);
    }

    if (filters.isOrganic) {
      result = result.filter(partner => partner.isOrganic);
    }

    setFilteredPartners(result);
  }, [partners, currentTab, filters]);

  // Partner metrics
  const metrics = {
    totalPartners: partners.length,
    activePartners: partners.filter(p => p.status === 'ACTIVE').length,
    suppliers: partners.filter(p => p.type === 'SUPPLIER').length,
    customers: partners.filter(p => p.type === 'CUSTOMER').length,
    distributors: partners.filter(p => p.type === 'DISTRIBUTOR').length,
    others: partners.filter(p => !['SUPPLIER', 'CUSTOMER', 'DISTRIBUTOR'].includes(p.type)).length,
  };

  // Handlers
  const handleTabChange = (_event: React.SyntheticEvent, newValue: PartnerTab) => {
    setCurrentTab(newValue);
  };

  const handleFilterChange = (newFilters: PartnerFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: '',
      status: '',
      country: '',
      tags: [],
      certifications: [],
    });
  };

  const handleCreatePartner = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleViewPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPartner(null);
  };

  const handleEditPartner = (partner: Partner) => {
    // Would navigate to edit partner page or open edit modal
    console.log('Edit partner:', partner);
    showNotification('Edit functionality will be implemented in a future update', 'info');
  };

  const handleDeletePartner = (partner: Partner) => {
    // This would usually include a confirmation dialog
    const updatedPartners = partners.filter(p => p.id !== partner.id);
    setPartners(updatedPartners);
    showNotification(`Partner ${partner.name} has been deleted`, 'success');
  };

  const handleRefreshPartners = () => {
    setIsLoading(true);
    // This would usually fetch from an API
    setTimeout(() => {
      setIsLoading(false);
      showNotification('Partner list refreshed', 'success');
    }, 1000);
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Partner Management
          </Typography>
          <Box>
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={handleRefreshPartners}
              sx={{ mr: 1 }}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreatePartner}
            >
              Add Partner
            </Button>
          </Box>
        </Box>

        {/* Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2}>
            <MetricCard elevation={2}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {metrics.totalPartners}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Partners
              </Typography>
            </MetricCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <MetricCard elevation={2}>
              <Typography variant="h5" color="success.main" fontWeight="bold">
                {metrics.activePartners}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active Partners
              </Typography>
            </MetricCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <MetricCard elevation={2}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {metrics.suppliers}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Suppliers
              </Typography>
            </MetricCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <MetricCard elevation={2}>
              <Typography variant="h5" color="secondary.main" fontWeight="bold">
                {metrics.customers}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Customers
              </Typography>
            </MetricCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <MetricCard elevation={2}>
              <Typography variant="h5" color="info.main" fontWeight="bold">
                {metrics.distributors}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Distributors
              </Typography>
            </MetricCard>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <MetricCard elevation={2}>
              <Typography variant="h5" color="text.secondary" fontWeight="bold">
                {metrics.others}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Other Partners
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper elevation={0} variant="outlined" sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<AllInboxIcon />} label="All Partners" value="ALL" />
            <Tab icon={<BusinessIcon />} label="Suppliers" value="SUPPLIERS" />
            <Tab icon={<GroupIcon />} label="Customers" value="CUSTOMERS" />
            <Tab icon={<LocalShippingIcon />} label="Distributors" value="DISTRIBUTORS" />
            <Tab icon={<BusinessIcon />} label="Other" value="OTHER" />
          </Tabs>
        </Paper>

        {/* Filters */}
        <PartnerFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Partner List */}
        <TabPanel>
          <PartnersList
            partners={filteredPartners}
            onViewPartner={handleViewPartner}
            onEditPartner={handleEditPartner}
            onDeletePartner={handleDeletePartner}
            onCreatePartner={handleCreatePartner}
          />
        </TabPanel>
      </Box>

      {/* Create Partner Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add New Partner
          <IconButton
            aria-label="close"
            onClick={handleCloseCreateModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Partner creation form would be implemented here.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* View Partner Modal */}
      <Dialog
        open={isViewModalOpen}
        onClose={handleCloseViewModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Partner Details
          <IconButton
            aria-label="close"
            onClick={handleCloseViewModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedPartner && (
            <Typography>
              Viewing details for {selectedPartner.name}
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Partners; 