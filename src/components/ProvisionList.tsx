import React, { useState } from 'react';
import { provisions, categoryLabels, categoryIcons } from '../data/provisions';
import { useProvisioner } from '../store/useProvisioner';
import { Package, Settings, Check, Info } from 'lucide-react';

export const ProvisionList: React.FC = () => {
  const { selectedStack, selectedProvisions, toggleProvision, updateProvisionVersion } = useProvisioner();
  const [hoveredProvision, setHoveredProvision] = useState<string | null>(null);
  const [showVersionModal, setShowVersionModal] = useState<string | null>(null);

  if (!selectedStack) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Provisions</h3>
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Select a technology stack to view available provisions</p>
        </div>
      </div>
    );
  }

  const stackProvisions = provisions.find(p => p.stackId === selectedStack);
  if (!stackProvisions) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Provisions</h3>
        <p className="text-gray-500">No provisions available for this stack</p>
      </div>
    );
  }

  // Group provisions by category
  const groupedProvisions = stackProvisions.items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof stackProvisions.items>);

  const getProvisionIcon = (category: string) => {
    const icons = {
      'code-quality': '🔧',
      'testing': '🧪',
      'observability': '📊',
      'database': '🗄️',
      'messaging': '📨',
      'deployment': '🚀',
      'security': '🔒'
    };
    return icons[category as keyof typeof icons] || '📦';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Available Provisions</h3>
      <div className="space-y-6">
        {Object.entries(groupedProvisions).map(([category, items]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
              <h4 className="font-semibold text-gray-900">{categoryLabels[category as keyof typeof categoryLabels]}</h4>
              <span className="text-sm text-gray-500">({items.length})</span>
            </div>
            
            {/* Compact Grid Layout */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {items.map((item) => {
                const isSelected = selectedProvisions.some(p => p.id === item.id);
                const selectedProvision = selectedProvisions.find(p => p.id === item.id);
                const currentVersion = selectedProvision?.version || item.defaultVersion;

                return (
                  <div key={item.id} className="relative">
                    {/* Provision Square */}
                    <button
                      onClick={() => toggleProvision(item.id, item.label, item.defaultVersion)}
                      onMouseEnter={() => setHoveredProvision(item.id)}
                      onMouseLeave={() => setHoveredProvision(null)}
                      className={`
                        relative w-16 h-16 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center group
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }
                      `}
                    >
                      {/* Icon */}
                      <div className="text-xl mb-1">
                        {getProvisionIcon(item.category)}
                      </div>
                      
                      {/* Selected Indicator */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}

                      {/* Version Indicator */}
                      {item.versions && isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowVersionModal(item.id);
                          }}
                          className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <Settings className="h-2.5 w-2.5 text-white" />
                        </button>
                      )}
                    </button>

                    {/* Tooltip */}
                    {hoveredProvision === item.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-gray-300 mt-1 max-w-48 whitespace-normal">
                            {item.description}
                          </div>
                          {currentVersion && (
                            <div className="text-blue-300 mt-1">
                              v{currentVersion}
                            </div>
                          )}
                          {/* Tooltip Arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    )}

                    {/* Version Selection Modal */}
                    {showVersionModal === item.id && item.versions && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-xl">{getProvisionIcon(item.category)}</span>
                            <h3 className="text-lg font-medium text-gray-900">{item.label}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Select Version:
                            </label>
                            <select
                              value={currentVersion}
                              onChange={(e) => {
                                updateProvisionVersion(item.id, e.target.value);
                                setShowVersionModal(null);
                              }}
                              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                              {item.versions.map((version) => (
                                <option key={version} value={version}>
                                  {version}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex space-x-3 mt-6">
                            <button
                              onClick={() => setShowVersionModal(null)}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};