export interface ProductivityMetrics {
  id: string;
  projectId: string;
  teamId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate: string;
  metrics: {
    // DORA Metrics
    deploymentFrequency: number; // deployments per day
    leadTimeForChanges: number; // hours from commit to production
    meanTimeToRecovery: number; // hours to recover from incidents
    changeFailureRate: number; // percentage of deployments causing failures
    
    // Development Metrics
    cycleTime: number; // hours from start to merge
    reviewTime: number; // hours in code review
    pickupTime: number; // hours from creation to first action
    
    // Quality Metrics
    bugRate: number; // bugs per 100 commits
    testCoverage: number; // percentage
    codeReviewParticipation: number; // percentage of PRs reviewed
    
    // Collaboration Metrics
    prSize: number; // average lines changed per PR
    commitsPerDeveloper: number; // average commits per developer
    activeContributors: number; // number of active contributors
    
    // Efficiency Metrics
    focusTime: number; // hours of uninterrupted work per day
    meetingTime: number; // hours in meetings per day
    contextSwitching: number; // number of different tasks per day
  };
  trends: {
    deploymentFrequency: number; // percentage change
    leadTime: number;
    mttr: number;
    cycleTime: number;
    bugRate: number;
    testCoverage: number;
  };
  benchmarks: {
    industry: Record<string, number>;
    internal: Record<string, number>;
  };
}

export interface DeveloperMetrics {
  id: string;
  developerId: string;
  developerName: string;
  email: string;
  projectId: string;
  period: string;
  metrics: {
    commitsCount: number;
    linesAdded: number;
    linesDeleted: number;
    prsCreated: number;
    prsReviewed: number;
    bugsFixed: number;
    featuresDelivered: number;
    avgCycleTime: number; // hours
    avgReviewTime: number; // hours
    codeQualityScore: number; // 0-100
    collaborationScore: number; // 0-100
    velocityScore: number; // story points or tasks completed
  };
  strengths: string[];
  improvementAreas: string[];
  goals: Array<{
    metric: string;
    current: number;
    target: number;
    deadline: string;
  }>;
}

export interface TeamVelocity {
  id: string;
  projectId: string;
  sprintId: string;
  sprintName: string;
  startDate: string;
  endDate: string;
  plannedPoints: number;
  completedPoints: number;
  velocity: number;
  burndownData: Array<{
    date: string;
    planned: number;
    actual: number;
  }>;
  blockers: Array<{
    id: string;
    title: string;
    impact: 'low' | 'medium' | 'high';
    duration: number; // hours blocked
    resolved: boolean;
  }>;
}

export interface CodeReviewMetrics {
  id: string;
  projectId: string;
  period: string;
  metrics: {
    avgReviewTime: number; // hours
    reviewThroughput: number; // PRs reviewed per day
    reviewQuality: number; // 0-100 based on bugs found post-merge
    participationRate: number; // percentage of team participating
    avgCommentsPerPR: number;
    avgPRSize: number; // lines of code
    approvalTime: number; // hours from review to approval
  };
  reviewers: Array<{
    developerId: string;
    name: string;
    reviewsCompleted: number;
    avgReviewTime: number;
    qualityScore: number;
    responsiveness: number; // hours to first response
  }>;
}

export interface FlowMetrics {
  id: string;
  projectId: string;
  period: string;
  workItems: Array<{
    id: string;
    title: string;
    type: 'feature' | 'bug' | 'task' | 'story';
    status: 'todo' | 'in-progress' | 'review' | 'testing' | 'done';
    createdAt: string;
    startedAt?: string;
    completedAt?: string;
    cycleTime?: number; // hours
    leadTime?: number; // hours
    blockedTime?: number; // hours
    assignee: string;
  }>;
  flowEfficiency: number; // percentage of time in active work vs waiting
  throughput: number; // items completed per week
  wip: number; // current work in progress
  bottlenecks: Array<{
    stage: string;
    avgTime: number;
    impact: 'low' | 'medium' | 'high';
  }>;
}

// Mock data
export const mockProductivityMetrics: Record<string, ProductivityMetrics[]> = {
  'proj-001': [
    {
      id: 'prod-001',
      projectId: 'proj-001',
      teamId: 'team-001',
      period: 'monthly',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-01-31T23:59:59Z',
      metrics: {
        deploymentFrequency: 2.5,
        leadTimeForChanges: 18,
        meanTimeToRecovery: 2.5,
        changeFailureRate: 8.5,
        cycleTime: 32,
        reviewTime: 8,
        pickupTime: 4,
        bugRate: 3.2,
        testCoverage: 87.5,
        codeReviewParticipation: 95,
        prSize: 245,
        commitsPerDeveloper: 28,
        activeContributors: 4,
        focusTime: 5.5,
        meetingTime: 2.5,
        contextSwitching: 3.2
      },
      trends: {
        deploymentFrequency: 15.2,
        leadTime: -12.5,
        mttr: -8.3,
        cycleTime: -5.7,
        bugRate: -15.8,
        testCoverage: 3.2
      },
      benchmarks: {
        industry: {
          deploymentFrequency: 1.8,
          leadTimeForChanges: 24,
          meanTimeToRecovery: 4.2,
          changeFailureRate: 12.5
        },
        internal: {
          deploymentFrequency: 2.1,
          leadTimeForChanges: 22,
          meanTimeToRecovery: 3.1,
          changeFailureRate: 10.2
        }
      }
    }
  ]
};

export const mockDeveloperMetrics: DeveloperMetrics[] = [
  {
    id: 'dev-001',
    developerId: 'user-001',
    developerName: 'John Doe',
    email: 'john.doe@company.com',
    projectId: 'proj-001',
    period: '2024-01',
    metrics: {
      commitsCount: 45,
      linesAdded: 2340,
      linesDeleted: 890,
      prsCreated: 12,
      prsReviewed: 18,
      bugsFixed: 8,
      featuresDelivered: 5,
      avgCycleTime: 28,
      avgReviewTime: 6,
      codeQualityScore: 88,
      collaborationScore: 92,
      velocityScore: 34
    },
    strengths: ['Code Quality', 'Collaboration', 'Problem Solving'],
    improvementAreas: ['Cycle Time', 'Test Coverage'],
    goals: [
      {
        metric: 'Cycle Time',
        current: 28,
        target: 24,
        deadline: '2024-02-29'
      },
      {
        metric: 'Test Coverage',
        current: 82,
        target: 90,
        deadline: '2024-03-31'
      }
    ]
  },
  {
    id: 'dev-002',
    developerId: 'user-002',
    developerName: 'Jane Smith',
    email: 'jane.smith@company.com',
    projectId: 'proj-001',
    period: '2024-01',
    metrics: {
      commitsCount: 38,
      linesAdded: 1890,
      linesDeleted: 650,
      prsCreated: 10,
      prsReviewed: 22,
      bugsFixed: 12,
      featuresDelivered: 4,
      avgCycleTime: 24,
      avgReviewTime: 8,
      codeQualityScore: 91,
      collaborationScore: 95,
      velocityScore: 28
    },
    strengths: ['Code Reviews', 'Mentoring', 'Architecture'],
    improvementAreas: ['Feature Delivery Speed'],
    goals: [
      {
        metric: 'Feature Velocity',
        current: 4,
        target: 6,
        deadline: '2024-02-29'
      }
    ]
  }
];

export const mockTeamVelocity: TeamVelocity[] = [
  {
    id: 'velocity-001',
    projectId: 'proj-001',
    sprintId: 'sprint-024',
    sprintName: 'Sprint 24 - Payment Integration',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-29T00:00:00Z',
    plannedPoints: 42,
    completedPoints: 38,
    velocity: 38,
    burndownData: [
      { date: '2024-01-15', planned: 42, actual: 42 },
      { date: '2024-01-16', planned: 40, actual: 41 },
      { date: '2024-01-17', planned: 38, actual: 39 },
      { date: '2024-01-18', planned: 36, actual: 36 },
      { date: '2024-01-19', planned: 34, actual: 34 },
      { date: '2024-01-22', planned: 30, actual: 31 },
      { date: '2024-01-23', planned: 26, actual: 28 },
      { date: '2024-01-24', planned: 22, actual: 24 },
      { date: '2024-01-25', planned: 18, actual: 20 },
      { date: '2024-01-26', planned: 14, actual: 16 },
      { date: '2024-01-29', planned: 0, actual: 4 }
    ],
    blockers: [
      {
        id: 'blocker-001',
        title: 'Payment API rate limiting',
        impact: 'high',
        duration: 16,
        resolved: true
      },
      {
        id: 'blocker-002',
        title: 'Database migration issues',
        impact: 'medium',
        duration: 8,
        resolved: true
      }
    ]
  }
];

export const mockCodeReviewMetrics: CodeReviewMetrics[] = [
  {
    id: 'review-001',
    projectId: 'proj-001',
    period: '2024-01',
    metrics: {
      avgReviewTime: 6.5,
      reviewThroughput: 3.2,
      reviewQuality: 88,
      participationRate: 95,
      avgCommentsPerPR: 4.2,
      avgPRSize: 245,
      approvalTime: 2.1
    },
    reviewers: [
      {
        developerId: 'user-001',
        name: 'John Doe',
        reviewsCompleted: 18,
        avgReviewTime: 5.2,
        qualityScore: 92,
        responsiveness: 1.5
      },
      {
        developerId: 'user-002',
        name: 'Jane Smith',
        reviewsCompleted: 22,
        avgReviewTime: 7.8,
        qualityScore: 95,
        responsiveness: 0.8
      }
    ]
  }
];

export const mockFlowMetrics: FlowMetrics[] = [
  {
    id: 'flow-001',
    projectId: 'proj-001',
    period: '2024-01',
    workItems: [
      {
        id: 'item-001',
        title: 'Implement payment gateway',
        type: 'feature',
        status: 'done',
        createdAt: '2024-01-10T09:00:00Z',
        startedAt: '2024-01-12T10:00:00Z',
        completedAt: '2024-01-18T16:00:00Z',
        cycleTime: 150,
        leadTime: 199,
        blockedTime: 16,
        assignee: 'John Doe'
      },
      {
        id: 'item-002',
        title: 'Fix checkout validation bug',
        type: 'bug',
        status: 'done',
        createdAt: '2024-01-15T14:00:00Z',
        startedAt: '2024-01-15T15:00:00Z',
        completedAt: '2024-01-16T11:00:00Z',
        cycleTime: 20,
        leadTime: 21,
        blockedTime: 0,
        assignee: 'Jane Smith'
      }
    ],
    flowEfficiency: 78.5,
    throughput: 8.5,
    wip: 6,
    bottlenecks: [
      {
        stage: 'Code Review',
        avgTime: 8.5,
        impact: 'medium'
      },
      {
        stage: 'Testing',
        avgTime: 12.2,
        impact: 'high'
      }
    ]
  }
];