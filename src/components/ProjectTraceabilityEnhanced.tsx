import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  User,
  Clock,
  X,
  Tag,
  Link as LinkIcon,
  Share2,
  Activity as ActivityIcon,
  GitMerge,
  GitCommit,
  AlertCircle,
  Layers
} from 'lucide-react';
import { mockTraceabilityData } from '../data/traceability';

interface ProjectTraceabilityEnhancedProps {
  projectId: string;
}

type ViewMode = 'relationships' | 'timeline' | 'by-system';
type TimelineEvent = {
  id: string;
  type: 'rally' | 'jira' | 'maximo' | 'mr' | 'commit' | 'confluence' | 'sharepoint';
  title: string;
  date: Date;
  author: string;
  status?: string;
  linkedTo: string[];
  url: string;
  icon: React.ReactNode;
};

export const ProjectTraceabilityEnhanced: React.FC<ProjectTraceabilityEnhancedProps> = ({ projectId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('relationships');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const traceabilityData = mockTraceabilityData[projectId];

  // Construir grafo de relaciones
  const relationshipGraph = useMemo(() => {
    if (!traceabilityData) return new Map();

    const graph = new Map<string, Set<string>>();

    // Helper para extraer IDs de texto
    const extractIds = (text: string): string[] => {
      const patterns = [
        /\b(US\d+)\b/gi,           // US12345
        /\b(DE\d+)\b/gi,           // DE67890
        /\b(ECOM-\d+)\b/gi,        // ECOM-234
        /\b(MR-\d+)\b/gi,          // MR-456
        /\b(WO-\d+-\d+)\b/gi,      // WO-2024-001
        /\b(CONF-\d+)\b/gi,        // CONF-123
        /\b(SP-\d+)\b/gi           // SP-001
      ];

      const ids = new Set<string>();
      patterns.forEach(pattern => {
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          ids.add(match[1].toUpperCase());
        }
      });

      return Array.from(ids);
    };

    // Helper para vincular items
    const linkItems = (itemId: string, linkedIds: string[]) => {
      if (!graph.has(itemId)) graph.set(itemId, new Set());
      linkedIds.forEach(linkedId => {
        if (!graph.has(linkedId)) graph.set(linkedId, new Set());
        graph.get(itemId)!.add(linkedId);
        graph.get(linkedId)!.add(itemId); // Bidireccional
      });
    };

    // Relaciones desde MRs
    traceabilityData.mergeRequests.forEach(mr => {
      linkItems(mr.id, mr.linkedIssues);
    });

    // Relaciones desde Commits
    traceabilityData.commits.forEach(commit => {
      linkItems(commit.sha, commit.linkedIssues);
    });

    // Relaciones desde Maximo (extraer de descripción)
    traceabilityData.maximoWorkOrders.forEach(wo => {
      const linkedIds = extractIds(wo.description);
      if (linkedIds.length > 0) {
        linkItems(wo.wonum, linkedIds);
      }
    });

    // Relaciones desde Confluence (extraer de labels)
    traceabilityData.confluencePages.forEach(page => {
      const linkedIds = page.labels.flatMap(label => extractIds(label));
      if (linkedIds.length > 0) {
        linkItems(page.id, linkedIds);
      }
    });

    // Relaciones desde SharePoint (extraer de tags y nombre)
    traceabilityData.sharePointDocuments.forEach(doc => {
      const linkedIds = [
        ...doc.tags.flatMap(tag => extractIds(tag)),
        ...extractIds(doc.name)
      ];
      if (linkedIds.length > 0) {
        linkItems(doc.id, linkedIds);
      }
    });

    return graph;
  }, [traceabilityData]);

  // Crear timeline unificado
  const timeline = useMemo((): TimelineEvent[] => {
    if (!traceabilityData) return [];

    const events: TimelineEvent[] = [];

    // Rally items
    traceabilityData.rallyItems.forEach(item => {
      events.push({
        id: item.id,
        type: 'rally',
        title: item.title,
        date: new Date(item.lastUpdated),
        author: item.owner,
        status: item.status,
        linkedTo: Array.from(relationshipGraph.get(item.id) || []),
        url: item.url,
        icon: <Tag className="h-4 w-4" />
      });
    });

    // Jira issues
    traceabilityData.jiraIssues.forEach(issue => {
      events.push({
        id: issue.key,
        type: 'jira',
        title: issue.summary,
        date: new Date(issue.updated),
        author: issue.assignee,
        status: issue.status,
        linkedTo: Array.from(relationshipGraph.get(issue.key) || []),
        url: issue.url,
        icon: <AlertCircle className="h-4 w-4" />
      });
    });

    // Maximo Work Orders
    traceabilityData.maximoWorkOrders.forEach(wo => {
      events.push({
        id: wo.wonum,
        type: 'maximo',
        title: wo.description,
        date: new Date(wo.targetStart || wo.actualStart || Date.now()),
        author: wo.owner,
        status: wo.status,
        linkedTo: Array.from(relationshipGraph.get(wo.wonum) || []),
        url: wo.url,
        icon: <Tag className="h-4 w-4" />
      });
    });

    // Merge Requests
    traceabilityData.mergeRequests.forEach(mr => {
      events.push({
        id: mr.id,
        type: 'mr',
        title: mr.title,
        date: new Date(mr.updatedAt),
        author: mr.author,
        status: mr.status,
        linkedTo: mr.linkedIssues,
        url: mr.url,
        icon: <GitMerge className="h-4 w-4" />
      });
    });

    // Commits
    traceabilityData.commits.forEach(commit => {
      events.push({
        id: commit.sha,
        type: 'commit',
        title: commit.message,
        date: new Date(commit.date),
        author: commit.author,
        linkedTo: commit.linkedIssues,
        url: commit.url,
        icon: <GitCommit className="h-4 w-4" />
      });
    });

    // Confluence Pages
    traceabilityData.confluencePages.forEach(page => {
      events.push({
        id: page.id,
        type: 'confluence',
        title: page.title,
        date: new Date(page.lastModified),
        author: page.author,
        status: page.status,
        linkedTo: Array.from(relationshipGraph.get(page.id) || []),
        url: page.url,
        icon: <Tag className="h-4 w-4" />
      });
    });

    // SharePoint Documents
    traceabilityData.sharePointDocuments.forEach(doc => {
      events.push({
        id: doc.id,
        type: 'sharepoint',
        title: doc.name,
        date: new Date(doc.modified),
        author: doc.modifiedBy,
        linkedTo: Array.from(relationshipGraph.get(doc.id) || []),
        url: doc.url,
        icon: <Tag className="h-4 w-4" />
      });
    });

    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [traceabilityData, relationshipGraph]);

  if (!traceabilityData) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Traceability Data</h3>
        <p className="text-gray-500">No traceability information available for this project.</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'rally': 'bg-orange-100 text-orange-700 border-orange-200',
      'jira': 'bg-blue-100 text-blue-700 border-blue-200',
      'maximo': 'bg-green-100 text-green-700 border-green-200',
      'mr': 'bg-purple-100 text-purple-700 border-purple-200',
      'commit': 'bg-gray-100 text-gray-700 border-gray-200',
      'confluence': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'sharepoint': 'bg-cyan-100 text-cyan-700 border-cyan-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const totalConnections = Array.from(relationshipGraph.values()).reduce((sum, set) => sum + set.size, 0) / 2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Trazabilidad del Proyecto</h2>
            <p className="text-gray-600">
              Visualiza relaciones y correlaciones entre Rally, Jira, Git, y más
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Share2 className="h-4 w-4" />
              <span className="font-medium">{totalConnections} conexiones</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ActivityIcon className="h-4 w-4" />
              <span className="font-medium">{timeline.length} eventos</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por ID, título, autor..."
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

      {/* View Mode Selector */}
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border p-2">
        <button
          onClick={() => setViewMode('relationships')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'relationships'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Share2 className="h-4 w-4" />
          <span>Vista de Relaciones</span>
        </button>
        <button
          onClick={() => setViewMode('timeline')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'timeline'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Timeline</span>
        </button>
        <button
          onClick={() => setViewMode('by-system')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'by-system'
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Por Sistema</span>
        </button>
      </div>

      {/* Content */}
      {viewMode === 'relationships' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-blue-600" />
              <span>Mapa de Relaciones</span>
            </h3>

            {/* Groups of related items */}
            {timeline.filter(e => e.linkedTo.length > 0).map((event) => (
              <div key={event.id} className="mb-6 last:mb-0">
                <div className="flex items-start space-x-4">
                  {/* Main item */}
                  <div className="flex-1">
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedItem === event.id 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow'
                      }`}
                      onClick={() => setSelectedItem(selectedItem === event.id ? null : event.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded border ${getTypeColor(event.type)}`}>
                              {event.type.toUpperCase()}
                            </span>
                            <span className="font-mono text-sm font-medium text-blue-600">{event.id}</span>
                            {event.linkedTo.length > 0 && (
                              <span className="flex items-center space-x-1 text-xs text-gray-500">
                                <LinkIcon className="h-3 w-3" />
                                <span>{event.linkedTo.length} vinculado(s)</span>
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-medium text-gray-900 mb-2">{event.title}</h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{event.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                          </div>
                        </div>
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>
                    </div>

                    {/* Related items */}
                    {event.linkedTo.length > 0 && (
                      <div className="ml-8 mt-3 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="w-px h-6 bg-gray-300"></div>
                          <Share2 className="h-4 w-4" />
                          <span className="font-medium">Vinculado a:</span>
                        </div>
                        <div className="ml-8 space-y-2">
                          {event.linkedTo.map((linkedId) => {
                            const linkedEvent = timeline.find(e => e.id === linkedId);
                            if (!linkedEvent) {
                              return (
                                <div key={linkedId} className="flex items-center space-x-2 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                  <span className="font-mono text-blue-600">{linkedId}</span>
                                </div>
                              );
                            }
                            return (
                              <div
                                key={linkedId}
                                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                                onClick={() => setSelectedItem(linkedId)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(linkedEvent.type)}`}>
                                      {linkedEvent.type}
                                    </span>
                                    <span className="font-mono text-xs text-gray-700">{linkedEvent.id}</span>
                                    <span className="text-sm text-gray-900">{linkedEvent.title}</span>
                                  </div>
                                  <a
                                    href={linkedEvent.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-600"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {timeline.filter(e => e.linkedTo.length > 0).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <LinkIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No se encontraron relaciones entre items</p>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'timeline' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Timeline Unificado</span>
            </h3>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={event.id} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(event.type)}`}>
                      {event.icon}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-px h-full bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(event.type)}`}>
                              {event.type}
                            </span>
                            <span className="font-mono text-sm font-medium text-blue-600">{event.id}</span>
                            {event.linkedTo.length > 0 && (
                              <span className="flex items-center space-x-1 text-xs text-gray-500">
                                <LinkIcon className="h-3 w-3" />
                                <span>{event.linkedTo.length}</span>
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-medium text-gray-900 mb-2">{event.title}</h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{event.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            {event.status && (
                              <span className="px-2 py-0.5 text-xs bg-white rounded border border-gray-300">
                                {event.status}
                              </span>
                            )}
                          </div>
                          {event.linkedTo.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {event.linkedTo.map(link => (
                                <span key={link} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded font-mono">
                                  {link}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'by-system' && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Vista por Sistema</h3>
          <p className="text-gray-500">Esta vista está disponible en el componente original</p>
        </div>
      )}
    </div>
  );
};

