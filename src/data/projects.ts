export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string;
  status: 'active' | 'archived' | 'draft';
  lastModified: string;
  provisions: string[];
  repository: string;
  branch: string;
}

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'E-commerce Frontend',
    description: 'React-based e-commerce platform with modern UI',
    stack: 'react',
    status: 'active',
    lastModified: '2024-01-15T10:30:00Z',
    provisions: ['eslint-prettier', 'testing-library', 'tailwind'],
    repository: 'https://github.com/company/ecommerce-frontend',
    branch: 'main'
  },
  {
    id: 'proj-002',
    name: 'User Management API',
    description: 'Spring Boot microservice for user authentication',
    stack: 'java',
    status: 'active',
    lastModified: '2024-01-14T16:45:00Z',
    provisions: ['actuator', 'otel-sdk', 'testcontainers'],
    repository: 'https://github.com/company/user-api',
    branch: 'develop'
  },
  {
    id: 'proj-003',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with FastAPI backend',
    stack: 'python',
    status: 'active',
    lastModified: '2024-01-13T09:15:00Z',
    provisions: ['ruff-black', 'pytest', 'fastapi-extras'],
    repository: 'https://github.com/company/analytics-dashboard',
    branch: 'main'
  },
  {
    id: 'proj-004',
    name: 'Legacy CRM System',
    description: 'Customer relationship management system',
    stack: 'java',
    status: 'archived',
    lastModified: '2023-12-20T14:20:00Z',
    provisions: ['actuator'],
    repository: 'https://github.com/company/legacy-crm',
    branch: 'master'
  },
  {
    id: 'proj-005',
    name: 'Mobile App Backend',
    description: 'Node.js API for mobile application',
    stack: 'node',
    status: 'draft',
    lastModified: '2024-01-10T11:00:00Z',
    provisions: ['eslint-node', 'jest'],
    repository: 'https://github.com/company/mobile-backend',
    branch: 'feature/initial-setup'
  }
];