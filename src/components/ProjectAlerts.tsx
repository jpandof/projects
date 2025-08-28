import React, { useState } from 'react';
import { mockAlerts, Alert } from '../data/teams';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter,
  Search,
  Bell,
  BellOff,
  Settings,
  Eye,
  EyeOff,
  Zap,
  Server,
  Shield,
  Activity
} from 'lucide-react';

interface ProjectAlertsProps {
  projectId: string;
}

export const ProjectAlerts: React.FC<ProjectAlertsProps> = ({ projectId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const alerts = mockAlerts.filter(alert => alert.projectId === projectId);

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
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

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'performance':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'deployment':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'security':
        return <Shield className="h-4 w-4 text-purple-500" />;
      case 'resource':
        return <Server className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'resolved' && alert.resolved) ||
                         (statusFilter === 'active' && !alert.resolved);
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const handleResolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
    // Implement resolve logic
  };

  const handleSnoozeAlert = (alertId: string) => {
    console.log('Snoozing alert:', alertId);
    // Implement snooze logic
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium text-gray-900">Alerts & Notifications</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {filteredAlerts.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
              <Settings className="h-3 w-3" />
              <span>Configure</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
              <BellOff className="h-3 w-3" />
              <span>Mute All</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="performance">Performance</option>
            <option value="error">Error</option>
            <option value="deployment">Deployment</option>
            <option value="security">Security</option>
            <option value="resource">Resource</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="divide-y divide-gray-100">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No alerts found matching your criteria</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-6 hover:bg-gray-50 transition-colors ${alert.resolved ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {getTypeIcon(alert.type)}
                        <span>{alert.type}</span>
                      </div>
                      {alert.environment && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {alert.environment}
                        </span>
                      )}
                      {alert.resolved && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{formatTime(alert.timestamp)}</span>
                      {alert.resolved && alert.resolvedBy && (
                        <span>Resolved by {alert.resolvedBy} at {formatTime(alert.resolvedAt!)}</span>
                      )}
                    </div>
                    {alert.metadata && selectedAlert === alert.id && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Details:</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(alert.metadata).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-500">{key}:</span>
                              <span className="ml-1 font-mono text-gray-900">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View details"
                  >
                    {selectedAlert === alert.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {!alert.resolved && (
                    <>
                      <button
                        onClick={() => handleSnoozeAlert(alert.id)}
                        className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                        title="Snooze alert"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as resolved"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};