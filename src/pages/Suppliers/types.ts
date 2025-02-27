import { ReactNode } from 'react';

export interface Location {
  lat: number;
  lng: number;
  country: string;
  region: string;
  rank?: string;
  includes?: (value: string) => boolean;
}

export type Certification = string;

export interface Supplier {
  id: string;
  name: string;
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    website: string;
    primaryContact: {
      name: string;
      position: string;
      email: string;
      phone: string;
    };
  };
  category: string;
  tier: number;
  status: string;
  performance: {
    overall: number;
    quality: number;
    delivery: number;
    cost: number;
    innovation: number;
  };
  riskLevel: string;
  location: Location;
  certifications: Certification[];
  businessRelationship: {
    startDate: string;
    contractRenewalDate: string;
    spendLastYear: number;
    spendYTD: number;
    paymentTerms: string;
  };
  sustainabilityScore: number;
  qualityIncidents: QualityIncident[];
  smartContract?: SmartContract;
  riskAssessment: RiskAssessment;
  metrics?: SupplierMetrics;
  annualSpend?: number;
  categories?: string[];
  financials?: {
    annualSpend: number;
    [key: string]: any;
  };
  logo?: string;
  headquarters?: string;
  primaryContacts?: Contact[];
  businessHours?: BusinessHours;
  contractExpiration?: string;
  relationshipHistory?: RelationshipEvent[];
  blockchainVerificationStatus?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  photo: string;
  preferredCommunication: 'EMAIL' | 'PHONE' | 'VIDEO' | 'IN_PERSON';
}

export interface RelationshipEvent {
  date: string;
  event: string;
  description: string;
  type: 'MILESTONE' | 'CONTRACT' | 'ISSUE' | 'MEETING';
}

export interface BusinessHours {
  timezone: string;
  weekdays: string;
  weekend: string;
  holidays: string[];
}

export interface ComplianceStatus {
  iso9001: boolean;
  iso14001: boolean;
  rohs: boolean;
  reach: boolean;
  conflictMinerals: boolean;
  safetyStandards: {
    ul: boolean;
    csa: boolean;
    tuv: boolean;
  };
  counterfeitPrevention: 'STRONG' | 'ADEQUATE' | 'NEEDS_IMPROVEMENT' | 'UNKNOWN';
}

export interface LeadTime {
  category: string;
  currentLeadTime: number; // in days
  historicalAverage: number;
  trend: 'IMPROVING' | 'STABLE' | 'WORSENING';
  variance: number;
}

export interface QualityMetrics {
  failureRateByCategory: {
    category: string;
    rate: number;
  }[];
  rmaRate: number;
  mtbf: number | null;
  qualityTrend: {
    date: string;
    rate: number;
  }[];
  qualityIncidents: QualityIncident[];
}

export interface QualityIncident {
  id: string;
  date: string;
  description: string;
  status: string;
  impact: string;
  category: string;
  severity: string;
  resolutionDate?: string;
  correctiveAction?: string;
}

export interface RiskAssessment {
  geographicRisk: number;
  financialStability: 'STRONG' | 'STABLE' | 'CONCERNING' | 'UNKNOWN';
  singleSourceComponents: number;
  disruptionHistory: {
    date: string;
    description: string;
    impact: 'LOW' | 'MEDIUM' | 'HIGH';
    duration: number; // in days
  }[];
  geopoliticalRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  alternativeSuppliers: {
    componentCategory: string;
    supplierCount: number;
    readinessLevel: 'READY' | 'IN_DEVELOPMENT' | 'NOT_STARTED';
  }[];
  resilienceScore: number;
}

export interface SmartContract {
  id: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'COMPLETED';
  terms: {
    paymentAmount: number;
    paymentCurrency: string;
    paymentTrigger: string;
    discountRate: number;
    lateFee: number;
  };
  transactions: {
    id: string;
    date: string;
    amount: number;
    status: string;
    txHash: string;
  }[];
  savingsVsTraditional: number;
  lastPaymentSavings: number;
  contractAddress: string;
  paymentTerms: string;
  autoPaymentEnabled: boolean;
  annualSavings: number;
  creationDate: string;
  expirationDate: string;
  lastUpdated: string;
  paymentHistory: {
    date: string;
    amount: number;
    status: string;
  }[];
  disputeResolution: string;
  nextAutoPaymentDate: string;
  savingsPercentage: number;
  shellTokenEnabled: boolean;
  shellTokenBalance: number;
  shellTokenRate: number;
  nextPaymentAmount: number;
}

export interface SupplierMetrics {
  onTimeDelivery: number;
  qualityRating: number;
  responseTime: number;
  overallPerformance: number;
  riskScore: number;
  totalSpend: number;
  activeContracts: number;
  pendingOrders: number;
  totalCount: number;
  activeSuppliers: number;
  verifiedCount: number;
  smartContractCount: number;
  annualSavings: number;
  averagePerformance: number;
  qualityAcceptance?: {
    rate: number;
    previousRate: number;
    industryAverage: number;
  };
  priceCompetitiveness?: {
    score: number;
    previousScore: number;
    industryAverage: number;
  };
  documentationAccuracy?: {
    rate: number;
    previousRate: number;
    industryAverage: number;
  };
}

export interface SupplierOrderStatus {
  status: string;
  count: number;
  value: number;
  flagged: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  department: string;
  preferences: {
    theme: 'LIGHT' | 'DARK' | 'SYSTEM';
    notifications: boolean;
    defaultCurrency: string;
  };
}

export interface SupplierTab {
  id: string;
  label: string;
  icon?: ReactNode;
  component: ReactNode;
}

export interface ExtendedQualityMetrics {
  defectRate: number;
  reworkRate: number;
  firstTimeYield: number;
  inspectionPassRate: number;
  rmaRate: number;
  mtbf: number;
  qualityIncidents: QualityIncident[];
  qualityTrend: {
    month: string;
    defectRate: number;
    inspectionPassRate: number;
  }[];
  certifications: string[];
  complianceScore: number;
  industryMtbfAverage?: number;
  componentCategories?: string[];
  failureRateByCategory?: {
    category: string;
    rate: number;
  }[];
  failureRate?: number;
  failureRateTrend?: any[];
  rmaTrend?: any[];
  mtbfTrend?: any[];
} 