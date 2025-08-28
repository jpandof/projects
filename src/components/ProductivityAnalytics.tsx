import React, { useState } from 'react';
import { 
  mockProductivityMetrics, 
  mockDeveloperMetrics, 
  mockTeamVelocity,
  mockCodeReviewMetrics,
  mockFlowMetrics,
  ProductivityMetrics,
  DeveloperMetrics,
  TeamVelocity,
  CodeReviewMetrics,
  FlowMetrics
} from '../data/productivity';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Clock, 
  Target, 
  Zap,
  GitMerge,
  Bug,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  User,
  Award,
  Gauge,
  Timer,
  Code,
  Eye,
  Filter,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  ThumbsUp,
  Coffee,
  Brain,
  Rocket,
  Shield
} from 'lucide-react';

interface ProductivityAnalyticsProps {
  projectId: string;
}

export const ProductivityAnalytics: React.FC<ProductivityAnalyticsProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'individual' | 'velocity' | 'reviews' | 'flow'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('all');

  const productivityData = mockProductivityMetrics[projectId]?.[0];
  const developerMetrics = mockDeveloperMetrics.filter(dev => dev.projectId === projectId);
  const teamVelocity = mockTeamVelocity.filter(vel => vel.projectId === projectId);
  const reviewMetrics = mockCodeReviewMetrics.filter(rev => rev.projectId === projectId)[0];
  const flowMetrics = mockFlowMetrics.filter(flow => flow.projectId === projectId)[0];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (trend: number, inverse = false) => {
    const isPositive = inverse ? trend < 0 : trend > 0;
    if (isPositive) return 'text-green-600';
    if (trend === 0) return 'text-gray-500';
    return 'text-red-600';
  };

  const formatTrend = (trend: number) => {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend.toFixed(1)}%`;
  };

  const getDORALevel = (metric: string, value: number) => {
    const levels = {
      deploymentFrequency: { elite: 3, high: 1, medium: 0.5, low: 0 },
      leadTimeForChanges: { elite: 24, high: 168, medium: 720, low: Infinity },
      meanTimeToRecovery: { elite: 1, high: 24, medium: 168, low: Infinity },
      changeFailureRate: { elite: 5, high: 10, medium: 15, low: Infinity }
    };

    const thresholds = levels[metric as keyof typeof levels];
    if (!thresholds) return 'medium';

    if (metric === 'deploymentFrequency') {
      if (value >= thresholds.elite) return 'elite';
      if (value >= thresholds.high) return 'high';
      if (value >= thresholds.medium) return 'medium';
      return 'low';
    } else {
      if (value <= thresholds.elite) return 'elite';
      if (value <= thresholds.high) return 'high';
      if (value <= thresholds.medium) return 'medium';
      return 'low';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'elite': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'team', label: 'Team Metrics', icon: Users },
    { id: 'individual', label: 'Individual', icon: User },
    { id: 'velocity', label: 'Velocity', icon: Zap },
    { id: 'reviews', label: 'Code Reviews', icon: GitMerge },
    { id: 'flow', label: 'Flow Metrics', icon: Activity }
  ];

  const renderOverview = () => {
    if (!productivityData) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No productivity data available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* DORA Metrics */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">DORA Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Rocket className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Deployment Frequency</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {productivityData.metrics.deploymentFrequency}/day
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(getDORALevel('deploymentFrequency', productivityData.metrics.deploymentFrequency))}`}>
                  {getDORALevel('deploymentFrequency', productivityData.metrics.deploymentFrequency)}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(productivityData.trends.deploymentFrequency)}`}>
                  {getTrendIcon(productivityData.trends.deploymentFrequency)}
                  <span>{formatTrend(productivityData.trends.deploymentFrequency)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Lead Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {productivityData.metrics.leadTimeForChanges}h
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(getDORALevel('leadTimeForChanges', productivityData.metrics.leadTimeForChanges))}`}>
                  {getDORALevel('leadTimeForChanges', productivityData.metrics.leadTimeForChanges)}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(productivityData.trends.leadTime, true)}`}>
                  {getTrendIcon(productivityData.trends.leadTime)}
                  <span>{formatTrend(productivityData.trends.leadTime)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">MTTR</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {productivityData.metrics.meanTimeToRecovery}h
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(getDORALevel('meanTimeToRecovery', productivityData.metrics.meanTimeToRecovery))}`}>
                  {getDORALevel('meanTimeToRecovery', productivityData.metrics.meanTimeToRecovery)}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(productivityData.trends.mttr, true)}`}>
                  {getTrendIcon(productivityData.trends.mttr)}
                  <span>{formatTrend(productivityData.trends.mttr)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Bug className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Change Failure Rate</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {productivityData.metrics.changeFailureRate}%
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(getDORALevel('changeFailureRate', productivityData.metrics.changeFailureRate))}`}>
                  {getDORALevel('changeFailureRate', productivityData.metrics.changeFailureRate)}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(-productivityData.trends.bugRate)}`}>
                  {getTrendIcon(-productivityData.trends.bugRate)}
                  <span>{formatTrend(-productivityData.trends.bugRate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Efficiency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="font-medium text-gray-900 mb-4">Development Efficiency</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Timer className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">Cycle Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{productivityData.metrics.cycleTime}h</span>
                  <div className={`flex items-center space-x-1 text-xs ${getTrendColor(productivityData.trends.cycleTime, true)}`}>
                    {getTrendIcon(productivityData.trends.cycleTime)}
                    <span>{formatTrend(productivityData.trends.cycleTime)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Review Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{productivityData.metrics.reviewTime}h</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-700">Pickup Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{productivityData.metrics.pickupTime}h</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Test Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{productivityData.metrics.testCoverage}%</span>
                  <div className={`flex items-center space-x-1 text-xs ${getTrendColor(productivityData.trends.testCoverage)}`}>
                    {getTrendIcon(productivityData.trends.testCoverage)}
                    <span>{formatTrend(productivityData.trends.testCoverage)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="font-medium text-gray-900 mb-4">Team Collaboration</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">Active Contributors</span>
                </div>
                <span className="font-medium text-gray-900">{productivityData.metrics.activeContributors}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitMerge className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Review Participation</span>
                </div>
                <span className="font-medium text-gray-900">{productivityData.metrics.codeReviewParticipation}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-700">Avg PR Size</span>
                </div>
                <span className="font-medium text-gray-900">{productivityData.metrics.prSize} lines</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-700">Commits/Developer</span>
                </div>
                <span className="font-medium text-gray-900">{productivityData.metrics.commitsPerDeveloper}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Focus & Well-being */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Focus & Well-being</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Focus Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{productivityData.metrics.focusTime}h/day</div>
              <div className="text-xs text-gray-500">Uninterrupted work time</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Coffee className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Meeting Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{productivityData.metrics.meetingTime}h/day</div>
              <div className="text-xs text-gray-500">Time in meetings</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Context Switching</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{productivityData.metrics.contextSwitching}/day</div>
              <div className="text-xs text-gray-500">Different tasks per day</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTeamMetrics = () => (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="font-medium text-gray-900 mb-4">Team Performance Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{developerMetrics.length}</div>
            <div className="text-sm text-gray-500">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(developerMetrics.reduce((sum, dev) => sum + dev.metrics.velocityScore, 0) / developerMetrics.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Velocity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(developerMetrics.reduce((sum, dev) => sum + dev.metrics.codeQualityScore, 0) / developerMetrics.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Quality Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(developerMetrics.reduce((sum, dev) => sum + dev.metrics.collaborationScore, 0) / developerMetrics.length)}
            </div>
            <div className="text-sm text-gray-500">Collaboration Score</div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="font-medium text-gray-900 mb-4">Team Members Performance</h4>
        <div className="space-y-4">
          {developerMetrics.map((developer) => (
            <div key={developer.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {developer.developerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{developer.developerName}</h5>
                    <p className="text-sm text-gray-500">{developer.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{developer.metrics.velocityScore}</div>
                    <div className="text-xs text-gray-500">Velocity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{developer.metrics.codeQualityScore}</div>
                    <div className="text-xs text-gray-500">Quality</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <div className="text-sm text-gray-500">Commits</div>
                  <div className="font-medium text-gray-900">{developer.metrics.commitsCount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">PRs Created</div>
                  <div className="font-medium text-gray-900">{developer.metrics.prsCreated}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">PRs Reviewed</div>
                  <div className="font-medium text-gray-900">{developer.metrics.prsReviewed}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Bugs Fixed</div>
                  <div className="font-medium text-gray-900">{developer.metrics.bugsFixed}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="text-xs">
                  <span className="text-gray-500">Strengths:</span>
                  {developer.strengths.map((strength) => (
                    <span key={strength} className="ml-1 px-2 py-1 bg-green-100 text-green-700 rounded">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIndividualMetrics = () => {
    const selectedDev = selectedDeveloper === 'all' ? developerMetrics[0] : 
                       developerMetrics.find(dev => dev.developerId === selectedDeveloper) || developerMetrics[0];

    if (!selectedDev) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No individual metrics available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Developer Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <select
            value={selectedDeveloper}
            onChange={(e) => setSelectedDeveloper(e.target.value)}
            className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {developerMetrics.map((dev) => (
              <option key={dev.developerId} value={dev.developerId}>
                {dev.developerName}
              </option>
            ))}
          </select>
        </div>

        {/* Individual Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-lg">
                {selectedDev.developerName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-lg">{selectedDev.developerName}</h4>
              <p className="text-sm text-gray-500">{selectedDev.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{selectedDev.metrics.codeQualityScore}</div>
              <div className="text-sm text-gray-500">Code Quality Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{selectedDev.metrics.collaborationScore}</div>
              <div className="text-sm text-gray-500">Collaboration Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{selectedDev.metrics.velocityScore}</div>
              <div className="text-sm text-gray-500">Velocity Score</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Commits</div>
              <div className="text-xl font-bold text-gray-900">{selectedDev.metrics.commitsCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Lines Added</div>
              <div className="text-xl font-bold text-gray-900">{selectedDev.metrics.linesAdded.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">PRs Created</div>
              <div className="text-xl font-bold text-gray-900">{selectedDev.metrics.prsCreated}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">PRs Reviewed</div>
              <div className="text-xl font-bold text-gray-900">{selectedDev.metrics.prsReviewed}</div>
            </div>
          </div>
        </div>

        {/* Goals & Improvement Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h5 className="font-medium text-gray-900 mb-4">Current Goals</h5>
            <div className="space-y-3">
              {selectedDev.goals.map((goal, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{goal.metric}</span>
                    <span className="text-sm text-gray-500">{goal.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h5 className="font-medium text-gray-900 mb-4">Strengths & Areas for Improvement</h5>
            <div className="space-y-4">
              <div>
                <h6 className="text-sm font-medium text-green-700 mb-2">Strengths</h6>
                <div className="flex flex-wrap gap-2">
                  {selectedDev.strengths.map((strength) => (
                    <span key={strength} className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h6 className="text-sm font-medium text-orange-700 mb-2">Areas for Improvement</h6>
                <div className="flex flex-wrap gap-2">
                  {selectedDev.improvementAreas.map((area) => (
                    <span key={area} className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVelocityMetrics = () => {
    if (teamVelocity.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No velocity data available</p>
        </div>
      );
    }

    const latestSprint = teamVelocity[0];

    return (
      <div className="space-y-6">
        {/* Sprint Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900">{latestSprint.sprintName}</h4>
              <p className="text-sm text-gray-500">
                {new Date(latestSprint.startDate).toLocaleDateString()} - {new Date(latestSprint.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{latestSprint.velocity}</div>
              <div className="text-sm text-gray-500">Story Points</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{latestSprint.plannedPoints}</div>
              <div className="text-sm text-gray-500">Planned Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{latestSprint.completedPoints}</div>
              <div className="text-sm text-gray-500">Completed Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {Math.round((latestSprint.completedPoints / latestSprint.plannedPoints) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Burndown Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Burndown Chart</h4>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Burndown chart visualization would go here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        {/* Blockers */}
        {latestSprint.blockers.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="font-medium text-gray-900 mb-4">Sprint Blockers</h4>
            <div className="space-y-3">
              {latestSprint.blockers.map((blocker) => (
                <div key={blocker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`h-4 w-4 ${
                      blocker.impact === 'high' ? 'text-red-500' :
                      blocker.impact === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div>
                      <div className="font-medium text-gray-900">{blocker.title}</div>
                      <div className="text-sm text-gray-500">
                        {blocker.duration}h blocked • {blocker.impact} impact
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    blocker.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {blocker.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReviewMetrics = () => {
    if (!reviewMetrics) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <GitMerge className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No code review metrics available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Review Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Code Review Performance</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{reviewMetrics.metrics.avgReviewTime}h</div>
              <div className="text-sm text-gray-500">Avg Review Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{reviewMetrics.metrics.reviewThroughput}</div>
              <div className="text-sm text-gray-500">PRs/Day</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{reviewMetrics.metrics.reviewQuality}</div>
              <div className="text-sm text-gray-500">Quality Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{reviewMetrics.metrics.participationRate}%</div>
              <div className="text-sm text-gray-500">Participation</div>
            </div>
          </div>
        </div>

        {/* Reviewer Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Reviewer Performance</h4>
          <div className="space-y-4">
            {reviewMetrics.reviewers.map((reviewer) => (
              <div key={reviewer.developerId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {reviewer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{reviewer.name}</div>
                    <div className="text-sm text-gray-500">
                      {reviewer.reviewsCompleted} reviews completed
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{reviewer.avgReviewTime}h</div>
                    <div className="text-xs text-gray-500">Avg Time</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{reviewer.qualityScore}</div>
                    <div className="text-xs text-gray-500">Quality</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{reviewer.responsiveness}h</div>
                    <div className="text-xs text-gray-500">Response</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h5 className="font-medium text-gray-900 mb-4">Review Metrics</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Avg Comments per PR</span>
                <span className="font-medium text-gray-900">{reviewMetrics.metrics.avgCommentsPerPR}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Avg PR Size</span>
                <span className="font-medium text-gray-900">{reviewMetrics.metrics.avgPRSize} lines</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Approval Time</span>
                <span className="font-medium text-gray-900">{reviewMetrics.metrics.approvalTime}h</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h5 className="font-medium text-gray-900 mb-4">Quality Indicators</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Review Quality Score</span>
                <span className="font-medium text-gray-900">{reviewMetrics.metrics.reviewQuality}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Team Participation</span>
                <span className="font-medium text-gray-900">{reviewMetrics.metrics.participationRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Review Throughput</span>
                <span className="font-medium text-gray-900">{reviewMetrics.metrics.reviewThroughput} PRs/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFlowMetrics = () => {
    if (!flowMetrics) {
      return (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No flow metrics available</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Flow Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Flow Efficiency</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{flowMetrics.flowEfficiency}%</div>
              <div className="text-sm text-gray-500">Flow Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{flowMetrics.throughput}</div>
              <div className="text-sm text-gray-500">Items/Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{flowMetrics.wip}</div>
              <div className="text-sm text-gray-500">Work in Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{flowMetrics.bottlenecks.length}</div>
              <div className="text-sm text-gray-500">Bottlenecks</div>
            </div>
          </div>
        </div>

        {/* Work Items */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Recent Work Items</h4>
          <div className="space-y-3">
            {flowMetrics.workItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.type === 'feature' ? 'bg-blue-100 text-blue-800' :
                    item.type === 'bug' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.type}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">Assigned to {item.assignee}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {item.cycleTime ? `${item.cycleTime}h cycle` : 'In progress'}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    item.status === 'done' ? 'bg-green-100 text-green-800' :
                    item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottlenecks */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Process Bottlenecks</h4>
          <div className="space-y-3">
            {flowMetrics.bottlenecks.map((bottleneck, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-4 w-4 ${
                    bottleneck.impact === 'high' ? 'text-red-500' :
                    bottleneck.impact === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{bottleneck.stage}</div>
                    <div className="text-sm text-gray-500">{bottleneck.impact} impact</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{bottleneck.avgTime}h</div>
                  <div className="text-sm text-gray-500">Avg Time</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'team':
        return renderTeamMetrics();
      case 'individual':
        return renderIndividualMetrics();
      case 'velocity':
        return renderVelocityMetrics();
      case 'reviews':
        return renderReviewMetrics();
      case 'flow':
        return renderFlowMetrics();
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
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900">Developer Productivity Analytics</h3>
            {productivityData && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {selectedPeriod} view
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
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
    </div>
  );
};