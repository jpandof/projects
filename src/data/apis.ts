export interface APIService {
  id: string;
  name: string;
  description: string;
  version: string;
  domain: string;
  subdomain?: string;
  status: 'active' | 'deprecated' | 'beta' | 'maintenance';
  type: 'REST' | 'GraphQL' | 'gRPC' | 'WebSocket';
  baseUrl: string;
  documentation?: string;
  swagger?: string;
  postman?: string;
  owner: string;
  team: string;
  lastUpdated: string;
  consumers: number;
  uptime: number;
  responseTime: number;
  requestsPerDay: number;
  errorRate: number;
  authentication: {
    type: 'none' | 'api_key' | 'bearer' | 'oauth2' | 'basic';
    description?: string;
  };
  tags: string[];
  endpoints: number;
  breaking_changes: number;
  icon?: string;
  color?: string;
}

export interface APIDomain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subdomains: string[];
}

export const apiDomains: APIDomain[] = [
  {
    id: 'core-banking',
    name: 'Core Banking',
    description: 'Servicios fundamentales del sistema bancario',
    icon: '🏦',
    color: 'bg-blue-500',
    subdomains: ['accounts', 'transactions', 'balances', 'statements']
  },
  {
    id: 'payments',
    name: 'Payments & Transfers',
    description: 'Procesamiento de pagos y transferencias',
    icon: '💳',
    color: 'bg-green-500',
    subdomains: ['domestic-transfers', 'international-transfers', 'card-payments', 'digital-wallets']
  },
  {
    id: 'customer-management',
    name: 'Customer Management',
    description: 'Gestión de clientes y onboarding',
    icon: '👥',
    color: 'bg-purple-500',
    subdomains: ['customer-data', 'kyc', 'onboarding', 'profile-management']
  },
  {
    id: 'lending',
    name: 'Lending & Credit',
    description: 'Servicios de préstamos y crédito',
    icon: '💰',
    color: 'bg-yellow-500',
    subdomains: ['loan-origination', 'credit-scoring', 'risk-assessment', 'collections']
  },
  {
    id: 'compliance',
    name: 'Compliance & Risk',
    description: 'Cumplimiento regulatorio y gestión de riesgos',
    icon: '🛡️',
    color: 'bg-red-500',
    subdomains: ['aml', 'fraud-detection', 'regulatory-reporting', 'audit-trail']
  },
  {
    id: 'digital-channels',
    name: 'Digital Channels',
    description: 'Canales digitales y experiencia del cliente',
    icon: '📱',
    color: 'bg-indigo-500',
    subdomains: ['mobile-banking', 'web-banking', 'atm-services', 'chatbot']
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting',
    description: 'Análisis de datos y reportería',
    icon: '📊',
    color: 'bg-cyan-500',
    subdomains: ['business-intelligence', 'customer-analytics', 'financial-reporting', 'real-time-monitoring']
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Security',
    description: 'Infraestructura y servicios de seguridad',
    icon: '🔧',
    color: 'bg-gray-500',
    subdomains: ['authentication', 'authorization', 'encryption', 'monitoring']
  }
];

export const mockAPIs: APIService[] = [
  // Core Banking APIs
  {
    id: 'api-core-001',
    name: 'Account Management API',
    description: 'Gestión completa de cuentas bancarias, apertura, cierre y modificaciones',
    version: 'v2.1.0',
    domain: 'core-banking',
    subdomain: 'accounts',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/core/accounts',
    documentation: 'https://docs.bank.com/apis/accounts',
    swagger: 'https://api.bank.com/core/accounts/swagger',
    owner: 'Core Banking Team',
    team: 'Platform Engineering',
    lastUpdated: '2024-01-15T10:30:00Z',
    consumers: 12,
    uptime: 99.95,
    responseTime: 85,
    requestsPerDay: 45000,
    errorRate: 0.02,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with client credentials flow'
    },
    tags: ['accounts', 'core', 'banking', 'customer'],
    endpoints: 15,
    breaking_changes: 0,
    icon: '🏦',
    color: 'bg-blue-500'
  },
  {
    id: 'api-core-002',
    name: 'Transaction Processing API',
    description: 'Procesamiento de transacciones en tiempo real con validaciones de negocio',
    version: 'v3.0.2',
    domain: 'core-banking',
    subdomain: 'transactions',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/core/transactions',
    documentation: 'https://docs.bank.com/apis/transactions',
    swagger: 'https://api.bank.com/core/transactions/swagger',
    owner: 'Transaction Team',
    team: 'Core Banking',
    lastUpdated: '2024-01-18T14:20:00Z',
    consumers: 8,
    uptime: 99.98,
    responseTime: 120,
    requestsPerDay: 125000,
    errorRate: 0.01,
    authentication: {
      type: 'bearer',
      description: 'JWT Bearer token with transaction scopes'
    },
    tags: ['transactions', 'real-time', 'core', 'processing'],
    endpoints: 22,
    breaking_changes: 1,
    icon: '💸',
    color: 'bg-green-600'
  },
  {
    id: 'api-core-003',
    name: 'Balance Inquiry API',
    description: 'Consulta de saldos y movimientos de cuentas en tiempo real',
    version: 'v1.8.5',
    domain: 'core-banking',
    subdomain: 'balances',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/core/balances',
    documentation: 'https://docs.bank.com/apis/balances',
    owner: 'Core Banking Team',
    team: 'Platform Engineering',
    lastUpdated: '2024-01-12T09:15:00Z',
    consumers: 15,
    uptime: 99.92,
    responseTime: 65,
    requestsPerDay: 89000,
    errorRate: 0.03,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with read scopes'
    },
    tags: ['balances', 'inquiry', 'real-time'],
    endpoints: 8,
    breaking_changes: 0,
    icon: '💰',
    color: 'bg-yellow-500'
  },

  // Payments APIs
  {
    id: 'api-pay-001',
    name: 'Domestic Transfers API',
    description: 'Transferencias nacionales ACH y wire transfers con validaciones de compliance',
    version: 'v2.3.1',
    domain: 'payments',
    subdomain: 'domestic-transfers',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/payments/domestic',
    documentation: 'https://docs.bank.com/apis/domestic-transfers',
    swagger: 'https://api.bank.com/payments/domestic/swagger',
    owner: 'Payments Team',
    team: 'Financial Services',
    lastUpdated: '2024-01-16T11:45:00Z',
    consumers: 6,
    uptime: 99.89,
    responseTime: 180,
    requestsPerDay: 25000,
    errorRate: 0.05,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with payment scopes and MFA'
    },
    tags: ['transfers', 'domestic', 'ach', 'wire'],
    endpoints: 12,
    breaking_changes: 0,
    icon: '🏧',
    color: 'bg-green-500'
  },
  {
    id: 'api-pay-002',
    name: 'International Transfers API',
    description: 'Transferencias internacionales SWIFT con conversión de divisas',
    version: 'v1.9.0',
    domain: 'payments',
    subdomain: 'international-transfers',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/payments/international',
    documentation: 'https://docs.bank.com/apis/international-transfers',
    owner: 'International Payments Team',
    team: 'Financial Services',
    lastUpdated: '2024-01-14T16:30:00Z',
    consumers: 4,
    uptime: 99.85,
    responseTime: 350,
    requestsPerDay: 8500,
    errorRate: 0.08,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with international payment scopes'
    },
    tags: ['transfers', 'international', 'swift', 'forex'],
    endpoints: 18,
    breaking_changes: 2,
    icon: '🌍',
    color: 'bg-blue-600'
  },
  {
    id: 'api-pay-003',
    name: 'Card Payments API',
    description: 'Procesamiento de pagos con tarjetas de débito y crédito',
    version: 'v4.2.0',
    domain: 'payments',
    subdomain: 'card-payments',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/payments/cards',
    documentation: 'https://docs.bank.com/apis/card-payments',
    swagger: 'https://api.bank.com/payments/cards/swagger',
    owner: 'Card Processing Team',
    team: 'Financial Services',
    lastUpdated: '2024-01-17T13:20:00Z',
    consumers: 9,
    uptime: 99.97,
    responseTime: 95,
    requestsPerDay: 156000,
    errorRate: 0.01,
    authentication: {
      type: 'api_key',
      description: 'API Key with PCI DSS compliance'
    },
    tags: ['cards', 'payments', 'pci', 'real-time'],
    endpoints: 25,
    breaking_changes: 0,
    icon: '💳',
    color: 'bg-purple-500'
  },

  // Customer Management APIs
  {
    id: 'api-cust-001',
    name: 'Customer Data API',
    description: 'Gestión centralizada de datos de clientes con GDPR compliance',
    version: 'v2.0.8',
    domain: 'customer-management',
    subdomain: 'customer-data',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/customers/data',
    documentation: 'https://docs.bank.com/apis/customer-data',
    swagger: 'https://api.bank.com/customers/data/swagger',
    owner: 'Customer Experience Team',
    team: 'Digital Banking',
    lastUpdated: '2024-01-13T08:45:00Z',
    consumers: 18,
    uptime: 99.93,
    responseTime: 110,
    requestsPerDay: 67000,
    errorRate: 0.02,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with customer data scopes'
    },
    tags: ['customers', 'gdpr', 'data-management', 'privacy'],
    endpoints: 20,
    breaking_changes: 0,
    icon: '👤',
    color: 'bg-purple-500'
  },
  {
    id: 'api-cust-002',
    name: 'KYC Verification API',
    description: 'Verificación de identidad y cumplimiento KYC/AML',
    version: 'v1.5.3',
    domain: 'customer-management',
    subdomain: 'kyc',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/customers/kyc',
    documentation: 'https://docs.bank.com/apis/kyc',
    owner: 'Compliance Team',
    team: 'Risk & Compliance',
    lastUpdated: '2024-01-11T15:10:00Z',
    consumers: 7,
    uptime: 99.88,
    responseTime: 450,
    requestsPerDay: 12000,
    errorRate: 0.04,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with KYC verification scopes'
    },
    tags: ['kyc', 'aml', 'verification', 'compliance'],
    endpoints: 14,
    breaking_changes: 1,
    icon: '🔍',
    color: 'bg-orange-500'
  },

  // Lending APIs
  {
    id: 'api-lend-001',
    name: 'Loan Origination API',
    description: 'Originación de préstamos con scoring automático y aprobaciones',
    version: 'v3.1.2',
    domain: 'lending',
    subdomain: 'loan-origination',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/lending/origination',
    documentation: 'https://docs.bank.com/apis/loan-origination',
    swagger: 'https://api.bank.com/lending/origination/swagger',
    owner: 'Lending Platform Team',
    team: 'Lending Division',
    lastUpdated: '2024-01-19T12:00:00Z',
    consumers: 5,
    uptime: 99.91,
    responseTime: 280,
    requestsPerDay: 18000,
    errorRate: 0.03,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with lending scopes'
    },
    tags: ['loans', 'origination', 'scoring', 'approval'],
    endpoints: 16,
    breaking_changes: 0,
    icon: '📋',
    color: 'bg-yellow-500'
  },
  {
    id: 'api-lend-002',
    name: 'Credit Scoring API',
    description: 'Motor de scoring crediticio con machine learning y análisis de riesgo',
    version: 'v2.4.1',
    domain: 'lending',
    subdomain: 'credit-scoring',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/lending/scoring',
    documentation: 'https://docs.bank.com/apis/credit-scoring',
    owner: 'Risk Analytics Team',
    team: 'Risk Management',
    lastUpdated: '2024-01-10T14:25:00Z',
    consumers: 8,
    uptime: 99.94,
    responseTime: 195,
    requestsPerDay: 22000,
    errorRate: 0.02,
    authentication: {
      type: 'api_key',
      description: 'API Key with credit scoring permissions'
    },
    tags: ['credit', 'scoring', 'ml', 'risk'],
    endpoints: 10,
    breaking_changes: 0,
    icon: '📈',
    color: 'bg-green-600'
  },

  // Compliance APIs
  {
    id: 'api-comp-001',
    name: 'AML Monitoring API',
    description: 'Monitoreo anti-lavado de dinero con detección de patrones sospechosos',
    version: 'v1.7.4',
    domain: 'compliance',
    subdomain: 'aml',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/compliance/aml',
    documentation: 'https://docs.bank.com/apis/aml',
    owner: 'AML Team',
    team: 'Risk & Compliance',
    lastUpdated: '2024-01-08T11:30:00Z',
    consumers: 6,
    uptime: 99.96,
    responseTime: 220,
    requestsPerDay: 35000,
    errorRate: 0.01,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with AML monitoring scopes'
    },
    tags: ['aml', 'monitoring', 'compliance', 'suspicious-activity'],
    endpoints: 12,
    breaking_changes: 0,
    icon: '🚨',
    color: 'bg-red-500'
  },
  {
    id: 'api-comp-002',
    name: 'Fraud Detection API',
    description: 'Detección de fraude en tiempo real usando AI y machine learning',
    version: 'v2.8.0',
    domain: 'compliance',
    subdomain: 'fraud-detection',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/compliance/fraud',
    documentation: 'https://docs.bank.com/apis/fraud-detection',
    swagger: 'https://api.bank.com/compliance/fraud/swagger',
    owner: 'Fraud Prevention Team',
    team: 'Security Division',
    lastUpdated: '2024-01-20T09:45:00Z',
    consumers: 11,
    uptime: 99.99,
    responseTime: 45,
    requestsPerDay: 89000,
    errorRate: 0.005,
    authentication: {
      type: 'api_key',
      description: 'High-security API Key with fraud detection permissions'
    },
    tags: ['fraud', 'ai', 'ml', 'real-time', 'security'],
    endpoints: 8,
    breaking_changes: 0,
    icon: '🛡️',
    color: 'bg-red-600'
  },

  // Digital Channels APIs
  {
    id: 'api-digital-001',
    name: 'Mobile Banking API',
    description: 'API completa para aplicaciones móviles con funcionalidades bancarias',
    version: 'v4.5.2',
    domain: 'digital-channels',
    subdomain: 'mobile-banking',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/mobile/v4',
    documentation: 'https://docs.bank.com/apis/mobile-banking',
    swagger: 'https://api.bank.com/mobile/v4/swagger',
    postman: 'https://documenter.getpostman.com/view/mobile-banking',
    owner: 'Mobile Team',
    team: 'Digital Experience',
    lastUpdated: '2024-01-21T16:00:00Z',
    consumers: 3,
    uptime: 99.97,
    responseTime: 125,
    requestsPerDay: 234000,
    errorRate: 0.02,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with mobile app scopes'
    },
    tags: ['mobile', 'banking', 'app', 'customer-facing'],
    endpoints: 45,
    breaking_changes: 1,
    icon: '📱',
    color: 'bg-indigo-500'
  },
  {
    id: 'api-digital-002',
    name: 'Web Banking API',
    description: 'Servicios para portal web de banca online con funcionalidades completas',
    version: 'v3.7.1',
    domain: 'digital-channels',
    subdomain: 'web-banking',
    status: 'active',
    type: 'GraphQL',
    baseUrl: 'https://api.bank.com/web/graphql',
    documentation: 'https://docs.bank.com/apis/web-banking',
    owner: 'Web Team',
    team: 'Digital Experience',
    lastUpdated: '2024-01-18T10:20:00Z',
    consumers: 2,
    uptime: 99.94,
    responseTime: 95,
    requestsPerDay: 156000,
    errorRate: 0.015,
    authentication: {
      type: 'bearer',
      description: 'JWT Bearer with web session management'
    },
    tags: ['web', 'banking', 'graphql', 'portal'],
    endpoints: 38,
    breaking_changes: 0,
    icon: '💻',
    color: 'bg-blue-500'
  },

  // Analytics APIs
  {
    id: 'api-analytics-001',
    name: 'Business Intelligence API',
    description: 'Datos analíticos y métricas de negocio para dashboards ejecutivos',
    version: 'v1.3.8',
    domain: 'analytics',
    subdomain: 'business-intelligence',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/analytics/bi',
    documentation: 'https://docs.bank.com/apis/business-intelligence',
    owner: 'BI Team',
    team: 'Data & Analytics',
    lastUpdated: '2024-01-09T13:15:00Z',
    consumers: 7,
    uptime: 99.87,
    responseTime: 320,
    requestsPerDay: 15000,
    errorRate: 0.06,
    authentication: {
      type: 'bearer',
      description: 'JWT Bearer with analytics scopes'
    },
    tags: ['analytics', 'bi', 'metrics', 'dashboards'],
    endpoints: 24,
    breaking_changes: 0,
    icon: '📊',
    color: 'bg-cyan-500'
  },
  {
    id: 'api-analytics-002',
    name: 'Customer Analytics API',
    description: 'Análisis de comportamiento de clientes y segmentación avanzada',
    version: 'v2.1.5',
    domain: 'analytics',
    subdomain: 'customer-analytics',
    status: 'beta',
    type: 'REST',
    baseUrl: 'https://api.bank.com/analytics/customers',
    documentation: 'https://docs.bank.com/apis/customer-analytics',
    owner: 'Customer Analytics Team',
    team: 'Data & Analytics',
    lastUpdated: '2024-01-22T14:40:00Z',
    consumers: 3,
    uptime: 99.82,
    responseTime: 280,
    requestsPerDay: 8900,
    errorRate: 0.04,
    authentication: {
      type: 'oauth2',
      description: 'OAuth 2.0 with customer analytics scopes'
    },
    tags: ['analytics', 'customers', 'segmentation', 'behavior'],
    endpoints: 16,
    breaking_changes: 1,
    icon: '🎯',
    color: 'bg-pink-500'
  },

  // Infrastructure APIs
  {
    id: 'api-infra-001',
    name: 'Authentication Service API',
    description: 'Servicio centralizado de autenticación y autorización',
    version: 'v5.1.0',
    domain: 'infrastructure',
    subdomain: 'authentication',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/auth',
    documentation: 'https://docs.bank.com/apis/authentication',
    swagger: 'https://api.bank.com/auth/swagger',
    owner: 'Security Team',
    team: 'Infrastructure',
    lastUpdated: '2024-01-23T11:30:00Z',
    consumers: 25,
    uptime: 99.99,
    responseTime: 35,
    requestsPerDay: 450000,
    errorRate: 0.001,
    authentication: {
      type: 'basic',
      description: 'Basic authentication for service-to-service'
    },
    tags: ['auth', 'security', 'oauth', 'jwt'],
    endpoints: 12,
    breaking_changes: 0,
    icon: '🔐',
    color: 'bg-gray-600'
  },
  {
    id: 'api-infra-002',
    name: 'Notification Service API',
    description: 'Servicio de notificaciones multi-canal (email, SMS, push)',
    version: 'v2.6.3',
    domain: 'infrastructure',
    subdomain: 'notifications',
    status: 'active',
    type: 'REST',
    baseUrl: 'https://api.bank.com/notifications',
    documentation: 'https://docs.bank.com/apis/notifications',
    owner: 'Platform Team',
    team: 'Infrastructure',
    lastUpdated: '2024-01-16T09:20:00Z',
    consumers: 14,
    uptime: 99.91,
    responseTime: 150,
    requestsPerDay: 78000,
    errorRate: 0.025,
    authentication: {
      type: 'api_key',
      description: 'API Key with notification permissions'
    },
    tags: ['notifications', 'email', 'sms', 'push'],
    endpoints: 18,
    breaking_changes: 0,
    icon: '📧',
    color: 'bg-blue-400'
  },

  // Legacy/Deprecated APIs
  {
    id: 'api-legacy-001',
    name: 'Legacy Account API',
    description: 'API legacy de cuentas - migrar a Account Management API v2',
    version: 'v1.2.8',
    domain: 'core-banking',
    subdomain: 'accounts',
    status: 'deprecated',
    type: 'REST',
    baseUrl: 'https://api.bank.com/legacy/accounts',
    documentation: 'https://docs.bank.com/apis/legacy-accounts',
    owner: 'Legacy Systems Team',
    team: 'Platform Engineering',
    lastUpdated: '2023-12-15T10:00:00Z',
    consumers: 3,
    uptime: 99.75,
    responseTime: 450,
    requestsPerDay: 5600,
    errorRate: 0.12,
    authentication: {
      type: 'basic',
      description: 'Basic authentication - deprecated'
    },
    tags: ['legacy', 'deprecated', 'accounts'],
    endpoints: 8,
    breaking_changes: 0,
    icon: '⚠️',
    color: 'bg-gray-400'
  }
];