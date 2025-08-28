import React, { useState } from 'react';
import { X, GitMerge, User, Calendar, FileText, Plus, Minus, Check } from 'lucide-react';
import { mockProjects } from '../data/projects';
import { stacks } from '../data/stacks';

interface MergeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  plan: string;
  provisions: Array<{ id: string; label: string; version?: string }>;
}

export const MergeRequestModal: React.FC<MergeRequestModalProps> = ({
  isOpen,
  onClose,
  projectId,
  plan,
  provisions
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mrTitle, setMrTitle] = useState('');
  const [mrDescription, setMrDescription] = useState('');

  const project = projectId ? mockProjects.find(p => p.id === projectId) : null;
  const stackInfo = project ? stacks.find(s => s.id === project.stack) : null;

  React.useEffect(() => {
    if (isOpen && plan) {
      // Auto-generate title and description based on plan
      const actions = plan.split('\n').filter(line => line.trim());
      if (actions.length === 1) {
        setMrTitle(actions[0]);
      } else {
        setMrTitle(`Update project provisions (${actions.length} changes)`);
      }
      
      setMrDescription(`This merge request implements the following changes to the project provisions:\n\n${plan}\n\nThese changes will enhance the project's capabilities and maintain up-to-date dependencies.`);
    }
  }, [isOpen, plan]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Auto close after success
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  const generateMockChanges = () => {
    const actions = plan.split('\n').filter(line => line.trim());
    return {
      filesChanged: Math.max(2, actions.length * 2),
      additions: actions.length * 15 + Math.floor(Math.random() * 50),
      deletions: Math.floor(actions.length * 5 + Math.random() * 20)
    };
  };

  const mockChanges = generateMockChanges();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <GitMerge className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isSubmitted ? 'Merge Request Created!' : 'Create Merge Request'}
              </h2>
              <p className="text-sm text-gray-500">
                {project ? `${project.name}` : 'New Project'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success State */
          <div className="p-6 text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge Request Created Successfully!</h3>
            <p className="text-gray-600 mb-4">
              Your changes have been submitted for review. The development team will be notified.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">MR ID:</span>
                <span className="font-mono text-gray-900">MR-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                  Under Review
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="p-6 space-y-6">
            {/* Project Info */}
            {project && stackInfo && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${stackInfo.color}`}></div>
                  <span className="font-medium text-gray-900">{stackInfo.label}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Target Branch:</span>
                    <span className="ml-2 font-mono text-gray-900">{project.branch}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Source Branch:</span>
                    <span className="ml-2 font-mono text-gray-900">feature/update-provisions</span>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Merge Request Title
              </label>
              <input
                type="text"
                value={mrTitle}
                onChange={(e) => setMrTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a descriptive title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={mrDescription}
                onChange={(e) => setMrDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the changes being made..."
              />
            </div>

            {/* Changes Preview */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Changes Preview</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-3 text-sm">
                  <div className="flex items-center space-x-1 text-green-400">
                    <Plus className="h-3 w-3" />
                    <span>{mockChanges.additions} additions</span>
                  </div>
                  <div className="flex items-center space-x-1 text-red-400">
                    <Minus className="h-3 w-3" />
                    <span>{mockChanges.deletions} deletions</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <FileText className="h-3 w-3" />
                    <span>{mockChanges.filesChanged} files changed</span>
                  </div>
                </div>
                <pre className="text-gray-100 text-sm whitespace-pre-wrap font-mono">
                  {plan || 'No changes planned'}
                </pre>
              </div>
            </div>

            {/* Provisions Summary */}
            {provisions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Final Provisions ({provisions.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {provisions.map((provision) => (
                    <span
                      key={provision.id}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {provision.label}
                      {provision.version && (
                        <span className="ml-1 text-blue-500">({provision.version})</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !mrTitle.trim()}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Creating MR...</span>
                  </>
                ) : (
                  <>
                    <GitMerge className="h-4 w-4" />
                    <span>Create Merge Request</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};