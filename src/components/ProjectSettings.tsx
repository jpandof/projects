import React, { useState } from 'react';
import { mockProjects } from '../data/projects';
import { stacks } from '../data/stacks';
import { 
  Settings, 
  Save, 
  Trash2, 
  Archive, 
  GitBranch, 
  Globe, 
  Shield, 
  Bell,
  Users,
  Key,
  Database,
  Webhook,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ProjectSettingsProps {
  projectId: string;
}

export const ProjectSettings: React.FC<ProjectSettingsProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'integrations' | 'danger'>('general');
  const [hasChanges, setHasChanges] = useState(false);
  
  const project = mockProjects.find(p => p.id === projectId);
  const stackInfo = project ? stacks.find(s => s.id === project.stack) : null;

  const [settings, setSettings] = useState({
    general: {
      name: project?.name || '',
      description: project?.description || '',
      repository: project?.repository || '',
      branch: project?.branch || 'main',
      visibility: 'private',
      autoMerge: false,
      requireReviews: true
    },
    security: {
      requireMFA: false,
      allowedIPs: '',
      secretScanning: true,
      dependencyScanning: true,
      codeScanning: false
    },
    notifications: {
      deploymentSuccess: true,
      deploymentFailure: true,
      alertsCritical: true,
      alertsHigh: true,
      alertsMedium: false,
      alertsLow: false,
      teamChanges: true,
      weeklyReports: false
    },
    integrations: {
      slack: {
        enabled: false,
        webhook: '',
        channel: '#deployments'
      },
      discord: {
        enabled: false,
        webhook: ''
      },
      email: {
        enabled: true,
        recipients: 'team@company.com'
      }
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleNestedSettingChange = (category: string, subcategory: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as any)[subcategory],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Implement save logic
  };

  const handleArchiveProject = () => {
    if (confirm('Are you sure you want to archive this project? It will be hidden from the main view but can be restored later.')) {
      console.log('Archiving project:', projectId);
      // Implement archive logic
    }
  };

  const handleDeleteProject = () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone and will permanently delete all project data.')) {
      console.log('Deleting project:', projectId);
      // Implement delete logic
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Webhook },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle }
  ];

  if (!project) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-gray-500">Project not found</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Project Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.name}
                    onChange={(e) => handleSettingChange('general', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={settings.general.repository}
                    onChange={(e) => handleSettingChange('general', 'repository', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={settings.general.description}
                  onChange={(e) => handleSettingChange('general', 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Repository Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Branch
                  </label>
                  <input
                    type="text"
                    value={settings.general.branch}
                    onChange={(e) => handleSettingChange('general', 'branch', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <select
                    value={settings.general.visibility}
                    onChange={(e) => handleSettingChange('general', 'visibility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="private">Private</option>
                    <option value="internal">Internal</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.autoMerge}
                    onChange={(e) => handleSettingChange('general', 'autoMerge', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable auto-merge for approved PRs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.general.requireReviews}
                    onChange={(e) => handleSettingChange('general', 'requireReviews', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require code reviews before merge</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Authentication & Access</h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.requireMFA}
                    onChange={(e) => handleSettingChange('security', 'requireMFA', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require multi-factor authentication</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed IP Addresses (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={settings.security.allowedIPs}
                    onChange={(e) => handleSettingChange('security', 'allowedIPs', e.target.value)}
                    placeholder="192.168.1.0/24, 10.0.0.0/8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Security Scanning</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.secretScanning}
                    onChange={(e) => handleSettingChange('security', 'secretScanning', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable secret scanning</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.dependencyScanning}
                    onChange={(e) => handleSettingChange('security', 'dependencyScanning', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable dependency vulnerability scanning</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.codeScanning}
                    onChange={(e) => handleSettingChange('security', 'codeScanning', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable code scanning (CodeQL)</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Deployment Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.deploymentSuccess}
                    onChange={(e) => handleSettingChange('notifications', 'deploymentSuccess', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notify on successful deployments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.deploymentFailure}
                    onChange={(e) => handleSettingChange('notifications', 'deploymentFailure', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Notify on failed deployments</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Alert Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.alertsCritical}
                    onChange={(e) => handleSettingChange('notifications', 'alertsCritical', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Critical alerts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.alertsHigh}
                    onChange={(e) => handleSettingChange('notifications', 'alertsHigh', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">High priority alerts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.alertsMedium}
                    onChange={(e) => handleSettingChange('notifications', 'alertsMedium', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Medium priority alerts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.alertsLow}
                    onChange={(e) => handleSettingChange('notifications', 'alertsLow', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Low priority alerts</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Team & Reports</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.teamChanges}
                    onChange={(e) => handleSettingChange('notifications', 'teamChanges', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Team member changes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.weeklyReports}
                    onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Weekly summary reports</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Slack Integration</h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.integrations.slack.enabled}
                    onChange={(e) => handleNestedSettingChange('integrations', 'slack', 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Slack notifications</span>
                </label>
                {settings.integrations.slack.enabled && (
                  <div className="ml-6 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        value={settings.integrations.slack.webhook}
                        onChange={(e) => handleNestedSettingChange('integrations', 'slack', 'webhook', e.target.value)}
                        placeholder="https://hooks.slack.com/services/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Channel
                      </label>
                      <input
                        type="text"
                        value={settings.integrations.slack.channel}
                        onChange={(e) => handleNestedSettingChange('integrations', 'slack', 'channel', e.target.value)}
                        placeholder="#deployments"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Discord Integration</h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.integrations.discord.enabled}
                    onChange={(e) => handleNestedSettingChange('integrations', 'discord', 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable Discord notifications</span>
                </label>
                {settings.integrations.discord.enabled && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={settings.integrations.discord.webhook}
                      onChange={(e) => handleNestedSettingChange('integrations', 'discord', 'webhook', e.target.value)}
                      placeholder="https://discord.com/api/webhooks/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Email Integration</h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.integrations.email.enabled}
                    onChange={(e) => handleNestedSettingChange('integrations', 'email', 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable email notifications</span>
                </label>
                {settings.integrations.email.enabled && (
                  <div className="ml-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={settings.integrations.email.recipients}
                      onChange={(e) => handleNestedSettingChange('integrations', 'email', 'recipients', e.target.value)}
                      placeholder="team@company.com, admin@company.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'danger':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Danger Zone</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Archive Project</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Archive this project. It will be hidden from the main view but can be restored later.
                    </p>
                  </div>
                  <button
                    onClick={handleArchiveProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Archive className="h-4 w-4" />
                    <span>Archive</span>
                  </button>
                </div>
              </div>

              <div className="border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Delete Project</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Permanently delete this project and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">Project Settings</h3>
          </div>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};