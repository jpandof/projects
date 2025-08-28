import React, { useState } from 'react';
import { 
  mockTestSuites, 
  mockCodeQualityMetrics, 
  mockTestExecutions, 
  mockMutationTestResults,
  mockPerformanceTestResults,
  TestSuite,
  CodeQualityMetrics,
  TestExecution,
  MutationTestResult,
  PerformanceTestResult
} from '../data/testing';
import { 
  TestTube, 
  Bug, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Play,
  Pause,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Code,
  FileText,
  Calendar,
  User,
  GitBranch,
  RefreshCw,
  Download,
  Eye,
  Filter,
  Search
} from 'lucide-react';

interface ProjectTestingProps {
  projectId: string;
}

export const ProjectTesting: React.FC<ProjectTestingProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'suites' | 'quality' | 'executions' | 'mutation' | 'performance'>('overview');
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const testSuites = mockTestSuites[projectId] || [];
  const qualityMetrics = mockCodeQualityMetrics[projectId]?.[0];
  const testExecutions = mockTestExecutions.filter(exec => exec.projectId === projectId);
  const mutationResults = mockMutationTestResults.filter(result => result.projectId === projectId);
  const performanceResults = mockPerformanceTestResults.filter(result => result.projectId === projectId);

  const getStatusIcon = (status: TestSuite['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Play className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'skipped':
        return <Pause className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TestSuite['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'skipped':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: TestSuite['type']) => {
    switch (type) {
      case 'unit':
        return <TestTube className="h-4 w-4 text-blue-500" />;
      case 'integration':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'e2e':
        return <Target className="h-4 w-4 text-purple-500" />;
      case 'performance':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'mutation':
        return <Bug className="h-4 w-4 text-red-500" />;
      case 'security':
        return <Shield className="h-4 w-4 text-orange-500" />;
      default:
        return <TestTube className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'B':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'E':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOverallCoverage = () => {
    const suitesWithCoverage = testSuites.filter(suite => suite.coverage > 0);
    if (suitesWithCoverage.length === 0) return 0;
    return suitesWithCoverage.reduce((sum, suite) => sum + suite.coverage, 0) / suitesWithCoverage.length;
  };

  const calculateOverallStatus = () => {
    if (testSuites.some(suite => suite.status === 'failed')) return 'failed';
    if (testSuites.some(suite => suite.status === 'running')) return 'running';
    if (testSuites.every(suite => suite.status === 'passed')) return 'passed';
    return 'unknown';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'suites', label: 'Test Suites', icon: TestTube },
    { id: 'quality', label: 'Code Quality', icon: Code },
    { id: 'executions', label: 'Test Runs', icon: Play },
    { id: 'mutation', label: 'Mutation Tests', icon: Bug },
    { id: 'performance', label: 'Performance', icon: Zap }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Code Quality Ratings */}
      {qualityMetrics && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Code Quality Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Maintainability</div>
              <div className={`inline-flex items-center px-4 py-3 rounded-full border font-bold text-2xl ${getRatingColor(qualityMetrics.maintainabilityRating)}`}>
                {qualityMetrics.maintainabilityRating}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {qualityMetrics.technicalDebt} technical debt
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Reliability</div>
              <div className={`inline-flex items-center px-4 py-3 rounded-full border font-bold text-2xl ${getRatingColor(qualityMetrics.reliabilityRating)}`}>
                {qualityMetrics.reliabilityRating}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {qualityMetrics.bugs} bugs found
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Security</div>
              <div className={`inline-flex items-center px-4 py-3 rounded-full border font-bold text-2xl ${getRatingColor(qualityMetrics.securityRating)}`}>
                {qualityMetrics.securityRating}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {qualityMetrics.vulnerabilities} vulnerabilities
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TestTube className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Total Tests</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {testSuites.reduce((sum, suite) => sum + suite.totalTests, 0)}
          </div>
          <div className="text-sm text-gray-500">
            {testSuites.reduce((sum, suite) => sum + suite.passedTests, 0)} passed
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Coverage</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {calculateOverallCoverage().toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500">Average coverage</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Bug className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">Issues</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {qualityMetrics ? qualityMetrics.bugs + qualityMetrics.vulnerabilities : 0}
          </div>
          <div className="text-sm text-gray-500">Bugs & vulnerabilities</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Tech Debt</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {qualityMetrics?.technicalDebt || 'N/A'}
          </div>
          <div className="text-sm text-gray-500">
            {qualityMetrics?.technicalDebtRatio.toFixed(1)}% ratio
          </div>
        </div>
      </div>

      {/* Test Suites Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Test Suites Status</h3>
        <div className="space-y-3">
          {testSuites.map((suite) => (
            <div key={suite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getTypeIcon(suite.type)}
                <div>
                  <div className="font-medium text-gray-900">{suite.name}</div>
                  <div className="text-sm text-gray-500">
                    {suite.totalTests} tests • {suite.framework}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {suite.passedTests}/{suite.totalTests}
                  </div>
                  <div className="text-xs text-gray-500">
                    {suite.coverage > 0 && `${suite.coverage}% coverage`}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(suite.status)}`}>
                  {suite.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Metrics */}
    </div>
  );

  const renderTestSuites = () => (
    <div className="space-y-4">
      {testSuites.map((suite) => (
        <div key={suite.id} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getTypeIcon(suite.type)}
              <div>
                <h4 className="font-medium text-gray-900">{suite.name}</h4>
                <div className="text-sm text-gray-500">
                  {suite.framework} • Last run {formatDate(suite.lastRun)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(suite.status)}`}>
                {suite.status}
              </span>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Total Tests</div>
              <div className="text-lg font-semibold text-gray-900">{suite.totalTests}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Passed</div>
              <div className="text-lg font-semibold text-green-600">{suite.passedTests}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Failed</div>
              <div className="text-lg font-semibold text-red-600">{suite.failedTests}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="text-lg font-semibold text-gray-900">{formatDuration(suite.duration)}</div>
            </div>
          </div>

          {suite.coverage > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Code Coverage</span>
                <span className="text-sm font-medium text-gray-900">{suite.coverage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${suite.coverage}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
              <Play className="h-3 w-3" />
              <span>Run Tests</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
              <Eye className="h-3 w-3" />
              <span>View Details</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
              <Download className="h-3 w-3" />
              <span>Export</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCodeQuality = () => {
    if (!qualityMetrics) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No code quality metrics available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Quality Ratings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Maintainability</div>
              <div className={`inline-flex items-center px-4 py-3 rounded-full border font-bold text-2xl ${getRatingColor(qualityMetrics.maintainabilityRating)}`}>
                {qualityMetrics.maintainabilityRating}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {qualityMetrics.technicalDebt} technical debt
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Reliability</div>
              <div className={`inline-flex items-center px-4 py-3 rounded-full border font-bold text-2xl ${getRatingColor(qualityMetrics.reliabilityRating)}`}>
                {qualityMetrics.reliabilityRating}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {qualityMetrics.bugs} bugs found
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Security</div>
              <div className={`inline-flex items-center px-4 py-3 rounded-full border font-bold text-2xl ${getRatingColor(qualityMetrics.securityRating)}`}>
                {qualityMetrics.securityRating}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {qualityMetrics.vulnerabilities} vulnerabilities
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="font-medium text-gray-900 mb-4">Issues</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bug className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-700">Bugs</span>
                </div>
                <span className="font-medium text-gray-900">{qualityMetrics.bugs}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-700">Vulnerabilities</span>
                </div>
                <span className="font-medium text-gray-900">{qualityMetrics.vulnerabilities}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Code Smells</span>
                </div>
                <span className="font-medium text-gray-900">{qualityMetrics.codeSmells}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-700">Security Hotspots</span>
                </div>
                <span className="font-medium text-gray-900">{qualityMetrics.securityHotspots}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="font-medium text-gray-900 mb-4">Code Metrics</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Lines of Code</span>
                <span className="font-medium text-gray-900">{qualityMetrics.linesOfCode.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Duplicated Lines</span>
                <span className="font-medium text-gray-900">{qualityMetrics.duplicatedLines}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Complexity</span>
                <span className="font-medium text-gray-900">{qualityMetrics.complexity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Cognitive Complexity</span>
                <span className="font-medium text-gray-900">{qualityMetrics.cognitiveComplexity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Debt */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Technical Debt</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{qualityMetrics.technicalDebt}</div>
              <div className="text-sm text-gray-500">Total Debt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{qualityMetrics.technicalDebtRatio}%</div>
              <div className="text-sm text-gray-500">Debt Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{qualityMetrics.duplicatedBlocks}</div>
              <div className="text-sm text-gray-500">Duplicated Blocks</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTestExecutions = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search test executions..."
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
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="running">Running</option>
            </select>
          </div>
        </div>
      </div>

      {/* Executions List */}
      {testExecutions.map((execution) => (
        <div key={execution.id} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(execution.status)}
              <div>
                <h4 className="font-medium text-gray-900">{execution.suiteName}</h4>
                <div className="text-sm text-gray-500">
                  {getTypeIcon(execution.type)} {execution.type} • {execution.environment}
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(execution.status)}`}>
              {execution.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-medium text-gray-900">
                {execution.duration ? formatDuration(execution.duration) : 'Running...'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tests</div>
              <div className="font-medium text-gray-900">
                {execution.results.passed}/{execution.results.total}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Coverage</div>
              <div className="font-medium text-gray-900">
                {execution.results.coverage ? `${execution.results.coverage}%` : 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Started</div>
              <div className="font-medium text-gray-900">{formatDate(execution.startedAt)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{execution.triggeredBy}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="h-3 w-3" />
              <span>{execution.branch}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-mono">{execution.commit}</span>
            </div>
          </div>

          {execution.failedTests && execution.failedTests.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <h5 className="text-sm font-medium text-red-800 mb-2">Failed Tests</h5>
              <div className="space-y-2">
                {execution.failedTests.map((test, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-red-700">{test.name}</div>
                    <div className="text-red-600 mt-1">{test.error}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
              <Eye className="h-3 w-3" />
              <span>View Details</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors">
              <Download className="h-3 w-3" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMutationTesting = () => (
    <div className="space-y-6">
      {mutationResults.map((result) => (
        <div key={result.id} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Bug className="h-6 w-6 text-red-500" />
              <div>
                <h4 className="font-medium text-gray-900">Mutation Testing</h4>
                <div className="text-sm text-gray-500">
                  {result.framework} • {formatDate(result.timestamp)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{result.mutationScore}%</div>
              <div className="text-sm text-gray-500">Mutation Score</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Total Mutants</div>
              <div className="text-lg font-semibold text-gray-900">{result.totalMutants}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Killed</div>
              <div className="text-lg font-semibold text-green-600">{result.killedMutants}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Survived</div>
              <div className="text-lg font-semibold text-red-600">{result.survivedMutants}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="text-lg font-semibold text-gray-900">{formatDuration(result.duration)}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Mutation Score</span>
              <span className="text-sm font-medium text-gray-900">{result.mutationScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${result.mutationScore >= 80 ? 'bg-green-500' : result.mutationScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${result.mutationScore}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Timeout</div>
              <div className="font-medium text-gray-900">{result.timeoutMutants}</div>
            </div>
            <div>
              <div className="text-gray-500">No Coverage</div>
              <div className="font-medium text-gray-900">{result.noCoverageMutants}</div>
            </div>
            <div>
              <div className="text-gray-500">Runtime Error</div>
              <div className="font-medium text-gray-900">{result.runtimeErrorMutants}</div>
            </div>
            <div>
              <div className="text-gray-500">Framework</div>
              <div className="font-medium text-gray-900">{result.framework}</div>
            </div>
          </div>
        </div>
      ))}

      {mutationResults.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No mutation testing results available</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Run Mutation Tests
          </button>
        </div>
      )}
    </div>
  );

  const renderPerformanceTesting = () => (
    <div className="space-y-6">
      {performanceResults.map((result) => (
        <div key={result.id} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-yellow-500" />
              <div>
                <h4 className="font-medium text-gray-900">{result.testName}</h4>
                <div className="text-sm text-gray-500">
                  {result.type} test • {result.tool} • {result.environment}
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded border ${
              result.status === 'passed' ? 'bg-green-100 text-green-800 border-green-200' :
              result.status === 'warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              'bg-red-100 text-red-800 border-red-200'
            }`}>
              {result.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Virtual Users</div>
              <div className="text-lg font-semibold text-gray-900">{result.virtualUsers}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">RPS</div>
              <div className="text-lg font-semibold text-gray-900">{result.requestsPerSecond}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Avg Response</div>
              <div className="text-lg font-semibold text-gray-900">{result.averageResponseTime}ms</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Error Rate</div>
              <div className={`text-lg font-semibold ${result.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                {result.errorRate}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500">P95 Response</div>
              <div className="font-medium text-gray-900">{result.p95ResponseTime}ms</div>
            </div>
            <div>
              <div className="text-gray-500">P99 Response</div>
              <div className="font-medium text-gray-900">{result.p99ResponseTime}ms</div>
            </div>
            <div>
              <div className="text-gray-500">Throughput</div>
              <div className="font-medium text-gray-900">{result.throughput} MB/s</div>
            </div>
            <div>
              <div className="text-gray-500">Duration</div>
              <div className="font-medium text-gray-900">{formatDuration(result.duration)}</div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Executed on {formatDate(result.timestamp)}
          </div>
        </div>
      ))}

      {performanceResults.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No performance testing results available</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Run Performance Tests
          </button>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'suites':
        return renderTestSuites();
      case 'quality':
        return renderCodeQuality();
      case 'executions':
        return renderTestExecutions();
      case 'mutation':
        return renderMutationTesting();
      case 'performance':
        return renderPerformanceTesting();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TestTube className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">Testing & Quality</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {testSuites.length} suites
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Play className="h-4 w-4" />
              <span>Run All Tests</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quality Ratings in Header */}
        {qualityMetrics && (
          <div className="mb-4 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Code Quality Ratings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Maintainability</div>
                <div className={`inline-flex items-center px-3 py-2 rounded-full border font-bold text-lg ${getRatingColor(qualityMetrics.maintainabilityRating)}`}>
                  {qualityMetrics.maintainabilityRating}
                </div>
                <div className="text-xs text-gray-500 mt-1">{qualityMetrics.technicalDebt}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Reliability</div>
                <div className={`inline-flex items-center px-3 py-2 rounded-full border font-bold text-lg ${getRatingColor(qualityMetrics.reliabilityRating)}`}>
                  {qualityMetrics.reliabilityRating}
                </div>
                <div className="text-xs text-gray-500 mt-1">{qualityMetrics.bugs} bugs</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Security</div>
                <div className={`inline-flex items-center px-3 py-2 rounded-full border font-bold text-lg ${getRatingColor(qualityMetrics.securityRating)}`}>
                  {qualityMetrics.securityRating}
                </div>
                <div className="text-xs text-gray-500 mt-1">{qualityMetrics.vulnerabilities} vulnerabilities</div>
              </div>
            </div>
          </div>
        )}

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