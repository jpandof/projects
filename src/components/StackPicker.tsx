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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Select Technology Stack</h2>
        {disabled && <Lock className="h-5 w-5 text-gray-400" />}
      </div>
      {disabled && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Stack locked:</strong> Cannot change the technology stack for existing projects. Only provisions can be modified.
          </p>
        </div>
      )}
      <div className="space-y-4">
        {stacks.map((stack) => {
          const isSelected = selectedStack === stack.id;
          const isLocked = disabled && lockedStack === stack.id;
          return (
            <label
              key={stack.id}
              className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
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
              <div className="flex items-center space-x-3 w-full">
                {isLocked ? (
                  <Lock className="h-5 w-5 text-blue-500" />
                ) : isSelected ? (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                ) : (
                  <Circle className={`h-5 w-5 ${disabled ? 'text-gray-300' : 'text-gray-400'}`} />
                )}
                <div className={`w-3 h-3 rounded-full ${stack.color}`}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{stack.label}</div>
                  <div className="text-sm text-gray-500">{stack.description}</div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};