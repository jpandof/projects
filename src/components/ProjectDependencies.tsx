import React, { useState } from 'react';
import { 
  mockDependencies, 
  mockProjectRelationships, 
  mockAPIDefinitions,
  mockChangeNotifications,
  Dependency,
  ProjectRelationship,
  APIDefinition,
  APIEndpoint,
  ChangeNotification
} from '../data/dependencies';
import { mockProjects } from '../data/projects';
import { 
  Package, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  Download,
  Bell,
  BellOff,
  Eye,
  Code,
  Globe,
  Shield,
  Zap,
  Users,
  FileText,
  GitBranch,
  Tag,
  Calendar,
  User,
  Settings,
  Link as LinkIcon,
  Database,
  Server,
  Webhook,
  MessageSquare,
  AlertCircle,
  Info,
  XCircle,
  Send,
  Check,
  X,
  BookOpen,
  Copy,
  Play
} from 'lucide-react';

interface ProjectDependenciesProps {
  projectId: string;
}

export const ProjectDependencies: React.FC<ProjectDependenciesProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<'dependencies' | 'relationships' | 'api' | 'notifications'>('dependencies');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showOutdatedOnly, setShowOutdatedOnly] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const project = mockProjects.find(p => p.id === projectId);
  const dependencies = mockDependencies[projectId] || [];
  const relationships = mockProjectRelationships.filter(rel => 
    rel.projectId === projectId || rel.relatedProjectId === projectId
  );
  const apiDefinition = mockAPIDefinitions[projectId];
  const notifications = mockChangeNotifications.filter(notif => 
    notif.toProjectId === projectId || notif.fromProjectId === projectId
  );

  const isAPIProject = project?.stack === 'java' || project?.stack === 'node' || 
                      project?.stack === 'go' || project?.stack === 'python';

  const getTypeIcon = (type: Dependency['type']) => {
    switch (type) {
      case 'direct':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'dev':
        return <Code className="h-4 w-4 text-purple-500" />;
      case 'peer':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'optional':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: Dependency['category']) => {
    switch (category) {
      case 'framework':
        return <Zap className="h-4 w-4 text-orange-500" />;
      case 'library':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'tool':
        return <Settings className="h-4 w-4 text-gray-500" />;
      case 'testing':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'build':
        return <GitBranch className="h-4 w-4 text-purple-500" />;
      case 'runtime':
        return <Server className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRelationshipIcon = (type: ProjectRelationship['type']) => {
    switch (type) {
      case 'consumes':
        return <ArrowRight className="h-4 w-4 text-blue-500" />;
      case 'provides':
        return <ArrowLeft className="h-4 w-4 text-green-500" />;
      case 'depends_on':
        return <LinkIcon className="h-4 w-4 text-purple-500" />;
      case 'used_by':
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <LinkIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'deprecated':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'beta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'breaking_change':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCriticalityColor = (criticality: ProjectRelationship['criticality']) => {
    switch (criticality) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: ChangeNotification['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getMethodColor = (method: APIEndpoint['method']) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'POST':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PATCH':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredDependencies = dependencies.filter(dep => {
    const matchesSearch = dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dep.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || dep.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || dep.category === categoryFilter;
    const matchesOutdated = !showOutdatedOnly || dep.outdated;
    return matchesSearch && matchesType && matchesCategory && matchesOutdated;
  });

  const handleAcknowledgeNotification = (notificationId: string) => {
    console.log('Acknowledging notification:', notificationId);
    // Implement acknowledge logic
  };

  const handleSendNotification = (targetProjectId: string, message: string) => {
    console.log('Sending notification to:', targetProjectId, message);
    setShowNotificationModal(false);
    // Implement send notification logic
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tabs = [
    { id: 'dependencies', label: 'Dependencies', icon: Package },
    { id: 'relationships', label: 'Project Relations', icon: LinkIcon },
    ...(isAPIProject ? [{ id: 'api', label: 'API Definition', icon: Globe }] : []),
    { id: 'notifications', label: 'Change Notifications', icon: Bell }
  ];

  const renderDependencies = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Total Dependencies</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{dependencies.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Outdated</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {dependencies.filter(d => d.outdated).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Vulnerabilities</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {dependencies.reduce((sum, d) => sum + d.vulnerabilities, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Code className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Dev Dependencies</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {dependencies.filter(d => d.type === 'dev').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search dependencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="direct">Direct</option>
              <option value="dev">Dev</option>
              <option value="peer">Peer</option>
              <option value="optional">Optional</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="framework">Framework</option>
              <option value="library">Library</option>
              <option value="tool">Tool</option>
              <option value="testing">Testing</option>
              <option value="build">Build</option>
              <option value="runtime">Runtime</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOutdatedOnly}
                onChange={(e) => setShowOutdatedOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Outdated only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Dependencies List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Dependencies ({filteredDependencies.length})</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredDependencies.map((dependency) => (
            <div key={dependency.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getCategoryIcon(dependency.category)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900">{dependency.name}</h5>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono">
                        v{dependency.version}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${
                        dependency.type === 'direct' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        dependency.type === 'dev' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {dependency.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${
                        dependency.category === 'framework' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                        dependency.category === 'library' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {dependency.category}
                      </span>
                      {dependency.outdated && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded border border-yellow-200">
                          Update available: v{dependency.latestVersion}
                        </span>
                      )}
                      {dependency.vulnerabilities > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded border border-red-200">
                          {dependency.vulnerabilities} vulnerabilities
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{dependency.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>License: {dependency.license}</span>
                      {dependency.size && <span>Size: {dependency.size}</span>}
                      <span>Updated: {formatDate(dependency.lastUpdated)}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium">Used in:</span> {dependency.usedBy.join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {dependency.homepage && (
                    <a
                      href={dependency.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Visit homepage"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                  {dependency.repository && (
                    <a
                      href={dependency.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View repository"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {dependency.outdated && (
                    <button
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Update dependency"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRelationships = () => (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ArrowRight className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Consumes</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {relationships.filter(r => r.type === 'consumes').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ArrowLeft className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Provides</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {relationships.filter(r => r.type === 'provides').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Used By</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {relationships.filter(r => r.type === 'used_by').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Critical</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {relationships.filter(r => r.criticality === 'critical').length}
          </div>
        </div>
      </div>

      {/* Relationships List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Project Relationships</h4>
            <button
              onClick={() => setShowNotificationModal(true)}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
            >
              <Send className="h-3 w-3" />
              <span>Notify Changes</span>
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {relationships.map((relationship) => (
            <div key={relationship.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getRelationshipIcon(relationship.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900">{relationship.relatedProjectName}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(relationship.status)}`}>
                        {relationship.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getCriticalityColor(relationship.criticality)}`}>
                        {relationship.criticality}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${
                        relationship.type === 'consumes' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        relationship.type === 'provides' ? 'bg-green-100 text-green-800 border-green-200' :
                        relationship.type === 'used_by' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                        'bg-purple-100 text-purple-800 border-purple-200'
                      }`}>
                        {relationship.type.replace('_', ' ')}
                      </span>
                      {relationship.endpoint && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono">
                          {relationship.endpoint}
                        </span>
                      )}
                      {relationship.version && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {relationship.version}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Last interaction: {formatDateTime(relationship.lastInteraction)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View details">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Send notification">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAPIDefinition = () => {
    if (!apiDefinition) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No API definition available for this project</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate API Documentation
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* API Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{apiDefinition.name}</h4>
              <p className="text-sm text-gray-500">{apiDefinition.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(apiDefinition.status)}`}>
                {apiDefinition.status}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {apiDefinition.type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Base URL</div>
              <div className="font-mono text-sm text-gray-900">{apiDefinition.baseUrl}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Version</div>
              <div className="font-mono text-sm text-gray-900">{apiDefinition.version}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Consumers</div>
              <div className="text-sm text-gray-900">{apiDefinition.consumers.length} projects</div>
            </div>
          </div>

          {/* Authentication */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Authentication</span>
            </div>
            <div className="text-sm text-blue-700">
              Type: {apiDefinition.authentication.type}
              {apiDefinition.authentication.description && (
                <span className="ml-2">• {apiDefinition.authentication.description}</span>
              )}
            </div>
          </div>

          {/* Documentation Links */}
          <div className="flex items-center space-x-4">
            {apiDefinition.documentation.swagger && (
              <a
                href={apiDefinition.documentation.swagger}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
              >
                <BookOpen className="h-3 w-3" />
                <span>Swagger UI</span>
              </a>
            )}
            {apiDefinition.documentation.postman && (
              <a
                href={apiDefinition.documentation.postman}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Postman</span>
              </a>
            )}
            {apiDefinition.documentation.readme && (
              <a
                href={apiDefinition.documentation.readme}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-3 w-3" />
                <span>README</span>
              </a>
            )}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">API Endpoints ({apiDefinition.endpoints.length})</h4>
          </div>
          <div className="divide-y divide-gray-100">
            {apiDefinition.endpoints.map((endpoint) => (
              <div key={endpoint.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="font-mono text-sm text-gray-900">{endpoint.path}</code>
                        {endpoint.deprecated && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded border border-red-200">
                            Deprecated
                          </span>
                        )}
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1">{endpoint.summary}</h5>
                      <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {endpoint.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint.id ? null : endpoint.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(`${endpoint.method} ${apiDefinition.baseUrl}${endpoint.path}`)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Copy endpoint"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Endpoint Details */}
                {selectedEndpoint === endpoint.id && (
                  <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Parameters */}
                      <div>
                        <h6 className="font-medium text-gray-900 mb-2">Parameters</h6>
                        {endpoint.parameters.length > 0 ? (
                          <div className="space-y-2">
                            {endpoint.parameters.map((param, index) => (
                              <div key={index} className="bg-white border border-gray-200 rounded p-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-mono text-sm text-gray-900">{param.name}</span>
                                  <span className={`px-1 py-0.5 text-xs rounded ${
                                    param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {param.required ? 'required' : 'optional'}
                                  </span>
                                  <span className="px-1 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                                    {param.in}
                                  </span>
                                  <span className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                    {param.type}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600">{param.description}</p>
                                {param.example && (
                                  <div className="mt-1">
                                    <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                                      Example: {JSON.stringify(param.example)}
                                    </code>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No parameters</p>
                        )}
                      </div>

                      {/* Responses */}
                      <div>
                        <h6 className="font-medium text-gray-900 mb-2">Responses</h6>
                        <div className="space-y-2">
                          {endpoint.responses.map((response, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded p-2">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  response.status >= 200 && response.status < 300 ? 'bg-green-100 text-green-800' :
                                  response.status >= 400 ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {response.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mb-1">{response.description}</p>
                              {response.example && (
                                <details className="text-xs">
                                  <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                                    View example
                                  </summary>
                                  <pre className="mt-1 p-2 bg-gray-100 rounded text-gray-700 overflow-x-auto">
                                    {JSON.stringify(response.example, null, 2)}
                                  </pre>
                                </details>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Consumer Projects */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Consumer Projects</h4>
          <div className="space-y-3">
            {apiDefinition.consumers.map((consumerId) => {
              const consumerProject = mockProjects.find(p => p.id === consumerId);
              const relationship = relationships.find(r => r.relatedProjectId === consumerId);
              
              return consumerProject ? (
                <div key={consumerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Server className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{consumerProject.name}</div>
                      <div className="text-sm text-gray-500">
                        {relationship?.endpoint} • Last used: {relationship ? formatDateTime(relationship.lastInteraction) : 'Unknown'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {relationship && (
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getCriticalityColor(relationship.criticality)}`}>
                        {relationship.criticality}
                      </span>
                    )}
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Breaking Changes */}
        {apiDefinition.breaking_changes.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="font-medium text-gray-900 mb-4">Upcoming Breaking Changes</h4>
            <div className="space-y-4">
              {apiDefinition.breaking_changes.map((change) => (
                <div key={change.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-red-900">{change.title}</h5>
                        <p className="text-sm text-red-700 mb-2">{change.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-red-600">
                          <span>Version: {change.version}</span>
                          <span>Date: {formatDate(change.date)}</span>
                          <span>Impact: {change.impact}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${
                      change.impact === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                      change.impact === 'high' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {change.impact}
                    </span>
                  </div>
                  
                  <div className="bg-white border border-red-200 rounded p-3 mb-3">
                    <h6 className="text-sm font-medium text-gray-900 mb-1">Migration Guide</h6>
                    <p className="text-sm text-gray-700">{change.migration}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-red-600">
                      Affected endpoints: {change.affectedEndpoints.join(', ')}
                    </div>
                    <div className="text-xs text-red-600">
                      Notified: {change.notifiedProjects.length} projects
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Total</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Critical</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {notifications.filter(n => n.severity === 'critical').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {notifications.filter(n => !n.acknowledged).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Action Required</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {notifications.filter(n => n.actionRequired).length}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Change Notifications</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div key={notification.id} className={`p-4 ${!notification.acknowledged ? 'bg-blue-50' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getSeverityIcon(notification.severity)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900">{notification.title}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${
                        notification.type === 'breaking_change' ? 'bg-red-100 text-red-800 border-red-200' :
                        notification.type === 'deprecation' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                        notification.type === 'new_version' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {notification.type.replace('_', ' ')}
                      </span>
                      {notification.actionRequired && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded border border-yellow-200">
                          Action Required
                        </span>
                      )}
                      {!notification.acknowledged && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border border-blue-200">
                          Unread
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>From: {notification.fromProjectName}</span>
                      <span>Date: {formatDateTime(notification.timestamp)}</span>
                      {notification.deadline && (
                        <span className="text-red-600">Deadline: {formatDate(notification.deadline)}</span>
                      )}
                    </div>
                    {notification.acknowledged && (
                      <div className="mt-2 text-xs text-green-600">
                        Acknowledged by {notification.acknowledgedBy} on {formatDateTime(notification.acknowledgedAt!)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.acknowledged && (
                    <button
                      onClick={() => handleAcknowledgeNotification(notification.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                    >
                      <Check className="h-3 w-3" />
                      <span>Acknowledge</span>
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dependencies':
        return renderDependencies();
      case 'relationships':
        return renderRelationships();
      case 'api':
        return renderAPIDefinition();
      case 'notifications':
        return renderNotifications();
      default:
        return renderDependencies();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">Dependencies & Integrations</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {dependencies.length} dependencies
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Sync Dependencies</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
              <Download className="h-3 w-3" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Send Change Notification</h3>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Project
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  {relationships.filter(r => r.type === 'used_by').map((rel) => (
                    <option key={rel.relatedProjectId} value={rel.relatedProjectId}>
                      {rel.relatedProjectName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="breaking_change">Breaking Change</option>
                  <option value="deprecation">Deprecation</option>
                  <option value="new_version">New Version</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the change and its impact..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSendNotification('target-project', 'message')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};