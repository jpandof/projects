export interface ProvisionItem {
  id: string;
  label: string;
  description: string;
  category: 'code-quality' | 'testing' | 'observability' | 'database' | 'messaging' | 'deployment' | 'security';
  versions?: string[];
  defaultVersion?: string;
  required?: boolean;
  detailedDescription?: string;
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
        description: 'Herramientas de linting y formateo de código',
        detailedDescription: 'ESLint detecta problemas en el código JavaScript/TypeScript y Prettier formatea automáticamente el código para mantener un estilo consistente. Esencial para mantener calidad y legibilidad del código.',
        category: 'code-quality',
        versions: ['latest', '8.57.0', '8.56.0'],
        defaultVersion: 'latest',
        required: true
      },
      {
        id: 'testing-library',
        label: 'Testing Library',
        description: 'Utilidades para testing de componentes React',
        detailedDescription: 'Conjunto de herramientas para probar componentes React de forma simple y efectiva. Enfocado en testing desde la perspectiva del usuario final, probando comportamiento en lugar de implementación.',
        category: 'testing',
        versions: ['latest', '14.0.0', '13.4.0'],
        defaultVersion: 'latest',
        required: true
      },
      {
        id: 'playwright-e2e',
        label: 'Playwright e2e',
        description: 'Framework para testing end-to-end',
        detailedDescription: 'Herramienta moderna para automatizar pruebas end-to-end en navegadores reales. Permite probar flujos completos de usuario, capturas de pantalla, y testing cross-browser (Chrome, Firefox, Safari).',
        category: 'testing'
      },
      {
        id: 'tailwind',
        label: 'Tailwind CSS',
        description: 'Framework CSS utility-first',
        detailedDescription: 'Framework CSS que proporciona clases utilitarias de bajo nivel para construir diseños personalizados rápidamente. Permite crear interfaces sin escribir CSS personalizado, con diseño responsivo integrado.',
        category: 'code-quality',
        versions: ['latest', '3.4.0', '3.3.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'otel-web',
        label: 'OpenTelemetry Web',
        description: 'Instrumentación de observabilidad web',
        detailedDescription: 'SDK para recopilar métricas, trazas y logs de aplicaciones web. Permite monitorear rendimiento, errores y comportamiento del usuario en tiempo real para debugging y optimización.',
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
        description: 'Endpoints de monitoreo para producción',
        detailedDescription: 'Proporciona endpoints HTTP para monitorear y gestionar aplicaciones Spring Boot en producción. Incluye métricas de salud, información de la aplicación, métricas JVM y endpoints personalizables.',
        category: 'observability',
        required: true
      },
      {
        id: 'otel-sdk',
        label: 'OpenTelemetry SDK',
        description: 'SDK de instrumentación para observabilidad',
        detailedDescription: 'SDK completo para instrumentar aplicaciones Java con trazas distribuidas, métricas y logs. Compatible con múltiples backends de observabilidad como Jaeger, Zipkin y Prometheus.',
        category: 'observability',
        versions: ['1.33.0', '1.32.0', '1.31.0'],
        defaultVersion: '1.33.0'
      },
      {
        id: 'testcontainers',
        label: 'Testcontainers',
        description: 'Testing de integración con Docker',
        detailedDescription: 'Biblioteca que permite ejecutar tests de integración usando contenedores Docker reales. Ideal para probar con bases de datos, message brokers y servicios externos sin mocks.',
        category: 'testing',
        versions: ['1.19.3', '1.19.0', '1.18.0'],
        defaultVersion: '1.19.3',
        required: true
      },
      {
        id: 'flyway',
        label: 'Flyway',
        description: 'Herramienta de migración de base de datos',
        detailedDescription: 'Herramienta para versionar y migrar esquemas de base de datos de forma controlada. Permite aplicar cambios incrementales, rollbacks y mantener sincronizadas las bases de datos entre entornos.',
        category: 'database',
        versions: ['9.22.0', '9.21.0', '9.20.0'],
        defaultVersion: '9.22.0'
      },
      {
        id: 'kafka-client',
        label: 'Kafka Client',
        description: 'Cliente de mensajería Apache Kafka',
        detailedDescription: 'Cliente oficial para producir y consumir mensajes de Apache Kafka. Incluye configuraciones de alta disponibilidad, serialización personalizada y manejo de particiones para sistemas distribuidos.',
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
        description: 'Linting para JavaScript/TypeScript',
        detailedDescription: 'Herramienta de análisis estático para identificar patrones problemáticos en código JavaScript/TypeScript. Incluye reglas específicas para Node.js y puede integrarse con editores para feedback en tiempo real.',
        category: 'code-quality',
        versions: ['latest', '8.57.0', '8.56.0'],
        defaultVersion: 'latest',
        required: true
      },
      {
        id: 'jest',
        label: 'Jest',
        description: 'Framework de testing para JavaScript',
        detailedDescription: 'Framework de testing completo con test runner, assertions, mocks y coverage integrados. Especialmente optimizado para Node.js con soporte para testing asíncrono y paralelo.',
        category: 'testing',
        versions: ['29.7.0', '29.6.0', '29.5.0'],
        defaultVersion: '29.7.0',
        required: true
      },
      {
        id: 'supertest',
        label: 'Supertest',
        description: 'Testing de integración HTTP',
        detailedDescription: 'Biblioteca para probar APIs HTTP de forma sencilla. Permite realizar requests HTTP y validar responses, headers y status codes. Ideal para testing de endpoints REST y GraphQL.',
        category: 'testing'
      },
      {
        id: 'pino-logger',
        label: 'Pino Logger',
        description: 'Logger JSON de alto rendimiento',
        detailedDescription: 'Logger extremadamente rápido para Node.js que genera logs en formato JSON estructurado. Optimizado para producción con bajo overhead y soporte para log levels, child loggers y serialización personalizada.',
        category: 'observability',
        versions: ['8.16.0', '8.15.0', '8.14.0'],
        defaultVersion: '8.16.0'
      },
      {
        id: 'otel-node',
        label: 'OpenTelemetry Node',
        description: 'Instrumentación de observabilidad para Node.js',
        detailedDescription: 'Instrumentación automática para aplicaciones Node.js que captura trazas, métricas y logs. Incluye instrumentación para frameworks populares como Express, Fastify y librerías de base de datos.',
        category: 'observability'
      },
      {
        id: 'kafka-nats-client',
        label: 'Kafka/NATS Client',
        description: 'Clientes para message brokers',
        detailedDescription: 'Clientes para sistemas de mensajería Kafka y NATS. Kafka para streaming de datos de alto volumen y NATS para mensajería ligera y rápida. Incluye patrones pub/sub y request/reply.',
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
        description: 'Agregador de linters para Go',
        detailedDescription: 'Meta-linter que ejecuta múltiples linters de Go en paralelo. Incluye más de 50 linters diferentes para detectar bugs, problemas de rendimiento, estilo de código y vulnerabilidades de seguridad.',
        category: 'code-quality',
        versions: ['v1.55.0', 'v1.54.0', 'v1.53.0'],
        defaultVersion: 'v1.55.0',
        required: true
      },
      {
        id: 'zap-logger',
        label: 'Zap Logger',
        description: 'Biblioteca de logging estructurado',
        detailedDescription: 'Logger de alto rendimiento para Go que genera logs estructurados en JSON. Optimizado para latencia mínima con zero-allocation logging y soporte para sampling y log rotation.',
        category: 'observability',
        required: true
      },
      {
        id: 'otel-go',
        label: 'OpenTelemetry Go',
        description: 'Instrumentación de observabilidad para Go',
        detailedDescription: 'SDK nativo de Go para OpenTelemetry que proporciona APIs para crear trazas, métricas y logs. Incluye instrumentación automática para HTTP, gRPC, bases de datos y frameworks populares.',
        category: 'observability',
        versions: ['v1.21.0', 'v1.20.0', 'v1.19.0'],
        defaultVersion: 'v1.21.0'
      },
      {
        id: 'chi-gin-middlewares',
        label: 'Chi/Gin Middlewares',
        description: 'Middlewares para routers HTTP',
        detailedDescription: 'Conjunto de middlewares para los routers Chi y Gin incluyendo CORS, rate limiting, autenticación JWT, logging de requests, recovery de panics y validación de input.',
        category: 'security'
      },
      {
        id: 'testcontainers-go',
        label: 'Testcontainers Go',
        description: 'Testing de integración con Docker',
        detailedDescription: 'Puerto de Testcontainers para Go que permite ejecutar tests de integración con contenedores Docker reales. Ideal para probar con PostgreSQL, Redis, Kafka y otros servicios externos.',
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
        description: 'Linting y formateo para Python',
        detailedDescription: 'Ruff es un linter extremadamente rápido escrito en Rust, y Black es un formateador de código Python. Juntos aseguran código Python limpio, consistente y libre de errores comunes.',
        category: 'code-quality',
        versions: ['latest', '0.1.0', '0.0.9'],
        defaultVersion: 'latest',
        required: true
      },
      {
        id: 'pytest',
        label: 'PyTest',
        description: 'Framework de testing para Python',
        detailedDescription: 'Framework de testing más popular para Python con sintaxis simple y características avanzadas como fixtures, parametrización, plugins y generación de reportes de coverage.',
        category: 'testing',
        versions: ['7.4.3', '7.4.0', '7.3.0'],
        defaultVersion: '7.4.3',
        required: true
      },
      {
        id: 'fastapi-extras',
        label: 'FastAPI Extras',
        description: 'Componentes adicionales para FastAPI',
        detailedDescription: 'Extensiones para FastAPI incluyendo middleware de CORS, autenticación JWT, validación avanzada, documentación automática mejorada y utilidades para testing de APIs.',
        category: 'deployment'
      },
      {
        id: 'otel-python',
        label: 'OpenTelemetry Python',
        description: 'Instrumentación de observabilidad para Python',
        detailedDescription: 'Instrumentación automática para aplicaciones Python que captura trazas distribuidas, métricas y logs. Incluye soporte para Django, Flask, FastAPI, SQLAlchemy y otras librerías populares.',
        category: 'observability',
        versions: ['1.21.0', '1.20.0', '1.19.0'],
        defaultVersion: '1.21.0'
      },
      {
        id: 'poetry',
        label: 'Poetry',
        description: 'Gestión de dependencias para Python',
        detailedDescription: 'Herramienta moderna para gestión de dependencias y packaging en Python. Maneja virtual environments automáticamente, resuelve dependencias y permite publicar paquetes de forma sencilla.',
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