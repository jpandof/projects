import React from 'react';
import { stacks } from '../data/stacks';
import { useProvisioner } from '../store/useProvisioner';
import { CheckCircle, Lock } from 'lucide-react';

// Simple fallback icon as base64 SVG
const FALLBACK_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzZCNzI4MCIvPgo8dGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4/PC90ZXh0Pgo8L3N2Zz4K';

interface StackPickerProps {
  disabled?: boolean;
  lockedStack?: string;
  isNewProject?: boolean;
}

export const StackPicker: React.FC<StackPickerProps> = ({ disabled = false, lockedStack, isNewProject = false }) => {
  const { selectedStack, setSelectedStack } = useProvisioner();
  const [hoveredStack, setHoveredStack] = React.useState<string | null>(null);
  const [failedImages, setFailedImages] = React.useState<Set<string>>(new Set());

  const getStackLogo = (stackId: string) => {
    const logos: Record<string, string> = {
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'node': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
      'go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
    };
    return failedImages.has(stackId) ? FALLBACK_ICON : (logos[stackId] || FALLBACK_ICON);
  };

  const handleImageError = React.useCallback((stackId: string) => {
    setFailedImages(prev => new Set(prev).add(stackId));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3">
      <div className="flex items-center space-x-2 mb-3">
        <h2 className="text-lg font-medium text-gray-900">Select Technology Stack</h2>
        {disabled && <Lock className="h-4 w-4 text-gray-400" />}
      </div>
      {disabled && !isNewProject && (
        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Stack locked:</strong> Cannot change the technology stack for existing projects.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {stacks.map((stack) => {
          const isSelected = selectedStack === stack.id;
          const isLocked = disabled && lockedStack === stack.id;
          return (
            <div key={stack.id} className="relative">
              <label
                className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-150 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : disabled
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                } ${disabled ? 'opacity-60' : ''}`}
                onMouseEnter={() => setHoveredStack(stack.id)}
                onMouseLeave={() => setHoveredStack(null)}
              >
                <input
                  type="radio"
                  name="stack"
                  value={stack.id}
                  checked={isSelected}
                  onChange={() => !disabled && setSelectedStack(stack.id)}
                  disabled={disabled}
                  className="sr-only"
                />
                
                <div className="relative mb-1">
                  <img 
                    src={getStackLogo(stack.id)} 
                    alt={stack.label}
                    className="w-10 h-10 object-contain"
                    onError={() => handleImageError(stack.id)}
                  />
                  
                  {isLocked ? (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Lock className="h-2.5 w-2.5 text-white" />
                    </div>
                  ) : isSelected ? (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-2.5 w-2.5 text-white" />
                    </div>
                  ) : null}
                </div>
                
                <div className="text-center">
                  <div className="font-medium text-gray-900 text-xs leading-tight">
                    {stack.label.length > 12 ? stack.label.substring(0, 12) + '...' : stack.label}
                  </div>
                </div>
              </label>

              {hoveredStack === stack.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg max-w-48">
                    <div className="font-medium">{stack.label}</div>
                    <div className="text-gray-300 mt-1 whitespace-normal">
                      {stack.description}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};