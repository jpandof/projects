import React, { useState, useEffect } from 'react';
import { 
  mockCodeReviewAnalyses, 
  mockAIReviewSettings,
  CodeReviewAnalysis, 
  CodeReviewSuggestion,
  AIReviewSettings
} from '../data/codeReview';
import { 
  Bot, 
  Brain, 
  Shield, 
  Zap, 
  Code, 
  Bug, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Target,
  FileText,
  GitMerge,
  User,
  Calendar,
  Lightbulb,
  Wrench,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink
} from 'lucide-react';

interface AICodeReviewProps {
  projectId: string;
}

export const AICodeReview: React.FC<AICodeReviewProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'suggestions' | 'settings'>('reviews');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showSettings, setShowSettings] = useState(false);

  const reviews = mockCodeReviewAnalyses.filter(review => review.projectId === projectId);
  const settings = mockAIReviewSettings[projectId];
  const latestReview = reviews[0];

  const getSeverityIcon = (severity: CodeReviewSuggestion['severity']) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: CodeReviewSuggestion['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: CodeReviewSuggestion['type']) => {
    switch (type) {
      case 'security':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'performance':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'maintainability':
        return <Code className="h-4 w-4 text-blue-500" />;
      case 'best-practice':
        return <Star className="h-4 w-4 text-purple-500" />;
      case 'bug':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'style':
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <Code className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: CodeReviewAnalysis['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'analyzing':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleApplySuggestion = (suggestionId: string) => {
    console.log('Applying suggestion:', suggestionId);
    // Implement auto-fix logic
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    console.log('Dismissing suggestion:', suggestionId);
    // Implement dismiss logic
  };

  const filteredSuggestions = latestReview?.suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.file.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || suggestion.severity === severityFilter;
    const matchesType = typeFilter === 'all' || suggestion.type === typeFilter;
    return matchesSearch && matchesSeverity && matchesType;
  }) || [];

  const tabs = [
    { id: 'reviews', label: 'Reviews', icon: Bot },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderReviews = () => (
    <div className="space-y-6">
      {/* AI Review Status */}
      {settings && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">AI Code Review Assistant</h4>
                <p className="text-sm text-gray-600">
                  {settings.enabled ? 'Active' : 'Disabled'} • Model: {settings.aiModel} • Min Confidence: {settings.minConfidence}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                settings.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {settings.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Latest Review Summary */}
      {latestReview && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(latestReview.status)}
              <div>
                <h4 className="font-medium text-gray-900">Latest Review</h4>
                <p className="text-sm text-gray-500">
                  {formatDate(latestReview.createdAt)} • {latestReview.filesAnalyzed} files • {latestReview.linesAnalyzed} lines
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{latestReview.overallScore}/100</div>
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
          </div>

          {latestReview.status === 'completed' && (
            <>
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{latestReview.metrics.security}</div>
                  <div className="text-xs text-gray-500">Security</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{latestReview.metrics.performance}</div>
                  <div className="text-xs text-gray-500">Performance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{latestReview.metrics.maintainability}</div>
                  <div className="text-xs text-gray-500">Maintainability</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{latestReview.metrics.testCoverage}</div>
                  <div className="text-xs text-gray-500">Test Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{latestReview.metrics.complexity}</div>
                  <div className="text-xs text-gray-500">Complexity</div>
                </div>
              </div>

              {/* Suggestions Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">Critical</span>
                  </div>
                  <div className="text-lg font-bold text-red-900">
                    {latestReview.suggestions.filter(s => s.severity === 'critical').length}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">High</span>
                  </div>
                  <div className="text-lg font-bold text-orange-900">
                    {latestReview.suggestions.filter(s => s.severity === 'high').length}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">Medium</span>
                  </div>
                  <div className="text-lg font-bold text-yellow-900">
                    {latestReview.suggestions.filter(s => s.severity === 'medium').length}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Low</span>
                  </div>
                  <div className="text-lg font-bold text-blue-900">
                    {latestReview.suggestions.filter(s => s.severity === 'low').length}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Review History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="font-medium text-gray-900 mb-4">Review History</h4>
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(review.status)}
                <div>
                  <div className="font-medium text-gray-900">
                    Review #{review.id.split('-')[1]}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(review.createdAt)} • {review.filesAnalyzed} files
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {review.status === 'completed' && (
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{review.overallScore}/100</div>
                    <div className="text-xs text-gray-500">{review.suggestions.length} suggestions</div>
                  </div>
                )}
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suggestions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
              <option value="maintainability">Maintainability</option>
              <option value="best-practice">Best Practice</option>
              <option value="bug">Bug</option>
              <option value="style">Style</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-lg shadow-sm border p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                {getTypeIcon(suggestion.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(suggestion.severity)}`}>
                      {suggestion.severity}
                    </span>
                    {suggestion.stackSpecific && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Stack Specific
                      </span>
                    )}
                    {suggestion.autoFixable && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Auto-fixable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{suggestion.file}:{suggestion.line}</span>
                    <span>Confidence: {suggestion.confidence}%</span>
                    <div className="flex items-center space-x-1">
                      {suggestion.tags.map((tag) => (
                        <span key={tag} className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{suggestion.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700">Current Code</span>
                  <button
                    onClick={() => copyToClipboard(suggestion.originalCode)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
                <pre className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm overflow-x-auto">
                  <code className="text-red-800">{suggestion.originalCode}</code>
                </pre>
              </div>
              {suggestion.suggestedCode && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">Suggested Code</span>
                    <button
                      onClick={() => copyToClipboard(suggestion.suggestedCode!)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  <pre className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm overflow-x-auto">
                    <code className="text-green-800">{suggestion.suggestedCode}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Reasoning */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-blue-800 mb-1">AI Reasoning</div>
                  <p className="text-sm text-blue-700">{suggestion.reasoning}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {suggestion.autoFixable && (
                  <button
                    onClick={() => handleApplySuggestion(suggestion.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Wrench className="h-3 w-3" />
                    <span>Apply Fix</span>
                  </button>
                )}
                <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                  <ExternalLink className="h-3 w-3" />
                  <span>View in IDE</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDismissSuggestion(suggestion.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Dismiss suggestion"
                >
                  <ThumbsDown className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Mark as helpful">
                  <ThumbsUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No suggestions found matching your criteria</p>
        </div>
      )}
    </div>
  );

  const renderSettings = () => {
    if (!settings) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No AI review settings found for this project</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">General Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Enable AI Code Review</div>
                <div className="text-sm text-gray-500">Automatically analyze code changes</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Auto Review on MR</div>
                <div className="text-sm text-gray-500">Automatically review merge requests</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.reviewOnMR} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Block Merge on Critical Issues</div>
                <div className="text-sm text-gray-500">Prevent merging when critical issues are found</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.blockMergeOnCritical} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* AI Model Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">AI Model Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Model</label>
              <select
                value={settings.aiModel}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="claude-3">Claude 3</option>
                <option value="codellama">CodeLlama</option>
                <option value="custom">Custom Model</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Confidence ({settings.minConfidence}%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={settings.minConfidence}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Rule Configuration */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Review Rules</h4>
          <div className="text-sm text-gray-600 mb-4">
            Configure which types of issues the AI should look for in your code.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Security vulnerabilities</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Performance issues</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Code maintainability</span>
              </label>
            </div>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Best practices</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Code style issues</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-700">Potential bugs</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reviews':
        return renderReviews();
      case 'suggestions':
        return renderSuggestions();
      case 'settings':
        return renderSettings();
      default:
        return renderReviews();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">AI Code Review Assistant</h3>
            {latestReview && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {latestReview.suggestions.length} suggestions
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Play className="h-4 w-4" />
              <span>Run Review</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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