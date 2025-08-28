export interface ProvisionItem {
  id: string;
  label: string;
  description: string;
  category: 'code-quality' | 'testing' | 'observability' | 'database' | 'messaging' | 'deployment' | 'security';
  versions?: string[];
  defaultVersion?: string;
}

export interface StackProvisions {
  stackId: string;
  items: ProvisionItem[];
}

export const provisions: StackProvisions[] = [
  {
    stackId: 'react',
    items: [
      {
        id: 'eslint-prettier',
        label: 'ESLint/Prettier',
        description: 'Code linting and formatting',
        category: 'code-quality',
        versions: ['latest', '8.57.0', '8.56.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'testing-library',
        label: 'Testing Library',
        description: 'React testing utilities',
        category: 'testing',
        versions: ['latest', '14.0.0', '13.4.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'playwright-e2e',
        label: 'Playwright e2e',
        description: 'End-to-end testing framework',
        category: 'testing'
      },
      {
        id: 'tailwind',
        label: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        category: 'code-quality',
        versions: ['latest', '3.4.0', '3.3.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'otel-web',
        label: 'OpenTelemetry Web',
        description: 'Web observability instrumentation',
        category: 'observability'
      }
    ]
  },
  {
    stackId: 'java',
    items: [
      {
        id: 'actuator',
        label: 'Spring Boot Actuator',
        description: 'Production-ready monitoring endpoints',
        category: 'observability'
      },
      {
        id: 'otel-sdk',
        label: 'OpenTelemetry SDK',
        description: 'Observability instrumentation SDK',
        category: 'observability',
        versions: ['1.33.0', '1.32.0', '1.31.0'],
        defaultVersion: '1.33.0'
      },
      {
        id: 'testcontainers',
        label: 'Testcontainers',
        description: 'Integration testing with Docker',
        category: 'testing',
        versions: ['1.19.3', '1.19.0', '1.18.0'],
        defaultVersion: '1.19.3'
      },
      {
        id: 'flyway',
        label: 'Flyway',
        description: 'Database migration tool',
        category: 'database',
        versions: ['9.22.0', '9.21.0', '9.20.0'],
        defaultVersion: '9.22.0'
      },
      {
        id: 'kafka-client',
        label: 'Kafka Client',
        description: 'Apache Kafka messaging client',
        category: 'messaging'
      }
    ]
  },
  {
    stackId: 'node',
    items: [
      {
        id: 'eslint-node',
        label: 'ESLint',
        description: 'JavaScript/TypeScript linting',
        category: 'code-quality',
        versions: ['latest', '8.57.0', '8.56.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'jest',
        label: 'Jest',
        description: 'JavaScript testing framework',
        category: 'testing',
        versions: ['29.7.0', '29.6.0', '29.5.0'],
        defaultVersion: '29.7.0'
      },
      {
        id: 'supertest',
        label: 'Supertest',
        description: 'HTTP integration testing',
        category: 'testing'
      },
      {
        id: 'pino-logger',
        label: 'Pino Logger',
        description: 'High-performance JSON logger',
        category: 'observability',
        versions: ['8.16.0', '8.15.0', '8.14.0'],
        defaultVersion: '8.16.0'
      },
      {
        id: 'otel-node',
        label: 'OpenTelemetry Node',
        description: 'Node.js observability instrumentation',
        category: 'observability'
      },
      {
        id: 'kafka-nats-client',
        label: 'Kafka/NATS Client',
        description: 'Message broker clients',
        category: 'messaging'
      }
    ]
  },
  {
    stackId: 'go',
    items: [
      {
        id: 'golangci-lint',
        label: 'golangci-lint',
        description: 'Go linters aggregator',
        category: 'code-quality',
        versions: ['v1.55.0', 'v1.54.0', 'v1.53.0'],
        defaultVersion: 'v1.55.0'
      },
      {
        id: 'zap-logger',
        label: 'Zap Logger',
        description: 'Structured logging library',
        category: 'observability'
      },
      {
        id: 'otel-go',
        label: 'OpenTelemetry Go',
        description: 'Go observability instrumentation',
        category: 'observability',
        versions: ['v1.21.0', 'v1.20.0', 'v1.19.0'],
        defaultVersion: 'v1.21.0'
      },
      {
        id: 'chi-gin-middlewares',
        label: 'Chi/Gin Middlewares',
        description: 'HTTP router middlewares',
        category: 'security'
      },
      {
        id: 'testcontainers-go',
        label: 'Testcontainers Go',
        description: 'Integration testing with Docker',
        category: 'testing'
      }
    ]
  },
  {
    stackId: 'python',
    items: [
      {
        id: 'ruff-black',
        label: 'Ruff/Black',
        description: 'Python linting and formatting',
        category: 'code-quality',
        versions: ['latest', '0.1.0', '0.0.9'],
        defaultVersion: 'latest'
      },
      {
        id: 'pytest',
        label: 'PyTest',
        description: 'Python testing framework',
        category: 'testing',
        versions: ['7.4.3', '7.4.0', '7.3.0'],
        defaultVersion: '7.4.3'
      },
      {
        id: 'fastapi-extras',
        label: 'FastAPI Extras',
        description: 'Additional FastAPI components',
        category: 'deployment'
      },
      {
        id: 'otel-python',
        label: 'OpenTelemetry Python',
        description: 'Python observability instrumentation',
        category: 'observability',
        versions: ['1.21.0', '1.20.0', '1.19.0'],
        defaultVersion: '1.21.0'
      },
      {
        id: 'poetry',
        label: 'Poetry',
        description: 'Python dependency management',
        category: 'deployment',
        versions: ['1.7.0', '1.6.0', '1.5.0'],
        defaultVersion: '1.7.0'
      }
    ]
  }
];
export const categoryLabels = {
  'code-quality': 'Code Quality',
  'testing': 'Testing',
  'observability': 'Observability',
  'database': 'Database',
  'messaging': 'Messaging',
  'deployment': 'Deployment',
  'security': 'Security'
};

export const categoryIcons = {
  'code-quality': '🔧',
  'testing': '🧪',
  'observability': '📊',
  'database': '🗄️',
  'messaging': '📨',
  'deployment': '🚀',
  'security': '🔒'
};