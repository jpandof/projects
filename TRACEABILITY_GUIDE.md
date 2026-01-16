# Guía de Trazabilidad del Proyecto

## Descripción General

La nueva pestaña de **Trazabilidad** permite visualizar y buscar información del proyecto a través de múltiples sistemas empresariales, proporcionando una vista unificada de:

- **Rally** - Historias de usuario, defectos, tareas y features
- **Jira** - Issues, bugs, stories, epics y subtasks
- **Maximo** - Órdenes de trabajo y mantenimiento
- **Git/MR** - Merge Requests y Commits
- **Confluence** - Documentación y páginas wiki
- **SharePoint** - Documentos y archivos compartidos

## Arquitectura

### Estructura de Archivos

```
src/
├── types/
│   └── traceability.ts          # Tipos TypeScript para todos los sistemas
├── data/
│   └── traceability.ts          # Datos mock y función de búsqueda
└── components/
    └── ProjectTraceability.tsx  # Componente principal de UI
```

### Tipos de Datos

#### Rally
```typescript
interface RallyItem {
  id: string;
  type: 'user-story' | 'defect' | 'task' | 'feature';
  title: string;
  status: 'backlog' | 'in-progress' | 'testing' | 'done' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  owner: string;
  iteration?: string;
  points?: number;
  url: string;
  createdDate: string;
  lastUpdated: string;
}
```

#### Jira
```typescript
interface JiraIssue {
  key: string;
  type: 'story' | 'bug' | 'task' | 'epic' | 'subtask';
  summary: string;
  status: string;
  priority: string;
  assignee: string;
  reporter: string;
  sprint?: string;
  storyPoints?: number;
  url: string;
  created: string;
  updated: string;
  labels: string[];
}
```

#### Maximo
```typescript
interface MaximoWorkOrder {
  wonum: string;
  description: string;
  status: 'WAPPR' | 'INPRG' | 'COMP' | 'CLOSE' | 'WMATL' | 'WSCH';
  priority: number;
  workType: string;
  owner: string;
  targetStart?: string;
  targetFinish?: string;
  actualStart?: string;
  actualFinish?: string;
  url: string;
}
```

#### Git/MR
```typescript
interface MergeRequest {
  id: string;
  title: string;
  status: 'open' | 'merged' | 'closed' | 'draft';
  author: string;
  sourceBranch: string;
  targetBranch: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  mergedAt?: string;
  commits: number;
  additions: number;
  deletions: number;
  reviewers: string[];
  approvals: number;
  linkedIssues: string[]; // Referencias a Rally/Jira
}

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
  branch: string;
  linkedIssues: string[]; // Referencias a Rally/Jira
}
```

#### Confluence
```typescript
interface ConfluencePage {
  id: string;
  title: string;
  space: string;
  type: 'page' | 'blog';
  status: 'current' | 'draft' | 'archived';
  author: string;
  url: string;
  created: string;
  lastModified: string;
  version: number;
  labels: string[];
}
```

#### SharePoint
```typescript
interface SharePointDocument {
  id: string;
  name: string;
  type: 'document' | 'spreadsheet' | 'presentation' | 'pdf' | 'other';
  site: string;
  library: string;
  path: string;
  url: string;
  createdBy: string;
  modifiedBy: string;
  created: string;
  modified: string;
  size: number;
  version: string;
  tags: string[];
}
```

## Funcionalidades

### 1. Búsqueda Unificada

La barra de búsqueda permite buscar en todos los sistemas simultáneamente por:
- IDs de elementos (US12345, ECOM-234, WO-2024-001, etc.)
- Títulos y descripciones
- Nombres de autores/propietarios
- Etiquetas y tags

```typescript
const searchTraceability = (projectId: string, query: string): ProjectTraceability | null
```

### 2. Filtros por Sistema

Botones de filtro rápido para mostrar solo elementos de sistemas específicos:
- **Todos** - Muestra todos los sistemas
- **Rally** - Solo items de Rally
- **Jira** - Solo issues de Jira
- **Maximo** - Solo órdenes de trabajo
- **Git/MR** - Merge requests y commits
- **Confluence** - Páginas de documentación
- **SharePoint** - Documentos

### 3. Secciones Expandibles/Colapsables

Cada sistema tiene su propia sección que puede expandirse o colapsarse para mejor organización visual.

### 4. Enlaces Directos

Cada elemento tiene un botón de enlace externo que abre el item en su sistema original.

### 5. Información Contextual

Cada tipo de elemento muestra información relevante:
- **Estados** con colores (badges)
- **Prioridades**
- **Fechas** de creación y actualización
- **Propietarios/Autores**
- **Etiquetas y labels**
- **Referencias cruzadas** entre sistemas

## Integración con APIs Reales

Para integrar con APIs reales, necesitarás:

### 1. Rally API

```typescript
// Ejemplo de integración
const fetchRallyItems = async (projectId: string) => {
  const response = await fetch(`https://rally1.rallydev.com/slm/webservice/v2.0/userstory`, {
    headers: {
      'Authorization': `Bearer ${RALLY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `(Project.ObjectID = "${projectId}")`
    })
  });
  return response.json();
};
```

### 2. Jira API

```typescript
const fetchJiraIssues = async (projectKey: string) => {
  const response = await fetch(
    `https://your-domain.atlassian.net/rest/api/3/search?jql=project=${projectKey}`,
    {
      headers: {
        'Authorization': `Basic ${btoa(`${email}:${apiToken}`)}`,
        'Accept': 'application/json'
      }
    }
  );
  return response.json();
};
```

### 3. Maximo API

```typescript
const fetchMaximoWorkOrders = async (projectId: string) => {
  const response = await fetch(
    `https://maximo-host/maximo/oslc/os/mxwo?oslc.where=project="${projectId}"`,
    {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        'Accept': 'application/json'
      }
    }
  );
  return response.json();
};
```

### 4. Git/GitHub/GitLab API

```typescript
const fetchMergeRequests = async (repoUrl: string) => {
  // Para GitHub
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  );
  return response.json();
};
```

### 5. Confluence API

```typescript
const fetchConfluencePages = async (spaceKey: string) => {
  const response = await fetch(
    `https://your-domain.atlassian.net/wiki/rest/api/content?spaceKey=${spaceKey}&label=${projectLabel}`,
    {
      headers: {
        'Authorization': `Basic ${btoa(`${email}:${apiToken}`)}`,
        'Accept': 'application/json'
      }
    }
  );
  return response.json();
};
```

### 6. SharePoint API (Microsoft Graph)

```typescript
const fetchSharePointDocuments = async (siteId: string, driveId: string) => {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root/children`,
    {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    }
  );
  return response.json();
};
```

## Estrategia de Búsqueda

### Por ID del Proyecto

Cada sistema debe tener una forma de vincular elementos al proyecto:

1. **Rally/Jira**: Usar el campo de proyecto o etiquetas específicas
2. **Maximo**: Campo de proyecto en las órdenes de trabajo
3. **Git**: Usar el repositorio URL del proyecto
4. **Confluence**: Usar labels o metadata personalizado
5. **SharePoint**: Usar metadata de columnas o estructura de carpetas

### Por Referencias Cruzadas

Los commits y MRs pueden referenciar issues usando patrones como:
- `ECOM-234` (Jira)
- `US12345` (Rally)
- `#123` (GitHub issues)

Esto permite crear un grafo de dependencias entre elementos.

## Mejores Prácticas

### 1. Caché de Datos

Implementar caché para evitar llamadas excesivas a las APIs:

```typescript
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};
```

### 2. Paginación

Para proyectos grandes, implementar paginación:

```typescript
const fetchPaginated = async (url: string, page: number, pageSize: number) => {
  // Implementación específica por API
};
```

### 3. Manejo de Errores

Manejar errores de API de forma elegante:

```typescript
try {
  const data = await fetchRallyItems(projectId);
} catch (error) {
  console.error('Error fetching Rally items:', error);
  // Mostrar mensaje al usuario
  return [];
}
```

### 4. Actualización en Tiempo Real

Considerar WebSockets o polling para actualizaciones en tiempo real:

```typescript
const setupRealTimeUpdates = (projectId: string) => {
  const interval = setInterval(async () => {
    const updates = await checkForUpdates(projectId);
    if (updates) {
      // Actualizar UI
    }
  }, 30000); // Cada 30 segundos
  
  return () => clearInterval(interval);
};
```

## Personalización

### Añadir Nuevos Sistemas

Para añadir un nuevo sistema de trazabilidad:

1. **Crear el tipo** en `types/traceability.ts`
2. **Añadir datos mock** en `data/traceability.ts`
3. **Actualizar la interfaz** `ProjectTraceability`
4. **Crear sección UI** en `ProjectTraceability.tsx`
5. **Añadir al filtro** en el array de filtros
6. **Implementar búsqueda** en la función `searchTraceability`

### Ejemplo: Añadir ServiceNow

```typescript
// 1. Tipo
interface ServiceNowTicket {
  number: string;
  shortDescription: string;
  state: string;
  priority: number;
  assignedTo: string;
  createdOn: string;
  url: string;
}

// 2. Añadir a ProjectTraceability
export interface ProjectTraceability {
  // ...existing fields...
  serviceNowTickets: ServiceNowTicket[];
}

// 3. Componente UI
{shouldShowSection('servicenow') && traceabilityData.serviceNowTickets.length > 0 && (
  <div className="bg-white rounded-lg shadow-sm border">
    {/* Similar a las otras secciones */}
  </div>
)}
```

## Conclusión

El sistema de trazabilidad proporciona una vista unificada de todos los artefactos relacionados con un proyecto, facilitando:

- **Auditorías** - Ver todo el historial de cambios
- **Compliance** - Documentar decisiones y cambios
- **Colaboración** - Entender qué está haciendo cada persona
- **Planificación** - Ver el progreso en diferentes herramientas
- **Debugging** - Rastrear problemas desde el código hasta los tickets

La implementación actual usa datos mock, pero está diseñada para ser fácilmente integrable con APIs reales de cada sistema.

