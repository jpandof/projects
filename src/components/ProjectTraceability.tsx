import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  Calendar,
  User,
  FileText,
  GitMerge,
  GitCommit,
  BookOpen,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  X,
  Trello,
  Wrench,
  Tag,
  TrendingUp
} from 'lucide-react';
import { mockTraceabilityData, searchTraceability } from '../data/traceability';

interface ProjectTraceabilityProps {
  projectId: string;
}

export const ProjectTraceability: React.FC<ProjectTraceabilityProps> = ({ projectId }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'rally' | 'jira' | 'maximo' | 'git' | 'confluence' | 'sharepoint'>('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['rally', 'jira', 'git']));

  const traceabilityData = useMemo(() => {
    if (searchQuery.trim()) {
      return searchTraceability(projectId, searchQuery);
    }
    return mockTraceabilityData[projectId] || null;
  }, [projectId, searchQuery]);

  if (!traceabilityData) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Traceability Data</h3>
        <p className="text-gray-500">No traceability information available for this project.</p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      // Rally
      'backlog': { bg: 'bg-gray-100', text: 'text-gray-700' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'testing': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'done': { bg: 'bg-green-100', text: 'text-green-700' },
      'blocked': { bg: 'bg-red-100', text: 'text-red-700' },
      // Jira & general
      'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'In Review': { bg: 'bg-purple-100', text: 'text-purple-700' },
      'Done': { bg: 'bg-green-100', text: 'text-green-700' },
      // Maximo
      'WAPPR': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'INPRG': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'COMP': { bg: 'bg-green-100', text: 'text-green-700' },
      'CLOSE': { bg: 'bg-gray-100', text: 'text-gray-700' },
      // MR
      'open': { bg: 'bg-green-100', text: 'text-green-700' },
      'merged': { bg: 'bg-purple-100', text: 'text-purple-700' },
      'closed': { bg: 'bg-gray-100', text: 'text-gray-700' },
      'draft': { bg: 'bg-gray-100', text: 'text-gray-700' },
      // Confluence
      'current': { bg: 'bg-green-100', text: 'text-green-700' },
      'archived': { bg: 'bg-gray-100', text: 'text-gray-700' }
    };

    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority: string | number) => {
    const priorityStr = typeof priority === 'number' ? (priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low') : priority;
    const config: Record<string, { bg: string; text: string }> = {
      'high': { bg: 'bg-red-100', text: 'text-red-700' },
      'High': { bg: 'bg-red-100', text: 'text-red-700' },
      'Critical': { bg: 'bg-red-100', text: 'text-red-700' },
      'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'Medium': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      'low': { bg: 'bg-green-100', text: 'text-green-700' },
      'Low': { bg: 'bg-green-100', text: 'text-green-700' }
    };

    const priorityConfig = config[priorityStr] || { bg: 'bg-gray-100', text: 'text-gray-700' };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityConfig.bg} ${priorityConfig.text}`}>
        {priorityStr}
      </span>
    );
  };

  const totalItems =
    traceabilityData.rallyItems.length +
    traceabilityData.jiraIssues.length +
    traceabilityData.maximoWorkOrders.length +
    traceabilityData.mergeRequests.length +
    traceabilityData.commits.length +
    traceabilityData.confluencePages.length +
    traceabilityData.sharePointDocuments.length;

  const filters = [
    { id: 'all', label: 'Todos', count: totalItems },
    { id: 'rally', label: 'Rally', count: traceabilityData.rallyItems.length },
    { id: 'jira', label: 'Jira', count: traceabilityData.jiraIssues.length },
    { id: 'maximo', label: 'Maximo', count: traceabilityData.maximoWorkOrders.length },
    { id: 'git', label: 'Git/MR', count: traceabilityData.mergeRequests.length + traceabilityData.commits.length },
    { id: 'confluence', label: 'Confluence', count: traceabilityData.confluencePages.length },
    { id: 'sharepoint', label: 'SharePoint', count: traceabilityData.sharePointDocuments.length }
  ];

  const shouldShowSection = (sectionId: string) => {
    return activeFilter === 'all' || activeFilter === sectionId;
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Trazabilidad del Proyecto</h2>
            <p className="text-gray-600">
              Visualiza y busca información del proyecto en Rally, Jira, Maximo, Git, Confluence y SharePoint
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">{totalItems} elementos</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por ID, título, autor, etiquetas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="h-5 w-5 text-gray-400 flex-shrink-0" />
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label} <span className="ml-1 opacity-75">({filter.count})</span>
          </button>
        ))}
      </div>

      {/* Rally Items */}
      {shouldShowSection('rally') && traceabilityData.rallyItems.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('rally')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Trello className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Rally</h3>
                <p className="text-sm text-gray-500">{traceabilityData.rallyItems.length} elementos</p>
              </div>
            </div>
            <CheckCircle2 className={`h-5 w-5 transition-transform ${expandedSections.has('rally') ? 'rotate-180' : ''}`} />
          </div>

          {expandedSections.has('rally') && (
            <div className="border-t divide-y">
              {traceabilityData.rallyItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-mono text-sm font-medium text-blue-600">{item.id}</span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {item.type}
                        </span>
                        {getStatusBadge(item.status)}
                        {getPriorityBadge(item.priority)}
                      </div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">{item.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{item.owner}</span>
                        </div>
                        {item.iteration && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{item.iteration}</span>
                          </div>
                        )}
                        {item.points && (
                          <div className="flex items-center space-x-1">
                            <Tag className="h-4 w-4" />
                            <span>{item.points} pts</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(item.lastUpdated)}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Jira Issues */}
      {shouldShowSection('jira') && traceabilityData.jiraIssues.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('jira')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <ExternalLink className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Jira</h3>
                <p className="text-sm text-gray-500">{traceabilityData.jiraIssues.length} issues</p>
              </div>
            </div>
            <CheckCircle2 className={`h-5 w-5 transition-transform ${expandedSections.has('jira') ? 'rotate-180' : ''}`} />
          </div>

          {expandedSections.has('jira') && (
            <div className="border-t divide-y">
              {traceabilityData.jiraIssues.map((issue) => (
                <div key={issue.key} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-mono text-sm font-medium text-blue-600">{issue.key}</span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {issue.type}
                        </span>
                        {getStatusBadge(issue.status)}
                        {getPriorityBadge(issue.priority)}
                      </div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">{issue.summary}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{issue.assignee}</span>
                        </div>
                        {issue.sprint && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{issue.sprint}</span>
                          </div>
                        )}
                        {issue.storyPoints && (
                          <div className="flex items-center space-x-1">
                            <Tag className="h-4 w-4" />
                            <span>{issue.storyPoints} pts</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(issue.updated)}</span>
                        </div>
                      </div>
                      {issue.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {issue.labels.map((label) => (
                            <span key={label} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Maximo Work Orders */}
      {shouldShowSection('maximo') && traceabilityData.maximoWorkOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('maximo')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Wrench className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Maximo</h3>
                <p className="text-sm text-gray-500">{traceabilityData.maximoWorkOrders.length} órdenes de trabajo</p>
              </div>
            </div>
            <CheckCircle2 className={`h-5 w-5 transition-transform ${expandedSections.has('maximo') ? 'rotate-180' : ''}`} />
          </div>

          {expandedSections.has('maximo') && (
            <div className="border-t divide-y">
              {traceabilityData.maximoWorkOrders.map((wo) => (
                <div key={wo.wonum} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-mono text-sm font-medium text-blue-600">{wo.wonum}</span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {wo.workType}
                        </span>
                        {getStatusBadge(wo.status)}
                        {getPriorityBadge(wo.priority)}
                      </div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">{wo.description}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{wo.owner}</span>
                        </div>
                        {wo.targetStart && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Inicio: {formatDate(wo.targetStart)}</span>
                          </div>
                        )}
                        {wo.targetFinish && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Fin: {formatDate(wo.targetFinish)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href={wo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Merge Requests & Commits */}
      {shouldShowSection('git') && (traceabilityData.mergeRequests.length > 0 || traceabilityData.commits.length > 0) && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('git')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <GitMerge className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Git / Merge Requests</h3>
                <p className="text-sm text-gray-500">
                  {traceabilityData.mergeRequests.length} MRs, {traceabilityData.commits.length} commits
                </p>
              </div>
            </div>
            <CheckCircle2 className={`h-5 w-5 transition-transform ${expandedSections.has('git') ? 'rotate-180' : ''}`} />
          </div>

          {expandedSections.has('git') && (
            <div className="border-t">
              {/* Merge Requests */}
              {traceabilityData.mergeRequests.length > 0 && (
                <div className="divide-y">
                  <div className="p-3 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700">Merge Requests</h4>
                  </div>
                  {traceabilityData.mergeRequests.map((mr) => (
                    <div key={mr.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-mono text-sm font-medium text-blue-600">{mr.id}</span>
                            {getStatusBadge(mr.status)}
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <span className="text-green-600">+{mr.additions}</span>
                              <span className="text-red-600">-{mr.deletions}</span>
                            </div>
                          </div>
                          <h4 className="text-base font-medium text-gray-900 mb-2">{mr.title}</h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{mr.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitMerge className="h-4 w-4" />
                              <span className="font-mono text-xs">{mr.sourceBranch} → {mr.targetBranch}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <GitCommit className="h-4 w-4" />
                              <span>{mr.commits} commits</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>{mr.approvals}/{mr.reviewers.length} aprobaciones</span>
                            </div>
                          </div>
                          {mr.linkedIssues.length > 0 && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Issues vinculados:</span>
                              <div className="flex flex-wrap gap-1">
                                {mr.linkedIssues.map((issue) => (
                                  <span key={issue} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded font-mono">
                                    {issue}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <a
                          href={mr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Commits */}
              {traceabilityData.commits.length > 0 && (
                <div className="divide-y">
                  <div className="p-3 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700">Recent Commits</h4>
                  </div>
                  {traceabilityData.commits.map((commit) => (
                    <div key={commit.sha} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-mono text-xs font-medium text-gray-500">{commit.sha}</span>
                            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded font-mono">
                              {commit.branch}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 mb-2">{commit.message}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{commit.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(commit.date)}</span>
                            </div>
                            {commit.linkedIssues.length > 0 && (
                              <div className="flex items-center space-x-1">
                                {commit.linkedIssues.map((issue) => (
                                  <span key={issue} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-mono">
                                    {issue}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <a
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Confluence Pages */}
      {shouldShowSection('confluence') && traceabilityData.confluencePages.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('confluence')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confluence</h3>
                <p className="text-sm text-gray-500">{traceabilityData.confluencePages.length} páginas</p>
              </div>
            </div>
            <CheckCircle2 className={`h-5 w-5 transition-transform ${expandedSections.has('confluence') ? 'rotate-180' : ''}`} />
          </div>

          {expandedSections.has('confluence') && (
            <div className="border-t divide-y">
              {traceabilityData.confluencePages.map((page) => (
                <div key={page.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
                          {page.space}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {page.type}
                        </span>
                        {getStatusBadge(page.status)}
                        <span className="text-xs text-gray-500">v{page.version}</span>
                      </div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">{page.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{page.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(page.lastModified)}</span>
                        </div>
                      </div>
                      {page.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {page.labels.map((label) => (
                            <span key={label} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SharePoint Documents */}
      {shouldShowSection('sharepoint') && traceabilityData.sharePointDocuments.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection('sharepoint')}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <FolderOpen className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">SharePoint</h3>
                <p className="text-sm text-gray-500">{traceabilityData.sharePointDocuments.length} documentos</p>
              </div>
            </div>
            <CheckCircle2 className={`h-5 w-5 transition-transform ${expandedSections.has('sharepoint') ? 'rotate-180' : ''}`} />
          </div>

          {expandedSections.has('sharepoint') && (
            <div className="border-t divide-y">
              {traceabilityData.sharePointDocuments.map((doc) => (
                <div key={doc.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{doc.name}</span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {doc.type}
                        </span>
                        <span className="text-xs text-gray-500">v{doc.version}</span>
                        <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <FolderOpen className="h-4 w-4" />
                          <span className="font-mono text-xs">{doc.site} / {doc.library}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{doc.modifiedBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(doc.modified)}</span>
                        </div>
                      </div>
                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {searchQuery && totalItems === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

