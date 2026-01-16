export interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  status: 'healthy' | 'warning' | 'error' | 'deploying';
  url?: string;
  lastDeployment: string;
  version: string;
  branch: string;
  metrics?: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    requests24h: number;
  };
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: string;
  environment: string;
  metadata?: Record<string, any>;
}

export interface Deployment {
  id: string;
  projectId: string;
  environment: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  branch: string;
  commit: string;
  commitMessage: string;
  author: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  logs: string[];
}

export const mockEnvironments: Record<string, Environment[]> = {
  'proj-001': [
    {
      id: 'env-001-dev',
      name: 'Development',
      type: 'development',
      status: 'healthy',
      url: 'https://ecommerce-frontend-dev.company.com',
      lastDeployment: '2024-01-15T14:30:00Z',
      version: 'v1.2.3-dev',
      branch: 'develop',
      metrics: {
        uptime: 99.5,
        responseTime: 120,
        errorRate: 0.1,
        requests24h: 1250
      }
    },
    {
      id: 'env-001-staging',
      name: 'Staging',
      type: 'staging',
      status: 'warning',
      url: 'https://ecommerce-frontend-staging.company.com',
      lastDeployment: '2024-01-14T16:45:00Z',
      version: 'v1.2.2',
      branch: 'release/1.2.2',
      metrics: {
        uptime: 98.2,
        responseTime: 180,
        errorRate: 0.3,
        requests24h: 850
      }
    },
    {
      id: 'env-001-prod',
      name: 'Production',
      type: 'production',
      status: 'healthy',
      url: 'https://ecommerce.company.com',
      lastDeployment: '2024-01-13T09:00:00Z',
      version: 'v1.2.1',
      branch: 'main',
      metrics: {
        uptime: 99.9,
        responseTime: 95,
        errorRate: 0.05,
        requests24h: 15420
      }
    }
  ],
  'proj-002': [
    {
      id: 'env-002-dev',
      name: 'Development',
      type: 'development',
      status: 'healthy',
      url: 'https://user-api-dev.company.com',
      lastDeployment: '2024-01-15T11:20:00Z',
      version: 'v2.1.0-dev',
      branch: 'develop'
    },
    {
      id: 'env-002-prod',
      name: 'Production',
      type: 'production',
      status: 'error',
      url: 'https://api.company.com/users',
      lastDeployment: '2024-01-12T08:30:00Z',
      version: 'v2.0.5',
      branch: 'main',
      metrics: {
        uptime: 95.2,
        responseTime: 250,
        errorRate: 2.1,
        requests24h: 8950
      }
    }
  ]
};

export const mockLogs: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2024-01-15T15:30:25Z',
    level: 'error',
    message: 'Database connection timeout after 30 seconds',
    source: 'database-service',
    environment: 'production',
    metadata: {
      query: 'SELECT * FROM users WHERE active = true',
      duration: 30000,
      connection_pool: 'primary'
    }
  },
  {
    id: 'log-002',
    timestamp: '2024-01-15T15:29:45Z',
    level: 'warn',
    message: 'High memory usage detected: 85% of available memory',
    source: 'system-monitor',
    environment: 'production',
    metadata: {
      memory_usage: '85%',
      available_memory: '2GB',
      process_count: 12
    }
  },
  {
    id: 'log-003',
    timestamp: '2024-01-15T15:28:12Z',
    level: 'info',
    message: 'User authentication successful',
    source: 'auth-service',
    environment: 'production',
    metadata: {
      user_id: 'user-12345',
      ip_address: '192.168.1.100',
      user_agent: 'Mozilla/5.0...'
    }
  },
  {
    id: 'log-004',
    timestamp: '2024-01-15T15:27:33Z',
    level: 'debug',
    message: 'Cache hit for user profile data',
    source: 'cache-service',
    environment: 'production',
    metadata: {
      cache_key: 'user:profile:12345',
      ttl: 3600,
      hit_rate: '94.2%'
    }
  }
];

export const mockDeployments: Deployment[] = [
  // Despliegues del usuario actual
  {
    id: 'deploy-current-001',
    projectId: 'proj-001',
    environment: 'TST',
    status: 'success',
    branch: 'develop',
    commit: 'abc123f',
    commitMessage: 'feat: Add new dashboard features',
    author: 'current.user@example.com',
    startedAt: '2026-01-16T10:30:00Z',
    completedAt: '2026-01-16T10:35:45Z',
    duration: 345,
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Building application...',
      'Deploying to TST...',
      'Deployment completed successfully!'
    ]
  },
  {
    id: 'deploy-current-002',
    projectId: 'proj-001',
    environment: 'EDEN',
    status: 'success',
    branch: 'feature/new-ui',
    commit: 'def456g',
    commitMessage: 'fix: Button alignment issues',
    author: 'current.user@example.com',
    startedAt: '2026-01-16T09:15:00Z',
    completedAt: '2026-01-16T09:18:20Z',
    duration: 200,
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Building application...',
      'Deploying to EDEN...',
      'Deployment completed successfully!'
    ]
  },
  {
    id: 'deploy-current-003',
    projectId: 'proj-001',
    environment: 'PRE',
    status: 'failed',
    branch: 'hotfix/urgent-fix',
    commit: 'ghi789h',
    commitMessage: 'hotfix: Critical security patch',
    author: 'current.user@example.com',
    startedAt: '2026-01-15T16:45:00Z',
    completedAt: '2026-01-15T16:50:30Z',
    duration: 330,
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Building application...',
      'Deploying to PRE...',
      'ERROR: Health check failed',
      'Deployment failed!'
    ]
  },
  {
    id: 'deploy-current-004',
    projectId: 'proj-001',
    environment: 'TST',
    status: 'success',
    branch: 'develop',
    commit: 'jkl012i',
    commitMessage: 'chore: Update dependencies',
    author: 'current.user@example.com',
    startedAt: '2026-01-15T14:20:00Z',
    completedAt: '2026-01-15T14:24:15Z',
    duration: 255,
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Building application...',
      'Deploying to TST...',
      'Deployment completed successfully!'
    ]
  },
  {
    id: 'deploy-001',
    projectId: 'proj-001',
    environment: 'production',
    status: 'success',
    branch: 'main',
    commit: 'a1b2c3d4',
    commitMessage: 'Fix: Resolve payment gateway timeout issues',
    author: 'john.doe@company.com',
    startedAt: '2024-01-15T14:00:00Z',
    completedAt: '2024-01-15T14:05:30Z',
    duration: 330,
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Building application...',
      'Deploying to production...',
      'Deployment completed successfully!'
    ]
  },
  {
    id: 'deploy-002',
    projectId: 'proj-001',
    environment: 'staging',
    status: 'running',
    branch: 'develop',
    commit: 'e5f6g7h8',
    commitMessage: 'Feature: Add new product recommendation engine',
    author: 'jane.smith@company.com',
    startedAt: '2024-01-15T15:20:00Z',
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Building application...',
      'Currently deploying to staging...'
    ]
  },
  {
    id: 'deploy-003',
    projectId: 'proj-002',
    environment: 'production',
    status: 'failed',
    branch: 'main',
    commit: 'i9j0k1l2',
    commitMessage: 'Update: Upgrade database connection pool',
    author: 'mike.wilson@company.com',
    startedAt: '2024-01-15T13:45:00Z',
    completedAt: '2024-01-15T13:52:15Z',
    duration: 435,
    logs: [
      'Starting deployment...',
      'Installing dependencies...',
      'Running tests...',
      'Tests passed successfully',
      'Building application...',
      'Build completed',
      'Deploying to production...',
      'ERROR: Database migration failed',
      'Rolling back deployment...',
      'Deployment failed!'
    ]
  },
  {
    id: 'deploy-004',
    projectId: 'proj-001',
    environment: 'testing',
    status: 'success',
    branch: 'develop',
    commit: 'm3n4o5p6',
    commitMessage: 'Test: New checkout flow validation',
    author: 'sarah.jones@company.com',
    startedAt: '2024-01-15T12:30:00Z',
    completedAt: '2024-01-15T12:34:20Z',
    duration: 260,
    logs: ['Deployment completed successfully!']
  },
  {
    id: 'deploy-005',
    projectId: 'proj-002',
    environment: 'staging',
    status: 'success',
    branch: 'release/2.1.0',
    commit: 'q7r8s9t0',
    commitMessage: 'Pre: Prepare release 2.1.0',
    author: 'mike.wilson@company.com',
    startedAt: '2024-01-15T10:15:00Z',
    completedAt: '2024-01-15T10:19:45Z',
    duration: 285,
    logs: ['Deployment completed successfully!']
  },
  {
    id: 'deploy-006',
    projectId: 'proj-002',
    environment: 'testing',
    status: 'success',
    branch: 'develop',
    commit: 'u1v2w3x4',
    commitMessage: 'Test: API rate limiting implementation',
    author: 'jane.smith@company.com',
    startedAt: '2024-01-15T09:00:00Z',
    completedAt: '2024-01-15T09:03:30Z',
    duration: 210,
    logs: ['Deployment completed successfully!']
  },
  {
    id: 'deploy-007',
    projectId: 'proj-003',
    environment: 'production',
    status: 'success',
    branch: 'main',
    commit: 'y5z6a7b8',
    commitMessage: 'Fix: Dashboard rendering optimization',
    author: 'alex.kumar@company.com',
    startedAt: '2024-01-14T16:00:00Z',
    completedAt: '2024-01-14T16:04:15Z',
    duration: 255,
    logs: ['Deployment completed successfully!']
  },
  {
    id: 'deploy-008',
    projectId: 'proj-003',
    environment: 'staging',
    status: 'success',
    branch: 'develop',
    commit: 'c9d0e1f2',
    commitMessage: 'Feature: Real-time data streaming',
    author: 'alex.kumar@company.com',
    startedAt: '2024-01-15T14:45:00Z',
    completedAt: '2024-01-15T14:49:30Z',
    duration: 270,
    logs: ['Deployment completed successfully!']
  },
  {
    id: 'deploy-009',
    projectId: 'proj-003',
    environment: 'testing',
    status: 'running',
    branch: 'feature/streaming',
    commit: 'g3h4i5j6',
    commitMessage: 'WIP: Testing streaming infrastructure',
    author: 'alex.kumar@company.com',
    startedAt: '2024-01-15T15:35:00Z',
    logs: ['Currently deploying...']
  }
];