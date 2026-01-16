// Tipos para la trazabilidad del proyecto

export interface RallyItem {
  id: string;
  type: 'user-story' | 'defect' | 'task' | 'feature';
  title: string;
  status: 'backlog' | 'in-progress' | 'testing' | 'done' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  owner: string;
  iteration?: string;
  points?: number;
  url: string;
  createdDate: string;
  lastUpdated: string;
}

export interface JiraIssue {
  key: string;
  type: 'story' | 'bug' | 'task' | 'epic' | 'subtask';
  summary: string;
  status: string;
  priority: string;
  assignee: string;
  reporter: string;
  sprint?: string;
  storyPoints?: number;
  url: string;
  created: string;
  updated: string;
  labels: string[];
}

export interface MaximoWorkOrder {
  wonum: string;
  description: string;
  status: 'WAPPR' | 'INPRG' | 'COMP' | 'CLOSE' | 'WMATL' | 'WSCH';
  priority: number;
  workType: string;
  owner: string;
  targetStart?: string;
  targetFinish?: string;
  actualStart?: string;
  actualFinish?: string;
  url: string;
}

export interface MergeRequest {
  id: string;
  title: string;
  status: 'open' | 'merged' | 'closed' | 'draft';
  author: string;
  sourceBranch: string;
  targetBranch: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  mergedAt?: string;
  commits: number;
  additions: number;
  deletions: number;
  reviewers: string[];
  approvals: number;
  linkedIssues: string[];
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
  branch: string;
  linkedIssues: string[];
}

export interface ConfluencePage {
  id: string;
  title: string;
  space: string;
  type: 'page' | 'blog';
  status: 'current' | 'draft' | 'archived';
  author: string;
  url: string;
  created: string;
  lastModified: string;
  version: number;
  labels: string[];
}

export interface SharePointDocument {
  id: string;
  name: string;
  type: 'document' | 'spreadsheet' | 'presentation' | 'pdf' | 'other';
  site: string;
  library: string;
  path: string;
  url: string;
  createdBy: string;
  modifiedBy: string;
  created: string;
  modified: string;
  size: number;
  version: string;
  tags: string[];
}

export interface ProjectTraceability {
  projectId: string;
  rallyItems: RallyItem[];
  jiraIssues: JiraIssue[];
  maximoWorkOrders: MaximoWorkOrder[];
  mergeRequests: MergeRequest[];
  commits: Commit[];
  confluencePages: ConfluencePage[];
  sharePointDocuments: SharePointDocument[];
}

export interface TraceabilitySearchParams {
  query: string;
  systems: ('rally' | 'jira' | 'maximo' | 'git' | 'confluence' | 'sharepoint')[];
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  owner?: string;
}

