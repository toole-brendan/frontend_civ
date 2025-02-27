import { Alert, AlertType } from './components/CriticalAlertsCard';

// Define the types locally since they're not exported from the components
export interface TransitTimeData {
  route: string;
  avgTime: number;
  target: number;
}

export interface InventoryLevelData {
  date: string;
  semiconductors: number;
  passiveComponents: number;
  connectors: number;
  min: number;
  max: number;
}

export interface PaymentResolutionData {
  name: string;
  value: number;
  color: string;
}

export interface TransferVolumeData {
  week: string;
  inbound: number;
  outbound: number;
  internal: number;
  total: number;
}

export interface PropertyStats {
  totalItems: number;
  serviceableItems: number;
  maintenanceNeeded: number;
  pendingReceipts: number;
  criticalItems: {
    count: number;
    items: Array<{
      id: string;
      name: string;
      status: string;
      shortage: number;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

export interface Activity {
  id: string;
  type: 'inventory' | 'transaction' | 'order' | 'transfer' | 'user' | 'system';
  message: string;
  timestamp: string;
  user?: string;
  userAvatar?: string;
  itemId?: string;
}

// Supply Chain Visualization types
export type NodeType = 'supplier' | 'warehouse' | 'customer';
export type NodeStatus = 'success' | 'warning' | 'error';

export interface SupplyNode {
  id: string;
  name: string;
  type: NodeType;
  status: NodeStatus;
  details?: {
    items?: number;
    value?: number;
    eta?: string;
  };
}

export interface FlowConnection {
  from: string;
  to: string;
  status: NodeStatus;
  active: boolean;
  position?: [number, number, number, number]; // [left%, top%, width%, rotation]
}

// Pending Approvals types
export interface ApprovalItem {
  id: string;
  itemName: string;
  quantity: number;
  source: string;
  destination: string;
  value: number;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

// Quick Transfer types
export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
}

export interface TransferRecipient {
  id: string;
  name: string;
  type: string;
}

export interface RecentTransfer {
  id: string;
  itemName: string;
  quantity: number;
  recipient: string;
  timestamp: string;
}

export interface DashboardData {
  propertyStats: PropertyStats;
  notifications: Notification[];
  recentActivities: Activity[];
  criticalAlerts: Alert[];
  transitTimeData: TransitTimeData[];
  inventoryLevelData: InventoryLevelData[];
  paymentResolutionData: PaymentResolutionData[];
  transferVolumeData: TransferVolumeData[];
  supplyChain: {
    suppliers: SupplyNode[];
    warehouses: SupplyNode[];
    customers: SupplyNode[];
    connections: FlowConnection[];
  };
  pendingApprovals: ApprovalItem[];
  quickTransfer: {
    items: InventoryItem[];
    recipients: TransferRecipient[];
    recentTransfers: RecentTransfer[];
  };
}

// New types for TechComponents International Dashboard
export interface KPICardData {
  title: string;
  value: string | number;
  trend: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  icon: string;
  color: string;
  sparklineData?: number[];
  secondaryInfo?: {
    label: string;
    value: string | number;
  }[];
}

export interface WarehouseInventoryData {
  month: string;
  austin: number;
  sanJose: number;
  guadalajara: number;
}

export interface PaymentMethodData {
  month: string;
  wireTransfer: number;
  shellTokens: number;
}

export interface ActiveShipment {
  id: string;
  from: string;
  to: string;
  items: string;
  value: number;
  status: 'In Customs' | 'In Transit' | 'Preparing Shipment' | 'Delivered';
  eta: string;
}

export interface SupplierDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface CriticalStockItem {
  sku: string;
  name: string;
  currentStock: number;
  minStock: number;
  location: string;
  supplier: string;
  leadTime: number;
}

export interface ActionItem {
  id: string;
  type: 'low-stock' | 'shipment-delay' | 'payment-due';
  title: string;
  description: string;
  impact: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface BlockchainRecord {
  hash: string;
  type: 'inventory-receipt' | 'smart-contract-payment' | 'transfer-authorization';
  items: string;
  parties: string;
  timestamp: string;
  status: 'confirmed' | 'pending';
  validations: number;
  financialImpact?: string;
}

export interface TechComponentsDashboardData {
  user: {
    name: string;
    role: string;
    company: string;
  };
  kpiCards: {
    inventoryValue: KPICardData;
    activeTransfers: KPICardData;
    lowStockAlerts: KPICardData;
    shellTokenSavings: KPICardData;
  };
  warehouseInventory: WarehouseInventoryData[];
  paymentMethods: PaymentMethodData[];
  activeShipments: ActiveShipment[];
  supplierDistribution: SupplierDistribution[];
  criticalStockItems: CriticalStockItem[];
  actionItems: ActionItem[];
  blockchainRecords: BlockchainRecord[];
}

// Mock data for TechComponents International
export const techComponentsData: TechComponentsDashboardData = {
  user: {
    name: 'Michael Chen',
    role: 'Supply Chain Director',
    company: 'TechComponents International'
  },
  kpiCards: {
    inventoryValue: {
      title: 'Total Inventory Value',
      value: '$4,285,630',
      trend: {
        value: 3.2,
        isPositive: true,
        text: 'vs. previous month'
      },
      icon: 'inventory',
      color: 'blue',
      sparklineData: [3850000, 3920000, 4050000, 3980000, 4120000, 4285630]
    },
    activeTransfers: {
      title: 'Active Transfers',
      value: 18,
      trend: {
        value: 2,
        isPositive: true,
        text: 'vs. previous week'
      },
      icon: 'transfer',
      color: 'indigo',
      secondaryInfo: [
        { label: 'Inbound', value: 5 },
        { label: 'Outbound', value: 13 },
        { label: 'Critical', value: 2 }
      ]
    },
    lowStockAlerts: {
      title: 'Low Stock Alerts',
      value: 3,
      trend: {
        value: 1,
        isPositive: false,
        text: 'new since yesterday'
      },
      icon: 'warning',
      color: 'orange',
      secondaryInfo: [
        { label: 'Critical', value: 1 },
        { label: 'Warning', value: 2 },
        { label: 'Orders Affected', value: 3 }
      ]
    },
    shellTokenSavings: {
      title: 'Shell Token Savings',
      value: '$24,850',
      trend: {
        value: 18.2,
        isPositive: true,
        text: 'vs. traditional payments'
      },
      icon: 'savings',
      color: 'green',
      sparklineData: [12500, 15800, 18200, 20500, 22600, 24850]
    }
  },
  warehouseInventory: [
    { month: 'Jan', austin: 6100, sanJose: 3200, guadalajara: 2400 },
    { month: 'Feb', austin: 6150, sanJose: 3250, guadalajara: 2450 },
    { month: 'Mar', austin: 6200, sanJose: 3300, guadalajara: 2500 },
    { month: 'Apr', austin: 6250, sanJose: 3400, guadalajara: 2520 },
    { month: 'May', austin: 6300, sanJose: 3450, guadalajara: 2550 },
    { month: 'Jun', austin: 6350, sanJose: 3480, guadalajara: 2590 }
  ],
  paymentMethods: [
    { month: 'Jan', wireTransfer: 58000, shellTokens: 42000 },
    { month: 'Feb', wireTransfer: 56000, shellTokens: 46000 },
    { month: 'Mar', wireTransfer: 54000, shellTokens: 50000 },
    { month: 'Apr', wireTransfer: 52000, shellTokens: 54000 },
    { month: 'May', wireTransfer: 50000, shellTokens: 60000 },
    { month: 'Jun', wireTransfer: 48000, shellTokens: 64000 }
  ],
  activeShipments: [
    {
      id: 'TECI-9542',
      from: 'Taiwan Semiconductor',
      to: 'Austin',
      items: 'Memory Controllers, Power ICs',
      value: 84250,
      status: 'In Customs',
      eta: 'Jun 28'
    },
    {
      id: 'TECI-9538',
      from: 'Shenzhen Electronics',
      to: 'Guadalajara',
      items: 'PCB Assemblies, Connectors',
      value: 18750,
      status: 'In Transit',
      eta: 'Jul 02'
    },
    {
      id: 'TECI-9535',
      from: 'Austin',
      to: 'MediTech Devices',
      items: 'RF Modules, Sensors',
      value: 42600,
      status: 'Preparing Shipment',
      eta: 'Jun 29'
    },
    {
      id: 'TECI-9532',
      from: 'Korea Chip',
      to: 'San Jose',
      items: 'Memory ICs, Processors',
      value: 36800,
      status: 'In Transit',
      eta: 'Jun 30'
    },
    {
      id: 'TECI-9530',
      from: 'San Jose',
      to: 'Robotics Solutions',
      items: 'Control Boards, Power Supplies',
      value: 29500,
      status: 'Preparing Shipment',
      eta: 'Jul 03'
    }
  ],
  supplierDistribution: [
    { name: 'Taiwan Semiconductor', value: 1199976, percentage: 28, color: '#3f51b5' },
    { name: 'Shenzhen Electronics', value: 942838, percentage: 22, color: '#2196f3' },
    { name: 'Korea Chip', value: 771413, percentage: 18, color: '#00bcd4' },
    { name: 'Tokyo Components', value: 514276, percentage: 12, color: '#4caf50' },
    { name: 'Silicon Valley Tech', value: 385707, percentage: 9, color: '#8bc34a' },
    { name: 'Others', value: 471419, percentage: 11, color: '#cddc39' }
  ],
  criticalStockItems: [
    {
      sku: 'RF-AMP-221',
      name: 'RF Amplifier ICs',
      currentStock: 112,
      minStock: 500,
      location: 'San Jose',
      supplier: 'Korea Chip',
      leadTime: 15
    },
    {
      sku: 'SD-103-B',
      name: 'Schottky Diodes',
      currentStock: 520,
      minStock: 2000,
      location: 'Austin',
      supplier: 'Shenzhen Electronics',
      leadTime: 12
    },
    {
      sku: 'USB-C-90D',
      name: 'USB-C Connectors',
      currentStock: 380,
      minStock: 1200,
      location: 'Guadalajara',
      supplier: 'Taiwan Connector Co.',
      leadTime: 18
    }
  ],
  actionItems: [
    {
      id: 'ACT-001',
      type: 'low-stock',
      title: 'Low Stock: RF Amplifier ICs',
      description: 'Current stock at 22% of minimum level',
      impact: '3 customer orders at risk',
      severity: 'critical'
    },
    {
      id: 'ACT-002',
      type: 'shipment-delay',
      title: 'Shipment Delay: MX9250 Memory Controllers',
      description: 'Customs clearance delayed by 3 days',
      impact: 'Robotics Solutions order affected',
      severity: 'warning'
    },
    {
      id: 'ACT-003',
      type: 'payment-due',
      title: 'Payment Due: Invoice #TCB-2842',
      description: '$78,500 payment due to Taiwan Semiconductor',
      impact: 'Due tomorrow',
      severity: 'warning'
    }
  ],
  blockchainRecords: [
    {
      hash: '0x7f2c8d3e5a1b6c9d8e7f6a5b4c3d2e1f',
      type: 'inventory-receipt',
      items: 'Memory Controllers (500 units)',
      parties: 'Tokyo Components → TechComponents',
      timestamp: '2023-06-25T14:32:18Z',
      status: 'confirmed',
      validations: 12
    },
    {
      hash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
      type: 'smart-contract-payment',
      items: 'RF Modules (1,200 units)',
      parties: 'TechComponents → Korea Chip',
      timestamp: '2023-06-24T09:15:42Z',
      status: 'confirmed',
      validations: 15,
      financialImpact: '$42,800, saved $1,284'
    },
    {
      hash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b',
      type: 'transfer-authorization',
      items: 'Control Boards (350 units)',
      parties: 'Austin → MediTech',
      timestamp: '2023-06-25T16:48:33Z',
      status: 'pending',
      validations: 8,
      financialImpact: 'Pending QC Verification'
    }
  ]
};

// Keep the original mockDashboardData for backward compatibility
export const mockDashboardData: DashboardData = {
  propertyStats: {
    totalItems: 12487,
    serviceableItems: 11893,
    maintenanceNeeded: 342,
    pendingReceipts: 252,
    criticalItems: {
      count: 8,
      items: [
        {
          id: '1',
          name: 'A7X Microprocessors',
          status: 'Low Stock',
          shortage: 150,
          priority: 'high',
        },
        {
          id: '2',
          name: 'RF Transmitters (5G)',
          status: 'Back Ordered',
          shortage: 75,
          priority: 'medium',
        },
        {
          id: '3',
          name: 'Power Regulators 12V',
          status: 'Low Stock',
          shortage: 120,
          priority: 'medium',
        },
        {
          id: '4',
          name: 'Specialized FPGA Chips',
          status: 'Out of Stock',
          shortage: 50,
          priority: 'high',
        },
      ],
    },
  },
  notifications: [
    {
      id: '1',
      type: 'warning',
      message: 'Low inventory alert: A7X Microprocessors (150 units remaining)',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      actionRequired: true,
    },
    {
      id: '2',
      type: 'info',
      message: 'New order received from MediTech Devices (#ORD-2023-05212)',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      read: false,
    },
    {
      id: '3',
      type: 'success',
      message: 'Payment received from Robotics Solutions Inc. ($24,750.00)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
    },
    {
      id: '4',
      type: 'error',
      message: 'Shipment delayed: Taiwan Semiconductor order #ORD-2023-05198',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: false,
      actionRequired: true,
    },
    {
      id: '5',
      type: 'info',
      message: 'New quality certification received for Specialized FPGA Chips',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
    },
  ],
  recentActivities: [
    {
      id: '1',
      type: 'inventory',
      message: 'Added 500 units of A7X Microprocessors to Austin warehouse',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: 'Michael Chen',
      userAvatar: '',
      itemId: 'INV-001',
    },
    {
      id: '2',
      type: 'transaction',
      message: 'Processed payment from Robotics Solutions Inc. ($24,750.00)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      user: 'Sarah Johnson',
      userAvatar: '',
    },
    {
      id: '3',
      type: 'order',
      message: 'Fulfilled order #ORD-2023-05210 for MediTech Devices',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      user: 'David Rodriguez',
      userAvatar: '',
      itemId: 'ORD-2023-05210',
    },
    {
      id: '4',
      type: 'transfer',
      message: 'Transferred 200 Power Regulators from Austin to San Jose warehouse',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      user: 'Michael Chen',
      userAvatar: '',
      itemId: 'TRF-2023-00123',
    },
    {
      id: '5',
      type: 'system',
      message: 'Automated inventory reconciliation completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      id: '6',
      type: 'user',
      message: 'New supplier account created: Korea Chip Manufacturing',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      user: 'Michael Chen',
      userAvatar: '',
    },
  ],
  criticalAlerts: [
    {
      id: '1',
      type: 'inventory' as AlertType,
      message: 'A7X Microprocessors inventory below threshold (150 units remaining)',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      details: 'Current stock will last approximately 5 days based on current consumption rate. Please reorder immediately.',
    },
    {
      id: '2',
      type: 'shipment' as AlertType,
      message: 'Taiwan Semiconductor shipment delayed at customs (ETA +3 days)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      details: 'Shipment has been delayed due to customs inspection. Expected to clear within 3 days.',
    },
    {
      id: '3',
      type: 'contract' as AlertType,
      message: 'Shenzhen Electronics Ltd. payment ($78,500) awaiting verification',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      details: 'Payment verification required before release. Quality inspection pending.',
    },
    {
      id: '4',
      type: 'contract' as AlertType,
      message: 'Korea Chip Manufacturing shipment requires quality verification',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      details: 'Quality verification needed before payment can be released according to smart contract terms.',
    },
  ],
  transitTimeData: [
    { route: 'Taiwan → Austin', avgTime: 18, target: 15 },
    { route: 'Shenzhen → Austin', avgTime: 22, target: 20 },
    { route: 'Korea → Austin', avgTime: 16, target: 15 },
    { route: 'Austin → San Jose', avgTime: 3, target: 2 },
    { route: 'Austin → Guadalajara', avgTime: 5, target: 4 },
  ],
  inventoryLevelData: [
    { date: 'Jan', semiconductors: 3200, passiveComponents: 5100, connectors: 2800, min: 2000, max: 6000 },
    { date: 'Feb', semiconductors: 3100, passiveComponents: 5000, connectors: 2700, min: 2000, max: 6000 },
    { date: 'Mar', semiconductors: 2800, passiveComponents: 4800, connectors: 2600, min: 2000, max: 6000 },
    { date: 'Apr', semiconductors: 2600, passiveComponents: 4600, connectors: 2500, min: 2000, max: 6000 },
    { date: 'May', semiconductors: 2400, passiveComponents: 4400, connectors: 2400, min: 2000, max: 6000 },
    { date: 'Jun', semiconductors: 2200, passiveComponents: 4200, connectors: 2300, min: 2000, max: 6000 },
  ],
  paymentResolutionData: [
    { name: 'Same Day', value: 35, color: '#4CAF50' },
    { name: '2-3 Days', value: 25, color: '#2196F3' },
    { name: '4-7 Days', value: 20, color: '#FFC107' },
    { name: '8-14 Days', value: 15, color: '#FF9800' },
    { name: '15+ Days', value: 5, color: '#F44336' },
  ],
  transferVolumeData: [
    { week: 'Week 1', inbound: 45, outbound: 38, internal: 12, total: 95 },
    { week: 'Week 2', inbound: 52, outbound: 43, internal: 15, total: 110 },
    { week: 'Week 3', inbound: 48, outbound: 40, internal: 10, total: 98 },
    { week: 'Week 4', inbound: 60, outbound: 55, internal: 18, total: 133 },
  ],
  supplyChain: {
    suppliers: [
      { id: 'sup1', name: 'Taiwan Semiconductor', type: 'supplier', status: 'warning', details: { items: 450, value: 125000 } },
      { id: 'sup2', name: 'Shenzhen Electronics', type: 'supplier', status: 'success', details: { items: 320, value: 78500 } },
      { id: 'sup3', name: 'Korea Chip Manufacturing', type: 'supplier', status: 'warning', details: { items: 280, value: 92000 } },
    ],
    warehouses: [
      { id: 'wh1', name: 'Austin Warehouse', type: 'warehouse', status: 'success', details: { items: 8500, value: 1250000 } },
      { id: 'wh2', name: 'San Jose Warehouse', type: 'warehouse', status: 'success', details: { items: 2200, value: 450000 } },
      { id: 'wh3', name: 'Guadalajara Warehouse', type: 'warehouse', status: 'warning', details: { items: 1800, value: 320000 } },
    ],
    customers: [
      { id: 'cus1', name: 'MediTech Devices', type: 'customer', status: 'success', details: { items: 120, value: 45000 } },
      { id: 'cus2', name: 'Robotics Solutions Inc.', type: 'customer', status: 'success', details: { items: 85, value: 24750 } },
      { id: 'cus3', name: 'Advanced Electronics', type: 'customer', status: 'error', details: { items: 0, value: 0 } },
    ],
    connections: [
      { from: 'sup1', to: 'wh1', status: 'warning', active: true },
      { from: 'sup2', to: 'wh1', status: 'success', active: true },
      { from: 'sup3', to: 'wh1', status: 'warning', active: true },
      { from: 'wh1', to: 'wh2', status: 'success', active: true },
      { from: 'wh1', to: 'wh3', status: 'warning', active: true },
      { from: 'wh1', to: 'cus1', status: 'success', active: true },
      { from: 'wh2', to: 'cus2', status: 'success', active: true },
      { from: 'wh3', to: 'cus3', status: 'error', active: false },
    ],
  },
  pendingApprovals: [
    {
      id: 'pa1',
      itemName: 'Taiwan Semiconductor Shipment',
      quantity: 450,
      source: 'Taiwan Semiconductor',
      destination: 'Austin Warehouse',
      value: 125000,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      priority: 'high',
    },
    {
      id: 'pa2',
      itemName: 'Korea Chip Manufacturing Shipment',
      quantity: 280,
      source: 'Korea Chip Manufacturing',
      destination: 'Austin Warehouse',
      value: 92000,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      priority: 'medium',
    },
    {
      id: 'pa3',
      itemName: 'Inter-warehouse Transfer',
      quantity: 150,
      source: 'Austin Warehouse',
      destination: 'San Jose Warehouse',
      value: 42500,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      priority: 'low',
    },
    {
      id: 'pa4',
      itemName: 'MediTech Devices Order',
      quantity: 120,
      source: 'Austin Warehouse',
      destination: 'MediTech Devices',
      value: 45000,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      priority: 'medium',
    },
  ],
  quickTransfer: {
    items: [
      { id: 'item1', name: 'A7X Microprocessors', stock: 150 },
      { id: 'item2', name: 'RF Transmitters (5G)', stock: 225 },
      { id: 'item3', name: 'Power Regulators 12V', stock: 380 },
      { id: 'item4', name: 'Specialized FPGA Chips', stock: 0 },
      { id: 'item5', name: 'Capacitors 0.1μF', stock: 2500 },
    ],
    recipients: [
      { id: 'rec1', name: 'San Jose Warehouse', type: 'warehouse' },
      { id: 'rec2', name: 'Guadalajara Warehouse', type: 'warehouse' },
      { id: 'rec3', name: 'MediTech Devices', type: 'customer' },
      { id: 'rec4', name: 'Robotics Solutions Inc.', type: 'customer' },
      { id: 'rec5', name: 'Advanced Electronics', type: 'customer' },
    ],
    recentTransfers: [
      {
        id: 'rt1',
        itemName: 'Power Regulators 12V',
        quantity: 200,
        recipient: 'San Jose Warehouse',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      },
      {
        id: 'rt2',
        itemName: 'RF Transmitters (5G)',
        quantity: 75,
        recipient: 'MediTech Devices',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: 'rt3',
        itemName: 'Capacitors 0.1μF',
        quantity: 500,
        recipient: 'Guadalajara Warehouse',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
    ],
  },
}; 