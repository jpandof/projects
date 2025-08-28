import React, { useState } from 'react';
import { Steps, Card, Form, Input, Select, Radio, Button, Typography, Space, Divider, Tooltip } from 'antd';
import { ProjectOutlined, SettingOutlined, CheckOutlined, RocketOutlined, InfoCircleOutlined, TeamOutlined, ThunderboltOutlined, BranchesOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { useProvisioner } from '../store/useProvisioner';
import { stacks } from '../data/stacks';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ProjectCreationWizardProps {
  onProjectCreated?: (projectData: any) => void;
}

export const ProjectCreationWizard: React.FC<ProjectCreationWizardProps> = ({ onProjectCreated }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const { selectedStack, setSelectedStack } = useProvisioner();

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    projectType: '',
    stack: '',
    gitFlow: 'gitflow',
    repository: '',
    branch: 'main'
  });

  const projectTypes = [
    {
      value: 'spa',
      label: 'Single Page Application (SPA)',
      description: 'Aplicación web de una sola página con interfaz interactiva',
      stacks: ['react', 'node']
    },
    {
      value: 'microservice',
      label: 'Microservicio',
      description: 'Servicio independiente con responsabilidad específica',
      stacks: ['java', 'node', 'go', 'python']
    },
    {
      value: 'api-rest',
      label: 'API REST',
      description: 'Interfaz de programación de aplicaciones RESTful',
      stacks: ['java', 'node', 'go', 'python']
    },
    {
      value: 'library',
      label: 'Librería/Componente',
      description: 'Biblioteca reutilizable de código',
      stacks: ['react', 'java', 'node', 'go', 'python']
    },
    {
      value: 'dashboard',
      label: 'Dashboard/Panel de Control',
      description: 'Interfaz de administración y visualización',
      stacks: ['react', 'python']
    },
    {
      value: 'cli',
      label: 'Herramienta CLI',
      description: 'Aplicación de línea de comandos',
      stacks: ['go', 'node', 'python']
    }
  ];

  const gitFlowOptions = [
    {
      value: 'gitflow',
      label: 'Git Flow',
      description: 'Modelo con ramas feature, develop, release y hotfix',
      icon: <BranchesOutlined />,
      detailed: 'Ideal para equipos grandes con releases planificados. Usa ramas separadas para desarrollo, features, releases y hotfixes.',
      pros: ['Estructura clara', 'Releases estables', 'Hotfixes organizados'],
      cons: ['Más complejo', 'Overhead para equipos pequeños'],
      bestFor: 'Equipos grandes, productos con releases programados',
      branches: ['main', 'develop', 'feature/*', 'release/*', 'hotfix/*']
    },
    {
      value: 'github-flow',
      label: 'GitHub Flow',
      description: 'Flujo simple con main y feature branches',
      icon: <RocketOutlined />,
      detailed: 'Flujo simple y directo. Perfecto para desarrollo continuo con despliegues frecuentes.',
      pros: ['Simple', 'Despliegues rápidos', 'Fácil de entender'],
      cons: ['Menos control', 'Requiere CI/CD maduro'],
      bestFor: 'Startups, desarrollo ágil, despliegues continuos',
      branches: ['main', 'feature/*']
    },
    {
      value: 'trunk-based',
      label: 'Trunk-based Development',
      description: 'Desarrollo directo en main con commits frecuentes',
      icon: <ThunderboltOutlined />,
      detailed: 'Desarrollo directo en la rama principal con commits muy frecuentes. Requiere disciplina y CI/CD robusto.',
      pros: ['Integración continua', 'Sin merge conflicts', 'Feedback rápido'],
      cons: ['Requiere experiencia', 'CI/CD obligatorio', 'Riesgo alto'],
      bestFor: 'Equipos experimentados, CI/CD maduro, Google/Facebook style',
      branches: ['main']
    },
    {
      value: 'gitlab-flow',
      label: 'GitLab Flow',
      description: 'Combina simplicidad con ambientes de staging y producción',
      icon: <DeploymentUnitOutlined />,
      detailed: 'Combina la simplicidad de GitHub Flow con el control de ambientes. Ideal para proyectos con múltiples entornos.',
      pros: ['Balance simplicidad/control', 'Ambientes claros', 'Flexible'],
      cons: ['Más ramas que GitHub Flow', 'Configuración inicial'],
      bestFor: 'Proyectos con staging/production, equipos medianos',
      branches: ['main', 'staging', 'production', 'feature/*']
    }
  ];

  const steps = [
    {
      title: 'Información Básica',
      icon: <ProjectOutlined />,
      description: 'Nombre y descripción del proyecto'
    },
    {
      title: 'Configuración',
      icon: <SettingOutlined />,
      description: 'Tipo de proyecto y tecnología'
    },
    {
      title: 'Git & Repositorio',
      icon: <RocketOutlined />,
      description: 'Configuración de versionado'
    },
    {
      title: 'Confirmación',
      icon: <CheckOutlined />,
      description: 'Revisar y crear proyecto'
    }
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setProjectData(prev => ({ ...prev, ...values }));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    const finalProjectData = {
      ...projectData,
      ...form.getFieldsValue(),
      id: `proj-${Date.now()}`,
      status: 'draft' as const,
      lastModified: new Date().toISOString(),
      provisions: [],
      stack: projectData.stack || form.getFieldValue('stack')
    };

    // Set the selected stack in the store
    setSelectedStack(finalProjectData.stack);
    
    onProjectCreated?.(finalProjectData);
  };

  const getAvailableProjectTypes = () => {
    if (!projectData.stack) return projectTypes;
    return projectTypes.filter(type => type.stacks.includes(projectData.stack));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <Title level={4}>Información del Proyecto</Title>
            <Paragraph type="secondary">
              Proporciona la información básica de tu proyecto
            </Paragraph>
            
            <Form form={form} layout="vertical" initialValues={projectData}>
              <Form.Item
                name="name"
                label="Nombre del Proyecto"
                rules={[
                  { required: true, message: 'El nombre es obligatorio' },
                  { min: 3, message: 'Mínimo 3 caracteres' }
                ]}
              >
                <Input 
                  placeholder="ej. E-commerce Frontend, User Management API..."
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Descripción"
                rules={[
                  { required: true, message: 'La descripción es obligatoria' },
                  { min: 10, message: 'Mínimo 10 caracteres' }
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe el propósito y funcionalidad principal del proyecto..."
                />
              </Form.Item>
            </Form>
          </Card>
        );

      case 1:
        return (
          <Card>
            <Title level={4}>Configuración Técnica</Title>
            <Paragraph type="secondary">
              Selecciona la tecnología y tipo de proyecto
            </Paragraph>

            <Form form={form} layout="vertical" initialValues={projectData}>
              <Form.Item
                name="stack"
                label="Tecnología"
                rules={[{ required: true, message: 'Selecciona una tecnología' }]}
              >
                <Radio.Group 
                  onChange={(e) => {
                    setSelectedStack(e.target.value);
                    setProjectData(prev => ({ ...prev, stack: e.target.value }));
                  }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stacks.map((stack) => (
                      <Radio.Button
                        key={stack.id}
                        value={stack.id}
                        className="h-auto p-4 text-left"
                      >
                        <div>
                          <div className="font-medium">{stack.label}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {stack.description}
                          </div>
                        </div>
                      </Radio.Button>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="projectType"
                label="Tipo de Proyecto"
                rules={[{ required: true, message: 'Selecciona un tipo de proyecto' }]}
              >
                <Select
                  placeholder="Selecciona el tipo de proyecto"
                  size="large"
                  optionLabelProp="label"
                >
                  {getAvailableProjectTypes().map((type) => (
                    <Option key={type.value} value={type.value} label={type.label}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Card>
        );

      case 2:
        return (
          <Card>
            <Title level={4}>Configuración de Git</Title>
            <Paragraph type="secondary">
              Define la estrategia de versionado y repositorio. Elige la que mejor se adapte a tu equipo y proyecto.
            </Paragraph>

            <Form form={form} layout="vertical" initialValues={projectData}>
              <Form.Item
                name="gitFlow"
                label="Estrategia de Git Flow"
                rules={[{ required: true, message: 'Selecciona una estrategia' }]}
              >
                <Radio.Group className="w-full">
                  <div className="space-y-4">
                    {gitFlowOptions.map((flow) => (
                      <Card 
                        key={flow.value}
                        size="small"
                        className="cursor-pointer transition-all hover:border-blue-400"
                      >
                        <Radio value={flow.value} className="w-full">
                          <div className="flex items-start space-x-3 ml-2">
                            <div className="mt-1">{flow.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium text-base">{flow.label}</span>
                              <Tooltip 
                                title={
                                  <div className="max-w-sm">
                                    <div className="font-medium mb-2">{flow.label}</div>
                                    <div className="mb-3">{flow.detailed}</div>
                                    <div className="mb-2">
                                      <div className="text-green-300 font-medium">✓ Ventajas:</div>
                                      <ul className="list-disc list-inside text-sm">
                                        {flow.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                                      </ul>
                                    </div>
                                    <div className="mb-2">
                                      <div className="text-red-300 font-medium">⚠ Desventajas:</div>
                                      <ul className="list-disc list-inside text-sm">
                                        {flow.cons.map((con, i) => <li key={i}>{con}</li>)}
                                      </ul>
                                    </div>
                                    <div className="mb-2">
                                      <div className="text-blue-300 font-medium">🎯 Mejor para:</div>
                                      <div className="text-sm">{flow.bestFor}</div>
                                    </div>
                                    <div>
                                      <div className="text-purple-300 font-medium">🌿 Ramas:</div>
                                      <div className="text-sm font-mono">{flow.branches.join(', ')}</div>
                                    </div>
                                  </div>
                                }
                                placement="right"
                                overlayStyle={{ maxWidth: '400px' }}
                              >
                                <InfoCircleOutlined className="text-blue-500 cursor-help" />
                              </Tooltip>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{flow.description}</div>
                            <div className="text-xs text-blue-600">
                              <strong>Mejor para:</strong> {flow.bestFor}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <strong>Ramas:</strong> {flow.branches.join(', ')}
                            </div>
                          </div>
                          </div>
                        </Radio>
                      </Card>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="repository"
                label={
                  <Space>
                    URL del Repositorio (Opcional)
                    <Tooltip title="Si proporcionas una URL, se generará automáticamente el comando de clone al final">
                      <InfoCircleOutlined style={{ color: '#1890ff' }} />
                    </Tooltip>
                  </Space>
                }
                rules={[
                  { type: 'url', message: 'Debe ser una URL válida' }
                ]}
              >
                <Input
                  placeholder="https://github.com/company/project-name"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="branch"
                label={
                  <Space>
                    Rama Principal
                    <Tooltip title="Nombre de la rama principal del repositorio (generalmente 'main' o 'master')">
                      <InfoCircleOutlined style={{ color: '#1890ff' }} />
                    </Tooltip>
                  </Space>
                }
                initialValue="main"
              >
                <Input size="large" />
              </Form.Item>
            </Form>
          </Card>
        );

      case 3:
        const finalData = { ...projectData, ...form.getFieldsValue() };
        const selectedStackInfo = stacks.find(s => s.id === finalData.stack);
        const selectedProjectType = projectTypes.find(t => t.value === finalData.projectType);
        const selectedGitFlow = gitFlowOptions.find(g => g.value === finalData.gitFlow);

        return (
          <Card>
            <Title level={4}>Confirmar Creación del Proyecto</Title>
            <Paragraph type="secondary">
              Revisa la información antes de crear el proyecto
            </Paragraph>

            <div className="space-y-4">
              <div>
                <Text strong>Nombre:</Text>
                <div className="mt-1">{finalData.name}</div>
              </div>

              <Divider />

              <div>
                <Text strong>Descripción:</Text>
                <div className="mt-1 text-gray-600">{finalData.description}</div>
              </div>

              <Divider />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text strong>Tecnología:</Text>
                  <div className="mt-1">{selectedStackInfo?.label}</div>
                </div>
                <div>
                  <Text strong>Tipo de Proyecto:</Text>
                  <div className="mt-1">{selectedProjectType?.label}</div>
                </div>
              </div>

              <Divider />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text strong>Git Flow:</Text>
                  <div className="mt-1">{selectedGitFlow?.label}</div>
                </div>
                <div>
                  <Text strong>Rama Principal:</Text>
                  <div className="mt-1">{finalData.branch}</div>
                </div>
              </div>

              {finalData.repository && (
                <>
                  <Divider />
                  <div>
                    <Text strong>Repositorio:</Text>
                    <div className="mt-1">
                      <a href={finalData.repository} target="_blank" rel="noopener noreferrer">
                        {finalData.repository}
                      </a>
                    </div>
                  </div>
                </>
              )}

              {/* Clone Command */}
              {finalData.repository && (
                <>
                  <Divider />
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Text strong className="text-white">Comando para clonar:</Text>
                      <Button 
                        size="small" 
                        onClick={() => navigator.clipboard.writeText(`git clone ${finalData.repository}`)}
                      >
                        Copiar
                      </Button>
                    </div>
                    <code className="text-green-400 font-mono text-sm">
                      git clone {finalData.repository}
                    </code>
                  </div>
                </>
              )}
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <Steps
          current={currentStep}
          items={steps}
          className="mb-8"
        />
        
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            size="large"
          >
            Anterior
          </Button>

          <div>
            {currentStep < steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleNext}
                size="large"
              >
                Siguiente
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleFinish}
                size="large"
              >
                Crear Proyecto
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};