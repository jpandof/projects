import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';
import { mockProjects } from '../data/projects';
import { stacks } from '../data/stacks';
import { 
  ArrowLeft,
  Activity, 
  TrendingUp, 
  TrendingDown,
  Zap, 
  AlertTriangle, 
  Users,
  Clock,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw
} from 'lucide-react';

export const ProjectMetrics: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  
  const project = mockProjects.find(p => p.id === projectId);
  const stackInfo = project ? stacks.find(s => s.id === project.stack) : null;

  // Mock metrics data
  const [metrics, setMetrics] = useState({
    performance: {
      responseTime: { current: 145, trend: -5.2, data: [120, 135, 142, 138, 145, 140, 145] },
      throughput: { current: 1250, trend: 8.3, data: [1100, 1150, 1200, 1180, 1250, 1220, 1250] },
      errorRate: { current: 0.12, trend: -0.05, data: [0.15, 0.18, 0.12, 0.14, 0.12, 0.10, 0.12] },
      uptime: { current: 99.95, trend: 0.02, data: [99.9, 99.92, 99.95, 99.93, 99.95, 99.97, 99.95] }
    },
    infrastructure: {
      cpuUsage: { current: 45.2, trend: 2.1, data: [42, 44, 45, 43, 45, 47, 45] },
      memoryUsage: { current: 68.5, trend: -1.8, data: [70, 69, 68, 69, 68, 67, 68] },
      diskUsage: { current: 34.7, trend: 0.5, data: [34, 34, 35, 34, 35, 35, 35] },
      networkIO: { current: 2.3, trend: 12.5, data: [2.0, 2.1, 2.2, 2.1, 2.3, 2.4, 2.3] }
    },
    business: {
      activeUsers: { current: 1847, trend: 15.2, data: [1600, 1650, 1700, 1750, 1800, 1820, 1847] },
      requests: { current: 45230, trend: 8.7, data: [41000, 42000, 43000, 44000, 45000, 45100, 45230] },
      conversions: { current: 3.2, trend: 0.8, data: [3.0, 3.1, 3.2, 3.1, 3.2, 3.3, 3.2] },
      revenue: { current: 12450, trend: 22.1, data: [10000, 10500, 11000, 11500, 12000, 12200, 12450] }
    }
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update metrics with slight variations
    setMetrics(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        responseTime: { 
          ...prev.performance.responseTime, 
          current: prev.performance.responseTime.current + (Math.random() - 0.5) * 10 
        }
      }
    }));
    
    setIsRefreshing(false);
  };

  const formatNumber = (num: number, decimals = 0) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(decimals);
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const MetricCard: React.FC<{
    title: string;
    value: number;
    trend: number;
    unit?: string;
    icon: React.ReactNode;
    format?: 'number' | 'percentage' | 'currency' | 'time';
  }> = ({ title, value, trend, unit = '', icon, format = 'number' }) => {
    const formatValue = () => {
      switch (format) {
        case 'percentage':
          return `${value.toFixed(2)}%`;
        case 'currency':
          return `$${formatNumber(value)}`;
        case 'time':
          return `${value.toFixed(0)}ms`;
        default:
          return formatNumber(value, 2);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon}
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>
          {getTrendIcon(trend)}
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {formatValue()}{unit}
          </div>
          <div className={`text-sm ${getTrendColor(trend)}`}>
            {trend > 0 ? '+' : ''}{trend.toFixed(1)}% vs last period
          </div>
        </div>
      </div>
    );
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                  <div className="bg-red-600 p-2 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">Project Not Found</h1>
                    <p className="text-sm text-gray-500">The requested project could not be found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Project Not Found</h3>
            <p className="text-gray-500 mb-4">The project with ID "{projectId}" could not be found.</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Return to Projects
            </Link>
          </div>
        </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to={`/project/${projectId}`}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {project.name} - Metrics
                  </h1>
                  <p className="text-sm text-gray-500">Real-time performance monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:animate-spin"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <NotificationCenter />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Performance Metrics */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Response Time"
                value={metrics.performance.responseTime.current}
                trend={metrics.performance.responseTime.trend}
                format="time"
                icon={<Zap className="h-5 w-5 text-blue-500" />}
              />
              <MetricCard
                title="Throughput"
                value={metrics.performance.throughput.current}
                trend={metrics.performance.throughput.trend}
                unit=" req/min"
                icon={<Activity className="h-5 w-5 text-green-500" />}
              />
              <MetricCard
                title="Error Rate"
                value={metrics.performance.errorRate.current}
                trend={metrics.performance.errorRate.trend}
                format="percentage"
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
              />
              <MetricCard
                title="Uptime"
                value={metrics.performance.uptime.current}
                trend={metrics.performance.uptime.trend}
                format="percentage"
                icon={<Server className="h-5 w-5 text-purple-500" />}
              />
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Infrastructure Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="CPU Usage"
                value={metrics.infrastructure.cpuUsage.current}
                trend={metrics.infrastructure.cpuUsage.trend}
                format="percentage"
                icon={<Cpu className="h-5 w-5 text-orange-500" />}
              />
              <MetricCard
                title="Memory Usage"
                value={metrics.infrastructure.memoryUsage.current}
                trend={metrics.infrastructure.memoryUsage.trend}
                format="percentage"
                icon={<Database className="h-5 w-5 text-blue-500" />}
              />
              <MetricCard
                title="Disk Usage"
                value={metrics.infrastructure.diskUsage.current}
                trend={metrics.infrastructure.diskUsage.trend}
                format="percentage"
                icon={<HardDrive className="h-5 w-5 text-gray-500" />}
              />
              <MetricCard
                title="Network I/O"
                value={metrics.infrastructure.networkIO.current}
                trend={metrics.infrastructure.networkIO.trend}
                unit=" GB/s"
                icon={<Wifi className="h-5 w-5 text-green-500" />}
              />
            </div>
          </div>

          {/* Business Metrics */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Business Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Active Users"
                value={metrics.business.activeUsers.current}
                trend={metrics.business.activeUsers.trend}
                icon={<Users className="h-5 w-5 text-indigo-500" />}
              />
              <MetricCard
                title="Total Requests"
                value={metrics.business.requests.current}
                trend={metrics.business.requests.trend}
                icon={<Activity className="h-5 w-5 text-cyan-500" />}
              />
              <MetricCard
                title="Conversion Rate"
                value={metrics.business.conversions.current}
                trend={metrics.business.conversions.trend}
                format="percentage"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
              />
              <MetricCard
                title="Revenue"
                value={metrics.business.revenue.current}
                trend={metrics.business.revenue.trend}
                format="currency"
                icon={<PieChart className="h-5 w-5 text-yellow-500" />}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Response Time Trend</h3>
                <LineChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Integration with charting library needed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Resource Usage</h3>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Pie chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Shows CPU, Memory, Disk distribution</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">High Memory Usage</p>
                  <p className="text-xs text-yellow-600">Memory usage exceeded 80% threshold</p>
                </div>
                <span className="text-xs text-yellow-600">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Traffic Spike Detected</p>
                  <p className="text-xs text-blue-600">Request volume increased by 25%</p>
                </div>
                <span className="text-xs text-blue-600">15 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};