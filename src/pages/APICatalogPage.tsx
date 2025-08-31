import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { NotificationCenter } from '../components/NotificationCenter';
import { mockAPIs, apiDomains, APIService, APIDomain } from '../data/apis';
import {
  Globe,
  Search,
  Filter,
  ArrowLeft,
  BookOpen,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  Zap,
  Database,
  Code,
  User,
  BarChart3,
  Wifi
} from 'lucide-react';

export const APICatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'consumers' | 'uptime' | 'responseTime'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAPIs = useMemo(() => {
    const filtered = mockAPIs.filter(api => {
      const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           api.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           api.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDomain = selectedDomain === 'all' || api.domain === selectedDomain;
      const matchesStatus = statusFilter === 'all' || api.status === statusFilter;
      const matchesType = typeFilter === 'all' || api.type === typeFilter;
      return matchesSearch && matchesDomain && matchesStatus && matchesType;
    });

    // Sort APIs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'consumers':
          return b.consumers - a.consumers;
        case 'uptime':
          return b.uptime - a.uptime;
        case 'responseTime':
          return a.responseTime - b.responseTime;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedDomain, statusFilter, typeFilter, sortBy]);

  const groupedAPIs = useMemo(() => {
    const grouped: Record<string, APIService[]> = {};
    
    if (selectedDomain === 'all') {
      // Group by domain
      filteredAPIs.forEach(api => {
        if (!grouped[api.domain]) {
          grouped[api.domain] = [];
        }
        grouped[api.domain].push(api);
      });
    } else {
      // Group by subdomain within selected domain
      filteredAPIs.forEach(api => {
        const key = api.subdomain || 'other';
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(api);
      });
    }
    
    return grouped;
  }, [filteredAPIs, selectedDomain]);


  const getStatusColor = (status: APIService['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'deprecated':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'beta':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: APIService['type']) => {
    switch (type) {
      case 'REST':
        return <Globe className="h-4 w-4 text-blue-500" />;
      case 'GraphQL':
        return <Database className="h-4 w-4 text-purple-500" />;
      case 'gRPC':
        return <Zap className="h-4 w-4 text-green-500" />;
      case 'WebSocket':
        return <Wifi className="h-4 w-4 text-orange-500" />;
      default:
        return <Code className="h-4 w-4 text-gray-400" />;
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return 'text-green-600';
    if (uptime >= 99.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime <= 100) return 'text-green-600';
    if (responseTime <= 300) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };


  const getDomainInfo = (domainId: string): APIDomain | undefined => {
    return apiDomains.find(d => d.id === domainId);
  };

  const renderAPICard = (api: APIService) => (
    <div key={api.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`w-12 h-12 ${api.color || 'bg-gray-500'} rounded-lg flex items-center justify-center text-white text-xl`}>
              {api.icon || '🔧'}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {api.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(api.status)}`}>
                  {api.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{api.description}</p>
              <div className="flex items-center space-x-2">
                {getTypeIcon(api.type)}
                <span className="text-sm font-medium text-gray-700">{api.type}</span>
                <span className="text-sm text-gray-500">v{api.version}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{api.consumers}</div>
            <div className="text-xs text-gray-500">Consumers</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getUptimeColor(api.uptime)}`}>
              {api.uptime}%
            </div>
            <div className="text-xs text-gray-500">Uptime</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getResponseTimeColor(api.responseTime)}`}>
              {api.responseTime}ms
            </div>
            <div className="text-xs text-gray-500">Response</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(api.requestsPerDay)}
            </div>
            <div className="text-xs text-gray-500">Req/day</div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {api.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {tag}
              </span>
            ))}
            {api.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded">
                +{api.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Owner & Team */}
        <div className="mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1 mb-1">
            <User className="h-3 w-3" />
            <span>{api.owner}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{api.team}</span>
          </div>
        </div>

        {/* Warnings */}
        {api.breaking_changes > 0 && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-1 text-red-700">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs font-medium">
                {api.breaking_changes} breaking change{api.breaking_changes > 1 ? 's' : ''} planned
              </span>
            </div>
          </div>
        )}
        {api.status === 'deprecated' && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-1 text-red-700">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs font-medium">This API is deprecated</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {api.documentation && (
            <a
              href={api.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              title="View documentation"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
          {api.swagger && (
            <a
              href={api.swagger}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              title="Open Swagger UI"
            >
              <Code className="h-4 w-4" />
            </a>
          )}
          <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAPIList = (api: APIService) => (
    <div key={api.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`w-10 h-10 ${api.color || 'bg-gray-500'} rounded-lg flex items-center justify-center text-white`}>
              {api.icon || '🔧'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-gray-900">{api.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(api.status)}`}>
                  {api.status}
                </span>
                <div className="flex items-center space-x-1">
                  {getTypeIcon(api.type)}
                  <span className="text-xs text-gray-500">{api.type}</span>
                </div>
                <span className="text-xs text-gray-500">v{api.version}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{api.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{api.consumers} consumers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-3 w-3" />
                  <span className={getUptimeColor(api.uptime)}>{api.uptime}% uptime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3" />
                  <span className={getResponseTimeColor(api.responseTime)}>{api.responseTime}ms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-3 w-3" />
                  <span>{formatNumber(api.requestsPerDay)} req/day</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {api.documentation && (
              <a
                href={api.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Documentation"
              >
                <BookOpen className="h-4 w-4" />
              </a>
            )}
            {api.swagger && (
              <a
                href={api.swagger}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                title="Swagger UI"
              >
                <Code className="h-4 w-4" />
              </a>
            )}
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDomainSection = (domainId: string, apis: APIService[]) => {
    const domain = getDomainInfo(domainId);
    const isSubdomain = selectedDomain !== 'all';
    
    return (
      <div key={domainId} className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          {domain && (
            <div className={`w-8 h-8 ${domain.color} rounded-lg flex items-center justify-center text-white`}>
              {domain.icon}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isSubdomain ? domainId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : domain?.name || domainId}
            </h2>
            {domain && !isSubdomain && (
              <p className="text-sm text-gray-600">{domain.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {apis.length} API{apis.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {apis.map(api => viewMode === 'grid' ? renderAPICard(api) : renderAPIList(api))}
        </div>
      </div>
    );
  };

  const totalAPIs = mockAPIs.length;
  const activeAPIs = mockAPIs.filter(api => api.status === 'active').length;
  const deprecatedAPIs = mockAPIs.filter(api => api.status === 'deprecated').length;
  const avgUptime = mockAPIs.reduce((sum, api) => sum + api.uptime, 0) / mockAPIs.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">API Catalog</h1>
                  <p className="text-sm text-gray-500">Discover and explore banking APIs</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right text-sm">
                <div className="font-medium text-gray-900">{totalAPIs} APIs</div>
                <div className="text-gray-500">{activeAPIs} active</div>
              </div>
              <NotificationCenter />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Total APIs</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalAPIs}</div>
            <div className="text-sm text-gray-500">{activeAPIs} active, {deprecatedAPIs} deprecated</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Avg Uptime</span>
            </div>
            <div className={`text-3xl font-bold ${getUptimeColor(avgUptime)}`}>
              {avgUptime.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Total Consumers</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {mockAPIs.reduce((sum, api) => sum + api.consumers, 0)}
            </div>
            <div className="text-sm text-gray-500">Active integrations</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="h-5 w-5 text-cyan-500" />
              <span className="text-sm font-medium text-gray-700">Daily Requests</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatNumber(mockAPIs.reduce((sum, api) => sum + api.requestsPerDay, 0))}
            </div>
            <div className="text-sm text-gray-500">Across all APIs</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search APIs, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Domains</option>
                  {apiDomains.map((domain) => (
                    <option key={domain.id} value={domain.id}>
                      {domain.icon} {domain.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="beta">Beta</option>
                <option value="maintenance">Maintenance</option>
                <option value="deprecated">Deprecated</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="REST">REST</option>
                <option value="GraphQL">GraphQL</option>
                <option value="gRPC">gRPC</option>
                <option value="WebSocket">WebSocket</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'consumers' | 'uptime' | 'responseTime')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="consumers">Sort by Consumers</option>
                <option value="uptime">Sort by Uptime</option>
                <option value="responseTime">Sort by Response Time</option>
              </select>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <div className="space-y-1 w-4 h-4">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Quick Navigation */}
        {selectedDomain === 'all' && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Browse by Domain</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {apiDomains.map((domain) => {
                const domainAPIs = mockAPIs.filter(api => api.domain === domain.id);
                return (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <div className={`w-10 h-10 ${domain.color} rounded-lg flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform`}>
                      {domain.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {domain.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {domainAPIs.length} API{domainAPIs.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* APIs Content */}
        {filteredAPIs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No APIs found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedDomain !== 'all' || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No APIs are currently available in the catalog'
              }
            </p>
            {(searchTerm || selectedDomain !== 'all' || statusFilter !== 'all' || typeFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDomain('all');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedAPIs).map(([groupKey, apis]) => 
              renderDomainSection(groupKey, apis)
            )}
          </div>
        )}

        {/* Selected Domain Info */}
        {selectedDomain !== 'all' && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getDomainInfo(selectedDomain) && (
                  <div className={`w-8 h-8 ${getDomainInfo(selectedDomain)!.color} rounded-lg flex items-center justify-center text-white`}>
                    {getDomainInfo(selectedDomain)!.icon}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {getDomainInfo(selectedDomain)?.name || selectedDomain}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getDomainInfo(selectedDomain)?.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDomain('all')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View All Domains
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
