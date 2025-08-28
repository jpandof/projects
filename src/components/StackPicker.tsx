import React from 'react';
import { stacks } from '../data/stacks';
import { useProvisioner } from '../store/useProvisioner';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface StackPickerProps {
  disabled?: boolean;
  lockedStack?: string;
}

export const StackPicker: React.FC<StackPickerProps> = ({ disabled = false, lockedStack }) => {
  const { selectedStack, setSelectedStack } = useProvisioner();

  const getStackLogo = (stackId: string) => {
    const logos: Record<string, string> = {
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'node': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
      'go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
    };
    return logos[stackId] || 'https://via.placeholder.com/48x48/6B7280/FFFFFF?text=?';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-lg font-medium text-gray-900">Select Technology Stack</h2>
        {disabled && <Lock className="h-4 w-4 text-gray-400" />}
      </div>
      {disabled && (
        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Stack locked:</strong> Cannot change the technology stack for existing projects.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {stacks.map((stack) => {
          const isSelected = selectedStack === stack.id;
          const isLocked = disabled && lockedStack === stack.id;
          return (
            <label
              key={stack.id}
              className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-150 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : disabled
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
              } ${disabled ? 'opacity-60' : ''}`}
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
              
              <div className="relative mb-2">
                <img 
                  src={getStackLogo(stack.id)} 
                  alt={stack.label}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/48x48/6B7280/FFFFFF?text=?';
                  }}
                />
                
                {isLocked ? (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lock className="h-3 w-3 text-white" />
                  </div>
                ) : isSelected ? (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                ) : null}
              </div>
              
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm leading-tight mb-1">
                  {stack.label}
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  {stack.description}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};