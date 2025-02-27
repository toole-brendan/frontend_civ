import { 
  TechComponentsInventoryItem, 
  InventoryCategory, 
  InventoryMetrics, 
  InventoryWarehouse,
  InventoryRecommendation,
  SavedFilter,
  TechComponentsInventoryData,
  InventoryHistory,
  ComponentUsage,
  RelatedComponent,
  QualityData,
  BlockchainRecord
} from './types';

// Mock Inventory Categories
export const mockCategories: InventoryCategory[] = [
  {
    id: 'microcontrollers',
    name: 'Microcontrollers',
    skuCount: 1845,
    totalValue: 1200000,
    stockHealth: 'good',
    lowStockCount: 12,
    icon: 'microchip'
  },
  {
    id: 'passive',
    name: 'Passive Components',
    skuCount: 3250,
    totalValue: 450000,
    stockHealth: 'warning',
    lowStockCount: 45,
    icon: 'capacitor'
  },
  {
    id: 'connectors',
    name: 'Connectors',
    skuCount: 1720,
    totalValue: 320000,
    stockHealth: 'good',
    lowStockCount: 8,
    icon: 'connector'
  },
  {
    id: 'memory',
    name: 'Memory ICs',
    skuCount: 950,
    totalValue: 680000,
    stockHealth: 'critical',
    lowStockCount: 23,
    icon: 'memory'
  },
  {
    id: 'power',
    name: 'Power Components',
    skuCount: 1140,
    totalValue: 520000,
    stockHealth: 'warning',
    lowStockCount: 18,
    icon: 'power'
  },
  {
    id: 'display',
    name: 'Display Modules',
    skuCount: 350,
    totalValue: 290000,
    stockHealth: 'good',
    lowStockCount: 5,
    icon: 'display'
  }
];

// Mock Inventory Metrics
export const mockMetrics: InventoryMetrics = {
  totalSKUs: 12483,
  totalValue: 4285630,
  turnoverRate: 4.2,
  averageDaysOnHand: 42,
  slowMovingItems: 324,
  excessInventoryValue: 245000,
  stockoutEvents: 12
};

// Mock Warehouses
export const mockWarehouses: InventoryWarehouse[] = [
  {
    id: 'austin',
    name: 'Austin',
    location: 'Texas, USA',
    itemCount: 5240,
    totalValue: 1850000
  },
  {
    id: 'sanjose',
    name: 'San Jose',
    location: 'California, USA',
    itemCount: 4120,
    totalValue: 1620000
  },
  {
    id: 'guadalajara',
    name: 'Guadalajara',
    location: 'Jalisco, Mexico',
    itemCount: 3123,
    totalValue: 815630
  }
];

// Mock Inventory Items
export const mockInventoryItems: TechComponentsInventoryItem[] = [
  {
    id: '1',
    sku: 'MC-AX7240-T',
    name: 'AX7240 Microcontroller',
    description: 'High-performance 32-bit microcontroller with integrated peripherals for IoT applications. Features ARM Cortex-M7 core, 2MB Flash, 1MB RAM, and extensive connectivity options.',
    category: 'Microcontrollers',
    subcategory: 'ARM Cortex-M',
    supplier: 'Taiwan Semiconductor',
    locations: [
      { warehouseId: 'austin', quantity: 4850 }
    ],
    currentStock: 4850,
    minLevel: 1000,
    maxLevel: 8000,
    reorderPoint: 2000,
    unitCost: 4.85,
    totalValue: 23522.50,
    lastReceived: '2023-09-15',
    lastShipped: '2023-10-28',
    leadTime: 45,
    lifecycleStatus: 'active',
    blockchainVerified: true,
    blockchainHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MC-AX7240-T',
    datasheet: 'https://example.com/datasheets/AX7240.pdf',
    complianceStatus: {
      rohs: true,
      reach: true
    },
    healthScore: 92
  },
  {
    id: '2',
    sku: 'CAP-CX400-104',
    name: 'CX400 Ceramic Capacitor',
    description: '0.1µF ceramic capacitor, X7R, 50V, 0805 package',
    category: 'Passive Components',
    subcategory: 'Capacitors',
    supplier: 'Shenzhen Electronics',
    locations: [
      { warehouseId: 'austin', quantity: 8500 },
      { warehouseId: 'sanjose', quantity: 12000 },
      { warehouseId: 'guadalajara', quantity: 4000 }
    ],
    currentStock: 24500,
    minLevel: 5000,
    maxLevel: 30000,
    reorderPoint: 8000,
    unitCost: 0.012,
    totalValue: 294.00,
    lastReceived: '2023-10-05',
    lastShipped: '2023-11-02',
    leadTime: 30,
    lifecycleStatus: 'mature',
    blockchainVerified: true,
    blockchainHash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PC-104-SMD',
    datasheet: 'https://example.com/datasheets/104-SMD.pdf',
    complianceStatus: {
      rohs: true,
      reach: true
    },
    healthScore: 85
  },
  {
    id: '3',
    sku: 'IC-RF-PA5040',
    name: 'PA5040 RF Amplifier',
    description: 'RF power amplifier IC, 2.4GHz, 20dBm output, QFN-16',
    category: 'RF Components',
    subcategory: 'Amplifiers',
    supplier: 'Korea Chip Manufacturing',
    locations: [
      { warehouseId: 'sanjose', quantity: 112 }
    ],
    currentStock: 112,
    minLevel: 250,
    maxLevel: 1000,
    reorderPoint: 300,
    unitCost: 3.45,
    totalValue: 386.40,
    lastReceived: '2023-08-22',
    lastShipped: '2023-10-30',
    leadTime: 60,
    lifecycleStatus: 'active',
    blockchainVerified: true,
    blockchainHash: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RF-AMP-2G4',
    datasheet: 'https://example.com/datasheets/RF-AMP-2G4.pdf',
    complianceStatus: {
      rohs: true,
      reach: false
    },
    healthScore: 45
  },
  {
    id: '4',
    sku: 'MEM-FLASH-512G',
    name: '512GB Flash Memory',
    description: '512GB NAND Flash memory chip, BGA-132',
    category: 'Memory ICs',
    subcategory: 'Flash Memory',
    supplier: 'Global Memory Solutions',
    locations: [
      { warehouseId: 'austin', quantity: 350 },
      { warehouseId: 'sanjose', quantity: 180 }
    ],
    currentStock: 530,
    minLevel: 200,
    maxLevel: 800,
    reorderPoint: 300,
    unitCost: 22.50,
    totalValue: 11925.00,
    lastReceived: '2023-09-28',
    lastShipped: '2023-11-05',
    leadTime: 40,
    lifecycleStatus: 'active',
    blockchainVerified: true,
    blockchainHash: '0xc0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FM-128G-NOR',
    datasheet: 'https://example.com/datasheets/FM-128G-NOR.pdf',
    complianceStatus: {
      rohs: true,
      reach: true
    },
    healthScore: 78
  },
  {
    id: '5',
    sku: 'CONN-USB-C-SMD',
    name: 'USB-C Connector',
    description: 'USB Type-C connector, SMD, female, 24-pin',
    category: 'Connectors',
    subcategory: 'USB Connectors',
    supplier: 'Connector Technologies',
    locations: [
      { warehouseId: 'austin', quantity: 1200 },
      { warehouseId: 'guadalajara', quantity: 2800 }
    ],
    currentStock: 4000,
    minLevel: 1000,
    maxLevel: 5000,
    reorderPoint: 1500,
    unitCost: 0.85,
    totalValue: 3400.00,
    lastReceived: '2023-10-12',
    lastShipped: '2023-11-01',
    leadTime: 35,
    lifecycleStatus: 'active',
    blockchainVerified: true,
    blockchainHash: '0xd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=USB-C-CON',
    datasheet: 'https://example.com/datasheets/USB-C-CON.pdf',
    complianceStatus: {
      rohs: true,
      reach: true
    },
    healthScore: 88
  }
];

// Mock Inventory History for a specific item
export const mockInventoryHistory: InventoryHistory[] = [
  {
    date: '2023-11-05',
    quantity: -50,
    type: 'shipped',
    reference: 'Order #12458',
    performedBy: 'Sarah Johnson',
    verificationHash: '0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a'
  },
  {
    date: '2023-10-28',
    quantity: -120,
    type: 'shipped',
    reference: 'Order #12442',
    performedBy: 'Michael Chen',
    verificationHash: '0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b'
  },
  {
    date: '2023-10-15',
    quantity: 20,
    type: 'adjusted',
    reference: 'Inventory Audit',
    performedBy: 'David Wilson',
    verificationHash: '0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c'
  },
  {
    date: '2023-09-15',
    quantity: 5000,
    type: 'received',
    reference: 'PO #8754',
    performedBy: 'Michael Chen',
    verificationHash: '0x8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d'
  },
  {
    date: '2023-08-22',
    quantity: -200,
    type: 'transferred',
    reference: 'Transfer to San Jose',
    performedBy: 'Lisa Martinez',
    verificationHash: '0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e'
  }
];

// Mock Component Usage data
export const mockComponentUsage: ComponentUsage[] = [
  {
    productId: 'PROD-5678',
    productName: 'Smart IoT Gateway',
    quantityUsed: 1,
    lastUsed: '2023-11-05'
  },
  {
    productId: 'PROD-5912',
    productName: 'Industrial Controller',
    quantityUsed: 2,
    lastUsed: '2023-10-28'
  },
  {
    productId: 'PROD-6045',
    productName: 'Wireless Sensor Node',
    quantityUsed: 1,
    lastUsed: '2023-10-15'
  }
];

// Mock Related Components
export const mockRelatedComponents: RelatedComponent[] = [
  {
    id: '10',
    sku: 'MC-AX7240-P',
    name: 'AX7240 Microcontroller (PQFP)',
    category: 'Microcontrollers',
    currentStock: 2450,
    usageCorrelation: 0.95
  },
  {
    id: '11',
    sku: 'OSC-24MHZ-SMD',
    name: '24MHz Crystal Oscillator',
    category: 'Passive Components',
    currentStock: 8500,
    usageCorrelation: 0.85
  },
  {
    id: '12',
    sku: 'CAP-TANT-10UF',
    name: '10µF Tantalum Capacitor',
    category: 'Passive Components',
    currentStock: 12000,
    usageCorrelation: 0.75
  }
];

// Mock Quality Data
export const mockQualityData: QualityData = {
  failureRate: 0.02,
  returnRate: 0.015,
  lastInspectionDate: '2023-10-10',
  inspectionResult: 'passed',
  notes: 'No issues found in the latest batch. All tests passed within acceptable parameters.'
};

// Mock Blockchain Records
export const mockBlockchainRecords: BlockchainRecord[] = [
  {
    hash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    timestamp: '2023-11-05T14:32:45Z',
    type: 'transfer',
    quantity: 50,
    previousHash: '0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
    verifications: 12,
    verified: true
  },
  {
    hash: '0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
    timestamp: '2023-10-28T09:15:22Z',
    type: 'transfer',
    quantity: 120,
    previousHash: '0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
    verifications: 15,
    verified: true
  },
  {
    hash: '0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a',
    timestamp: '2023-10-15T11:42:18Z',
    type: 'adjustment',
    quantity: 20,
    previousHash: '0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
    verifications: 18,
    verified: true
  },
  {
    hash: '0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
    timestamp: '2023-09-15T08:05:33Z',
    type: 'receipt',
    quantity: 5000,
    previousHash: '0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e',
    verifications: 22,
    verified: true
  }
];

// Mock Inventory Recommendations
export const mockRecommendations: InventoryRecommendation[] = [
  {
    id: '1',
    type: 'rebalance',
    item: {
      id: '2',
      sku: 'CAP-CX400-104',
      name: 'CX400 Ceramic Capacitor'
    },
    description: 'Excess inventory in San Jose, low stock in Guadalajara',
    impact: 'Optimize distribution across warehouses',
    potentialSavings: 1200,
    suggestedAction: 'Transfer 4000 units from San Jose to Guadalajara'
  },
  {
    id: '2',
    type: 'reorder',
    item: {
      id: '3',
      sku: 'IC-RF-PA5040',
      name: 'PA5040 RF Amplifier'
    },
    description: 'Current stock below reorder point with upcoming demand',
    impact: 'Prevent stockout for critical component',
    riskLevel: 'high',
    suggestedAction: 'Place order for 300 units immediately'
  },
  {
    id: '3',
    type: 'excess',
    item: {
      id: '1',
      sku: 'MC-AX7240-T',
      name: 'AX7240 Microcontroller'
    },
    description: 'Stock exceeds 180-day supply based on current demand',
    impact: 'Excess capital tied up in inventory',
    potentialSavings: 8500,
    suggestedAction: 'Reduce next order quantity by 2000 units'
  },
  {
    id: '4',
    type: 'alternative',
    item: {
      id: '3',
      sku: 'IC-RF-PA5040',
      name: 'PA5040 RF Amplifier'
    },
    description: 'Compatible alternative IC-RF-PA5042 available with better stock',
    impact: 'Avoid production delays',
    riskLevel: 'medium',
    suggestedAction: 'Consider IC-RF-PA5042 as alternative for upcoming orders'
  }
];

// Mock Saved Filters
export const mockSavedFilters: SavedFilter[] = [
  {
    id: '1',
    name: 'Critical Low Stock Items',
    filters: {
      search: '',
      sku: '',
      description: '',
      suppliers: [],
      categories: [],
      subcategories: [],
      locations: [],
      stockLevelRange: {
        min: 0,
        max: 300
      },
      receivedDateRange: {
        start: null,
        end: null
      },
      lifecycleStatus: ['active', 'mature'],
      blockchainVerified: null
    },
    createdBy: 'Michael Chen',
    createdAt: '2023-09-15'
  },
  {
    id: '2',
    name: 'Austin Warehouse Inventory',
    filters: {
      search: '',
      sku: '',
      description: '',
      suppliers: [],
      categories: [],
      subcategories: [],
      locations: ['austin'],
      stockLevelRange: {
        min: 0,
        max: 10000
      },
      receivedDateRange: {
        start: null,
        end: null
      },
      lifecycleStatus: [],
      blockchainVerified: null
    },
    createdBy: 'Michael Chen',
    createdAt: '2023-10-02'
  },
  {
    id: '3',
    name: 'End-of-Life Components',
    filters: {
      search: '',
      sku: '',
      description: '',
      suppliers: [],
      categories: [],
      subcategories: [],
      locations: [],
      stockLevelRange: {
        min: 0,
        max: 10000
      },
      receivedDateRange: {
        start: null,
        end: null
      },
      lifecycleStatus: ['end-of-life', 'obsolete'],
      blockchainVerified: null
    },
    createdBy: 'Michael Chen',
    createdAt: '2023-10-20'
  }
];

// Complete TechComponents Inventory Data
export const techComponentsInventoryData: TechComponentsInventoryData = {
  items: mockInventoryItems,
  categories: mockCategories,
  metrics: mockMetrics,
  warehouses: mockWarehouses,
  recommendations: mockRecommendations,
  savedFilters: mockSavedFilters
};

// Mock inventory categories
export const inventoryCategories = [
  {
    id: 'cat-1',
    name: 'Processors',
    skuCount: 42,
    totalValue: 125000,
    stockHealth: 'good' as 'good' | 'warning' | 'critical',
    lowStockCount: 0,
    icon: 'memory'
  },
  {
    id: 'cat-2',
    name: 'Storage Devices',
    skuCount: 38,
    totalValue: 85000,
    stockHealth: 'warning' as 'good' | 'warning' | 'critical',
    lowStockCount: 5,
    icon: 'storage'
  },
  {
    id: 'cat-3',
    name: 'Network Equipment',
    skuCount: 56,
    totalValue: 210000,
    stockHealth: 'good' as 'good' | 'warning' | 'critical',
    lowStockCount: 2,
    icon: 'router'
  },
  {
    id: 'cat-4',
    name: 'Sensors',
    skuCount: 29,
    totalValue: 45000,
    stockHealth: 'critical' as 'good' | 'warning' | 'critical',
    lowStockCount: 8,
    icon: 'sensors'
  },
  {
    id: 'cat-5',
    name: 'Batteries',
    skuCount: 18,
    totalValue: 32000,
    stockHealth: 'warning' as 'good' | 'warning' | 'critical',
    lowStockCount: 4,
    icon: 'battery'
  },
  {
    id: 'cat-6',
    name: 'Cables & Connectors',
    skuCount: 64,
    totalValue: 28000,
    stockHealth: 'good' as 'good' | 'warning' | 'critical',
    lowStockCount: 0,
    icon: 'cable'
  },
  {
    id: 'cat-7',
    name: 'Electronic Components',
    skuCount: 87,
    totalValue: 95000,
    stockHealth: 'warning' as 'good' | 'warning' | 'critical',
    lowStockCount: 12,
    icon: 'components'
  },
  {
    id: 'cat-8',
    name: 'Display Devices',
    skuCount: 31,
    totalValue: 120000,
    stockHealth: 'good' as 'good' | 'warning' | 'critical',
    lowStockCount: 3,
    icon: 'devices'
  }
];

// Export the complete data structure for the TechComponentsInventory
export const mockTechComponentsInventoryData = {
  items: techComponentsInventoryData.items,
  categories: inventoryCategories,
  metrics: {
    totalSKUs: techComponentsInventoryData.items.length,
    totalValue: techComponentsInventoryData.items.reduce((sum, item) => sum + item.totalValue, 0),
    turnoverRate: 4.2,
    averageDaysOnHand: 45,
    slowMovingItems: techComponentsInventoryData.items.filter(item => item.currentStock < item.reorderPoint).length,
    excessInventoryValue: 125000,
    stockoutEvents: 12
  },
  warehouses: [
    {
      id: 'wh-001',
      name: 'Main Warehouse',
      level: 'warehouse',
      children: [
        {
          id: 'sec-001',
          name: 'Electronics Section',
          level: 'section',
          children: [
            {
              id: 'aisle-001',
              name: 'Aisle A',
              level: 'aisle',
              children: [
                {
                  id: 'shelf-001',
                  name: 'Shelf 1',
                  level: 'shelf',
                  children: []
                },
                {
                  id: 'shelf-002',
                  name: 'Shelf 2',
                  level: 'shelf',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'wh-002',
      name: 'Secondary Warehouse',
      level: 'warehouse',
      children: []
    }
  ],
  recommendations: []
}; 