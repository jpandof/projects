export interface TestSuite {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'mutation' | 'security';
  framework: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  coverage: number;
  duration: number;
  lastRun: string;
  status: 'passed' | 'failed' | 'running' | 'skipped';
  environment: string;
}

export interface CodeQualityMetrics {
  id: string;
  projectId: string;
  timestamp: string;
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  securityHotspots: number;
  duplicatedLines: number;
  duplicatedBlocks: number;
  maintainabilityRating: 'A' | 'B' | 'C' | 'D' | 'E';
  reliabilityRating: 'A' | 'B' | 'C' | 'D' | 'E';
  securityRating: 'A' | 'B' | 'C' | 'D' | 'E';
  technicalDebt: string; // e.g., "2h 30m"
  technicalDebtRatio: number; // percentage
  linesOfCode: number;
  complexity: number;
  cognitiveComplexity: number;
}

export interface TestExecution {
  id: string;
  projectId: string;
  suiteId: string;
  suiteName: string;
  type: TestSuite['type'];
  status: 'passed' | 'failed' | 'running' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  duration?: number;
  triggeredBy: string;
  branch: string;
  commit: string;
  environment: string;
  results: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    coverage?: number;
  };
  failedTests?: Array<{
    name: string;
    error: string;
    stackTrace?: string;
  }>;
}

export interface MutationTestResult {
  id: string;
  projectId: string;
  timestamp: string;
  mutationScore: number; // percentage
  totalMutants: number;
  killedMutants: number;
  survivedMutants: number;
  timeoutMutants: number;
  noCoverageMutants: number;
  runtimeErrorMutants: number;
  duration: number;
  framework: string;
}

export interface PerformanceTestResult {
  id: string;
  projectId: string;
  testName: string;
  timestamp: string;
  type: 'load' | 'stress' | 'spike' | 'volume' | 'endurance';
  duration: number;
  virtualUsers: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  throughput: number;
  status: 'passed' | 'failed' | 'warning';
  environment: string;
  tool: string;
}

// Mock data
export const mockTestSuites: Record<string, TestSuite[]> = {
  'proj-001': [
    {
      id: 'suite-001',
      name: 'Unit Tests',
      type: 'unit',
      framework: 'Jest',
      totalTests: 245,
      passedTests: 238,
      failedTests: 5,
      skippedTests: 2,
      coverage: 87.5,
      duration: 45,
      lastRun: '2024-01-15T14:30:00Z',
      status: 'failed',
      environment: 'CI'
    },
    {
      id: 'suite-002',
      name: 'Integration Tests',
      type: 'integration',
      framework: 'Testing Library',
      totalTests: 89,
      passedTests: 85,
      failedTests: 2,
      skippedTests: 2,
      coverage: 72.3,
      duration: 120,
      lastRun: '2024-01-15T14:25:00Z',
      status: 'failed',
      environment: 'CI'
    },
    {
      id: 'suite-003',
      name: 'E2E Tests',
      type: 'e2e',
      framework: 'Playwright',
      totalTests: 34,
      passedTests: 34,
      failedTests: 0,
      skippedTests: 0,
      coverage: 0,
      duration: 180,
      lastRun: '2024-01-15T13:45:00Z',
      status: 'passed',
      environment: 'Staging'
    }
  ],
  'proj-002': [
    {
      id: 'suite-004',
      name: 'Unit Tests',
      type: 'unit',
      framework: 'JUnit',
      totalTests: 156,
      passedTests: 156,
      failedTests: 0,
      skippedTests: 0,
      coverage: 92.1,
      duration: 35,
      lastRun: '2024-01-15T15:00:00Z',
      status: 'passed',
      environment: 'CI'
    },
    {
      id: 'suite-005',
      name: 'Integration Tests',
      type: 'integration',
      framework: 'Testcontainers',
      totalTests: 45,
      passedTests: 43,
      failedTests: 2,
      skippedTests: 0,
      coverage: 78.9,
      duration: 95,
      lastRun: '2024-01-15T14:55:00Z',
      status: 'failed',
      environment: 'CI'
    }
  ]
};

export const mockCodeQualityMetrics: Record<string, CodeQualityMetrics[]> = {
  'proj-001': [
    {
      id: 'quality-001',
      projectId: 'proj-001',
      timestamp: '2024-01-15T14:30:00Z',
      codeSmells: 23,
      bugs: 3,
      vulnerabilities: 1,
      securityHotspots: 2,
      duplicatedLines: 145,
      duplicatedBlocks: 8,
      maintainabilityRating: 'B',
      reliabilityRating: 'A',
      securityRating: 'A',
      technicalDebt: '3h 45m',
      technicalDebtRatio: 2.1,
      linesOfCode: 12450,
      complexity: 1250,
      cognitiveComplexity: 890
    }
  ],
  'proj-002': [
    {
      id: 'quality-002',
      projectId: 'proj-002',
      timestamp: '2024-01-15T15:00:00Z',
      codeSmells: 8,
      bugs: 0,
      vulnerabilities: 0,
      securityHotspots: 1,
      duplicatedLines: 67,
      duplicatedBlocks: 3,
      maintainabilityRating: 'A',
      reliabilityRating: 'A',
      securityRating: 'A',
      technicalDebt: '1h 20m',
      technicalDebtRatio: 0.8,
      linesOfCode: 8920,
      complexity: 780,
      cognitiveComplexity: 520
    }
  ]
};

export const mockTestExecutions: TestExecution[] = [
  {
    id: 'exec-001',
    projectId: 'proj-001',
    suiteId: 'suite-001',
    suiteName: 'Unit Tests',
    type: 'unit',
    status: 'failed',
    startedAt: '2024-01-15T14:28:00Z',
    completedAt: '2024-01-15T14:30:00Z',
    duration: 45,
    triggeredBy: 'john.doe@company.com',
    branch: 'feature/payment-fix',
    commit: 'a1b2c3d4',
    environment: 'CI',
    results: {
      total: 245,
      passed: 238,
      failed: 5,
      skipped: 2,
      coverage: 87.5
    },
    failedTests: [
      {
        name: 'PaymentService.processPayment should handle timeout',
        error: 'Expected timeout error but got network error'
      },
      {
        name: 'UserService.validateUser should reject invalid email',
        error: 'Assertion failed: expected false but got true'
      }
    ]
  },
  {
    id: 'exec-002',
    projectId: 'proj-001',
    suiteId: 'suite-003',
    suiteName: 'E2E Tests',
    type: 'e2e',
    status: 'passed',
    startedAt: '2024-01-15T13:42:00Z',
    completedAt: '2024-01-15T13:45:00Z',
    duration: 180,
    triggeredBy: 'CI Pipeline',
    branch: 'develop',
    commit: 'e5f6g7h8',
    environment: 'Staging',
    results: {
      total: 34,
      passed: 34,
      failed: 0,
      skipped: 0
    }
  }
];

export const mockMutationTestResults: MutationTestResult[] = [
  {
    id: 'mutation-001',
    projectId: 'proj-001',
    timestamp: '2024-01-14T20:00:00Z',
    mutationScore: 78.5,
    totalMutants: 450,
    killedMutants: 353,
    survivedMutants: 67,
    timeoutMutants: 15,
    noCoverageMutants: 12,
    runtimeErrorMutants: 3,
    duration: 1200,
    framework: 'Stryker'
  },
  {
    id: 'mutation-002',
    projectId: 'proj-002',
    timestamp: '2024-01-14T19:30:00Z',
    mutationScore: 85.2,
    totalMutants: 320,
    killedMutants: 273,
    survivedMutants: 35,
    timeoutMutants: 8,
    noCoverageMutants: 3,
    runtimeErrorMutants: 1,
    duration: 890,
    framework: 'PIT'
  }
];

export const mockPerformanceTestResults: PerformanceTestResult[] = [
  {
    id: 'perf-001',
    projectId: 'proj-001',
    testName: 'Homepage Load Test',
    timestamp: '2024-01-15T12:00:00Z',
    type: 'load',
    duration: 300,
    virtualUsers: 100,
    requestsPerSecond: 250,
    averageResponseTime: 180,
    p95ResponseTime: 350,
    p99ResponseTime: 500,
    errorRate: 0.2,
    throughput: 2.5,
    status: 'passed',
    environment: 'Staging',
    tool: 'K6'
  },
  {
    id: 'perf-002',
    projectId: 'proj-002',
    testName: 'API Stress Test',
    timestamp: '2024-01-15T10:30:00Z',
    type: 'stress',
    duration: 600,
    virtualUsers: 500,
    requestsPerSecond: 1200,
    averageResponseTime: 95,
    p95ResponseTime: 180,
    p99ResponseTime: 250,
    errorRate: 1.2,
    throughput: 12.8,
    status: 'warning',
    environment: 'Staging',
    tool: 'JMeter'
  }
];