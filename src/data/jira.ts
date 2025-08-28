export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  issueType: 'Story' | 'Task' | 'Bug' | 'Epic' | 'Sub-task';
  status: 'To Do' | 'In Progress' | 'Code Review' | 'Testing' | 'Done' | 'Blocked';
  priority: 'Lowest' | 'Low' | 'Medium' | 'High' | 'Highest';
  assignee: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  reporter: {
    id: string;
    name: string;
    email: string;
  };
  storyPoints?: number;
  originalEstimate?: number; // hours
  timeSpent?: number; // hours
  remainingEstimate?: number; // hours
  labels: string[];
  components: string[];
  fixVersions: string[];
  sprint?: {
    id: string;
    name: string;
    state: 'future' | 'active' | 'closed';
  };
  created: string;
  updated: string;
  dueDate?: string;
  resolution?: string;
  resolutionDate?: string;
  comments: Array<{
    id: string;
    author: string;
    body: string;
    created: string;
  }>;
  attachments: Array<{
    id: string;
    filename: string;
    size: number;
    mimeType: string;
    created: string;
  }>;
  subtasks: string[];
  parent?: string;
  customFields: Record<string, any>;
}

export interface JiraSprint {
  id: string;
  name: string;
  state: 'future' | 'active' | 'closed';
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  goal?: string;
  boardId: string;
  projectId: string;
  issues: string[]; // Issue keys
  velocity?: number;
  commitment: number; // story points committed
  completed: number; // story points completed
  scope: {
    added: number;
    removed: number;
    changed: number;
  };
}

export interface JiraBoard {
  id: string;
  name: string;
  type: 'scrum' | 'kanban';
  projectKey: string;
  location: {
    projectId: string;
    projectName: string;
    projectKey: string;
  };
  columns: Array<{
    name: string;
    statuses: string[];
  }>;
  estimation: {
    type: 'story_points' | 'time' | 'none';
    field: string;
  };
  quickFilters: Array<{
    id: string;
    name: string;
    jql: string;
  }>;
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  description: string;
  lead: {
    id: string;
    name: string;
    email: string;
  };
  projectType: 'software' | 'service_desk' | 'business';
  style: 'classic' | 'next-gen';
  components: Array<{
    id: string;
    name: string;
    description: string;
    lead?: string;
  }>;
  versions: Array<{
    id: string;
    name: string;
    description: string;
    archived: boolean;
    released: boolean;
    releaseDate?: string;
  }>;
  issueTypes: Array<{
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    subtask: boolean;
  }>;
}

export interface JiraMetrics {
  projectId: string;
  sprintId?: string;
  period: string;
  velocity: {
    current: number;
    average: number;
    trend: number;
    history: Array<{
      sprintName: string;
      velocity: number;
      commitment: number;
      completed: number;
    }>;
  };
  burndown: {
    ideal: Array<{ date: string; remaining: number }>;
    actual: Array<{ date: string; remaining: number }>;
    scope: Array<{ date: string; added: number; removed: number }>;
  };
  cycleTime: {
    average: number; // days
    p50: number;
    p75: number;
    p95: number;
    byIssueType: Record<string, number>;
  };
  throughput: {
    issuesPerSprint: number;
    storyPointsPerSprint: number;
    trend: number;
  };
  quality: {
    bugRate: number; // bugs per story
    escapeRate: number; // bugs found in production
    reworkRate: number; // stories returned from testing
    defectDensity: number; // defects per story point
  };
  teamHealth: {
    workloadDistribution: Record<string, number>; // assignee -> story points
    blockerFrequency: number; // blockers per sprint
    avgBlockerDuration: number; // hours
    sprintGoalSuccess: number; // percentage
  };
}

export interface JiraIntegrationSettings {
  projectId: string;
  enabled: boolean;
  jiraUrl: string;
  projectKey: string;
  boardId?: string;
  credentials: {
    type: 'basic' | 'oauth' | 'token';
    username?: string;
    apiToken?: string;
  };
  syncSettings: {
    autoSync: boolean;
    syncInterval: number; // minutes
    syncIssues: boolean;
    syncSprints: boolean;
    syncMetrics: boolean;
  };
  filters: {
    includeSubtasks: boolean;
    issueTypes: string[];
    statuses: string[];
    components: string[];
  };
  notifications: {
    sprintStart: boolean;
    sprintEnd: boolean;
    blockers: boolean;
    velocityChanges: boolean;
  };
}

// Mock data
export const mockJiraProjects: JiraProject[] = [
  {
    id: 'jira-proj-001',
    key: 'ECOM',
    name: 'E-commerce Platform',
    description: 'Main e-commerce platform development',
    lead: {
      id: 'user-001',
      name: 'John Doe',
      email: 'john.doe@company.com'
    },
    projectType: 'software',
    style: 'next-gen',
    components: [
      {
        id: 'comp-001',
        name: 'Frontend',
        description: 'React frontend components',
        lead: 'user-001'
      },
      {
        id: 'comp-002',
        name: 'Backend API',
        description: 'REST API services',
        lead: 'user-002'
      },
      {
        id: 'comp-003',
        name: 'Payment System',
        description: 'Payment processing components',
        lead: 'user-003'
      }
    ],
    versions: [
      {
        id: 'ver-001',
        name: 'v1.0.0',
        description: 'Initial release',
        archived: false,
        released: true,
        releaseDate: '2024-01-01T00:00:00Z'
      },
      {
        id: 'ver-002',
        name: 'v1.1.0',
        description: 'Payment integration',
        archived: false,
        released: false
      }
    ],
    issueTypes: [
      {
        id: 'story',
        name: 'Story',
        description: 'User story',
        iconUrl: 'story-icon.png',
        subtask: false
      },
      {
        id: 'task',
        name: 'Task',
        description: 'Development task',
        iconUrl: 'task-icon.png',
        subtask: false
      },
      {
        id: 'bug',
        name: 'Bug',
        description: 'Software bug',
        iconUrl: 'bug-icon.png',
        subtask: false
      }
    ]
  }
];

export const mockJiraBoards: JiraBoard[] = [
  {
    id: 'board-001',
    name: 'ECOM Scrum Board',
    type: 'scrum',
    projectKey: 'ECOM',
    location: {
      projectId: 'jira-proj-001',
      projectName: 'E-commerce Platform',
      projectKey: 'ECOM'
    },
    columns: [
      { name: 'To Do', statuses: ['To Do', 'Open'] },
      { name: 'In Progress', statuses: ['In Progress'] },
      { name: 'Code Review', statuses: ['Code Review', 'Peer Review'] },
      { name: 'Testing', statuses: ['Testing', 'QA Review'] },
      { name: 'Done', statuses: ['Done', 'Closed', 'Resolved'] }
    ],
    estimation: {
      type: 'story_points',
      field: 'customfield_10016'
    },
    quickFilters: [
      {
        id: 'filter-001',
        name: 'My Issues',
        jql: 'assignee = currentUser()'
      },
      {
        id: 'filter-002',
        name: 'Bugs Only',
        jql: 'issuetype = Bug'
      },
      {
        id: 'filter-003',
        name: 'High Priority',
        jql: 'priority in (High, Highest)'
      }
    ]
  }
];

export const mockJiraSprints: JiraSprint[] = [
  {
    id: 'sprint-001',
    name: 'Sprint 24 - Payment Integration',
    state: 'active',
    startDate: '2024-01-15T09:00:00Z',
    endDate: '2024-01-29T17:00:00Z',
    goal: 'Complete payment gateway integration and improve checkout flow',
    boardId: 'board-001',
    projectId: 'proj-001',
    issues: ['ECOM-101', 'ECOM-102', 'ECOM-103', 'ECOM-104', 'ECOM-105'],
    velocity: 38,
    commitment: 42,
    completed: 28,
    scope: {
      added: 8,
      removed: 3,
      changed: 2
    }
  },
  {
    id: 'sprint-002',
    name: 'Sprint 23 - User Experience',
    state: 'closed',
    startDate: '2024-01-01T09:00:00Z',
    endDate: '2024-01-15T17:00:00Z',
    completeDate: '2024-01-15T16:30:00Z',
    goal: 'Improve user experience and fix critical bugs',
    boardId: 'board-001',
    projectId: 'proj-001',
    issues: ['ECOM-95', 'ECOM-96', 'ECOM-97', 'ECOM-98'],
    velocity: 35,
    commitment: 35,
    completed: 35,
    scope: {
      added: 2,
      removed: 0,
      changed: 1
    }
  }
];

export const mockJiraIssues: JiraIssue[] = [
  {
    id: 'issue-001',
    key: 'ECOM-101',
    summary: 'Implement Stripe payment gateway integration',
    description: 'Integrate Stripe payment processing for credit card payments in the checkout flow',
    issueType: 'Story',
    status: 'In Progress',
    priority: 'High',
    assignee: {
      id: 'user-001',
      name: 'John Doe',
      email: 'john.doe@company.com'
    },
    reporter: {
      id: 'user-002',
      name: 'Jane Smith',
      email: 'jane.smith@company.com'
    },
    storyPoints: 8,
    originalEstimate: 16,
    timeSpent: 6,
    remainingEstimate: 10,
    labels: ['payment', 'integration', 'high-priority'],
    components: ['Payment System'],
    fixVersions: ['v1.1.0'],
    sprint: {
      id: 'sprint-001',
      name: 'Sprint 24 - Payment Integration',
      state: 'active'
    },
    created: '2024-01-10T09:00:00Z',
    updated: '2024-01-16T14:30:00Z',
    dueDate: '2024-01-25T17:00:00Z',
    comments: [
      {
        id: 'comment-001',
        author: 'John Doe',
        body: 'Started working on the Stripe SDK integration. Setting up test environment first.',
        created: '2024-01-15T10:30:00Z'
      },
      {
        id: 'comment-002',
        author: 'Jane Smith',
        body: 'Please make sure to implement proper error handling for failed payments.',
        created: '2024-01-16T09:15:00Z'
      }
    ],
    attachments: [
      {
        id: 'att-001',
        filename: 'payment-flow-diagram.png',
        size: 245760,
        mimeType: 'image/png',
        created: '2024-01-10T11:00:00Z'
      }
    ],
    subtasks: ['ECOM-101-1', 'ECOM-101-2'],
    customFields: {
      'Epic Link': 'ECOM-100',
      'Business Value': 'High',
      'Risk Level': 'Medium'
    }
  },
  {
    id: 'issue-002',
    key: 'ECOM-102',
    summary: 'Add payment validation on frontend',
    description: 'Implement client-side validation for payment forms before sending to backend',
    issueType: 'Task',
    status: 'To Do',
    priority: 'Medium',
    assignee: {
      id: 'user-003',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com'
    },
    reporter: {
      id: 'user-001',
      name: 'John Doe',
      email: 'john.doe@company.com'
    },
    storyPoints: 3,
    originalEstimate: 6,
    labels: ['frontend', 'validation'],
    components: ['Frontend'],
    fixVersions: ['v1.1.0'],
    sprint: {
      id: 'sprint-001',
      name: 'Sprint 24 - Payment Integration',
      state: 'active'
    },
    created: '2024-01-12T14:00:00Z',
    updated: '2024-01-12T14:00:00Z',
    comments: [],
    attachments: [],
    subtasks: [],
    customFields: {
      'Epic Link': 'ECOM-100'
    }
  },
  {
    id: 'issue-003',
    key: 'ECOM-103',
    summary: 'Fix checkout button not responding on mobile',
    description: 'The checkout button becomes unresponsive on mobile devices after form validation fails',
    issueType: 'Bug',
    status: 'Code Review',
    priority: 'High',
    assignee: {
      id: 'user-004',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com'
    },
    reporter: {
      id: 'user-005',
      name: 'QA Team',
      email: 'qa@company.com'
    },
    storyPoints: 2,
    originalEstimate: 4,
    timeSpent: 3,
    remainingEstimate: 1,
    labels: ['bug', 'mobile', 'checkout'],
    components: ['Frontend'],
    fixVersions: ['v1.0.1'],
    sprint: {
      id: 'sprint-001',
      name: 'Sprint 24 - Payment Integration',
      state: 'active'
    },
    created: '2024-01-14T11:30:00Z',
    updated: '2024-01-16T16:45:00Z',
    dueDate: '2024-01-20T17:00:00Z',
    comments: [
      {
        id: 'comment-003',
        author: 'Sarah Johnson',
        body: 'Identified the issue - event listener not being properly cleaned up. Fix ready for review.',
        created: '2024-01-16T16:45:00Z'
      }
    ],
    attachments: [],
    subtasks: [],
    customFields: {
      'Severity': 'High',
      'Found in Environment': 'Production'
    }
  },
  {
    id: 'issue-004',
    key: 'ECOM-104',
    summary: 'Optimize database queries for product search',
    description: 'Product search is taking too long. Need to optimize database queries and add proper indexing.',
    issueType: 'Task',
    status: 'Testing',
    priority: 'Medium',
    assignee: {
      id: 'user-002',
      name: 'Jane Smith',
      email: 'jane.smith@company.com'
    },
    reporter: {
      id: 'user-001',
      name: 'John Doe',
      email: 'john.doe@company.com'
    },
    storyPoints: 5,
    originalEstimate: 10,
    timeSpent: 8,
    remainingEstimate: 2,
    labels: ['performance', 'database', 'search'],
    components: ['Backend API'],
    fixVersions: ['v1.1.0'],
    sprint: {
      id: 'sprint-001',
      name: 'Sprint 24 - Payment Integration',
      state: 'active'
    },
    created: '2024-01-11T10:00:00Z',
    updated: '2024-01-17T09:20:00Z',
    comments: [
      {
        id: 'comment-004',
        author: 'Jane Smith',
        body: 'Added database indexes and optimized queries. Performance improved by 60%. Ready for testing.',
        created: '2024-01-17T09:20:00Z'
      }
    ],
    attachments: [
      {
        id: 'att-002',
        filename: 'performance-test-results.pdf',
        size: 512000,
        mimeType: 'application/pdf',
        created: '2024-01-17T09:25:00Z'
      }
    ],
    subtasks: [],
    customFields: {
      'Performance Impact': 'High',
      'Technical Debt': 'Medium'
    }
  },
  {
    id: 'issue-005',
    key: 'ECOM-105',
    summary: 'Update user profile page design',
    description: 'Redesign user profile page to match new design system and improve usability',
    issueType: 'Story',
    status: 'Done',
    priority: 'Low',
    assignee: {
      id: 'user-003',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com'
    },
    reporter: {
      id: 'user-006',
      name: 'Design Team',
      email: 'design@company.com'
    },
    storyPoints: 3,
    originalEstimate: 8,
    timeSpent: 7,
    remainingEstimate: 0,
    labels: ['design', 'frontend', 'user-experience'],
    components: ['Frontend'],
    fixVersions: ['v1.1.0'],
    sprint: {
      id: 'sprint-001',
      name: 'Sprint 24 - Payment Integration',
      state: 'active'
    },
    created: '2024-01-08T15:00:00Z',
    updated: '2024-01-18T11:00:00Z',
    resolution: 'Done',
    resolutionDate: '2024-01-18T11:00:00Z',
    comments: [
      {
        id: 'comment-005',
        author: 'Mike Wilson',
        body: 'Design implementation completed. All responsive breakpoints tested.',
        created: '2024-01-18T11:00:00Z'
      }
    ],
    attachments: [],
    subtasks: [],
    customFields: {
      'Design Review': 'Approved',
      'UX Impact': 'High'
    }
  }
];

export const mockJiraMetrics: Record<string, JiraMetrics> = {
  'proj-001': {
    projectId: 'proj-001',
    sprintId: 'sprint-001',
    period: '2024-01',
    velocity: {
      current: 38,
      average: 35.5,
      trend: 7.0,
      history: [
        { sprintName: 'Sprint 20', velocity: 32, commitment: 35, completed: 32 },
        { sprintName: 'Sprint 21', velocity: 28, commitment: 30, completed: 28 },
        { sprintName: 'Sprint 22', velocity: 40, commitment: 38, completed: 40 },
        { sprintName: 'Sprint 23', velocity: 35, commitment: 35, completed: 35 },
        { sprintName: 'Sprint 24', velocity: 38, commitment: 42, completed: 28 }
      ]
    },
    burndown: {
      ideal: [
        { date: '2024-01-15', remaining: 42 },
        { date: '2024-01-16', remaining: 39 },
        { date: '2024-01-17', remaining: 36 },
        { date: '2024-01-18', remaining: 33 },
        { date: '2024-01-19', remaining: 30 },
        { date: '2024-01-22', remaining: 24 },
        { date: '2024-01-23', remaining: 18 },
        { date: '2024-01-24', remaining: 12 },
        { date: '2024-01-25', remaining: 6 },
        { date: '2024-01-26', remaining: 0 }
      ],
      actual: [
        { date: '2024-01-15', remaining: 42 },
        { date: '2024-01-16', remaining: 40 },
        { date: '2024-01-17', remaining: 37 },
        { date: '2024-01-18', remaining: 34 },
        { date: '2024-01-19', remaining: 31 },
        { date: '2024-01-22', remaining: 26 },
        { date: '2024-01-23', remaining: 22 },
        { date: '2024-01-24', remaining: 18 },
        { date: '2024-01-25', remaining: 14 },
        { date: '2024-01-26', remaining: 14 }
      ],
      scope: [
        { date: '2024-01-17', added: 5, removed: 0 },
        { date: '2024-01-20', added: 3, removed: 2 },
        { date: '2024-01-24', added: 0, removed: 3 }
      ]
    },
    cycleTime: {
      average: 3.2,
      p50: 2.5,
      p75: 4.0,
      p95: 7.5,
      byIssueType: {
        'Story': 3.8,
        'Task': 2.1,
        'Bug': 1.5,
        'Epic': 12.0
      }
    },
    throughput: {
      issuesPerSprint: 12.5,
      storyPointsPerSprint: 35.5,
      trend: 8.2
    },
    quality: {
      bugRate: 0.15,
      escapeRate: 0.08,
      reworkRate: 0.12,
      defectDensity: 0.05
    },
    teamHealth: {
      workloadDistribution: {
        'John Doe': 12,
        'Jane Smith': 10,
        'Mike Wilson': 8,
        'Sarah Johnson': 6
      },
      blockerFrequency: 1.2,
      avgBlockerDuration: 8.5,
      sprintGoalSuccess: 85
    }
  }
};

export const mockJiraIntegrationSettings: Record<string, JiraIntegrationSettings> = {
  'proj-001': {
    projectId: 'proj-001',
    enabled: true,
    jiraUrl: 'https://company.atlassian.net',
    projectKey: 'ECOM',
    boardId: 'board-001',
    credentials: {
      type: 'token',
      username: 'john.doe@company.com',
      apiToken: '***hidden***'
    },
    syncSettings: {
      autoSync: true,
      syncInterval: 15,
      syncIssues: true,
      syncSprints: true,
      syncMetrics: true
    },
    filters: {
      includeSubtasks: true,
      issueTypes: ['Story', 'Task', 'Bug'],
      statuses: ['To Do', 'In Progress', 'Code Review', 'Testing', 'Done'],
      components: ['Frontend', 'Backend API', 'Payment System']
    },
    notifications: {
      sprintStart: true,
      sprintEnd: true,
      blockers: true,
      velocityChanges: false
    }
  }
};