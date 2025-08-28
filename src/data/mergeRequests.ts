export interface MergeRequest {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'open' | 'merged' | 'closed';
  author: string;
  createdAt: string;
  sourceBranch: string;
  targetBranch: string;
  changes: {
    filesChanged: number;
    additions: number;
    deletions: number;
  };
  plan: string;
}

export const mockMergeRequests: MergeRequest[] = [
  {
    id: 'mr-001',
    projectId: 'proj-001',
    title: 'Add Playwright e2e testing framework',
    description: 'Implements end-to-end testing capabilities using Playwright for better test coverage.',
    status: 'merged',
    author: 'john.doe@company.com',
    createdAt: '2024-01-12T14:30:00Z',
    sourceBranch: 'feature/add-playwright',
    targetBranch: 'main',
    changes: {
      filesChanged: 8,
      additions: 156,
      deletions: 12
    },
    plan: 'ADD Playwright e2e (latest)'
  },
  {
    id: 'mr-002',
    projectId: 'proj-002',
    title: 'Update OpenTelemetry SDK to v1.33.0',
    description: 'Updates OpenTelemetry SDK to the latest version for improved observability features.',
    status: 'open',
    author: 'jane.smith@company.com',
    createdAt: '2024-01-14T09:15:00Z',
    sourceBranch: 'feature/update-otel',
    targetBranch: 'develop',
    changes: {
      filesChanged: 4,
      additions: 23,
      deletions: 18
    },
    plan: 'UPDATE OpenTelemetry SDK from 1.32.0 to 1.33.0'
  }
];