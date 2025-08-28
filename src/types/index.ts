export interface SelectedProvision {
  id: string;
  label: string;
  version?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  projectType: string;
  gitFlow: string;
  stack: string;
  repository?: string;
  branch: string;
  status: 'active' | 'archived' | 'draft';
  lastModified: string;
  provisions: string[];
}

export interface PlanAction {
  type: 'ADD' | 'REMOVE' | 'UPDATE';
  item: string;
  fromVersion?: string;
  toVersion?: string;
}

export interface ProjectContext {
  projectId?: string;
  isNewProject: boolean;
}

export interface ProvisionerState {
  selectedStack: string | null;
  selectedProvisions: SelectedProvision[];
  planActions: PlanAction[];
  projectContext: ProjectContext;
  setSelectedStack: (stackId: string | null) => void;
  toggleProvision: (id: string, label: string, version?: string) => void;
  updateProvisionVersion: (id: string, version: string) => void;
  clearSelections: () => void;
  setProjectContext: (context: ProjectContext) => void;
  loadProjectProvisions: (projectId: string) => void;
  generatePlan: () => string;
}