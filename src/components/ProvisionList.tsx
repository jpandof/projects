import React from 'react';
import { provisions, categoryLabels, categoryIcons } from '../data/provisions';
import { useProvisioner } from '../store/useProvisioner';
import { Package, Settings } from 'lucide-react';

export const ProvisionList: React.FC = () => {
  const { selectedStack, selectedProvisions, toggleProvision, updateProvisionVersion } = useProvisioner();

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
            <div className="space-y-3">
              {items.map((item) => {
                const isSelected = selectedProvisions.some(p => p.id === item.id);
                const selectedProvision = selectedProvisions.find(p => p.id === item.id);
                const currentVersion = selectedProvision?.version || item.defaultVersion;

                return (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center h-5">
                        <input
                          id={item.id}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProvision(item.id, item.label, item.defaultVersion)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor={item.id} className="font-medium text-gray-900 cursor-pointer">
                          {item.label}
                        </label>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        
                        {item.versions && isSelected && (
                          <div className="mt-3 flex items-center space-x-2">
                            <Settings className="h-4 w-4 text-gray-400" />
                            <select
                              value={currentVersion}
                              onChange={(e) => updateProvisionVersion(item.id, e.target.value)}
                              className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                              {item.versions.map((version) => (
                                <option key={version} value={version}>
                                  {version}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
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