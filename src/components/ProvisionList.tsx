import React, { useState } from 'react';
import { provisions, categoryLabels } from '../data/provisions';
import { useProvisioner } from '../store/useProvisioner';
import { Package, Settings, Check } from 'lucide-react';

// Simple fallback icon as base64 SVG
const FALLBACK_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzZCNzI4MCIvPgo8dGV4dCB4PSIxNiIgeT0iMjEiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4/PC90ZXh0Pgo8L3N2Zz4K';

export const ProvisionList: React.FC = () => {
  // All hooks must be called at the top, before any conditional returns
  const { selectedStack, selectedProvisions, toggleProvision, updateProvisionVersion } = useProvisioner();
  const [hoveredProvision, setHoveredProvision] = useState<string | null>(null);
  const [showVersionModal, setShowVersionModal] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = React.useCallback((id: string) => {
    setFailedImages(prev => new Set(prev).add(id));
  }, []);

  if (!selectedStack) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-3">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Provisions</h3>
        <div className="text-center py-6">
          <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Select a technology stack to view available provisions</p>
        </div>
      </div>
    );
  }

  const stackProvisions = provisions.find(p => p.stackId === selectedStack);
  if (!stackProvisions) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-3">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Provisions</h3>
        <p className="text-gray-500 text-sm">No provisions available for this stack</p>
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

  const getProvisionLogo = (id: string) => {
    const logos: Record<string, string> = {
      // React ecosystem
      'eslint-prettier': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
      'testing-library': 'https://testing-library.com/img/octopus-128x128.png',
      'playwright-e2e': 'https://playwright.dev/img/playwright-logo.svg',
      'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'otel-web': 'https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png',
      
      // Java ecosystem
      'actuator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'otel-sdk': 'https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png',
      'testcontainers': 'https://www.testcontainers.org/logo.svg',
      'flyway': 'https://flywaydb.org/assets/logo/flyway-logo.png',
      'kafka-client': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
      
      // Node ecosystem
      'eslint-node': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
      'jest': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
      'supertest': 'https://avatars.githubusercontent.com/u/6078720?s=200&v=4',
      'pino-logger': 'https://getpino.io/img/pino-banner.png',
      'otel-node': 'https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png',
      'kafka-nats-client': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
      
      // Go ecosystem
      'golangci-lint': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'zap-logger': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'otel-go': 'https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png',
      'chi-gin-middlewares': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'testcontainers-go': 'https://www.testcontainers.org/logo.svg',
      
      // Python ecosystem
      'ruff-black': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'pytest': 'https://docs.pytest.org/en/stable/_static/pytest_logo_curves.svg',
      'fastapi-extras': 'https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png',
      'otel-python': 'https://opentelemetry.io/img/logos/opentelemetry-logo-nav.png',
      'poetry': 'https://python-poetry.org/images/logo-origami.svg'
    };
    return failedImages.has(id) ? FALLBACK_ICON : (logos[id] || FALLBACK_ICON);
  };

  const handleImageError = React.useCallback((id: string) => {
    setFailedImages(prev => new Set(prev).add(id));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Available Provisions</h3>
      <div className="space-y-3">
        {Object.entries(groupedProvisions).map(([category, items]) => (
          <div key={category} className="border border-gray-100 rounded-lg p-2">
            <h4 className="font-medium text-gray-900 text-sm mb-2">
              {categoryLabels[category as keyof typeof categoryLabels]} ({items.length})
            </h4>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {items.map((item) => {
                const isSelected = selectedProvisions.some(p => p.id === item.id);
                const selectedProvision = selectedProvisions.find(p => p.id === item.id);
                const currentVersion = selectedProvision?.version || item.defaultVersion;

                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => toggleProvision(item.id, item.label, item.defaultVersion)}
                      onMouseEnter={() => setHoveredProvision(item.id)}
                      onMouseLeave={() => setHoveredProvision(null)}
                      className={`
                        relative w-16 h-16 rounded-lg border transition-all duration-150 flex flex-col items-center justify-center p-1 group
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }
                      `}
                    >
                      <img 
                        src={getProvisionLogo(item.id)} 
                        alt={item.label}
                        className="w-8 h-8 object-contain mb-1"
                        onError={() => handleImageError(item.id)}
                      />
                      <span className="text-xs text-gray-600 text-center leading-tight truncate w-full px-0.5">
                        {item.label.length > 8 ? item.label.substring(0, 8) + '...' : item.label}
                      </span>
                      
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}

                      {item.versions && isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowVersionModal(item.id);
                          }}
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <Settings className="h-2 w-2 text-white" />
                        </button>
                      )}
                    </button>

                    {hoveredProvision === item.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg max-w-48">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-gray-300 mt-1 whitespace-normal">
                            {item.description}
                          </div>
                          {currentVersion && (
                            <div className="text-blue-300 mt-1">
                              v{currentVersion}
                            </div>
                          )}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    )}

                    {showVersionModal === item.id && item.versions && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-4 max-w-sm w-full mx-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <img 
                              src={getProvisionLogo(item.id)} 
                              alt={item.label}
                              className="w-6 h-6 object-contain"
                            />
                            <h3 className="text-lg font-medium text-gray-900">{item.label}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
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
                              className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                              {item.versions.map((version) => (
                                <option key={version} value={version}>
                                  {version}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <button
                              onClick={() => setShowVersionModal(null)}
                              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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