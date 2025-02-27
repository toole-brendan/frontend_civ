import { 
  Supplier, 
  SupplierMetrics, 
  SupplierOrderStatus,
  User,
  Contact,
  RelationshipEvent,
  BusinessHours,
  Certification,
  ComplianceStatus,
  LeadTime,
  QualityMetrics,
  RiskAssessment,
  SmartContract,
  ExtendedQualityMetrics
} from './types';

// Mock User
export const mockUser: User = {
  id: 'user-001',
  name: 'Michael Chen',
  email: 'michael.chen@techcomponents.com',
  role: 'Supply Chain Manager',
  company: 'TechComponents International',
  department: 'Procurement',
  preferences: {
    theme: 'SYSTEM',
    notifications: true,
    defaultCurrency: 'USD',
  }
};

// Mock Supplier Metrics
export const mockSupplierMetrics: SupplierMetrics = {
  onTimeDelivery: 87,
  qualityRating: 92,
  responseTime: 24,
  overallPerformance: 88,
  riskScore: 25,
  totalSpend: 1450000,
  activeContracts: 12,
  pendingOrders: 5,
  totalCount: 35,
  activeSuppliers: 28,
  verifiedCount: 22,
  smartContractCount: 15,
  annualSavings: 12,
  averagePerformance: 88
};

// Mock Order Statuses
export const mockSupplierOrders: SupplierOrderStatus[] = [
  {
    status: 'Pending Quote',
    count: 8,
    value: 245000,
    flagged: 2,
  },
  {
    status: 'Awaiting Production',
    count: 12,
    value: 892000,
    flagged: 1,
  },
  {
    status: 'In Production',
    count: 15,
    value: 1240000,
    flagged: 3,
  },
  {
    status: 'Ready to Ship',
    count: 4,
    value: 380000,
    flagged: 0,
  },
  {
    status: 'In Transit',
    count: 5,
    value: 420000,
    flagged: 1,
  },
];

// Mock suppliers data
export const mockSuppliers: Supplier[] = [
  {
    id: "SUP001",
    name: "TechPro Industries",
    contactInfo: {
      email: "contact@techproindustries.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "1234 Innovation Parkway",
        city: "San Jose",
        state: "CA",
        zip: "95134",
        country: "USA"
      },
      website: "https://www.techproindustries.com",
      primaryContact: {
        name: "Michael Chen",
        position: "Procurement Manager",
        email: "mchen@techproindustries.com",
        phone: "+1 (555) 123-4567"
      }
    },
    category: "Electronics",
    tier: 1,
    status: "ACTIVE",
    performance: {
      overall: 92,
      quality: 94,
      delivery: 91,
      cost: 88,
      innovation: 85
    },
    riskLevel: "LOW",
    location: {
      lat: 37.4116,
      lng: -121.9288,
      country: "USA",
      region: "North America"
    },
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949"],
    businessRelationship: {
      startDate: "2015-03-12",
      contractRenewalDate: "2024-03-12",
      spendLastYear: 1250000,
      spendYTD: 650000,
      paymentTerms: "Net 30"
    },
    sustainabilityScore: 87,
    qualityIncidents: [
      {
        id: "QI-2023-001",
        date: "2023-02-15",
        description: "Component failure in power supply module",
        category: "Manufacturing",
        severity: "MEDIUM",
        status: "RESOLVED",
        impact: "MEDIUM",
        resolutionDate: "2023-02-28",
        correctiveAction: "Updated quality control process"
      }
    ],
    smartContract: {
      id: "SC001",
      status: "ACTIVE",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      paymentTerms: "Net 30",
      autoPaymentEnabled: true,
      terms: {
        paymentAmount: 25000,
        paymentCurrency: "SHELL",
        paymentTrigger: "QUALITY_VERIFICATION",
        discountRate: 2.5,
        lateFee: 5.0
      },
      transactions: [
        {
          id: "TX001",
          date: "2023-09-15",
          amount: 25000,
          status: "COMPLETED",
          txHash: "0x8a6d8e7f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d"
        },
        {
          id: "TX002",
          date: "2023-10-15",
          amount: 25000,
          status: "COMPLETED",
          txHash: "0x7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c"
        }
      ],
      savingsVsTraditional: 12500,
      lastPaymentSavings: 625,
      annualSavings: 7500,
      creationDate: "2023-01-15",
      expirationDate: "2024-01-15",
      lastUpdated: "2023-10-01",
      paymentHistory: [
        {
          date: "2023-09-15",
          amount: 25000,
          status: "COMPLETED"
        },
        {
          date: "2023-10-15",
          amount: 25000,
          status: "COMPLETED"
        }
      ],
      disputeResolution: "ARBITRATION",
      nextAutoPaymentDate: "2023-11-15",
      savingsPercentage: 5.2,
      shellTokenEnabled: true,
      shellTokenBalance: 15000,
      shellTokenRate: 1.05,
      nextPaymentAmount: 25000
    },
    riskAssessment: {
      geographicRisk: 1.5,
      financialStability: 'STRONG',
      singleSourceComponents: 2,
      disruptionHistory: [],
      geopoliticalRisk: 'LOW',
      alternativeSuppliers: [
        {
          componentCategory: 'Electronics',
          supplierCount: 3,
          readinessLevel: 'READY'
        }
      ],
      resilienceScore: 92
    }
  },
  {
    id: "SUP002",
    name: "Global Precision Manufacturing",
    contactInfo: {
      email: "info@globalprecision.com",
      phone: "+1 (555) 987-6543",
      address: {
        street: "4200 Industrial Blvd",
        city: "Detroit",
        state: "MI",
        zip: "48201",
        country: "USA"
      },
      website: "https://www.globalprecisionmfg.com",
      primaryContact: {
        name: "Sarah Johnson",
        position: "Supply Chain Director",
        email: "sjohnson@globalprecision.com",
        phone: "+1 (555) 987-6543"
      }
    },
    category: "Mechanical Components",
    tier: 1,
    status: "ACTIVE",
    performance: {
      overall: 88,
      quality: 90,
      delivery: 85,
      cost: 86,
      innovation: 78
    },
    riskLevel: "MEDIUM",
    location: {
      lat: 42.3314,
      lng: -83.0458,
      country: "USA",
      region: "North America"
    },
    certifications: ["ISO 9001", "AS9100"],
    businessRelationship: {
      startDate: "2018-06-22",
      contractRenewalDate: "2024-06-22",
      spendLastYear: 875000,
      spendYTD: 420000,
      paymentTerms: "Net 45"
    },
    sustainabilityScore: 72,
    qualityIncidents: [
      {
        id: "QI-2023-005",
        date: "2023-07-12",
        description: "Dimensional variance in machined parts",
        category: "Manufacturing",
        severity: "LOW",
        status: "RESOLVED",
        impact: "LOW",
        resolutionDate: "2023-07-25",
        correctiveAction: "Recalibrated CNC machines"
      }
    ],
    smartContract: {
      id: "SC002",
      status: "PENDING",
      contractAddress: "0x567d35Cc6634C0532925a3b844Bc454e4438f123",
      paymentTerms: "Net 45",
      autoPaymentEnabled: false,
      terms: {
        paymentAmount: 20000,
        paymentCurrency: "SHELL",
        paymentTrigger: "DELIVERY_CONFIRMATION",
        discountRate: 1.5,
        lateFee: 3.0
      },
      transactions: [],
      savingsVsTraditional: 0,
      lastPaymentSavings: 0,
      annualSavings: 3600,
      creationDate: "2023-12-01",
      expirationDate: "2024-12-01",
      lastUpdated: "2023-12-01",
      paymentHistory: [],
      disputeResolution: "Mediation",
      nextAutoPaymentDate: "2024-01-15",
      savingsPercentage: 0,
      shellTokenEnabled: false,
      shellTokenBalance: 0,
      shellTokenRate: 1.0,
      nextPaymentAmount: 20000
    },
    riskAssessment: {
      geographicRisk: 2.8,
      financialStability: 'STABLE',
      singleSourceComponents: 5,
      disruptionHistory: [
        {
          date: "2023-05-10",
          description: "Supply chain disruption due to regional flooding",
          impact: "MEDIUM",
          duration: 14
        }
      ],
      geopoliticalRisk: 'MEDIUM',
      alternativeSuppliers: [
        {
          componentCategory: 'Mechanical Components',
          supplierCount: 2,
          readinessLevel: 'IN_DEVELOPMENT'
        }
      ],
      resilienceScore: 75
    }
  },
  {
    id: "SUP003",
    name: "AutoTech Solutions",
    contactInfo: {
      email: "contact@autotechsolutions.com",
      phone: "+49 30 12345678",
      address: {
        street: "Industriestraße 45",
        city: "Stuttgart",
        state: "Baden-Württemberg",
        zip: "70565",
        country: "Germany"
      },
      website: "https://www.autotechsolutions.de",
      primaryContact: {
        name: "Klaus Müller",
        position: "CEO",
        email: "k.mueller@autotechsolutions.de",
        phone: "+49 30 12345678"
      }
    },
    category: "Automotive Electronics",
    tier: 1,
    status: "ACTIVE",
    performance: {
      overall: 95,
      quality: 97,
      delivery: 93,
      cost: 90,
      innovation: 96
    },
    riskLevel: "LOW",
    location: {
      lat: 48.7758,
      lng: 9.1829,
      country: "Germany",
      region: "Europe"
    },
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949", "ISO 26262"],
    businessRelationship: {
      startDate: "2016-04-18",
      contractRenewalDate: "2024-04-18",
      spendLastYear: 1850000,
      spendYTD: 950000,
      paymentTerms: "Net 30"
    },
    sustainabilityScore: 94,
    qualityIncidents: [
      {
        id: "QI-2022-015",
        date: "2022-10-08",
        description: "Software issue in control module",
        category: "Software",
        severity: "HIGH",
        status: "RESOLVED",
        impact: "HIGH",
        resolutionDate: "2022-10-20",
        correctiveAction: "Software patch and testing procedure update"
      },
      {
        id: "QI-2023-008",
        date: "2023-05-17",
        description: "Connector failure in high temperature test",
        category: "Design",
        severity: "MEDIUM",
        status: "RESOLVED",
        impact: "MEDIUM",
        resolutionDate: "2023-06-05",
        correctiveAction: "Redesigned connector with improved materials"
      }
    ],
    smartContract: {
      id: "SC003",
      status: "ACTIVE",
      contractAddress: "0x842d35Cc6634C0532925a3b844Bc454e4438f56d",
      paymentTerms: "Net 30",
      autoPaymentEnabled: true,
      terms: {
        paymentAmount: 45000,
        paymentCurrency: "SHELL",
        paymentTrigger: "DELIVERY_CONFIRMATION",
        discountRate: 2.0,
        lateFee: 4.0
      },
      transactions: [
        {
          id: "TX005",
          date: "2023-11-10",
          amount: 45000,
          status: "COMPLETED",
          txHash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"
        },
        {
          id: "TX006",
          date: "2023-12-10",
          amount: 45000,
          status: "COMPLETED",
          txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
        }
      ],
      savingsVsTraditional: 18000,
      lastPaymentSavings: 900,
      annualSavings: 10800,
      creationDate: "2023-03-15",
      expirationDate: "2024-03-15",
      lastUpdated: "2023-12-10",
      paymentHistory: [
        {
          date: "2023-11-10",
          amount: 45000,
          status: "COMPLETED"
        },
        {
          date: "2023-12-10",
          amount: 45000,
          status: "COMPLETED"
        }
      ],
      disputeResolution: "Arbitration",
      nextAutoPaymentDate: "2024-01-10",
      savingsPercentage: 4.0,
      shellTokenEnabled: true,
      shellTokenBalance: 25000,
      shellTokenRate: 1.1,
      nextPaymentAmount: 45000
    },
    riskAssessment: {
      geographicRisk: 1.2,
      financialStability: 'STRONG',
      singleSourceComponents: 1,
      disruptionHistory: [],
      geopoliticalRisk: 'LOW',
      alternativeSuppliers: [
        {
          componentCategory: 'Automotive Electronics',
          supplierCount: 4,
          readinessLevel: 'READY'
        }
      ],
      resilienceScore: 95
    }
  },
  {
    id: 'supplier-004',
    name: 'Quantum Circuits Inc.',
    contactInfo: {
      email: 'contact@malaysiacircuit.com',
      phone: '+60-4-555-1234',
      address: {
        street: '123 Electronics Way',
        city: 'Penang',
        state: 'Penang',
        zip: '11900',
        country: 'Malaysia'
      },
      website: 'https://www.malaysiacircuit.com',
      primaryContact: {
        name: 'Ahmad Zulkifli',
        position: 'Sales Manager',
        email: 'ahmad.zulkifli@malaysiacircuit.com',
        phone: '+60-4-555-1234'
      }
    },
    category: 'PCB Manufacturing',
    tier: 2,
    status: 'ACTIVE',
    performance: {
      overall: 89,
      quality: 92,
      delivery: 87,
      cost: 85,
      innovation: 80
    },
    riskLevel: 'MEDIUM',
    location: {
      lat: 5.4141,
      lng: 100.3292,
      country: 'Malaysia',
      region: 'Asia'
    },
    certifications: ['ISO 9001', 'ISO 14001'],
    businessRelationship: {
      startDate: '2020-06-18',
      contractRenewalDate: '2024-06-18',
      spendLastYear: 980000,
      spendYTD: 450000,
      paymentTerms: 'Net 45'
    },
    sustainabilityScore: 78,
    qualityIncidents: [
      {
        id: 'qi-mcs-001',
        date: '2023-11-28',
        description: 'PCB trace quality issues in batch PN-2023-11-B',
        category: 'PCBs',
        severity: 'MEDIUM',
        status: 'RESOLVED',
        impact: 'MEDIUM',
        resolutionDate: '2023-12-20',
        correctiveAction: 'Improved etching process controls and inspection'
      },
      {
        id: 'qi-mcs-002',
        date: '2024-01-15',
        description: 'Assembly solder joint failures',
        category: 'Assemblies',
        severity: 'HIGH',
        status: 'RESOLVED',
        impact: 'HIGH',
        resolutionDate: '2024-02-05',
        correctiveAction: 'Retraining of soldering personnel and updated QC procedures'
      }
    ],
    smartContract: undefined,
    riskAssessment: {
      geographicRisk: 2.1,
      financialStability: 'STABLE',
      singleSourceComponents: 3,
      disruptionHistory: [],
      geopoliticalRisk: 'LOW',
      alternativeSuppliers: [],
      resilienceScore: 85
    }
  },
  {
    id: 'supplier-005',
    name: 'Shenzhen Electronics Co.',
    contactInfo: {
      email: 'info@shenzhene.com',
      phone: '+86-755-82565888',
      address: {
        street: '888 Technology Road',
        city: 'Shenzhen',
        state: 'Guangdong',
        zip: '518000',
        country: 'China'
      },
      website: 'https://www.shenzhene.com',
      primaryContact: {
        name: 'Zhang Wei',
        position: 'Sales Director',
        email: 'zhang.wei@shenzhene.com',
        phone: '+86-755-82565888'
      }
    },
    category: 'Display Components',
    tier: 1,
    status: 'ACTIVE',
    performance: {
      overall: 87,
      quality: 89,
      delivery: 85,
      cost: 90,
      innovation: 82
    },
    riskLevel: 'MEDIUM',
    location: {
      lat: 22.5431,
      lng: 114.0579,
      country: 'China',
      region: 'Asia'
    },
    certifications: ['ISO 9001'],
    businessRelationship: {
      startDate: '2019-08-12',
      contractRenewalDate: '2024-02-28',
      spendLastYear: 1250000,
      spendYTD: 390000,
      paymentTerms: 'Net 60'
    },
    sustainabilityScore: 75,
    qualityIncidents: [
      {
        id: 'qi-se-001',
        date: '2023-10-05',
        description: 'Connector batch with loose fitting issues',
        category: 'Connectors',
        severity: 'MEDIUM',
        status: 'RESOLVED',
        impact: 'MEDIUM',
        resolutionDate: '2023-10-30',
        correctiveAction: 'Updated mold design and quality check procedures'
      }
    ],
    smartContract: {
      id: 'sc-se-001',
      status: 'ACTIVE',
      contractAddress: '0x567d35Cc6634C0532925a3b844Bc454e4438f123',
      paymentTerms: 'Net 60',
      autoPaymentEnabled: true,
      terms: {
        paymentAmount: 320000,
        paymentCurrency: 'SHELL',
        paymentTrigger: 'DELIVERY_CONFIRMATION',
        discountRate: 2.0,
        lateFee: 2.0
      },
      transactions: [
        {
          id: 'tx-se-001',
          date: '2024-02-28',
          amount: 150000,
          status: 'COMPLETED',
          txHash: '0xa1b2c3d4e5f6g7h8i9j0'
        }
      ],
      savingsVsTraditional: 6400,
      lastPaymentSavings: 3000,
      annualSavings: 15000,
      creationDate: '2023-02-28',
      expirationDate: '2024-02-28',
      lastUpdated: '2024-02-28',
      paymentHistory: [
        {
          date: '2024-02-28',
          amount: 150000,
          status: 'COMPLETED'
        }
      ],
      disputeResolution: 'Arbitration',
      nextAutoPaymentDate: '2024-04-28',
      savingsPercentage: 2.0,
      shellTokenEnabled: true,
      shellTokenBalance: 10000,
      shellTokenRate: 1.05,
      nextPaymentAmount: 320000
    },
    riskAssessment: {
      geographicRisk: 3.5,
      financialStability: 'STABLE',
      singleSourceComponents: 4,
      disruptionHistory: [
        {
          date: '2023-08-15',
          description: 'Production delay due to power outages',
          impact: 'MEDIUM',
          duration: 7
        }
      ],
      geopoliticalRisk: 'MEDIUM',
      alternativeSuppliers: [
        {
          componentCategory: 'Display Components',
          supplierCount: 3,
          readinessLevel: 'IN_DEVELOPMENT'
        }
      ],
      resilienceScore: 78
    }
  },
];

// Order status mock data
export const mockOrderStatuses = [
  { status: 'PENDING', count: 12, label: 'Pending', value: 120000, flagged: 2 },
  { status: 'PROCESSING', count: 8, label: 'Processing', value: 85000, flagged: 1 },
  { status: 'SHIPPED', count: 15, label: 'Shipped', value: 175000, flagged: 0 },
  { status: 'DELIVERED', count: 23, label: 'Delivered', value: 230000, flagged: 0 },
  { status: 'CANCELLED', count: 3, label: 'Cancelled', value: 30000, flagged: 3 },
  { status: 'RETURNED', count: 2, label: 'Returned', value: 25000, flagged: 2 },
];

// Quality metrics mock data
export const mockQualityMetrics: ExtendedQualityMetrics = {
  defectRate: 0.8,
  reworkRate: 1.2,
  firstTimeYield: 97.5,
  inspectionPassRate: 96.2,
  rmaRate: 0.5,
  mtbf: 8760,
  qualityIncidents: [
    {
      id: "QI-2023-001",
      date: "2023-11-10",
      description: "Surface finish defect on Component XYZ",
      status: "RESOLVED",
      impact: "MEDIUM",
      category: "Manufacturing",
      severity: "MEDIUM",
      resolutionDate: "2023-11-15",
      correctiveAction: "Adjusted machine settings and implemented additional QC step"
    },
    {
      id: "QI-2023-002",
      date: "2023-12-05",
      description: "Dimensional variance in precision parts",
      status: "IN_PROGRESS",
      impact: "HIGH",
      category: "Quality Control",
      severity: "HIGH",
      resolutionDate: undefined,
      correctiveAction: "Working with supplier to recalibrate equipment"
    }
  ],
  qualityTrend: [
    { month: "Jan", defectRate: 1.2, inspectionPassRate: 94.5 },
    { month: "Feb", defectRate: 1.1, inspectionPassRate: 95.0 },
    { month: "Mar", defectRate: 1.0, inspectionPassRate: 95.5 },
    { month: "Apr", defectRate: 0.9, inspectionPassRate: 96.0 },
    { month: "May", defectRate: 0.8, inspectionPassRate: 96.2 }
  ],
  certifications: ["ISO 9001", "ISO 14001", "AS9100"],
  complianceScore: 92
}; 