import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProvisionerState, SelectedProvision, PlanAction, ProjectContext } from '../types';
import { mockProjects } from '../data/projects';
import { provisions } from '../data/provisions';

export const useProvisioner = create<ProvisionerState>()(
  persist(
    (set, get) => ({
      selectedStack: null,
      selectedProvisions: [],
      planActions: [],
      projectContext: { isNewProject: true },

      setSelectedStack: (stackId) => {
        const currentStack = get().selectedStack;
        if (currentStack !== stackId) {
          // Auto-select required provisions for the new stack
          const stackProvisions = provisions.find(p => p.stackId === stackId);
          const requiredProvisions = stackProvisions?.items.filter(item => item.required) || [];
          
          const autoSelectedProvisions = requiredProvisions.map(item => ({
            id: item.id,
            label: item.label,
            version: item.defaultVersion
          }));
          
          const autoActions = requiredProvisions.map(item => ({
            type: 'ADD' as const,
            item: item.label + (item.defaultVersion ? ` (${item.defaultVersion})` : '')
          }));
          
          set({
            selectedStack: stackId,
            selectedProvisions: autoSelectedProvisions,
            planActions: autoActions
          });
        }
      },

      setProjectContext: (context) => {
        set({ projectContext: context });
      },

      loadProjectProvisions: (projectId) => {
        const project = mockProjects.find(p => p.id === projectId);
        if (!project) return;

        const stackProvisions = provisions.find(p => p.stackId === project.stack);
        if (!stackProvisions) return;

        const selectedProvisions = project.provisions.map(provisionId => {
          const provision = stackProvisions.items.find(item => item.id === provisionId);
          return provision ? {
            id: provision.id,
            label: provision.label,
            version: provision.defaultVersion
          } : null;
        }).filter(Boolean) as SelectedProvision[];

        set({
          selectedStack: project.stack,
          selectedProvisions,
          planActions: [],
          projectContext: { projectId, isNewProject: false }
        });
      },
      toggleProvision: (id, label, version) => {
        const { selectedProvisions } = get();
        
        // Check if this provision is required for the current stack
        const currentStack = get().selectedStack;
        const stackProvisions = provisions.find(p => p.stackId === currentStack);
        const provision = stackProvisions?.items.find(item => item.id === id);
        
        // Don't allow toggling required provisions
        if (provision?.required) {
          return;
        }
        
        const existing = selectedProvisions.find(p => p.id === id);
        
        let newProvisions: SelectedProvision[];
        let newActions: PlanAction[];

        if (existing) {
          // Remove provision
          newProvisions = selectedProvisions.filter(p => p.id !== id);
          newActions = [...get().planActions, {
            type: 'REMOVE',
            item: label
          }];
        } else {
          // Add provision
          newProvisions = [...selectedProvisions, {
            id,
            label,
            version
          }];
          newActions = [...get().planActions, {
            type: 'ADD',
            item: label + (version ? ` (${version})` : '')
          }];
        }

        set({
          selectedProvisions: newProvisions,
          planActions: newActions
        });
      },

      updateProvisionVersion: (id, version) => {
        const { selectedProvisions } = get();
        const provision = selectedProvisions.find(p => p.id === id);
        
        if (!provision || provision.version === version) return;

        const updatedProvisions = selectedProvisions.map(p =>
          p.id === id ? { ...p, version } : p
        );

        const newActions = [...get().planActions, {
          type: 'UPDATE',
          item: provision.label,
          fromVersion: provision.version,
          toVersion: version
        }];

        set({
          selectedProvisions: updatedProvisions,
          planActions: newActions
        });
      },

      clearSelections: () => {
        set({
          selectedStack: null,
          selectedProvisions: [],
          planActions: [],
          projectContext: { isNewProject: true }
        });
      },

      generatePlan: () => {
        const { planActions } = get();
        return planActions.map(action => {
          switch (action.type) {
            case 'ADD':
              return `ADD ${action.item}`;
            case 'REMOVE':
              return `REMOVE ${action.item}`;
            case 'UPDATE':
              return `UPDATE ${action.item} from ${action.fromVersion} to ${action.toVersion}`;
            default:
              return '';
          }
        }).join('\n');
      }
    }),
    {
      name: 'provisioner-storage'
    }
  )
);