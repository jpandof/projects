import React, { useState, useEffect } from 'react';
import { 
  mockJiraIssues, 
  mockJiraSprints, 
  mockJiraMetrics,
  mockJiraIntegrationSettings,
  JiraIssue,
  JiraSprint,
  JiraMetrics,
  JiraIntegrationSettings
} from '../data/jira';
import { 
  ExternalLink,
  Calendar,
  User,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  BarChart3,
  PieChart,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Bug,
  FileText,
  Flag,
  Zap,
  Users,
  Timer,
  Award,
  Gauge,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  MessageSquare,
  Paperclip,
  Tag,
  GitBranch,
  Layers,
  Star,
  AlertCircle,
  Info,
  Wifi,
  WifiOff
} from 'lucide-react';

interface JiraIntegrationProps {
  projectId: string;
}

export const JiraIntegration: React.FC<JiraIntegrationProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<'sprint' | 'backlog' | 'metrics' | 'velocity' | 'settings'>('sprint');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState<string>('2024-01-18T10:30:00Z');

  const settings = mockJiraIntegrationSettings[projectId];
  const metrics = mockJiraMetrics[projectId];
  const activeSprint = mockJiraSprints.find(s => s.state === 'active' && s.projectId === projectId);
  const sprintIssues = activeSprint ? mockJiraIssues.filter(issue => 
    issue.sprint?.id === activeSprint.id
  ) : [];

  const getIssueTypeIcon = (type: JiraIssue['issueType']) => {
    switch (type) {
      case 'Story':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'Task':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'Bug':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'Epic':
        return <Flag className="h-4 w-4 text-purple-500" />;
      case 'Sub-task':
        return <Layers className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: JiraIssue['status']) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Code Review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Testing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: JiraIssue['priority']) => {
    switch (priority) {
      case 'Highest':
        return <ArrowUp className="h-3 w-3 text-red-600" />;
      case 'High':
        return <ArrowUp className="h-3 w-3 text-red-500" />;
      case 'Medium':
        return <Minus className="h-3 w-3 text-yellow-500" />;
      case 'Low':
        return <ArrowDown className="h-3 w-3 text-blue-500" />;
      case 'Lowest':
        return <ArrowDown className="h-3 w-3 text-blue-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
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

  const calculateSprintProgress = () => {
    if (!activeSprint) return 0;
    const total = activeSprint.commitment;
    const completed = activeSprint.completed;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const calculateTimeRemaining = () => {
    if (!activeSprint?.endDate) return 'N/A';
    const now = new Date();
    const end = new Date(activeSprint.endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : 'Sprint ended';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const filteredIssues = sprintIssues.filter(issue => {
    const matchesSearch = issue.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesAssignee = assigneeFilter === 'all' || issue.assignee.id === assigneeFilter;
    return matchesSearch && matchesStatus && matchesAssignee;
  });

  const uniqueAssignees = Array.from(new Set(sprintIssues.map(issue => issue.assignee.id)))
    .map(id => sprintIssues.find(issue => issue.assignee.id === id)?.assignee)
    .filter(Boolean);

  const tabs = [
    { id: 'sprint', label: 'Current Sprint', icon: Play },
    { id: 'backlog', label: 'Backlog', icon: FileText },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'velocity', label: 'Velocity', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderCurrentSprint = () => {
    if (!activeSprint) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No active sprint found</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Start New Sprint
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Sprint Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{activeSprint.name}</h4>
              <p className="text-sm text-gray-500">
                {formatDate(activeSprint.startDate!)} - {formatDate(activeSprint.endDate!)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Time Remaining</div>
                <div className="font-medium text-gray-900">{calculateTimeRemaining()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="font-medium text-gray-900">{calculateSprintProgress().toFixed(0)}%</div>
              </div>
            </div>
          </div>

          {activeSprint.goal && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-800">Sprint Goal</div>
                  <p className="text-sm text-blue-700">{activeSprint.goal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sprint Progress */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{activeSprint.commitment}</div>
              <div className="text-sm text-gray-500">Committed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{activeSprint.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeSprint.velocity}</div>
              <div className="text-sm text-gray-500">Velocity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{sprintIssues.length}</div>
              <div className="text-sm text-gray-500">Issues</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Sprint Progress</span>
              <span className="text-sm font-medium text-gray-900">{calculateSprintProgress().toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${calculateSprintProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Scope Changes */}
          {activeSprint.scope && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">+{activeSprint.scope.added}</div>
                <div className="text-xs text-gray-500">Added</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">-{activeSprint.scope.removed}</div>
                <div className="text-xs text-gray-500">Removed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">{activeSprint.scope.changed}</div>
                <div className="text-xs text-gray-500">Changed</div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Code Review">Code Review</option>
                <option value="Testing">Testing</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </select>
              <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Assignees</option>
                {uniqueAssignees.map((assignee) => (
                  <option key={assignee!.id} value={assignee!.id}>
                    {assignee!.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sprint Issues */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">Sprint Issues ({filteredIssues.length})</h4>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getIssueTypeIcon(issue.issueType)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <a
                          href={`${settings?.jiraUrl}/browse/${issue.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {issue.key}
                        </a>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(issue.priority)}
                          <span className="text-xs text-gray-500">{issue.priority}</span>
                        </div>
                        {issue.storyPoints && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                            {issue.storyPoints} SP
                          </span>
                        )}
                      </div>
                      <h5 className="font-medium text-gray-900 mb-2">{issue.summary}</h5>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{issue.assignee.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {formatDate(issue.updated)}</span>
                        </div>
                        {issue.timeSpent && issue.originalEstimate && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{issue.timeSpent}h / {issue.originalEstimate}h</span>
                          </div>
                        )}
                        {issue.comments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{issue.comments.length}</span>
                          </div>
                        )}
                        {issue.attachments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="h-3 w-3" />
                            <span>{issue.attachments.length}</span>
                          </div>
                        )}
                      </div>
                      {issue.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {issue.labels.map((label) => (
                            <span key={label} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <a
                      href={`${settings?.jiraUrl}/browse/${issue.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMetrics = () => {
    if (!metrics) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No metrics data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Timer className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Cycle Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.cycleTime.average} days</div>
            <div className="text-sm text-gray-500">P95: {metrics.cycleTime.p95} days</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Throughput</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.throughput.storyPointsPerSprint}</div>
            <div className="text-sm text-gray-500">Story points/sprint</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Bug className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Bug Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{(metrics.quality.bugRate * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-500">Bugs per story</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Team Health</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.teamHealth.sprintGoalSuccess}%</div>
            <div className="text-sm text-gray-500">Goal success rate</div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Quality Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Bug Rate</div>
              <div className="text-lg font-bold text-gray-900">{(metrics.quality.bugRate * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Escape Rate</div>
              <div className="text-lg font-bold text-gray-900">{(metrics.quality.escapeRate * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Rework Rate</div>
              <div className="text-lg font-bold text-gray-900">{(metrics.quality.reworkRate * 100).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Defect Density</div>
              <div className="text-lg font-bold text-gray-900">{metrics.quality.defectDensity.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Team Workload */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Team Workload Distribution</h4>
          <div className="space-y-3">
            {Object.entries(metrics.teamHealth.workloadDistribution).map(([name, points]) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(points / Math.max(...Object.values(metrics.teamHealth.workloadDistribution))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cycle Time by Issue Type */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Cycle Time by Issue Type</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(metrics.cycleTime.byIssueType).map(([type, time]) => (
              <div key={type} className="text-center">
                <div className="text-lg font-bold text-gray-900">{time} days</div>
                <div className="text-sm text-gray-500">{type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderVelocity = () => {
    if (!metrics) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No velocity data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Velocity Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Velocity Trends</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{metrics.velocity.current}</div>
              <div className="text-sm text-gray-500">Current Velocity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{metrics.velocity.average}</div>
              <div className="text-sm text-gray-500">Average Velocity</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-1 ${getTrendColor(metrics.velocity.trend)}`}>
                {formatTrend(metrics.velocity.trend)}
              </div>
              <div className="text-sm text-gray-500">Trend</div>
            </div>
          </div>
        </div>

        {/* Velocity History */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Sprint History</h4>
          <div className="space-y-3">
            {metrics.velocity.history.map((sprint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{sprint.sprintName}</div>
                  <div className="text-sm text-gray-500">
                    Committed: {sprint.commitment} • Completed: {sprint.completed}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{sprint.velocity}</div>
                  <div className="text-xs text-gray-500">Velocity</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Burndown Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Burndown Chart</h4>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Burndown chart visualization would go here</p>
              <p className="text-sm text-gray-400">Shows ideal vs actual progress</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    if (!settings) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">JIRA integration not configured</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Configure JIRA Integration
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Connection Status</h4>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">Disconnected</span>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">JIRA URL</div>
              <div className="font-medium text-gray-900">{settings.jiraUrl}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Project Key</div>
              <div className="font-medium text-gray-900">{settings.projectKey}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Last Sync</div>
              <div className="font-medium text-gray-900">{formatDateTime(lastSync)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Sync Interval</div>
              <div className="font-medium text-gray-900">{settings.syncSettings.syncInterval} minutes</div>
            </div>
          </div>
        </div>

        {/* Sync Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Sync Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Auto Sync</div>
                <div className="text-sm text-gray-500">Automatically sync data from JIRA</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.syncSettings.autoSync} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Sync Issues</div>
                <div className="text-sm text-gray-500">Import issues and their details</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.syncSettings.syncIssues} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Sync Sprints</div>
                <div className="text-sm text-gray-500">Import sprint data and progress</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.syncSettings.syncSprints} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Sync Metrics</div>
                <div className="text-sm text-gray-500">Calculate and import velocity metrics</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.syncSettings.syncMetrics} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Notifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center">
              <input type="checkbox" checked={settings.notifications.sprintStart} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Sprint start notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={settings.notifications.sprintEnd} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Sprint end notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={settings.notifications.blockers} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Blocker alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={settings.notifications.velocityChanges} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Velocity change alerts</span>
            </label>
          </div>
        </div>

        {/* Test Connection */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Connection Test</h4>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Test Connection
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Sync Now
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Reset Configuration
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sprint':
        return renderCurrentSprint();
      case 'backlog':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Backlog view coming soon</p>
            <p className="text-sm text-gray-400">Will show product backlog with prioritization</p>
          </div>
        );
      case 'metrics':
        return renderMetrics();
      case 'velocity':
        return renderVelocity();
      case 'settings':
        return renderSettings();
      default:
        return renderCurrentSprint();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ExternalLink className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">JIRA Integration</h3>
              <p className="text-sm text-gray-500">
                {settings ? `Connected to ${settings.projectKey}` : 'Not configured'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  <Wifi className="h-3 w-3" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                  <WifiOff className="h-3 w-3" />
                  <span>Disconnected</span>
                </div>
              )}
              <span className="text-xs text-gray-500">
                Last sync: {formatDateTime(lastSync)}
              </span>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            {settings?.jiraUrl && (
              <a
                href={`${settings.jiraUrl}/secure/RapidBoard.jspa?rapidView=${settings.boardId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Open in JIRA</span>
              </a>
            )}
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
    </div>
  );
};