export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'developer' | 'viewer';
  permissions: string[];
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Team {
  id: string;
  projectId: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
  settings: {
    allowSelfJoin: boolean;
    requireApproval: boolean;
    defaultRole: TeamMember['role'];
  };
}

export interface ActivityLog {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Alert {
  id: string;
  projectId: string;
  type: 'performance' | 'error' | 'deployment' | 'security' | 'resource';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  environment?: string;
  metadata?: Record<string, any>;
}

export interface Notification {
  id: string;
  userId: string;
  projectId: string;
  type: 'deployment' | 'alert' | 'team' | 'system';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export const mockTeams: Team[] = [
  {
    id: 'team-001',
    projectId: 'proj-001',
    name: 'E-commerce Frontend Team',
    description: 'Frontend development team for the e-commerce platform',
    members: [
      {
        id: 'user-001',
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'owner',
        permissions: ['read', 'write', 'deploy', 'admin'],
        joinedAt: '2024-01-01T00:00:00Z',
        lastActive: '2024-01-15T14:30:00Z',
        status: 'active'
      },
      {
        id: 'user-002',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        role: 'admin',
        permissions: ['read', 'write', 'deploy'],
        joinedAt: '2024-01-02T00:00:00Z',
        lastActive: '2024-01-15T13:45:00Z',
        status: 'active'
      },
      {
        id: 'user-003',
        name: 'Mike Wilson',
        email: 'mike.wilson@company.com',
        role: 'developer',
        permissions: ['read', 'write'],
        joinedAt: '2024-01-05T00:00:00Z',
        lastActive: '2024-01-14T16:20:00Z',
        status: 'active'
      },
      {
        id: 'user-004',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'viewer',
        permissions: ['read'],
        joinedAt: '2024-01-10T00:00:00Z',
        lastActive: '2024-01-15T09:15:00Z',
        status: 'active'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    settings: {
      allowSelfJoin: false,
      requireApproval: true,
      defaultRole: 'viewer'
    }
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'activity-001',
    projectId: 'proj-001',
    userId: 'user-001',
    userName: 'John Doe',
    userEmail: 'john.doe@company.com',
    action: 'deployment',
    target: 'production',
    details: 'Deployed version v1.2.3 to production environment',
    timestamp: '2024-01-15T14:30:00Z',
    metadata: {
      version: 'v1.2.3',
      environment: 'production',
      commit: 'a1b2c3d4'
    }
  },
  {
    id: 'activity-002',
    projectId: 'proj-001',
    userId: 'user-002',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@company.com',
    action: 'provision_update',
    target: 'eslint-prettier',
    details: 'Updated ESLint & Prettier configuration',
    timestamp: '2024-01-15T13:45:00Z',
    metadata: {
      provision: 'eslint-prettier',
      version: 'latest'
    }
  },
  {
    id: 'activity-003',
    projectId: 'proj-001',
    userId: 'user-003',
    userName: 'Mike Wilson',
    userEmail: 'mike.wilson@company.com',
    action: 'team_join',
    target: 'team',
    details: 'Joined the project team as developer',
    timestamp: '2024-01-05T00:00:00Z',
    metadata: {
      role: 'developer'
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    projectId: 'proj-001',
    type: 'performance',
    severity: 'high',
    title: 'High Response Time',
    message: 'Average response time exceeded 500ms threshold in production',
    timestamp: '2024-01-15T15:30:00Z',
    resolved: false,
    environment: 'production',
    metadata: {
      currentValue: 650,
      threshold: 500,
      metric: 'response_time'
    }
  },
  {
    id: 'alert-002',
    projectId: 'proj-001',
    type: 'resource',
    severity: 'medium',
    title: 'Memory Usage Warning',
    message: 'Memory usage is at 85% in staging environment',
    timestamp: '2024-01-15T14:15:00Z',
    resolved: true,
    resolvedBy: 'user-001',
    resolvedAt: '2024-01-15T14:45:00Z',
    environment: 'staging',
    metadata: {
      currentValue: 85,
      threshold: 80,
      metric: 'memory_usage'
    }
  },
  {
    id: 'alert-003',
    projectId: 'proj-001',
    type: 'deployment',
    severity: 'critical',
    title: 'Deployment Failed',
    message: 'Production deployment failed due to test failures',
    timestamp: '2024-01-15T12:00:00Z',
    resolved: true,
    resolvedBy: 'user-002',
    resolvedAt: '2024-01-15T12:30:00Z',
    environment: 'production',
    metadata: {
      deploymentId: 'deploy-003',
      failureReason: 'test_failures'
    }
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    projectId: 'proj-001',
    type: 'deployment',
    title: 'Deployment Successful',
    message: 'Your deployment to production completed successfully',
    read: false,
    timestamp: '2024-01-15T14:30:00Z',
    actionUrl: '/project/proj-001'
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    projectId: 'proj-001',
    type: 'alert',
    title: 'Performance Alert',
    message: 'High response time detected in production',
    read: false,
    timestamp: '2024-01-15T15:30:00Z',
    actionUrl: '/project/proj-001/metrics'
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    projectId: 'proj-001',
    type: 'team',
    title: 'New Team Member',
    message: 'Sarah Johnson joined your project team',
    read: true,
    timestamp: '2024-01-10T00:00:00Z',
    actionUrl: '/project/proj-001'
  }
];