export interface Dependency {
  id: string;
  name: string;
  version: string;
  type: 'direct' | 'dev' | 'peer' | 'optional';
  category: 'framework' | 'library' | 'tool' | 'testing' | 'build' | 'runtime';
  description: string;
  homepage?: string;
  repository?: string;
  license: string;
  size?: string;
  lastUpdated: string;
  vulnerabilities: number;
  outdated: boolean;
  latestVersion?: string;
  usedBy: string[]; // File paths where it's used
}

export interface ProjectRelationship {
  id: string;
  projectId: string;
  relatedProjectId: string;
  relatedProjectName: string;
  type: 'consumes' | 'provides' | 'depends_on' | 'used_by';
  endpoint?: string;
  version?: string;
  lastInteraction: string;
  status: 'active' | 'deprecated' | 'breaking_change' | 'maintenance';
  criticality: 'low' | 'medium' | 'high' | 'critical';
}

export interface APIDefinition {
  id: string;
  projectId: string;
  name: string;
  version: string;
  description: string;
  baseUrl: string;
  type: 'REST' | 'GraphQL' | 'gRPC' | 'WebSocket';
  status: 'active' | 'deprecated' | 'beta' | 'maintenance';
  endpoints: APIEndpoint[];
  authentication: {
    type: 'none' | 'api_key' | 'bearer' | 'oauth2' | 'basic';
    description?: string;
  };
  documentation: {
    swagger?: string;
    postman?: string;
    readme?: string;
  };
  consumers: string[]; // Project IDs that consume this API
  lastUpdated: string;
  breaking_changes: BreakingChange[];
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description: string;
  parameters: APIParameter[];
  responses: APIResponse[];
  deprecated: boolean;
  tags: string[];
  examples?: {
    request?: any;
    response?: any;
  };
}

export interface APIParameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'body';
  type: string;
  required: boolean;
  description: string;
  example?: any;
}

export interface APIResponse {
  status: number;
  description: string;
  schema?: any;
  example?: any;
}

export interface BreakingChange {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  migration: string;
  affectedEndpoints: string[];
  notifiedProjects: string[];
}

export interface ChangeNotification {
  id: string;
  fromProjectId: string;
  fromProjectName: string;
  toProjectId: string;
  toProjectName: string;
  type: 'breaking_change' | 'deprecation' | 'new_version' | 'maintenance';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  actionRequired: boolean;
  deadline?: string;
}

// Mock data
export const mockDependencies: Record<string, Dependency[]> = {
  'proj-001': [
    {
      id: 'dep-001',
      name: 'react',
      version: '18.3.1',
      type: 'direct',
      category: 'framework',
      description: 'A JavaScript library for building user interfaces',
      homepage: 'https://reactjs.org',
      repository: 'https://github.com/facebook/react',
      license: 'MIT',
      size: '42.2 kB',
      lastUpdated: '2024-01-10T00:00:00Z',
      vulnerabilities: 0,
      outdated: false,
      usedBy: ['src/main.tsx', 'src/App.tsx', 'src/components/*.tsx']
    },
    {
      id: 'dep-002',
      name: 'react-router-dom',
      version: '7.8.2',
      type: 'direct',
      category: 'library',
      description: 'Declarative routing for React',
      homepage: 'https://reactrouter.com',
      repository: 'https://github.com/remix-run/react-router',
      license: 'MIT',
      size: '15.8 kB',
      lastUpdated: '2024-01-08T00:00:00Z',
      vulnerabilities: 0,
      outdated: true,
      latestVersion: '7.9.0',
      usedBy: ['src/App.tsx', 'src/components/ProjectOverview.tsx']
    },
    {
      id: 'dep-003',
      name: 'tailwindcss',
      version: '3.4.1',
      type: 'dev',
      category: 'tool',
      description: 'A utility-first CSS framework',
      homepage: 'https://tailwindcss.com',
      repository: 'https://github.com/tailwindlabs/tailwindcss',
      license: 'MIT',
      size: '3.2 MB',
      lastUpdated: '2024-01-05T00:00:00Z',
      vulnerabilities: 0,
      outdated: true,
      latestVersion: '3.4.3',
      usedBy: ['All components']
    },
    {
      id: 'dep-004',
      name: 'lucide-react',
      version: '0.344.0',
      type: 'direct',
      category: 'library',
      description: 'Beautiful & consistent icon toolkit',
      homepage: 'https://lucide.dev',
      repository: 'https://github.com/lucide-icons/lucide',
      license: 'ISC',
      size: '1.8 MB',
      lastUpdated: '2024-01-12T00:00:00Z',
      vulnerabilities: 1,
      outdated: true,
      latestVersion: '0.350.0',
      usedBy: ['src/components/*.tsx']
    }
  ],
  'proj-002': [
    {
      id: 'dep-005',
      name: 'spring-boot-starter-web',
      version: '3.2.1',
      type: 'direct',
      category: 'framework',
      description: 'Spring Boot Web Starter',
      homepage: 'https://spring.io/projects/spring-boot',
      license: 'Apache-2.0',
      lastUpdated: '2024-01-08T00:00:00Z',
      vulnerabilities: 0,
      outdated: false,
      usedBy: ['src/main/java/com/company/Application.java']
    },
    {
      id: 'dep-006',
      name: 'spring-boot-starter-actuator',
      version: '3.2.1',
      type: 'direct',
      category: 'tool',
      description: 'Production-ready features for Spring Boot',
      homepage: 'https://spring.io/projects/spring-boot',
      license: 'Apache-2.0',
      lastUpdated: '2024-01-08T00:00:00Z',
      vulnerabilities: 0,
      outdated: false,
      usedBy: ['application.yml']
    }
  ]
};

export const mockProjectRelationships: ProjectRelationship[] = [
  {
    id: 'rel-001',
    projectId: 'proj-001',
    relatedProjectId: 'proj-002',
    relatedProjectName: 'User Management API',
    type: 'consumes',
    endpoint: '/api/v1/users',
    version: 'v2.0.5',
    lastInteraction: '2024-01-15T14:30:00Z',
    status: 'active',
    criticality: 'high'
  },
  {
    id: 'rel-002',
    projectId: 'proj-001',
    relatedProjectId: 'proj-003',
    relatedProjectName: 'Analytics Dashboard',
    type: 'provides',
    endpoint: '/api/v1/events',
    version: 'v1.2.1',
    lastInteraction: '2024-01-14T16:20:00Z',
    status: 'active',
    criticality: 'medium'
  },
  {
    id: 'rel-003',
    projectId: 'proj-002',
    relatedProjectId: 'proj-001',
    relatedProjectName: 'E-commerce Frontend',
    type: 'used_by',
    endpoint: '/api/v1/users',
    version: 'v2.0.5',
    lastInteraction: '2024-01-15T14:30:00Z',
    status: 'active',
    criticality: 'high'
  },
  {
    id: 'rel-004',
    projectId: 'proj-002',
    relatedProjectId: 'proj-005',
    relatedProjectName: 'Mobile App Backend',
    type: 'used_by',
    endpoint: '/api/v1/auth',
    version: 'v2.0.5',
    lastInteraction: '2024-01-10T11:00:00Z',
    status: 'active',
    criticality: 'critical'
  }
];

export const mockAPIDefinitions: Record<string, APIDefinition> = {
  'proj-002': {
    id: 'api-001',
    projectId: 'proj-002',
    name: 'User Management API',
    version: 'v2.0.5',
    description: 'Comprehensive user authentication and management service',
    baseUrl: 'https://api.company.com/users',
    type: 'REST',
    status: 'active',
    authentication: {
      type: 'bearer',
      description: 'JWT Bearer token required for all endpoints'
    },
    documentation: {
      swagger: 'https://api.company.com/users/swagger-ui',
      postman: 'https://documenter.getpostman.com/view/12345/user-api',
      readme: 'https://github.com/company/user-api/blob/main/README.md'
    },
    consumers: ['proj-001', 'proj-005'],
    lastUpdated: '2024-01-12T08:30:00Z',
    endpoints: [
      {
        id: 'endpoint-001',
        method: 'GET',
        path: '/api/v1/users',
        summary: 'Get all users',
        description: 'Retrieve a paginated list of all users in the system',
        deprecated: false,
        tags: ['users', 'list'],
        parameters: [
          {
            name: 'page',
            in: 'query',
            type: 'integer',
            required: false,
            description: 'Page number for pagination',
            example: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'integer',
            required: false,
            description: 'Number of items per page',
            example: 20
          },
          {
            name: 'search',
            in: 'query',
            type: 'string',
            required: false,
            description: 'Search term for filtering users',
            example: 'john'
          }
        ],
        responses: [
          {
            status: 200,
            description: 'Successful response',
            example: {
              users: [
                { id: 1, name: 'John Doe', email: 'john@example.com' }
              ],
              pagination: { page: 1, limit: 20, total: 150 }
            }
          },
          {
            status: 401,
            description: 'Unauthorized - Invalid or missing token'
          }
        ]
      },
      {
        id: 'endpoint-002',
        method: 'POST',
        path: '/api/v1/users',
        summary: 'Create new user',
        description: 'Create a new user account in the system',
        deprecated: false,
        tags: ['users', 'create'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            type: 'object',
            required: true,
            description: 'User data',
            example: {
              name: 'Jane Doe',
              email: 'jane@example.com',
              role: 'user'
            }
          }
        ],
        responses: [
          {
            status: 201,
            description: 'User created successfully',
            example: {
              id: 123,
              name: 'Jane Doe',
              email: 'jane@example.com',
              createdAt: '2024-01-15T10:30:00Z'
            }
          },
          {
            status: 400,
            description: 'Bad request - Invalid user data'
          }
        ]
      },
      {
        id: 'endpoint-003',
        method: 'GET',
        path: '/api/v1/users/{id}',
        summary: 'Get user by ID',
        description: 'Retrieve detailed information about a specific user',
        deprecated: false,
        tags: ['users', 'detail'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'integer',
            required: true,
            description: 'User ID',
            example: 123
          }
        ],
        responses: [
          {
            status: 200,
            description: 'User found',
            example: {
              id: 123,
              name: 'John Doe',
              email: 'john@example.com',
              role: 'admin',
              createdAt: '2024-01-01T00:00:00Z'
            }
          },
          {
            status: 404,
            description: 'User not found'
          }
        ]
      },
      {
        id: 'endpoint-004',
        method: 'DELETE',
        path: '/api/v1/users/{id}',
        summary: 'Delete user',
        description: 'Remove a user from the system (soft delete)',
        deprecated: true,
        tags: ['users', 'delete'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'integer',
            required: true,
            description: 'User ID to delete',
            example: 123
          }
        ],
        responses: [
          {
            status: 204,
            description: 'User deleted successfully'
          },
          {
            status: 404,
            description: 'User not found'
          }
        ]
      }
    ],
    breaking_changes: [
      {
        id: 'change-001',
        version: 'v2.1.0',
        date: '2024-02-01T00:00:00Z',
        title: 'User role field becomes required',
        description: 'The role field in user creation will become mandatory. Default role assignment will be removed.',
        impact: 'medium',
        migration: 'Update all user creation calls to include a role field. Use "user" as default if no specific role is needed.',
        affectedEndpoints: ['/api/v1/users'],
        notifiedProjects: ['proj-001', 'proj-005']
      },
      {
        id: 'change-002',
        version: 'v3.0.0',
        date: '2024-03-15T00:00:00Z',
        title: 'Authentication endpoint restructure',
        description: 'Authentication endpoints will be moved to /api/v3/auth/* and token format will change to JWT.',
        impact: 'critical',
        migration: 'Update authentication flow to use new endpoints and handle JWT tokens instead of simple tokens.',
        affectedEndpoints: ['/api/v1/auth/*'],
        notifiedProjects: ['proj-001', 'proj-005']
      }
    ]
  }
};

export const mockChangeNotifications: ChangeNotification[] = [
  {
    id: 'notif-001',
    fromProjectId: 'proj-002',
    fromProjectName: 'User Management API',
    toProjectId: 'proj-001',
    toProjectName: 'E-commerce Frontend',
    type: 'breaking_change',
    title: 'Breaking Change in User API v2.1.0',
    message: 'The user role field will become required in the next version. Please update your integration.',
    severity: 'warning',
    timestamp: '2024-01-15T10:00:00Z',
    acknowledged: false,
    actionRequired: true,
    deadline: '2024-02-01T00:00:00Z'
  },
  {
    id: 'notif-002',
    fromProjectId: 'proj-003',
    fromProjectName: 'Analytics Dashboard',
    toProjectId: 'proj-001',
    toProjectName: 'E-commerce Frontend',
    type: 'new_version',
    title: 'New Analytics API Version Available',
    message: 'Version v1.3.0 is now available with improved performance and new metrics endpoints.',
    severity: 'info',
    timestamp: '2024-01-14T15:30:00Z',
    acknowledged: true,
    acknowledgedBy: 'john.doe@company.com',
    acknowledgedAt: '2024-01-14T16:00:00Z',
    actionRequired: false
  },
  {
    id: 'notif-003',
    fromProjectId: 'proj-002',
    fromProjectName: 'User Management API',
    toProjectId: 'proj-005',
    toProjectName: 'Mobile App Backend',
    type: 'deprecation',
    title: 'Authentication Endpoint Deprecation',
    message: 'The /api/v1/auth/login endpoint will be deprecated in v3.0.0. Please migrate to /api/v3/auth/login.',
    severity: 'critical',
    timestamp: '2024-01-13T09:00:00Z',
    acknowledged: false,
    actionRequired: true,
    deadline: '2024-03-15T00:00:00Z'
  }
];