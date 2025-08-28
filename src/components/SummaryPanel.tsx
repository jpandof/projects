import React from 'react';
import { useProvisioner } from '../store/useProvisioner';
import { stacks } from '../data/stacks';
import { mockProjects } from '../data/projects';
import { Copy, FileText, CheckCircle2, AlertCircle, GitMerge, Settings } from 'lucide-react';
import { MergeRequestModal } from './MergeRequestModal';

interface SummaryPanelProps {
  onCreateMR?: () => void;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ onCreateMR }) => {
  const { selectedStack, selectedProvisions, generatePlan, projectContext } = useProvisioner();
  const [showMRModal, setShowMRModal] = React.useState(false);
  const isNewProject = projectContext.isNewProject;

  const selectedStackInfo = stacks.find(s => s.id === selectedStack);
  const currentProject = projectContext.projectId ? mockProjects.find(p => p.id === projectContext.projectId) : null;
  const plan = generatePlan();
  const hasChanges = plan.trim().length > 0;

  const copyToClipboard = async () => {
    if (!plan) return;
    
    try {
      await navigator.clipboard.writeText(plan);
      // You could add a toast notification here
      alert('Plan copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleCreateMR = () => {
    setShowMRModal(true);
    onCreateMR?.();
  };

  const getActionButtonText = () => {
    if (isNewProject) {
      return 'Apply Configuration';
    }
    return 'Create Merge Request';
  };

  const getActionButtonIcon = () => {
    if (isNewProject) {
      return <Settings className="h-4 w-4" />;
    }
    return <GitMerge className="h-4 w-4" />;
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Summary</h3>
        </div>

        {/* Project Context */}
        {currentProject && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Project</h4>
            <div className="p-2 bg-blue-50 rounded-lg">
              <div className="font-medium text-gray-900 text-sm">{currentProject.name}</div>
              <div className="text-sm text-gray-600">{currentProject.description}</div>
            </div>
          </div>
        )}

        {/* Selected Stack */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Stack</h4>
          {selectedStackInfo ? (
            <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${selectedStackInfo.color}`}></div>
              <span className="font-medium text-gray-900 text-sm">{selectedStackInfo.label}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-500">
              <AlertCircle className="h-4 w-4" />
              <span>No stack selected</span>
            </div>
          )}
        </div>

        {/* Selected Provisions */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Provisions ({selectedProvisions.length})
          </h4>
          {selectedProvisions.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {selectedProvisions.map((provision) => (
                <div key={provision.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-gray-900 flex-1 truncate">{provision.label}</span>
                  {provision.version && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {provision.version}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500 italic">No provisions selected</div>
          )}
        </div>

        {/* Change Plan */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Change Plan</h4>
            <button
              onClick={copyToClipboard}
              disabled={!plan}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                plan
                  ? 'bg-blue-600 text-white hover:bg-blue-700 text-xs'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Plan</span>
            </button>
          </div>
          {plan ? (
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs whitespace-pre-wrap font-mono">
              {plan}
            </pre>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-xs">No changes planned</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {hasChanges && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleCreateMR}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {getActionButtonIcon()}
              <span>{getActionButtonText()}</span>
            </button>
          </div>
        )}
      </div>

      <MergeRequestModal
        isOpen={showMRModal}
        onClose={() => setShowMRModal(false)}
        projectId={projectContext.projectId}
        plan={plan}
        provisions={selectedProvisions}
      />
    </>
  );
};