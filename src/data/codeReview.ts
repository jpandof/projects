export interface CodeReviewSuggestion {
  id: string;
  type: 'security' | 'performance' | 'maintainability' | 'best-practice' | 'bug' | 'style';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  file: string;
  line: number;
  column?: number;
  originalCode: string;
  suggestedCode?: string;
  reasoning: string;
  stackSpecific: boolean;
  autoFixable: boolean;
  confidence: number; // 0-100
  tags: string[];
}

export interface CodeReviewAnalysis {
  id: string;
  projectId: string;
  mergeRequestId: string;
  status: 'analyzing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  stack: string;
  filesAnalyzed: number;
  linesAnalyzed: number;
  suggestions: CodeReviewSuggestion[];
  overallScore: number; // 0-100
  metrics: {
    security: number;
    performance: number;
    maintainability: number;
    testCoverage: number;
    complexity: number;
  };
  aiModel: string;
  processingTime: number; // seconds
}

export interface CodeReviewRule {
  id: string;
  name: string;
  description: string;
  stack: string[];
  type: CodeReviewSuggestion['type'];
  severity: CodeReviewSuggestion['severity'];
  pattern: string;
  suggestion: string;
  enabled: boolean;
  autoFix: boolean;
}

export interface AIReviewSettings {
  projectId: string;
  enabled: boolean;
  autoReview: boolean;
  minConfidence: number;
  enabledRules: string[];
  customRules: CodeReviewRule[];
  aiModel: 'gpt-4' | 'claude-3' | 'codellama' | 'custom';
  reviewOnPush: boolean;
  reviewOnMR: boolean;
  blockMergeOnCritical: boolean;
  notifyTeam: boolean;
}

// Mock data
export const mockCodeReviewAnalyses: CodeReviewAnalysis[] = [
  {
    id: 'review-001',
    projectId: 'proj-001',
    mergeRequestId: 'mr-001',
    status: 'completed',
    createdAt: '2024-01-15T14:30:00Z',
    completedAt: '2024-01-15T14:32:30Z',
    stack: 'react',
    filesAnalyzed: 12,
    linesAnalyzed: 847,
    overallScore: 78,
    aiModel: 'gpt-4',
    processingTime: 150,
    metrics: {
      security: 85,
      performance: 72,
      maintainability: 80,
      testCoverage: 65,
      complexity: 75
    },
    suggestions: [
      {
        id: 'sugg-001',
        type: 'security',
        severity: 'high',
        title: 'Potential XSS vulnerability in user input',
        description: 'User input is being rendered without proper sanitization, which could lead to XSS attacks.',
        file: 'src/components/UserProfile.tsx',
        line: 45,
        column: 12,
        originalCode: '<div dangerouslySetInnerHTML={{__html: userBio}} />',
        suggestedCode: '<div>{DOMPurify.sanitize(userBio)}</div>',
        reasoning: 'Using dangerouslySetInnerHTML with unsanitized user input is a security risk. Consider using DOMPurify or rendering as text.',
        stackSpecific: true,
        autoFixable: true,
        confidence: 92,
        tags: ['xss', 'security', 'react', 'user-input']
      },
      {
        id: 'sugg-002',
        type: 'performance',
        severity: 'medium',
        title: 'Unnecessary re-renders due to inline object creation',
        description: 'Creating objects inline in JSX props causes unnecessary re-renders.',
        file: 'src/components/ProductList.tsx',
        line: 28,
        column: 8,
        originalCode: '<ProductCard style={{margin: "10px"}} product={product} />',
        suggestedCode: 'const cardStyle = {margin: "10px"};\n<ProductCard style={cardStyle} product={product} />',
        reasoning: 'Inline object creation in JSX props creates a new object on every render, causing child components to re-render unnecessarily.',
        stackSpecific: true,
        autoFixable: true,
        confidence: 88,
        tags: ['performance', 'react', 'optimization', 'memoization']
      },
      {
        id: 'sugg-003',
        type: 'best-practice',
        severity: 'medium',
        title: 'Missing error boundary for async component',
        description: 'Async components should be wrapped with error boundaries to handle failures gracefully.',
        file: 'src/pages/Dashboard.tsx',
        line: 67,
        column: 4,
        originalCode: '<AsyncDataComponent />',
        suggestedCode: '<ErrorBoundary fallback={<ErrorFallback />}>\n  <AsyncDataComponent />\n</ErrorBoundary>',
        reasoning: 'Async components can fail and should be wrapped with error boundaries to provide better user experience.',
        stackSpecific: true,
        autoFixable: false,
        confidence: 75,
        tags: ['error-handling', 'react', 'async', 'user-experience']
      },
      {
        id: 'sugg-004',
        type: 'maintainability',
        severity: 'low',
        title: 'Consider extracting complex logic to custom hook',
        description: 'Complex state logic in component could be extracted to a custom hook for better reusability.',
        file: 'src/components/ShoppingCart.tsx',
        line: 15,
        column: 2,
        originalCode: 'const [items, setItems] = useState([]);\nconst [total, setTotal] = useState(0);\n// ... 20 more lines of cart logic',
        suggestedCode: 'const { items, total, addItem, removeItem, clearCart } = useShoppingCart();',
        reasoning: 'Complex state logic spanning multiple lines could be extracted to a custom hook for better organization and reusability.',
        stackSpecific: true,
        autoFixable: false,
        confidence: 70,
        tags: ['maintainability', 'react', 'hooks', 'refactoring']
      },
      {
        id: 'sugg-005',
        type: 'bug',
        severity: 'high',
        title: 'Potential memory leak in useEffect',
        description: 'Missing cleanup function in useEffect with subscription could cause memory leaks.',
        file: 'src/hooks/useWebSocket.ts',
        line: 23,
        column: 4,
        originalCode: 'useEffect(() => {\n  const ws = new WebSocket(url);\n  ws.onmessage = handleMessage;\n}, [url]);',
        suggestedCode: 'useEffect(() => {\n  const ws = new WebSocket(url);\n  ws.onmessage = handleMessage;\n  return () => ws.close();\n}, [url]);',
        reasoning: 'WebSocket connections should be properly closed in the cleanup function to prevent memory leaks.',
        stackSpecific: true,
        autoFixable: true,
        confidence: 95,
        tags: ['memory-leak', 'react', 'websocket', 'cleanup']
      }
    ]
  },
  {
    id: 'review-002',
    projectId: 'proj-002',
    mergeRequestId: 'mr-002',
    status: 'analyzing',
    createdAt: '2024-01-15T15:45:00Z',
    stack: 'java',
    filesAnalyzed: 8,
    linesAnalyzed: 1240,
    overallScore: 0,
    aiModel: 'claude-3',
    processingTime: 0,
    metrics: {
      security: 0,
      performance: 0,
      maintainability: 0,
      testCoverage: 0,
      complexity: 0
    },
    suggestions: []
  }
];

export const mockCodeReviewRules: CodeReviewRule[] = [
  {
    id: 'rule-001',
    name: 'React XSS Prevention',
    description: 'Detect potential XSS vulnerabilities in React components',
    stack: ['react'],
    type: 'security',
    severity: 'high',
    pattern: 'dangerouslySetInnerHTML.*userInput|innerHTML.*userInput',
    suggestion: 'Use DOMPurify.sanitize() or render as text to prevent XSS',
    enabled: true,
    autoFix: true
  },
  {
    id: 'rule-002',
    name: 'Java SQL Injection Prevention',
    description: 'Detect potential SQL injection vulnerabilities',
    stack: ['java'],
    type: 'security',
    severity: 'critical',
    pattern: 'Statement.*executeQuery.*\\+|createQuery.*\\+',
    suggestion: 'Use PreparedStatement or parameterized queries',
    enabled: true,
    autoFix: false
  },
  {
    id: 'rule-003',
    name: 'React Performance - Inline Objects',
    description: 'Detect inline object creation in JSX props',
    stack: ['react'],
    type: 'performance',
    severity: 'medium',
    pattern: 'style=\\{\\{.*\\}\\}|onClick=\\{\\(\\).*\\}',
    suggestion: 'Extract objects and functions to avoid unnecessary re-renders',
    enabled: true,
    autoFix: true
  },
  {
    id: 'rule-004',
    name: 'Missing Error Handling',
    description: 'Detect async operations without proper error handling',
    stack: ['react', 'node', 'java', 'python', 'go'],
    type: 'best-practice',
    severity: 'medium',
    pattern: 'await.*fetch|async.*function.*{(?!.*catch)',
    suggestion: 'Add try-catch blocks for async operations',
    enabled: true,
    autoFix: false
  }
];

export const mockAIReviewSettings: Record<string, AIReviewSettings> = {
  'proj-001': {
    projectId: 'proj-001',
    enabled: true,
    autoReview: true,
    minConfidence: 70,
    enabledRules: ['rule-001', 'rule-003', 'rule-004'],
    customRules: [],
    aiModel: 'gpt-4',
    reviewOnPush: false,
    reviewOnMR: true,
    blockMergeOnCritical: true,
    notifyTeam: true
  },
  'proj-002': {
    projectId: 'proj-002',
    enabled: true,
    autoReview: false,
    minConfidence: 80,
    enabledRules: ['rule-002', 'rule-004'],
    customRules: [],
    aiModel: 'claude-3',
    reviewOnPush: true,
    reviewOnMR: true,
    blockMergeOnCritical: false,
    notifyTeam: false
  }
};