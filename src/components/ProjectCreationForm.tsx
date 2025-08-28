import React, { useState } from 'react';
import { useProvisioner } from '../store/useProvisioner';
import { stacks } from '../data/stacks';
import { FileText, Info, Layers, Tag } from 'lucide-react';

interface ProjectCreationFormProps {
  onProjectCreated?: (projectData: any) => void;
}

export const ProjectCreationForm: React.FC<ProjectCreationFormProps> = ({ onProjectCreated }) => {
  const { selectedStack } = useProvisioner();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectType: '',
    gitFlow: 'gitflow',
    repository: '',
    branch: 'main'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectTypes = [
    {
      id: 'spa',
      label: 'Single Page Application (SPA)',
      description: 'Aplicación web de una sola página con interfaz de usuario interactiva',
      icon: '🌐',
      stacks: ['react', 'node']
    },
    {
      id: 'library',
      label: 'Librería/Componente',
      description: 'Biblioteca reutilizable de código para otros proyectos',
      icon: '📚',
      stacks: ['react', 'java', 'node', 'go', 'python']
    },
    {
      id: 'microservice',
      label: 'Microservicio',
      description: 'Servicio independiente con responsabilidad específica',
      icon: '🔧',
      stacks: ['java', 'node', 'go', 'python']
    },
    {
      id: 'api-rest',
      label: 'API REST',
      description: 'Interfaz de programación de aplicaciones RESTful',
      icon: '🔌',
      stacks: ['java', 'node', 'go', 'python']
    },
    {
      id: 'api-graphql',
      label: 'API GraphQL',
      description: 'API con lenguaje de consulta GraphQL',
      icon: '📊',
      stacks: ['node', 'java', 'python']
    },
    {
      id: 'batch',
      label: 'Proceso Batch',
      description: 'Aplicación para procesamiento por lotes de datos',
      icon: '⚙️',
      stacks: ['java', 'python', 'go']
    },
    {
      id: 'etl',
      label: 'ETL/Pipeline de Datos',
      description: 'Extracción, transformación y carga de datos',
      icon: '🔄',
      stacks: ['python', 'java', 'go']
    },
    {
      id: 'cli',
      label: 'Herramienta CLI',
      description: 'Aplicación de línea de comandos',
      icon: '💻',
      stacks: ['go', 'node', 'python']
    },
    {
      id: 'worker',
      label: 'Worker/Background Job',
      description: 'Procesador de tareas en segundo plano',
      icon: '🔨',
      stacks: ['node', 'python', 'java', 'go']
    },
    {
      id: 'mobile-backend',
      label: 'Backend para Móvil',
      description: 'API backend específicamente diseñada para aplicaciones móviles',
      icon: '📱',
      stacks: ['node', 'java', 'go', 'python']
    },
    {
      id: 'dashboard',
      label: 'Dashboard/Panel de Control',
      description: 'Interfaz de administración y visualización de datos',
      icon: '📈',
      stacks: ['react', 'python']
    },
    {
      id: 'webhook',
      label: 'Webhook Handler',
      description: 'Manejador de webhooks y eventos externos',
      icon: '🔗',
      stacks: ['node', 'go', 'java', 'python']
    }
  ];

  const gitFlowOptions = [
    {
      id: 'gitflow',
      label: 'Git Flow',
      description: 'Modelo de ramificación con ramas feature, develop, release y hotfix',
      icon: '🌳',
      branches: ['main', 'develop', 'feature/*', 'release/*', 'hotfix/*'],
      recommended: 'Para equipos grandes y releases planificados'
    },
    {
      id: 'github-flow',
      label: 'GitHub Flow',
      description: 'Flujo simple con rama main y feature branches',
      icon: '🚀',
      branches: ['main', 'feature/*'],
      recommended: 'Para desarrollo continuo y despliegues frecuentes'
    },
    {
      id: 'trunk-based',
      label: 'Trunk-based Development',
      description: 'Desarrollo directo en main con commits frecuentes',
      icon: '⚡',
      branches: ['main'],
      recommended: 'Para equipos experimentados con CI/CD maduro'
    },
    {
      id: 'gitlab-flow',
      label: 'GitLab Flow',
      description: 'Combina simplicidad con ambientes de staging y producción',
      icon: '🔄',
      branches: ['main', 'staging', 'production', 'feature/*'],
      recommended: 'Para proyectos con múltiples ambientes'
    }
  ];
  const selectedStackInfo = stacks.find(s => s.id === selectedStack);
  const availableProjectTypes = projectTypes.filter(type => 
    !selectedStack || type.stacks.includes(selectedStack)
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del proyecto es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-Z0-9\s\-_]+$/.test(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras, números, espacios, guiones y guiones bajos';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Debe seleccionar un tipo de proyecto';
    }

    if (!selectedStack) {
      newErrors.stack = 'Debe seleccionar una tecnología';
    }

    if (formData.repository && !/^https?:\/\/.+/.test(formData.repository)) {
      newErrors.repository = 'La URL del repositorio debe comenzar con http:// o https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const projectData = {
      ...formData,
      stack: selectedStack,
      id: `proj-${Date.now()}`,
      status: 'draft' as const,
      lastModified: new Date().toISOString(),
      provisions: []
    };

    onProjectCreated?.(projectData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900">Información del Proyecto</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Proyecto *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="ej. E-commerce Frontend, User Management API..."
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe el propósito y funcionalidad principal del proyecto..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Selected Stack Info */}
        {selectedStackInfo && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Layers className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Tecnología Seleccionada</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${selectedStackInfo.color}`}></div>
              <span className="text-sm text-blue-800">{selectedStackInfo.label}</span>
            </div>
          </div>
        )}

        {errors.stack && (
          <p className="text-sm text-red-600">{errors.stack}</p>
        )}

        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Proyecto *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableProjectTypes.map((type) => (
              <label
                key={type.id}
                className={`relative flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  formData.projectType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : errors.projectType
                    ? 'border-red-300'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type.id}
                  checked={formData.projectType === type.id}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{type.icon}</span>
                    <span className="font-medium text-gray-900 text-sm">{type.label}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{type.description}</p>
                </div>
                {formData.projectType === type.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            ))}
          </div>
          {errors.projectType && (
            <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Estrategia de Git Flow *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gitFlowOptions.map((flow) => (
              <label
                key={flow.id}
                className={`relative flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  formData.gitFlow === flow.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="gitFlow"
                  value={flow.id}
                  checked={formData.gitFlow === flow.id}
                  onChange={(e) => handleInputChange('gitFlow', e.target.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{flow.icon}</span>
                    <span className="font-medium text-gray-900 text-sm">{flow.label}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{flow.description}</p>
                  <div className="text-xs text-blue-600 mb-1">
                    <strong>Ramas:</strong> {flow.branches.join(', ')}
                  </div>
                  <div className="text-xs text-green-600">
                    <strong>Recomendado:</strong> {flow.recommended}
                  </div>
                </div>
                {formData.gitFlow === flow.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Repository URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL del Repositorio (Opcional)
          </label>
          <input
            type="url"
            value={formData.repository}
            onChange={(e) => handleInputChange('repository', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.repository ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="https://github.com/company/project-name"
          />
          {errors.repository && (
            <p className="mt-1 text-sm text-red-600">{errors.repository}</p>
          )}
        </div>

        {/* Branch Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rama Principal
          </label>
          <input
            type="text"
            value={formData.branch}
            onChange={(e) => handleInputChange('branch', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="main"
          />
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Información importante:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Después de crear el proyecto, podrás seleccionar los aprovisionamientos específicos</li>
                <li>El tipo de proyecto influirá en las recomendaciones de herramientas</li>
                <li>Puedes modificar la configuración más tarde desde la página de configuración</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={false}
          >
            <Tag className="h-4 w-4" />
            <span>Crear Proyecto</span>
          </button>
        </div>
      </form>
    </div>
  );
};