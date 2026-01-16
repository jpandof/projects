import type { ProjectTraceability } from '../types/traceability';

// Mock data para la trazabilidad de proyectos
export const mockTraceabilityData: Record<string, ProjectTraceability> = {
  'proj-001': {
    projectId: 'proj-001',
    rallyItems: [
      {
        id: 'US12345',
        type: 'user-story',
        title: 'Implement shopping cart functionality',
        status: 'in-progress',
        priority: 'high',
        owner: 'Sarah Johnson',
        iteration: 'Sprint 23',
        points: 8,
        url: 'https://rally1.rallydev.com/#/12345',
        createdDate: '2024-01-05T09:00:00Z',
        lastUpdated: '2024-01-15T14:30:00Z'
      },
      {
        id: 'DE67890',
        type: 'defect',
        title: 'Fix product image loading issue',
        status: 'testing',
        priority: 'medium',
        owner: 'Mike Chen',
        iteration: 'Sprint 23',
        points: 3,
        url: 'https://rally1.rallydev.com/#/67890',
        createdDate: '2024-01-10T11:20:00Z',
        lastUpdated: '2024-01-14T16:45:00Z'
      }
    ],
    jiraIssues: [
      {
        key: 'ECOM-234',
        type: 'story',
        summary: 'Add payment gateway integration',
        status: 'In Progress',
        priority: 'High',
        assignee: 'Sarah Johnson',
        reporter: 'John Doe',
        sprint: 'Sprint 23',
        storyPoints: 8,
        url: 'https://company.atlassian.net/browse/ECOM-234',
        created: '2024-01-05T09:00:00Z',
        updated: '2024-01-15T14:30:00Z',
        labels: ['frontend', 'payment', 'critical']
      },
      {
        key: 'ECOM-235',
        type: 'bug',
        summary: 'Cart total calculation incorrect',
        status: 'In Review',
        priority: 'Medium',
        assignee: 'Mike Chen',
        reporter: 'QA Team',
        sprint: 'Sprint 23',
        url: 'https://company.atlassian.net/browse/ECOM-235',
        created: '2024-01-12T14:20:00Z',
        updated: '2024-01-14T11:15:00Z',
        labels: ['bug', 'frontend']
      }
    ],
    maximoWorkOrders: [
      {
        wonum: 'WO-2024-001',
        description: 'Deploy E-commerce Frontend to Production - MR-456',
        status: 'INPRG',
        priority: 1,
        workType: 'DEPLOYMENT',
        owner: 'DevOps Team',
        targetStart: '2024-01-20T08:00:00Z',
        targetFinish: '2024-01-20T18:00:00Z',
        actualStart: '2024-01-20T09:00:00Z',
        url: 'https://maximo.company.com/maximo/ui/?event=loadapp&value=wotrack&uniqueid=WO-2024-001'
      },
      {
        wonum: 'WO-2024-005',
        description: 'Database maintenance for E-commerce - US12345',
        status: 'WAPPR',
        priority: 2,
        workType: 'MAINTENANCE',
        owner: 'DBA Team',
        targetStart: '2024-01-25T00:00:00Z',
        targetFinish: '2024-01-25T04:00:00Z',
        url: 'https://maximo.company.com/maximo/ui/?event=loadapp&value=wotrack&uniqueid=WO-2024-005'
      },
      {
        wonum: 'WO-2024-010',
        description: 'Infrastructure upgrade for shopping cart feature',
        status: 'COMP',
        priority: 2,
        workType: 'UPGRADE',
        owner: 'Infrastructure Team',
        targetStart: '2024-01-18T10:00:00Z',
        targetFinish: '2024-01-18T16:00:00Z',
        actualStart: '2024-01-18T10:30:00Z',
        actualFinish: '2024-01-18T15:45:00Z',
        url: 'https://maximo.company.com/maximo/ui/?event=loadapp&value=wotrack&uniqueid=WO-2024-010'
      }
    ],
    mergeRequests: [
      {
        id: 'MR-456',
        title: 'feat: Add shopping cart with local storage',
        status: 'open',
        author: 'Sarah Johnson',
        sourceBranch: 'feature/shopping-cart',
        targetBranch: 'develop',
        url: 'https://github.com/company/ecommerce-frontend/pull/456',
        createdAt: '2024-01-14T10:30:00Z',
        updatedAt: '2024-01-15T09:20:00Z',
        commits: 12,
        additions: 456,
        deletions: 89,
        reviewers: ['Mike Chen', 'Alex Smith'],
        approvals: 1,
        linkedIssues: ['ECOM-234', 'US12345']
      }
    ],
    commits: [
      {
        sha: 'a1b2c3d4',
        message: 'feat: Add shopping cart component with Redux integration',
        author: 'Sarah Johnson',
        date: '2024-01-14T10:30:00Z',
        url: 'https://github.com/company/ecommerce-frontend/commit/a1b2c3d4',
        branch: 'feature/shopping-cart',
        linkedIssues: ['ECOM-234', 'US12345']
      }
    ],
    confluencePages: [
      {
        id: 'CONF-123',
        title: 'E-commerce Frontend - Architecture Overview',
        space: 'ENGINEERING',
        type: 'page',
        status: 'current',
        author: 'Tech Lead',
        url: 'https://company.atlassian.net/wiki/spaces/ENGINEERING/pages/123',
        created: '2023-11-15T10:00:00Z',
        lastModified: '2024-01-10T14:30:00Z',
        version: 5,
        labels: ['architecture', 'frontend', 'ecommerce', 'US12345']
      },
      {
        id: 'CONF-124',
        title: 'Shopping Cart Implementation Guide - US12345',
        space: 'ENGINEERING',
        type: 'page',
        status: 'current',
        author: 'Sarah Johnson',
        url: 'https://company.atlassian.net/wiki/spaces/ENGINEERING/pages/124',
        created: '2024-01-05T09:00:00Z',
        lastModified: '2024-01-14T11:00:00Z',
        version: 3,
        labels: ['guide', 'shopping-cart', 'implementation', 'US12345', 'ECOM-234']
      },
      {
        id: 'CONF-125',
        title: 'Payment Gateway Integration Specs - ECOM-234',
        space: 'PRODUCT',
        type: 'page',
        status: 'current',
        author: 'Product Manager',
        url: 'https://company.atlassian.net/wiki/spaces/PRODUCT/pages/125',
        created: '2023-12-20T10:00:00Z',
        lastModified: '2024-01-08T15:00:00Z',
        version: 2,
        labels: ['specs', 'payment', 'requirements', 'ECOM-234']
      },
      {
        id: 'CONF-130',
        title: 'Deployment Runbook - Production Release',
        space: 'OPERATIONS',
        type: 'page',
        status: 'current',
        author: 'DevOps Team',
        url: 'https://company.atlassian.net/wiki/spaces/OPERATIONS/pages/130',
        created: '2024-01-15T08:00:00Z',
        lastModified: '2024-01-19T10:00:00Z',
        version: 4,
        labels: ['deployment', 'runbook', 'production', 'MR-456', 'WO-2024-001']
      }
    ],
    sharePointDocuments: [
      {
        id: 'SP-001',
        name: 'E-commerce Frontend Requirements - US12345.docx',
        type: 'document',
        site: 'Engineering',
        library: 'Project Documents',
        path: '/Engineering/Project Documents/E-commerce',
        url: 'https://company.sharepoint.com/sites/Engineering/Shared%20Documents/E-commerce/Requirements.docx',
        createdBy: 'Product Manager',
        modifiedBy: 'Sarah Johnson',
        created: '2023-10-15T09:00:00Z',
        modified: '2024-01-05T14:30:00Z',
        size: 2456789,
        version: '3.0',
        tags: ['requirements', 'frontend', 'ecommerce', 'US12345']
      },
      {
        id: 'SP-002',
        name: 'Shopping Cart Design Mockups - ECOM-234.pptx',
        type: 'presentation',
        site: 'Engineering',
        library: 'Design Documents',
        path: '/Engineering/Design Documents/E-commerce',
        url: 'https://company.sharepoint.com/sites/Engineering/Design%20Documents/E-commerce/Mockups.pptx',
        createdBy: 'UX Designer',
        modifiedBy: 'UX Designer',
        created: '2023-11-20T10:00:00Z',
        modified: '2023-12-15T16:00:00Z',
        size: 15678901,
        version: '2.5',
        tags: ['design', 'mockups', 'ui', 'ECOM-234', 'US12345']
      },
      {
        id: 'SP-003',
        name: 'API Integration Specifications.xlsx',
        type: 'spreadsheet',
        site: 'Engineering',
        library: 'Technical Specs',
        path: '/Engineering/Technical Specs/APIs',
        url: 'https://company.sharepoint.com/sites/Engineering/Technical%20Specs/APIs/Integration.xlsx',
        createdBy: 'Backend Lead',
        modifiedBy: 'Sarah Johnson',
        created: '2023-12-01T11:00:00Z',
        modified: '2024-01-10T09:30:00Z',
        size: 567890,
        version: '1.8',
        tags: ['api', 'specs', 'integration', 'ECOM-234']
      },
      {
        id: 'SP-010',
        name: 'Deployment Checklist - WO-2024-001.pdf',
        type: 'pdf',
        site: 'Operations',
        library: 'Deployment',
        path: '/Operations/Deployment/Checklists',
        url: 'https://company.sharepoint.com/sites/Operations/Deployment/Checklists/WO-2024-001.pdf',
        createdBy: 'DevOps Team',
        modifiedBy: 'DevOps Team',
        created: '2024-01-19T08:00:00Z',
        modified: '2024-01-19T16:00:00Z',
        size: 234567,
        version: '1.0',
        tags: ['deployment', 'checklist', 'production', 'WO-2024-001', 'MR-456']
      },
      {
        id: 'SP-015',
        name: 'Testing Report - Shopping Cart Feature.docx',
        type: 'document',
        site: 'QA',
        library: 'Test Reports',
        path: '/QA/Test Reports/E-commerce',
        url: 'https://company.sharepoint.com/sites/QA/Test%20Reports/E-commerce/Shopping-Cart.docx',
        createdBy: 'QA Team',
        modifiedBy: 'QA Team',
        created: '2024-01-13T10:00:00Z',
        modified: '2024-01-14T17:00:00Z',
        size: 789012,
        version: '2.0',
        tags: ['testing', 'qa', 'report', 'US12345', 'ECOM-234', 'DE67890']
      }
    ]
  }
};

export const searchTraceability = (
  projectId: string,
  query: string
): ProjectTraceability | null => {
  const data = mockTraceabilityData[projectId];
  if (!data) return null;

  const searchTerm = query.toLowerCase();

  return {
    projectId,
    rallyItems: data.rallyItems.filter(item =>
      item.id.toLowerCase().includes(searchTerm) ||
      item.title.toLowerCase().includes(searchTerm) ||
      item.owner.toLowerCase().includes(searchTerm)
    ),
    jiraIssues: data.jiraIssues.filter(issue =>
      issue.key.toLowerCase().includes(searchTerm) ||
      issue.summary.toLowerCase().includes(searchTerm) ||
      issue.assignee.toLowerCase().includes(searchTerm) ||
      issue.labels.some(label => label.toLowerCase().includes(searchTerm))
    ),
    maximoWorkOrders: data.maximoWorkOrders.filter(wo =>
      wo.wonum.toLowerCase().includes(searchTerm) ||
      wo.description.toLowerCase().includes(searchTerm) ||
      wo.owner.toLowerCase().includes(searchTerm)
    ),
    mergeRequests: data.mergeRequests.filter(mr =>
      mr.id.toLowerCase().includes(searchTerm) ||
      mr.title.toLowerCase().includes(searchTerm) ||
      mr.author.toLowerCase().includes(searchTerm) ||
      mr.linkedIssues.some(issue => issue.toLowerCase().includes(searchTerm))
    ),
    commits: data.commits.filter(commit =>
      commit.sha.toLowerCase().includes(searchTerm) ||
      commit.message.toLowerCase().includes(searchTerm) ||
      commit.author.toLowerCase().includes(searchTerm) ||
      commit.linkedIssues.some(issue => issue.toLowerCase().includes(searchTerm))
    ),
    confluencePages: data.confluencePages.filter(page =>
      page.id.toLowerCase().includes(searchTerm) ||
      page.title.toLowerCase().includes(searchTerm) ||
      page.author.toLowerCase().includes(searchTerm) ||
      page.labels.some(label => label.toLowerCase().includes(searchTerm))
    ),
    sharePointDocuments: data.sharePointDocuments.filter(doc =>
      doc.id.toLowerCase().includes(searchTerm) ||
      doc.name.toLowerCase().includes(searchTerm) ||
      doc.createdBy.toLowerCase().includes(searchTerm) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  };
};

