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
        id: 'typescript',
        label: 'TypeScript',
        description: 'Superset tipado de JavaScript',
        detailedDescription: 'Añade tipado estático a JavaScript, mejorando la detección de errores en tiempo de desarrollo, autocompletado y refactoring. Esencial para proyectos grandes y equipos.',
        category: 'code-quality',
        versions: ['5.3.0', '5.2.0', '5.1.0'],
        defaultVersion: '5.3.0'
      },
      {
        id: 'husky-lint-staged',
        label: 'Husky + Lint-staged',
        description: 'Git hooks para calidad de código',
        detailedDescription: 'Husky configura git hooks y lint-staged ejecuta linters solo en archivos staged. Previene commits con código mal formateado o con errores, manteniendo la calidad del repositorio.',
        category: 'code-quality',
        versions: ['latest', '8.0.0', '7.0.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'storybook',
        label: 'Storybook',
        description: 'Desarrollo aislado de componentes UI',
        detailedDescription: 'Herramienta para desarrollar, probar y documentar componentes UI de forma aislada. Permite crear un catálogo interactivo de componentes con diferentes estados y variaciones.',
        category: 'testing',
        versions: ['7.6.0', '7.5.0', '7.4.0'],
        defaultVersion: '7.6.0'
      },
      {
        id: 'react-query',
        label: 'TanStack Query',
        description: 'Gestión de estado servidor/cliente',
        detailedDescription: 'Biblioteca para fetching, caching, sincronización y actualización de estado del servidor. Simplifica la gestión de datos remotos con cache inteligente, revalidación automática y estados de loading.',
        category: 'code-quality',
        versions: ['5.17.0', '4.36.0', '4.35.0'],
        defaultVersion: '5.17.0'
      },
      {
        id: 'react-hook-form',
        label: 'React Hook Form',
        description: 'Gestión eficiente de formularios',
        detailedDescription: 'Biblioteca para manejar formularios con mínimos re-renders, validación integrada y excelente performance. Reduce el boilerplate y mejora la UX con validación en tiempo real.',
        category: 'code-quality',
        versions: ['7.48.0', '7.47.0', '7.46.0'],
        defaultVersion: '7.48.0'
      },
      {
        id: 'framer-motion',
        label: 'Framer Motion',
        description: 'Animaciones y transiciones',
        detailedDescription: 'Biblioteca de animaciones para React con API declarativa. Permite crear animaciones fluidas, transiciones de página, gestos táctiles y micro-interacciones de forma sencilla.',
        category: 'code-quality',
        versions: ['10.16.0', '10.15.0', '10.14.0'],
        defaultVersion: '10.16.0'
      },
      {
        id: 'react-router',
        label: 'React Router',
        description: 'Enrutamiento declarativo',
        detailedDescription: 'Biblioteca estándar para enrutamiento en aplicaciones React. Permite navegación declarativa, rutas anidadas, lazy loading de componentes y gestión del historial del navegador.',
        category: 'code-quality',
        versions: ['6.20.0', '6.19.0', '6.18.0'],
        defaultVersion: '6.20.0'
      },
      {
        id: 'zustand-redux',
        label: 'Zustand/Redux Toolkit',
        description: 'Gestión de estado global',
        detailedDescription: 'Zustand es una solución ligera de estado global, Redux Toolkit simplifica Redux tradicional. Ambos permiten compartir estado entre componentes con diferentes niveles de complejidad.',
        category: 'code-quality',
        versions: ['4.4.0', '4.3.0', '4.2.0'],
        defaultVersion: '4.4.0'
      },
      {
        id: 'playwright-e2e',
        label: 'Playwright e2e',
        description: 'Framework para testing end-to-end',
        detailedDescription: 'Herramienta moderna para automatizar pruebas end-to-end en navegadores reales. Permite probar flujos completos de usuario, capturas de pantalla, y testing cross-browser (Chrome, Firefox, Safari).',
        category: 'testing'
      },
      {
        id: 'cypress',
        label: 'Cypress',
        description: 'Testing e2e con interfaz visual',
        detailedDescription: 'Framework de testing e2e con interfaz gráfica interactiva. Permite debugging visual, time-travel, screenshots automáticos y testing en tiempo real con hot-reload.',
        category: 'testing',
        versions: ['13.6.0', '13.5.0', '13.4.0'],
        defaultVersion: '13.6.0'
      },
      {
        id: 'vitest',
        label: 'Vitest',
        description: 'Testing unitario ultrarrápido',
        detailedDescription: 'Framework de testing unitario construido sobre Vite. Extremadamente rápido con hot-reload, compatible con Jest API, soporte nativo para TypeScript y ESM.',
        category: 'testing',
        versions: ['1.1.0', '1.0.0', '0.34.0'],
        defaultVersion: '1.1.0'
      },
      {
        id: 'msw',
        label: 'Mock Service Worker',
        description: 'Mocking de APIs para testing',
        detailedDescription: 'Biblioteca para interceptar requests HTTP y simular APIs durante testing y desarrollo. Permite testing realista sin depender de servicios externos.',
        category: 'testing',
        versions: ['2.0.0', '1.3.0', '1.2.0'],
        defaultVersion: '2.0.0'
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
        id: 'styled-components',
        label: 'Styled Components',
        description: 'CSS-in-JS con componentes estilizados',
        detailedDescription: 'Biblioteca que permite escribir CSS dentro de JavaScript usando template literals. Ofrece scoping automático, theming dinámico y estilos basados en props.',
        category: 'code-quality',
        versions: ['6.1.0', '6.0.0', '5.3.0'],
        defaultVersion: '6.1.0'
      },
      {
        id: 'emotion',
        label: 'Emotion',
        description: 'CSS-in-JS performante',
        detailedDescription: 'Biblioteca CSS-in-JS con excelente performance y flexibilidad. Soporta tanto styled components como CSS prop, con optimizaciones automáticas y server-side rendering.',
        category: 'code-quality',
        versions: ['11.11.0', '11.10.0', '11.9.0'],
        defaultVersion: '11.11.0'
      },
      {
        id: 'material-ui',
        label: 'Material-UI (MUI)',
        description: 'Componentes React con Material Design',
        detailedDescription: 'Biblioteca completa de componentes React siguiendo las guías de Material Design. Incluye sistema de theming, componentes accesibles y diseño responsivo out-of-the-box.',
        category: 'code-quality',
        versions: ['5.15.0', '5.14.0', '5.13.0'],
        defaultVersion: '5.15.0'
      },
      {
        id: 'ant-design',
        label: 'Ant Design',
        description: 'Biblioteca de componentes empresariales',
        detailedDescription: 'Sistema de diseño completo con componentes React para aplicaciones empresariales. Incluye formularios complejos, tablas avanzadas, layouts y patrones de navegación.',
        category: 'code-quality',
        versions: ['5.12.0', '5.11.0', '5.10.0'],
        defaultVersion: '5.12.0'
      },
      {
        id: 'react-spring',
        label: 'React Spring',
        description: 'Animaciones basadas en física',
        detailedDescription: 'Biblioteca de animaciones que usa principios de física en lugar de duración/easing. Crea animaciones más naturales y fluidas con API hooks moderna.',
        category: 'code-quality',
        versions: ['9.7.0', '9.6.0', '9.5.0'],
        defaultVersion: '9.7.0'
      },
      {
        id: 'react-dnd',
        label: 'React DnD',
        description: 'Drag and drop para React',
        detailedDescription: 'Conjunto de utilidades para implementar interfaces drag and drop complejas. Soporta múltiples backends, touch devices y patrones avanzados de interacción.',
        category: 'code-quality',
        versions: ['16.0.0', '15.1.0', '15.0.0'],
        defaultVersion: '16.0.0'
      },
      {
        id: 'react-virtualized',
        label: 'React Virtualized',
        description: 'Renderizado eficiente de listas grandes',
        detailedDescription: 'Componentes para renderizar eficientemente listas y tablas grandes mediante virtualización. Mantiene performance constante independientemente del tamaño de los datos.',
        category: 'code-quality',
        versions: ['9.22.0', '9.21.0', '9.20.0'],
        defaultVersion: '9.22.0'
      },
      {
        id: 'react-helmet',
        label: 'React Helmet',
        description: 'Gestión del document head',
        detailedDescription: 'Componente para gestionar cambios en el document head de forma declarativa. Esencial para SEO, meta tags dinámicos y títulos de página.',
        category: 'code-quality',
        versions: ['6.1.0', '6.0.0', '5.2.0'],
        defaultVersion: '6.1.0'
      },
      {
        id: 'react-intl',
        label: 'React Intl',
        description: 'Internacionalización (i18n)',
        detailedDescription: 'Biblioteca completa para internacionalización con soporte para pluralización, formateo de fechas/números, y gestión de traducciones. Parte del ecosistema FormatJS.',
        category: 'code-quality',
        versions: ['6.5.0', '6.4.0', '6.3.0'],
        defaultVersion: '6.5.0'
      },
      {
        id: 'sentry-react',
        label: 'Sentry',
        description: 'Monitoreo de errores en producción',
        detailedDescription: 'Plataforma de monitoreo de errores que captura excepciones, performance issues y proporciona contexto detallado para debugging en producción.',
        category: 'observability',
        versions: ['7.85.0', '7.84.0', '7.83.0'],
        defaultVersion: '7.85.0'
      },
      {
        id: 'datadog-rum',
        label: 'Datadog RUM',
        description: 'Real User Monitoring',
        detailedDescription: 'Monitoreo de experiencia de usuario real con métricas de performance, errores JavaScript, y analytics de comportamiento de usuarios en producción.',
        category: 'observability',
        versions: ['4.42.0', '4.41.0', '4.40.0'],
        defaultVersion: '4.42.0'
      },
      {
        id: 'otel-web',
        label: 'OpenTelemetry Web',
        description: 'Instrumentación de observabilidad web',
        detailedDescription: 'SDK para recopilar métricas, trazas y logs de aplicaciones web. Permite monitorear rendimiento, errores y comportamiento del usuario en tiempo real para debugging y optimización.',
        category: 'observability'
      },
      {
        id: 'webpack-bundle-analyzer',
        label: 'Bundle Analyzer',
        description: 'Análisis de tamaño de bundles',
        detailedDescription: 'Herramienta para visualizar el tamaño y composición de bundles JavaScript. Ayuda a identificar dependencias pesadas y optimizar el tamaño final de la aplicación.',
        category: 'observability',
        versions: ['4.10.0', '4.9.0', '4.8.0'],
        defaultVersion: '4.10.0'
      },
      {
        id: 'lighthouse-ci',
        label: 'Lighthouse CI',
        description: 'Auditorías automáticas de performance',
        detailedDescription: 'Integración de Google Lighthouse en CI/CD para auditorías automáticas de performance, accesibilidad, SEO y mejores prácticas en cada deploy.',
        category: 'observability',
        versions: ['0.12.0', '0.11.0', '0.10.0'],
        defaultVersion: '0.12.0'
      },
      {
        id: 'pwa-workbox',
        label: 'PWA + Workbox',
        description: 'Progressive Web App capabilities',
        detailedDescription: 'Conjunto de herramientas para convertir aplicaciones React en PWAs con service workers, cache strategies, offline support y notificaciones push.',
        category: 'deployment',
        versions: ['7.0.0', '6.6.0', '6.5.0'],
        defaultVersion: '7.0.0'
      },
      {
        id: 'vite-pwa',
        label: 'Vite PWA Plugin',
        description: 'PWA plugin para Vite',
        detailedDescription: 'Plugin que añade capacidades PWA a aplicaciones Vite con generación automática de service worker, manifest, y estrategias de cache optimizadas.',
        category: 'deployment',
        versions: ['0.17.0', '0.16.0', '0.15.0'],
        defaultVersion: '0.17.0'
      },
      {
        id: 'docker-nginx',
        label: 'Docker + Nginx',
        description: 'Containerización con servidor web',
        detailedDescription: 'Configuración Docker optimizada con Nginx para servir aplicaciones React en producción. Incluye multi-stage builds, compresión gzip y configuración de cache.',
        category: 'deployment',
        versions: ['alpine', 'latest', '1.25'],
        defaultVersion: 'alpine'
      },
      {
        id: 'github-actions',
        label: 'GitHub Actions CI/CD',
        description: 'Pipelines de integración continua',
        detailedDescription: 'Workflows automatizados para testing, building, y deployment. Incluye cache de dependencias, testing en múltiples versiones de Node, y deployment automático.',
        category: 'deployment',
        versions: ['v4', 'v3', 'v2'],
        defaultVersion: 'v4'
      },
      {
        id: 'vercel-deployment',
        label: 'Vercel Deployment',
        description: 'Deployment optimizado para frontend',
        detailedDescription: 'Plataforma de deployment especializada en aplicaciones frontend con CDN global, preview deployments automáticos, y optimizaciones de performance.',
        category: 'deployment',
        versions: ['latest', '32.0.0', '31.0.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'netlify-deployment',
        label: 'Netlify Deployment',
        description: 'JAMstack deployment platform',
        detailedDescription: 'Plataforma para aplicaciones JAMstack con deploy automático desde Git, form handling, serverless functions, y split testing integrado.',
        category: 'deployment',
        versions: ['latest', '17.0.0', '16.0.0'],
        defaultVersion: 'latest'
      },
      {
        id: 'auth0-react',
        label: 'Auth0',
        description: 'Autenticación como servicio',
        detailedDescription: 'Plataforma de autenticación completa con SSO, MFA, social logins, y gestión de usuarios. SDK optimizado para React con hooks y componentes.',
        category: 'security',
        versions: ['2.2.0', '2.1.0', '2.0.0'],
        defaultVersion: '2.2.0'
      },
      {
        id: 'firebase-auth',
        label: 'Firebase Auth',
        description: 'Autenticación de Google',
        detailedDescription: 'Sistema de autenticación de Firebase con múltiples proveedores (Google, Facebook, Twitter), autenticación anónima, y gestión de sesiones.',
        category: 'security',
        versions: ['10.7.0', '10.6.0', '10.5.0'],
        defaultVersion: '10.7.0'
      },
      {
        id: 'clerk-auth',
        label: 'Clerk',
        description: 'Autenticación moderna con UI',
        detailedDescription: 'Plataforma de autenticación con componentes UI pre-construidos, gestión de usuarios, organizaciones, y experiencia de usuario moderna out-of-the-box.',
        category: 'security',
        versions: ['4.29.0', '4.28.0', '4.27.0'],
        defaultVersion: '4.29.0'
      },
      {
        id: 'react-security-headers',
        label: 'Security Headers',
        description: 'Headers de seguridad HTTP',
        detailedDescription: 'Configuración de headers de seguridad como CSP, HSTS, X-Frame-Options para proteger contra XSS, clickjacking y otros ataques web.',
        category: 'security',
        versions: ['latest', '2.0.0', '1.3.0'],
        defaultVersion: 'latest'
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
        id: 'spring-security',
        label: 'Spring Security',
        description: 'Framework de seguridad integral',
        detailedDescription: 'Framework completo de autenticación y autorización para aplicaciones Spring. Incluye protección CSRF, OAuth2, JWT, LDAP integration y configuración declarativa de seguridad.',
        category: 'security',
        versions: ['6.2.0', '6.1.0', '6.0.0'],
        defaultVersion: '6.2.0',
        required: true
      },
      {
        id: 'spring-data-jpa',
        label: 'Spring Data JPA',
        description: 'Abstracción de acceso a datos',
        detailedDescription: 'Simplifica el acceso a datos con repositorios automáticos, queries derivadas de nombres de métodos, paginación, auditoría y soporte para múltiples bases de datos.',
        category: 'database',
        versions: ['3.2.0', '3.1.0', '3.0.0'],
        defaultVersion: '3.2.0',
        required: true
      },
      {
        id: 'hibernate-validator',
        label: 'Hibernate Validator',
        description: 'Validación de beans con anotaciones',
        detailedDescription: 'Implementación de referencia de Bean Validation (JSR 380). Permite validar objetos usando anotaciones con mensajes personalizables y validaciones complejas.',
        category: 'code-quality',
        versions: ['8.0.0', '7.0.0', '6.2.0'],
        defaultVersion: '8.0.0'
      },
      {
        id: 'mapstruct',
        label: 'MapStruct',
        description: 'Mapeo automático entre objetos',
        detailedDescription: 'Generador de código para mapear entre DTOs y entidades de forma type-safe y performante. Genera implementaciones en tiempo de compilación sin reflection.',
        category: 'code-quality',
        versions: ['1.5.5', '1.5.3', '1.5.2'],
        defaultVersion: '1.5.5'
      },
      {
        id: 'lombok',
        label: 'Project Lombok',
        description: 'Reducción de boilerplate code',
        detailedDescription: 'Biblioteca que genera automáticamente getters, setters, constructores, equals, hashCode y toString mediante anotaciones, reduciendo significativamente el código repetitivo.',
        category: 'code-quality',
        versions: ['1.18.30', '1.18.28', '1.18.26'],
        defaultVersion: '1.18.30'
      },
      {
        id: 'spotbugs-pmd',
        label: 'SpotBugs + PMD',
        description: 'Análisis estático de código',
        detailedDescription: 'SpotBugs detecta bugs potenciales mediante análisis de bytecode, PMD encuentra problemas de código fuente. Juntos proporcionan análisis completo de calidad de código.',
        category: 'code-quality',
        versions: ['4.8.0', '4.7.0', '4.6.0'],
        defaultVersion: '4.8.0'
      },
      {
        id: 'checkstyle',
        label: 'Checkstyle',
        description: 'Verificación de estilo de código',
        detailedDescription: 'Herramienta para verificar que el código Java sigue estándares de codificación. Configurable con reglas personalizadas para mantener consistencia en el equipo.',
        category: 'code-quality',
        versions: ['10.12.0', '10.11.0', '10.10.0'],
        defaultVersion: '10.12.0'
      },
      {
        id: 'jacoco',
        label: 'JaCoCo',
        description: 'Cobertura de código',
        detailedDescription: 'Biblioteca para medir cobertura de código en aplicaciones Java. Genera reportes detallados de líneas, ramas y métodos cubiertos por tests.',
        category: 'testing',
        versions: ['0.8.11', '0.8.10', '0.8.9'],
        defaultVersion: '0.8.11'
      },
      {
        id: 'junit5-mockito',
        label: 'JUnit 5 + Mockito',
        description: 'Testing unitario moderno',
        detailedDescription: 'JUnit 5 proporciona un framework de testing moderno con anotaciones mejoradas y extensiones. Mockito permite crear mocks y stubs para testing aislado.',
        category: 'testing',
        versions: ['5.10.0', '5.9.0', '5.8.0'],
        defaultVersion: '5.10.0'
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
        id: 'micrometer-prometheus',
        label: 'Micrometer + Prometheus',
        description: 'Métricas de aplicación',
        detailedDescription: 'Micrometer proporciona una fachada para métricas de aplicación, Prometheus las almacena y consulta. Combinación estándar para monitoreo de aplicaciones Spring Boot.',
        category: 'observability',
        versions: ['1.12.0', '1.11.0', '1.10.0'],
        defaultVersion: '1.12.0'
      },
      {
        id: 'logback-structured',
        label: 'Logback Structured',
        description: 'Logging estructurado JSON',
        detailedDescription: 'Configuración de Logback para generar logs estructurados en formato JSON con MDC, markers y appenders optimizados para agregación en sistemas como ELK.',
        category: 'observability',
        versions: ['1.4.14', '1.4.12', '1.4.11'],
        defaultVersion: '1.4.14'
      },
      {
        id: 'zipkin-jaeger',
        label: 'Zipkin/Jaeger Tracing',
        description: 'Trazabilidad distribuida',
        detailedDescription: 'Sistemas de tracing distribuido para monitorear requests a través de microservicios. Zipkin es más simple, Jaeger más completo con mejor UI y análisis.',
        category: 'observability',
        versions: ['2.24.0', '2.23.0', '2.22.0'],
        defaultVersion: '2.24.0'
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
        id: 'wiremock',
        label: 'WireMock',
        description: 'Mock de servicios HTTP',
        detailedDescription: 'Biblioteca para simular servicios HTTP/REST durante testing. Permite definir stubs, verificar requests, simular latencia y errores de red.',
        category: 'testing',
        versions: ['3.3.0', '3.2.0', '3.1.0'],
        defaultVersion: '3.3.0'
      },
      {
        id: 'archunit',
        label: 'ArchUnit',
        description: 'Testing de arquitectura',
        detailedDescription: 'Framework para verificar reglas arquitectónicas mediante tests. Permite validar dependencias entre capas, convenciones de naming, y patrones arquitectónicos.',
        category: 'testing',
        versions: ['1.2.0', '1.1.0', '1.0.0'],
        defaultVersion: '1.2.0'
      },
      {
        id: 'spring-boot-test',
        label: 'Spring Boot Test',
        description: 'Testing integral para Spring',
        detailedDescription: 'Conjunto completo de utilidades para testing en Spring Boot incluyendo @SpringBootTest, @WebMvcTest, @DataJpaTest y configuración automática de contexto.',
        category: 'testing',
        versions: ['3.2.0', '3.1.0', '3.0.0'],
        defaultVersion: '3.2.0'
      },
      {
        id: 'postgresql-driver',
        label: 'PostgreSQL Driver',
        description: 'Driver JDBC para PostgreSQL',
        detailedDescription: 'Driver oficial JDBC para conectar con bases de datos PostgreSQL. Incluye soporte para tipos avanzados, arrays, JSON, y características específicas de PostgreSQL.',
        category: 'database',
        versions: ['42.7.0', '42.6.0', '42.5.0'],
        defaultVersion: '42.7.0'
      },
      {
        id: 'mysql-driver',
        label: 'MySQL Driver',
        description: 'Driver JDBC para MySQL',
        detailedDescription: 'Driver JDBC oficial para MySQL con soporte para connection pooling, SSL, prepared statements y optimizaciones de performance específicas de MySQL.',
        category: 'database',
        versions: ['8.2.0', '8.1.0', '8.0.33'],
        defaultVersion: '8.2.0'
      },
      {
        id: 'redis-jedis',
        label: 'Redis (Jedis)',
        description: 'Cliente Redis para Java',
        detailedDescription: 'Cliente Java para Redis con soporte para clustering, pipelining, pub/sub, transacciones y connection pooling. Ideal para caching y sesiones distribuidas.',
        category: 'database',
        versions: ['5.1.0', '5.0.0', '4.4.0'],
        defaultVersion: '5.1.0'
      },
      {
        id: 'mongodb-driver',
        label: 'MongoDB Driver',
        description: 'Driver oficial para MongoDB',
        detailedDescription: 'Driver Java oficial para MongoDB con soporte para operaciones asíncronas, aggregation pipeline, change streams y GridFS para archivos grandes.',
        category: 'database',
        versions: ['4.11.0', '4.10.0', '4.9.0'],
        defaultVersion: '4.11.0'
      },
      {
        id: 'elasticsearch-client',
        label: 'Elasticsearch Client',
        description: 'Cliente para búsqueda y analytics',
        detailedDescription: 'Cliente Java de alto nivel para Elasticsearch con API type-safe, soporte para queries complejas, aggregations, y operaciones bulk optimizadas.',
        category: 'database',
        versions: ['8.11.0', '8.10.0', '8.9.0'],
        defaultVersion: '8.11.0'
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
        id: 'liquibase',
        label: 'Liquibase',
        description: 'Control de versiones de BD avanzado',
        detailedDescription: 'Herramienta de migración de BD más avanzada que Flyway con soporte para rollbacks automáticos, branching, y formatos XML/YAML además de SQL.',
        category: 'database',
        versions: ['4.25.0', '4.24.0', '4.23.0'],
        defaultVersion: '4.25.0'
      },
      {
        id: 'hikaricp',
        label: 'HikariCP',
        description: 'Connection pool de alto rendimiento',
        detailedDescription: 'Connection pool JDBC ultrarrápido y ligero. Optimizado para latencia mínima y throughput máximo con configuración automática inteligente.',
        category: 'database',
        versions: ['5.1.0', '5.0.0', '4.0.3'],
        defaultVersion: '5.1.0'
      },
      {
        id: 'kafka-client',
        label: 'Kafka Client',
        description: 'Cliente de mensajería Apache Kafka',
        detailedDescription: 'Cliente oficial para producir y consumir mensajes de Apache Kafka. Incluye configuraciones de alta disponibilidad, serialización personalizada y manejo de particiones para sistemas distribuidos.',
        category: 'messaging'
      },
      {
        id: 'rabbitmq-client',
        label: 'RabbitMQ Client',
        description: 'Message broker AMQP',
        detailedDescription: 'Cliente para RabbitMQ con soporte completo para AMQP 0.9.1, exchanges, queues, routing patterns, y garantías de entrega de mensajes.',
        category: 'messaging',
        versions: ['5.20.0', '5.19.0', '5.18.0'],
        defaultVersion: '5.20.0'
      },
      {
        id: 'spring-cloud-stream',
        label: 'Spring Cloud Stream',
        description: 'Abstracción de messaging',
        detailedDescription: 'Framework para construir aplicaciones event-driven con abstracción sobre diferentes message brokers (Kafka, RabbitMQ, etc.) usando anotaciones declarativas.',
        category: 'messaging',
        versions: ['4.1.0', '4.0.0', '3.2.0'],
        defaultVersion: '4.1.0'
      },
      {
        id: 'activemq-artemis',
        label: 'ActiveMQ Artemis',
        description: 'Message broker JMS 2.0',
        detailedDescription: 'Message broker de alto rendimiento con soporte completo para JMS 2.0, MQTT, AMQP, y STOMP. Sucesor de ActiveMQ Classic con mejor performance.',
        category: 'messaging',
        versions: ['2.31.0', '2.30.0', '2.29.0'],
        defaultVersion: '2.31.0'
      },
      {
        id: 'spring-cloud-gateway',
        label: 'Spring Cloud Gateway',
        description: 'API Gateway reactivo',
        detailedDescription: 'Gateway API construido sobre Spring WebFlux con routing dinámico, filtros, rate limiting, circuit breakers y integración con service discovery.',
        category: 'deployment',
        versions: ['4.1.0', '4.0.0', '3.1.0'],
        defaultVersion: '4.1.0'
      },
      {
        id: 'spring-cloud-config',
        label: 'Spring Cloud Config',
        description: 'Configuración centralizada',
        detailedDescription: 'Servidor de configuración centralizada que permite gestionar propiedades de aplicaciones desde repositorios Git con refresh dinámico y encriptación.',
        category: 'deployment',
        versions: ['4.1.0', '4.0.0', '3.1.0'],
        defaultVersion: '4.1.0'
      },
      {
        id: 'docker-jib',
        label: 'Docker con Jib',
        description: 'Containerización sin Dockerfile',
        detailedDescription: 'Plugin de Google para crear imágenes Docker optimizadas sin escribir Dockerfile. Genera layers eficientes, usa distroless images y se integra con Maven/Gradle.',
        category: 'deployment',
        versions: ['3.4.0', '3.3.0', '3.2.0'],
        defaultVersion: '3.4.0'
      },
      {
        id: 'kubernetes-client',
        label: 'Kubernetes Client',
        description: 'Cliente oficial de Kubernetes',
        detailedDescription: 'Cliente Java oficial para interactuar con APIs de Kubernetes. Permite gestionar recursos, health checks, service discovery y configuración desde la aplicación.',
        category: 'deployment',
        versions: ['19.0.0', '18.0.0', '17.0.0'],
        defaultVersion: '19.0.0'
      },
      {
        id: 'oauth2-resource-server',
        label: 'OAuth2 Resource Server',
        description: 'Servidor de recursos OAuth2',
        detailedDescription: 'Configuración para actuar como resource server OAuth2/OIDC con validación automática de JWT tokens, scopes, y integración con providers como Auth0, Keycloak.',
        category: 'security',
        versions: ['6.2.0', '6.1.0', '6.0.0'],
        defaultVersion: '6.2.0'
      },
      {
        id: 'keycloak-adapter',
        label: 'Keycloak Adapter',
        description: 'Integración con Keycloak IAM',
        detailedDescription: 'Adaptador oficial para integrar aplicaciones Spring Boot con Keycloak para SSO, gestión de usuarios, roles, y políticas de autorización avanzadas.',
        category: 'security',
        versions: ['23.0.0', '22.0.0', '21.0.0'],
        defaultVersion: '23.0.0'
      },
      {
        id: 'owasp-dependency-check',
        label: 'OWASP Dependency Check',
        description: 'Análisis de vulnerabilidades',
        detailedDescription: 'Herramienta que identifica vulnerabilidades conocidas en dependencias del proyecto consultando bases de datos como CVE y NVD.',
        category: 'security',
        versions: ['9.0.0', '8.4.0', '8.3.0'],
        defaultVersion: '9.0.0'
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
        id: 'typescript-node',
        label: 'TypeScript',
        description: 'Tipado estático para Node.js',
        detailedDescription: 'Superset de JavaScript que añade tipado estático, interfaces, generics y herramientas avanzadas de desarrollo. Esencial para proyectos Node.js grandes y equipos.',
        category: 'code-quality',
        versions: ['5.3.0', '5.2.0', '5.1.0'],
        defaultVersion: '5.3.0',
        required: true
      },
      {
        id: 'prettier-node',
        label: 'Prettier',
        description: 'Formateador de código automático',
        detailedDescription: 'Formateador de código que mantiene estilo consistente automáticamente. Soporta JavaScript, TypeScript, JSON, Markdown y se integra con ESLint.',
        category: 'code-quality',
        versions: ['3.1.0', '3.0.0', '2.8.0'],
        defaultVersion: '3.1.0'
      },
      {
        id: 'husky-lint-staged-node',
        label: 'Husky + Lint-staged',
        description: 'Git hooks para calidad',
        detailedDescription: 'Husky configura git hooks y lint-staged ejecuta linters solo en archivos modificados. Previene commits con código mal formateado o errores.',
        category: 'code-quality',
        versions: ['8.0.0', '7.0.0', '6.0.0'],
        defaultVersion: '8.0.0'
      },
      {
        id: 'nodemon',
        label: 'Nodemon',
        description: 'Auto-restart en desarrollo',
        detailedDescription: 'Utilidad que reinicia automáticamente la aplicación Node.js cuando detecta cambios en archivos. Esencial para desarrollo con hot-reload.',
        category: 'code-quality',
        versions: ['3.0.0', '2.0.22', '2.0.21'],
        defaultVersion: '3.0.0'
      },
      {
        id: 'ts-node',
        label: 'ts-node',
        description: 'Ejecución directa de TypeScript',
        detailedDescription: 'Permite ejecutar archivos TypeScript directamente sin compilación previa. Ideal para desarrollo, scripts y testing con soporte completo para módulos ES.',
        category: 'code-quality',
        versions: ['10.9.0', '10.8.0', '10.7.0'],
        defaultVersion: '10.9.0'
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
        id: 'vitest-node',
        label: 'Vitest',
        description: 'Testing ultrarrápido con Vite',
        detailedDescription: 'Framework de testing construido sobre Vite, extremadamente rápido con hot-reload, compatible con Jest API, soporte nativo para TypeScript y ESM.',
        category: 'testing',
        versions: ['1.1.0', '1.0.0', '0.34.0'],
        defaultVersion: '1.1.0'
      },
      {
        id: 'supertest',
        label: 'Supertest',
        description: 'Testing de integración HTTP',
        detailedDescription: 'Biblioteca para probar APIs HTTP de forma sencilla. Permite realizar requests HTTP y validar responses, headers y status codes. Ideal para testing de endpoints REST y GraphQL.',
        category: 'testing'
      },
      {
        id: 'nock',
        label: 'Nock',
        description: 'Mock de requests HTTP',
        detailedDescription: 'Biblioteca para interceptar y mockear requests HTTP salientes durante testing. Permite simular APIs externas, errores de red y diferentes scenarios de respuesta.',
        category: 'testing',
        versions: ['13.4.0', '13.3.0', '13.2.0'],
        defaultVersion: '13.4.0'
      },
      {
        id: 'sinon',
        label: 'Sinon.js',
        description: 'Spies, stubs y mocks avanzados',
        detailedDescription: 'Biblioteca completa para crear spies, stubs y mocks en JavaScript. Permite verificar llamadas a funciones, simular comportamientos y controlar el tiempo.',
        category: 'testing',
        versions: ['17.0.0', '16.1.0', '16.0.0'],
        defaultVersion: '17.0.0'
      },
      {
        id: 'testcontainers-node',
        label: 'Testcontainers Node',
        description: 'Testing con contenedores Docker',
        detailedDescription: 'Puerto de Testcontainers para Node.js que permite ejecutar tests de integración con contenedores Docker reales (PostgreSQL, Redis, MongoDB, etc.).',
        category: 'testing',
        versions: ['10.4.0', '10.3.0', '10.2.0'],
        defaultVersion: '10.4.0'
      },
      {
        id: 'express-framework',
        label: 'Express.js',
        description: 'Framework web minimalista',
        detailedDescription: 'Framework web más popular para Node.js, minimalista y flexible. Proporciona routing, middleware, templating y herramientas para construir APIs y aplicaciones web.',
        category: 'code-quality',
        versions: ['4.18.0', '4.17.0', '4.16.0'],
        defaultVersion: '4.18.0'
      },
      {
        id: 'fastify-framework',
        label: 'Fastify',
        description: 'Framework web de alto rendimiento',
        detailedDescription: 'Framework web ultrarrápido con validación de esquemas integrada, serialización JSON optimizada, plugins ecosystem y TypeScript support nativo.',
        category: 'code-quality',
        versions: ['4.24.0', '4.23.0', '4.22.0'],
        defaultVersion: '4.24.0'
      },
      {
        id: 'nestjs-framework',
        label: 'NestJS',
        description: 'Framework empresarial con decoradores',
        detailedDescription: 'Framework progresivo para construir aplicaciones Node.js escalables. Usa decoradores, inyección de dependencias, y arquitectura modular inspirada en Angular.',
        category: 'code-quality',
        versions: ['10.3.0', '10.2.0', '10.1.0'],
        defaultVersion: '10.3.0'
      },
      {
        id: 'koa-framework',
        label: 'Koa.js',
        description: 'Framework web con async/await',
        detailedDescription: 'Framework web del equipo de Express, diseñado para async/await. Más pequeño, expresivo y robusto para aplicaciones web y APIs modernas.',
        category: 'code-quality',
        versions: ['2.14.0', '2.13.0', '2.12.0'],
        defaultVersion: '2.14.0'
      },
      {
        id: 'graphql-apollo',
        label: 'GraphQL + Apollo Server',
        description: 'API GraphQL con Apollo',
        detailedDescription: 'Implementación completa de GraphQL con Apollo Server incluyendo schema stitching, subscriptions, caching, y herramientas de desarrollo avanzadas.',
        category: 'code-quality',
        versions: ['4.9.0', '4.8.0', '4.7.0'],
        defaultVersion: '4.9.0'
      },
      {
        id: 'prisma-orm',
        label: 'Prisma ORM',
        description: 'ORM moderno type-safe',
        detailedDescription: 'ORM de próxima generación con cliente type-safe generado, migraciones automáticas, introspección de BD y excelente experiencia de desarrollo.',
        category: 'database',
        versions: ['5.7.0', '5.6.0', '5.5.0'],
        defaultVersion: '5.7.0'
      },
      {
        id: 'typeorm',
        label: 'TypeORM',
        description: 'ORM para TypeScript/JavaScript',
        detailedDescription: 'ORM que funciona tanto en Node.js como en el navegador. Soporta Active Record y Data Mapper patterns, migraciones, y múltiples bases de datos.',
        category: 'database',
        versions: ['0.3.17', '0.3.16', '0.3.15'],
        defaultVersion: '0.3.17'
      },
      {
        id: 'sequelize-orm',
        label: 'Sequelize',
        description: 'ORM SQL para Node.js',
        detailedDescription: 'ORM maduro para PostgreSQL, MySQL, MariaDB, SQLite y Microsoft SQL Server. Incluye validaciones, asociaciones, transacciones y connection pooling.',
        category: 'database',
        versions: ['6.35.0', '6.34.0', '6.33.0'],
        defaultVersion: '6.35.0'
      },
      {
        id: 'mongoose-mongodb',
        label: 'Mongoose',
        description: 'ODM para MongoDB',
        detailedDescription: 'Object Document Mapper para MongoDB con esquemas, validación, casting, queries builders y middleware. Simplifica el trabajo con MongoDB en Node.js.',
        category: 'database',
        versions: ['8.0.0', '7.6.0', '7.5.0'],
        defaultVersion: '8.0.0'
      },
      {
        id: 'redis-node',
        label: 'Redis Client',
        description: 'Cliente Redis para Node.js',
        detailedDescription: 'Cliente moderno para Redis con soporte para clustering, pub/sub, streams, modules y connection pooling. Ideal para caching y sesiones.',
        category: 'database',
        versions: ['4.6.0', '4.5.0', '4.4.0'],
        defaultVersion: '4.6.0'
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
        id: 'winston-logger',
        label: 'Winston',
        description: 'Logger universal con transports',
        detailedDescription: 'Logger versátil con múltiples transports (file, console, database, etc.), formatos personalizables, log levels y rotación de archivos automática.',
        category: 'observability',
        versions: ['3.11.0', '3.10.0', '3.9.0'],
        defaultVersion: '3.11.0'
      },
      {
        id: 'otel-node',
        label: 'OpenTelemetry Node',
        description: 'Instrumentación de observabilidad para Node.js',
        detailedDescription: 'Instrumentación automática para aplicaciones Node.js que captura trazas, métricas y logs. Incluye instrumentación para frameworks populares como Express, Fastify y librerías de base de datos.',
        category: 'observability'
      },
      {
        id: 'prometheus-client',
        label: 'Prometheus Client',
        description: 'Métricas para Prometheus',
        detailedDescription: 'Cliente oficial de Prometheus para Node.js que permite crear y exponer métricas personalizadas (counters, gauges, histograms, summaries).',
        category: 'observability',
        versions: ['15.1.0', '15.0.0', '14.2.0'],
        defaultVersion: '15.1.0'
      },
      {
        id: 'sentry-node',
        label: 'Sentry',
        description: 'Monitoreo de errores',
        detailedDescription: 'Plataforma de monitoreo de errores que captura excepciones, performance issues y proporciona contexto detallado para debugging en producción.',
        category: 'observability',
        versions: ['7.85.0', '7.84.0', '7.83.0'],
        defaultVersion: '7.85.0'
      },
      {
        id: 'newrelic-apm',
        label: 'New Relic APM',
        description: 'Application Performance Monitoring',
        detailedDescription: 'Monitoreo completo de performance de aplicaciones con trazas distribuidas, métricas de base de datos, análisis de errores y alertas inteligentes.',
        category: 'observability',
        versions: ['11.7.0', '11.6.0', '11.5.0'],
        defaultVersion: '11.7.0'
      },
      {
        id: 'bull-queue',
        label: 'Bull Queue',
        description: 'Sistema de colas con Redis',
        detailedDescription: 'Sistema robusto de colas de trabajos basado en Redis con soporte para jobs recurrentes, prioridades, reintentos automáticos y dashboard web.',
        category: 'messaging',
        versions: ['4.12.0', '4.11.0', '4.10.0'],
        defaultVersion: '4.12.0'
      },
      {
        id: 'kafka-nats-client',
        label: 'Kafka/NATS Client',
        description: 'Clientes para message brokers',
        detailedDescription: 'Clientes para sistemas de mensajería Kafka y NATS. Kafka para streaming de datos de alto volumen y NATS para mensajería ligera y rápida. Incluye patrones pub/sub y request/reply.',
        category: 'messaging'
      },
      {
        id: 'rabbitmq-amqp',
        label: 'RabbitMQ (AMQP)',
        description: 'Message broker AMQP',
        detailedDescription: 'Cliente para RabbitMQ con soporte completo para AMQP, exchanges, queues, routing patterns, dead letter queues y garantías de entrega.',
        category: 'messaging',
        versions: ['0.10.0', '0.9.0', '0.8.0'],
        defaultVersion: '0.10.0'
      },
      {
        id: 'socket-io',
        label: 'Socket.IO',
        description: 'WebSockets en tiempo real',
        detailedDescription: 'Biblioteca para comunicación bidireccional en tiempo real entre cliente y servidor. Incluye fallbacks automáticos, rooms, namespaces y clustering.',
        category: 'messaging',
        versions: ['4.7.0', '4.6.0', '4.5.0'],
        defaultVersion: '4.7.0'
      },
      {
        id: 'passport-auth',
        label: 'Passport.js',
        description: 'Middleware de autenticación',
        detailedDescription: 'Middleware de autenticación modular con más de 500 estrategias (local, OAuth, SAML, etc.). Flexible y fácil de integrar con cualquier framework.',
        category: 'security',
        versions: ['0.7.0', '0.6.0', '0.5.0'],
        defaultVersion: '0.7.0'
      },
      {
        id: 'jsonwebtoken',
        label: 'JSON Web Tokens',
        description: 'Implementación JWT',
        detailedDescription: 'Biblioteca para crear y verificar JSON Web Tokens. Incluye soporte para diferentes algoritmos de firma, expiración automática y claims personalizados.',
        category: 'security',
        versions: ['9.0.0', '8.5.0', '8.4.0'],
        defaultVersion: '9.0.0'
      },
      {
        id: 'bcrypt-hashing',
        label: 'bcrypt',
        description: 'Hashing seguro de contraseñas',
        detailedDescription: 'Biblioteca para hash seguro de contraseñas usando el algoritmo bcrypt con salt automático y configuración de rounds para ajustar la complejidad.',
        category: 'security',
        versions: ['5.1.0', '5.0.0', '4.0.0'],
        defaultVersion: '5.1.0'
      },
      {
        id: 'helmet-security',
        label: 'Helmet.js',
        description: 'Headers de seguridad HTTP',
        detailedDescription: 'Middleware que configura automáticamente headers de seguridad HTTP como CSP, HSTS, X-Frame-Options para proteger contra ataques web comunes.',
        category: 'security',
        versions: ['7.1.0', '7.0.0', '6.1.0'],
        defaultVersion: '7.1.0'
      },
      {
        id: 'rate-limiter',
        label: 'Rate Limiting',
        description: 'Limitación de requests',
        detailedDescription: 'Middleware para limitar el número de requests por IP/usuario en un período de tiempo. Previene ataques DDoS y abuso de APIs.',
        category: 'security',
        versions: ['7.1.0', '7.0.0', '6.10.0'],
        defaultVersion: '7.1.0'
      },
      {
        id: 'cors-middleware',
        label: 'CORS',
        description: 'Cross-Origin Resource Sharing',
        detailedDescription: 'Middleware para configurar políticas CORS de forma granular, permitiendo o restringiendo acceso desde diferentes dominios con configuración flexible.',
        category: 'security',
        versions: ['2.8.0', '2.7.0', '2.6.0'],
        defaultVersion: '2.8.0'
      },
      {
        id: 'docker-node',
        label: 'Docker Optimization',
        description: 'Containerización optimizada',
        detailedDescription: 'Configuración Docker optimizada para Node.js con multi-stage builds, Alpine Linux, non-root user, y optimizaciones de cache para builds rápidos.',
        category: 'deployment',
        versions: ['alpine', '18-alpine', '20-alpine'],
        defaultVersion: 'alpine'
      },
      {
        id: 'pm2-process',
        label: 'PM2',
        description: 'Process manager para producción',
        detailedDescription: 'Process manager avanzado para aplicaciones Node.js con clustering automático, restart automático, monitoreo, logs centralizados y deployment.',
        category: 'deployment',
        versions: ['5.3.0', '5.2.0', '5.1.0'],
        defaultVersion: '5.3.0'
      },
      {
        id: 'cluster-module',
        label: 'Cluster Module',
        description: 'Clustering nativo de Node.js',
        detailedDescription: 'Implementación del módulo cluster nativo de Node.js para aprovechar múltiples cores CPU, balanceeo de carga automático y tolerancia a fallos.',
        category: 'deployment',
        versions: ['native', 'latest'],
        defaultVersion: 'native'
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
        id: 'gofmt-goimports',
        label: 'gofmt + goimports',
        description: 'Formateo automático de código',
        detailedDescription: 'gofmt formatea código Go según el estilo estándar, goimports además gestiona imports automáticamente. Herramientas esenciales para mantener código consistente.',
        category: 'code-quality',
        versions: ['latest', 'v1.21', 'v1.20'],
        defaultVersion: 'latest',
        required: true
      },
      {
        id: 'staticcheck',
        label: 'Staticcheck',
        description: 'Análisis estático avanzado',
        detailedDescription: 'Herramienta de análisis estático que encuentra bugs, problemas de performance y violaciones de mejores prácticas en código Go con alta precisión.',
        category: 'code-quality',
        versions: ['2023.1.6', '2023.1.5', '2023.1.4'],
        defaultVersion: '2023.1.6'
      },
      {
        id: 'govulncheck',
        label: 'govulncheck',
        description: 'Detección de vulnerabilidades',
        detailedDescription: 'Herramienta oficial de Go para detectar vulnerabilidades conocidas en dependencias consultando la base de datos de vulnerabilidades de Go.',
        category: 'security',
        versions: ['v1.0.0', 'v0.1.0'],
        defaultVersion: 'v1.0.0'
      },
      {
        id: 'go-mod-tidy',
        label: 'Go Modules',
        description: 'Gestión de dependencias',
        detailedDescription: 'Sistema nativo de gestión de dependencias de Go con versionado semántico, resolución automática de conflictos y builds reproducibles.',
        category: 'code-quality',
        versions: ['v1.21', 'v1.20', 'v1.19'],
        defaultVersion: 'v1.21',
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
        id: 'logrus',
        label: 'Logrus',
        description: 'Logger estructurado con hooks',
        detailedDescription: 'Logger popular con API similar a Python logging, soporte para hooks, múltiples formatos de salida y niveles de log configurables.',
        category: 'observability',
        versions: ['v1.9.3', 'v1.9.2', 'v1.9.1'],
        defaultVersion: 'v1.9.3'
      },
      {
        id: 'testify',
        label: 'Testify',
        description: 'Framework de testing con assertions',
        detailedDescription: 'Conjunto de herramientas para testing que incluye assertions, mocks, suites y utilities para hacer tests más expresivos y mantenibles.',
        category: 'testing',
        versions: ['v1.8.4', 'v1.8.3', 'v1.8.2'],
        defaultVersion: 'v1.8.4',
        required: true
      },
      {
        id: 'gomock',
        label: 'GoMock',
        description: 'Generación automática de mocks',
        detailedDescription: 'Herramienta oficial para generar mocks automáticamente desde interfaces. Permite testing aislado con verificación de llamadas y comportamientos.',
        category: 'testing',
        versions: ['v1.6.0', 'v1.5.0', 'v1.4.0'],
        defaultVersion: 'v1.6.0'
      },
      {
        id: 'ginkgo-gomega',
        label: 'Ginkgo + Gomega',
        description: 'BDD testing framework',
        detailedDescription: 'Framework de testing estilo BDD (Behavior Driven Development) con sintaxis expresiva, testing paralelo, y matchers avanzados con Gomega.',
        category: 'testing',
        versions: ['v2.13.0', 'v2.12.0', 'v2.11.0'],
        defaultVersion: 'v2.13.0'
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
        id: 'prometheus-go',
        label: 'Prometheus Client',
        description: 'Métricas para Prometheus',
        detailedDescription: 'Cliente oficial de Prometheus para Go que permite crear y exponer métricas (counters, gauges, histograms, summaries) con etiquetas y agregaciones.',
        category: 'observability',
        versions: ['v1.17.0', 'v1.16.0', 'v1.15.0'],
        defaultVersion: 'v1.17.0'
      },
      {
        id: 'jaeger-go',
        label: 'Jaeger Tracing',
        description: 'Trazabilidad distribuida',
        detailedDescription: 'Cliente Go para Jaeger que permite instrumentar aplicaciones con trazas distribuidas, spans, baggage y sampling configurable.',
        category: 'observability',
        versions: ['v1.51.0', 'v1.50.0', 'v1.49.0'],
        defaultVersion: 'v1.51.0'
      },
      {
        id: 'gin-framework',
        label: 'Gin Web Framework',
        description: 'Framework web de alto rendimiento',
        detailedDescription: 'Framework web ultrarrápido con routing, middleware, binding automático de JSON/XML, validación y rendering de templates integrado.',
        category: 'code-quality',
        versions: ['v1.9.1', 'v1.9.0', 'v1.8.0'],
        defaultVersion: 'v1.9.1'
      },
      {
        id: 'echo-framework',
        label: 'Echo Framework',
        description: 'Framework web minimalista',
        detailedDescription: 'Framework web de alto rendimiento y minimalista con routing optimizado, middleware extensible, y binding automático con validación.',
        category: 'code-quality',
        versions: ['v4.11.0', 'v4.10.0', 'v4.9.0'],
        defaultVersion: 'v4.11.0'
      },
      {
        id: 'fiber-framework',
        label: 'Fiber Framework',
        description: 'Framework inspirado en Express',
        detailedDescription: 'Framework web inspirado en Express.js construido sobre Fasthttp. Extremadamente rápido con API familiar para desarrolladores de Node.js.',
        category: 'code-quality',
        versions: ['v2.51.0', 'v2.50.0', 'v2.49.0'],
        defaultVersion: 'v2.51.0'
      },
      {
        id: 'chi-gin-middlewares',
        label: 'Chi/Gin Middlewares',
        description: 'Middlewares para routers HTTP',
        detailedDescription: 'Conjunto de middlewares para los routers Chi y Gin incluyendo CORS, rate limiting, autenticación JWT, logging de requests, recovery de panics y validación de input.',
        category: 'security'
      },
      {
        id: 'jwt-go',
        label: 'JWT-Go',
        description: 'JSON Web Tokens',
        detailedDescription: 'Implementación completa de JWT para Go con soporte para diferentes algoritmos de firma, validación automática y claims personalizados.',
        category: 'security',
        versions: ['v5.0.0', 'v4.5.0', 'v4.4.0'],
        defaultVersion: 'v5.0.0'
      },
      {
        id: 'bcrypt-go',
        label: 'bcrypt',
        description: 'Hashing seguro de contraseñas',
        detailedDescription: 'Implementación de bcrypt para Go que permite hash seguro de contraseñas con salt automático y configuración de cost factor.',
        category: 'security',
        versions: ['v0.14.0', 'v0.13.0', 'v0.12.0'],
        defaultVersion: 'v0.14.0'
      },
      {
        id: 'oauth2-go',
        label: 'OAuth2',
        description: 'Cliente OAuth2',
        detailedDescription: 'Biblioteca oficial de Google para implementar flujos OAuth2 como cliente, incluyendo authorization code, client credentials y refresh tokens.',
        category: 'security',
        versions: ['v0.15.0', 'v0.14.0', 'v0.13.0'],
        defaultVersion: 'v0.15.0'
      },
      {
        id: 'gorm',
        label: 'GORM',
        description: 'ORM para Go',
        detailedDescription: 'ORM completo para Go con auto-migración, asociaciones, hooks, transacciones, y soporte para múltiples bases de datos (PostgreSQL, MySQL, SQLite, SQL Server).',
        category: 'database',
        versions: ['v1.25.0', 'v1.24.0', 'v1.23.0'],
        defaultVersion: 'v1.25.0'
      },
      {
        id: 'sqlx',
        label: 'sqlx',
        description: 'Extensiones para database/sql',
        detailedDescription: 'Extensiones para el paquete database/sql estándar que añaden marshaling automático a structs, named parameters y utilidades para queries complejas.',
        category: 'database',
        versions: ['v1.3.5', 'v1.3.4', 'v1.3.3'],
        defaultVersion: 'v1.3.5'
      },
      {
        id: 'pgx-postgresql',
        label: 'pgx PostgreSQL',
        description: 'Driver PostgreSQL nativo',
        detailedDescription: 'Driver PostgreSQL puro en Go con excelente performance, soporte para tipos PostgreSQL avanzados, connection pooling y prepared statements.',
        category: 'database',
        versions: ['v5.5.0', 'v5.4.0', 'v5.3.0'],
        defaultVersion: 'v5.5.0'
      },
      {
        id: 'redis-go',
        label: 'Redis Client',
        description: 'Cliente Redis para Go',
        detailedDescription: 'Cliente Redis completo con soporte para clustering, pub/sub, pipelines, Lua scripts, streams y connection pooling automático.',
        category: 'database',
        versions: ['v9.3.0', 'v9.2.0', 'v9.1.0'],
        defaultVersion: 'v9.3.0'
      },
      {
        id: 'mongodb-go',
        label: 'MongoDB Driver',
        description: 'Driver oficial MongoDB',
        detailedDescription: 'Driver oficial de MongoDB para Go con soporte para operaciones CRUD, aggregation pipeline, change streams, transacciones y GridFS.',
        category: 'database',
        versions: ['v1.13.0', 'v1.12.0', 'v1.11.0'],
        defaultVersion: 'v1.13.0'
      },
      {
        id: 'migrate-go',
        label: 'Go Migrate',
        description: 'Migraciones de base de datos',
        detailedDescription: 'Herramienta para ejecutar migraciones de base de datos con soporte para múltiples fuentes (archivos, bindata, etc.) y bases de datos.',
        category: 'database',
        versions: ['v4.16.0', 'v4.15.0', 'v4.14.0'],
        defaultVersion: 'v4.16.0'
      },
      {
        id: 'testcontainers-go',
        label: 'Testcontainers Go',
        description: 'Testing de integración con Docker',
        detailedDescription: 'Puerto de Testcontainers para Go que permite ejecutar tests de integración con contenedores Docker reales. Ideal para probar con PostgreSQL, Redis, Kafka y otros servicios externos.',
        category: 'testing'
      },
      {
        id: 'kafka-go',
        label: 'Kafka Client',
        description: 'Cliente Kafka para Go',
        detailedDescription: 'Cliente Kafka puro en Go con soporte para producers, consumers, admin operations, SASL authentication y configuración avanzada de particiones.',
        category: 'messaging',
        versions: ['v0.4.44', 'v0.4.43', 'v0.4.42'],
        defaultVersion: 'v0.4.44'
      },
      {
        id: 'nats-go',
        label: 'NATS Client',
        description: 'Cliente NATS para Go',
        detailedDescription: 'Cliente oficial para NATS messaging system con soporte para pub/sub, request/reply, JetStream, key-value store y object store.',
        category: 'messaging',
        versions: ['v1.31.0', 'v1.30.0', 'v1.29.0'],
        defaultVersion: 'v1.31.0'
      },
      {
        id: 'rabbitmq-go',
        label: 'RabbitMQ (AMQP)',
        description: 'Cliente AMQP para RabbitMQ',
        detailedDescription: 'Cliente AMQP 0.9.1 para RabbitMQ con soporte para exchanges, queues, routing, confirmations y connection recovery automático.',
        category: 'messaging',
        versions: ['v1.9.0', 'v1.8.0', 'v1.7.0'],
        defaultVersion: 'v1.9.0'
      },
      {
        id: 'gorilla-websocket',
        label: 'Gorilla WebSocket',
        description: 'WebSockets para Go',
        detailedDescription: 'Implementación completa de WebSockets con soporte para subprotocolos, compresión, ping/pong automático y manejo de conexiones concurrentes.',
        category: 'messaging',
        versions: ['v1.5.0', 'v1.4.0', 'v1.3.0'],
        defaultVersion: 'v1.5.0'
      },
      {
        id: 'grpc-go',
        label: 'gRPC',
        description: 'RPC de alto rendimiento',
        detailedDescription: 'Implementación oficial de gRPC para Go con soporte para streaming bidireccional, interceptors, load balancing y generación automática de código.',
        category: 'messaging',
        versions: ['v1.59.0', 'v1.58.0', 'v1.57.0'],
        defaultVersion: 'v1.59.0'
      },
      {
        id: 'docker-go',
        label: 'Docker Multi-stage',
        description: 'Containerización optimizada',
        detailedDescription: 'Configuración Docker optimizada para Go con multi-stage builds, scratch/distroless images, compilación estática y imágenes mínimas para producción.',
        category: 'deployment',
        versions: ['alpine', 'distroless', 'scratch'],
        defaultVersion: 'distroless'
      },
      {
        id: 'kubernetes-go',
        label: 'Kubernetes Client',
        description: 'Cliente oficial de Kubernetes',
        detailedDescription: 'Cliente Go oficial para interactuar con APIs de Kubernetes, gestionar recursos, implementar operators y controllers personalizados.',
        category: 'deployment',
        versions: ['v0.28.0', 'v0.27.0', 'v0.26.0'],
        defaultVersion: 'v0.28.0'
      },
      {
        id: 'cobra-cli',
        label: 'Cobra CLI',
        description: 'Framework para aplicaciones CLI',
        detailedDescription: 'Framework para crear aplicaciones de línea de comandos con subcomandos, flags, autocompletado y generación automática de documentación.',
        category: 'deployment',
        versions: ['v1.8.0', 'v1.7.0', 'v1.6.0'],
        defaultVersion: 'v1.8.0'
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
        id: 'mypy',
        label: 'MyPy',
        description: 'Verificación de tipos estáticos',
        detailedDescription: 'Verificador de tipos estáticos para Python que detecta errores de tipo en tiempo de desarrollo. Mejora la calidad del código y facilita el refactoring.',
        category: 'code-quality',
        versions: ['1.7.0', '1.6.0', '1.5.0'],
        defaultVersion: '1.7.0',
        required: true
      },
      {
        id: 'isort',
        label: 'isort',
        description: 'Ordenamiento automático de imports',
        detailedDescription: 'Herramienta que ordena automáticamente los imports de Python según PEP 8 y configuraciones personalizables. Se integra perfectamente con Black.',
        category: 'code-quality',
        versions: ['5.13.0', '5.12.0', '5.11.0'],
        defaultVersion: '5.13.0'
      },
      {
        id: 'flake8',
        label: 'Flake8',
        description: 'Linting tradicional para Python',
        detailedDescription: 'Wrapper que combina PyFlakes, pycodestyle y McCabe para verificar errores, estilo PEP 8 y complejidad ciclomática del código Python.',
        category: 'code-quality',
        versions: ['6.1.0', '6.0.0', '5.0.0'],
        defaultVersion: '6.1.0'
      },
      {
        id: 'bandit',
        label: 'Bandit',
        description: 'Análisis de seguridad',
        detailedDescription: 'Herramienta que encuentra vulnerabilidades de seguridad comunes en código Python como SQL injection, uso de funciones inseguras y configuraciones peligrosas.',
        category: 'security',
        versions: ['1.7.5', '1.7.4', '1.7.3'],
        defaultVersion: '1.7.5'
      },
      {
        id: 'pre-commit',
        label: 'Pre-commit Hooks',
        description: 'Git hooks para calidad de código',
        detailedDescription: 'Framework para gestionar git hooks que ejecuta automáticamente linters, formatters y tests antes de cada commit, manteniendo la calidad del código.',
        category: 'code-quality',
        versions: ['3.6.0', '3.5.0', '3.4.0'],
        defaultVersion: '3.6.0'
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
        id: 'pytest-cov',
        label: 'pytest-cov',
        description: 'Cobertura de código para pytest',
        detailedDescription: 'Plugin de pytest que genera reportes de cobertura de código usando coverage.py con integración perfecta y reportes en múltiples formatos.',
        category: 'testing',
        versions: ['4.1.0', '4.0.0', '3.0.0'],
        defaultVersion: '4.1.0'
      },
      {
        id: 'pytest-mock',
        label: 'pytest-mock',
        description: 'Mocking integrado con pytest',
        detailedDescription: 'Plugin que proporciona un fixture mocker para crear mocks y patches de forma sencilla en tests, con cleanup automático.',
        category: 'testing',
        versions: ['3.12.0', '3.11.0', '3.10.0'],
        defaultVersion: '3.12.0'
      },
      {
        id: 'hypothesis',
        label: 'Hypothesis',
        description: 'Property-based testing',
        detailedDescription: 'Biblioteca para property-based testing que genera automáticamente casos de prueba para encontrar edge cases que podrían pasar desapercibidos.',
        category: 'testing',
        versions: ['6.92.0', '6.91.0', '6.90.0'],
        defaultVersion: '6.92.0'
      },
      {
        id: 'factory-boy',
        label: 'Factory Boy',
        description: 'Generación de datos de prueba',
        detailedDescription: 'Biblioteca para crear fixtures de testing de forma declarativa, generando objetos de prueba con datos realistas y relaciones complejas.',
        category: 'testing',
        versions: ['3.3.0', '3.2.0', '3.1.0'],
        defaultVersion: '3.3.0'
      },
      {
        id: 'testcontainers-python',
        label: 'Testcontainers Python',
        description: 'Testing con contenedores Docker',
        detailedDescription: 'Puerto de Testcontainers para Python que permite ejecutar tests de integración con servicios reales en contenedores Docker.',
        category: 'testing',
        versions: ['3.7.0', '3.6.0', '3.5.0'],
        defaultVersion: '3.7.0'
      },
      {
        id: 'fastapi-framework',
        label: 'FastAPI',
        description: 'Framework web moderno y rápido',
        detailedDescription: 'Framework web de alto rendimiento para construir APIs con Python 3.7+ basado en type hints. Incluye validación automática, documentación interactiva y serialización.',
        category: 'code-quality',
        versions: ['0.104.0', '0.103.0', '0.102.0'],
        defaultVersion: '0.104.0'
      },
      {
        id: 'django-framework',
        label: 'Django',
        description: 'Framework web completo',
        detailedDescription: 'Framework web de alto nivel que fomenta el desarrollo rápido y el diseño limpio. Incluye ORM, admin interface, autenticación y muchas funcionalidades out-of-the-box.',
        category: 'code-quality',
        versions: ['5.0.0', '4.2.0', '4.1.0'],
        defaultVersion: '5.0.0'
      },
      {
        id: 'flask-framework',
        label: 'Flask',
        description: 'Microframework web flexible',
        detailedDescription: 'Microframework web minimalista y flexible que permite construir aplicaciones web y APIs con gran control sobre los componentes utilizados.',
        category: 'code-quality',
        versions: ['3.0.0', '2.3.0', '2.2.0'],
        defaultVersion: '3.0.0'
      },
      {
        id: 'fastapi-extras',
        label: 'FastAPI Extras',
        description: 'Componentes adicionales para FastAPI',
        detailedDescription: 'Extensiones para FastAPI incluyendo middleware de CORS, autenticación JWT, validación avanzada, documentación automática mejorada y utilidades para testing de APIs.',
        category: 'deployment'
      },
      {
        id: 'pydantic',
        label: 'Pydantic',
        description: 'Validación de datos con type hints',
        detailedDescription: 'Biblioteca para validación de datos usando type hints de Python. Proporciona parsing automático, validación y serialización con excelente performance.',
        category: 'code-quality',
        versions: ['2.5.0', '2.4.0', '2.3.0'],
        defaultVersion: '2.5.0'
      },
      {
        id: 'sqlalchemy',
        label: 'SQLAlchemy',
        description: 'ORM y toolkit SQL',
        detailedDescription: 'ORM más popular para Python con soporte para múltiples bases de datos, query builder expresivo, migraciones con Alembic y patrones avanzados.',
        category: 'database',
        versions: ['2.0.0', '1.4.0', '1.3.0'],
        defaultVersion: '2.0.0'
      },
      {
        id: 'alembic',
        label: 'Alembic',
        description: 'Migraciones de base de datos',
        detailedDescription: 'Herramienta de migración de bases de datos para SQLAlchemy que permite versionar esquemas, generar migraciones automáticas y gestionar cambios incrementales.',
        category: 'database',
        versions: ['1.13.0', '1.12.0', '1.11.0'],
        defaultVersion: '1.13.0'
      },
      {
        id: 'psycopg2',
        label: 'psycopg2',
        description: 'Adaptador PostgreSQL',
        detailedDescription: 'Adaptador PostgreSQL más popular para Python con soporte completo para tipos PostgreSQL, connection pooling y operaciones asíncronas.',
        category: 'database',
        versions: ['2.9.9', '2.9.8', '2.9.7'],
        defaultVersion: '2.9.9'
      },
      {
        id: 'redis-python',
        label: 'Redis Client',
        description: 'Cliente Redis para Python',
        detailedDescription: 'Cliente oficial de Redis para Python con soporte para clustering, pub/sub, streams, pipelines y connection pooling automático.',
        category: 'database',
        versions: ['5.0.0', '4.6.0', '4.5.0'],
        defaultVersion: '5.0.0'
      },
      {
        id: 'pymongo',
        label: 'PyMongo',
        description: 'Driver MongoDB oficial',
        detailedDescription: 'Driver oficial de MongoDB para Python con soporte para operaciones CRUD, aggregation pipeline, change streams, GridFS y motor asíncrono.',
        category: 'database',
        versions: ['4.6.0', '4.5.0', '4.4.0'],
        defaultVersion: '4.6.0'
      },
      {
        id: 'elasticsearch-py',
        label: 'Elasticsearch Client',
        description: 'Cliente oficial Elasticsearch',
        detailedDescription: 'Cliente Python oficial para Elasticsearch con soporte para queries complejas, aggregations, bulk operations y async/await.',
        category: 'database',
        versions: ['8.11.0', '8.10.0', '8.9.0'],
        defaultVersion: '8.11.0'
      },
      {
        id: 'pandas',
        label: 'Pandas',
        description: 'Análisis y manipulación de datos',
        detailedDescription: 'Biblioteca fundamental para análisis de datos que proporciona estructuras de datos de alto rendimiento y herramientas de análisis para Python.',
        category: 'code-quality',
        versions: ['2.1.0', '2.0.0', '1.5.0'],
        defaultVersion: '2.1.0'
      },
      {
        id: 'numpy',
        label: 'NumPy',
        description: 'Computación científica',
        detailedDescription: 'Biblioteca fundamental para computación científica que proporciona arrays multidimensionales de alto rendimiento y funciones matemáticas.',
        category: 'code-quality',
        versions: ['1.25.0', '1.24.0', '1.23.0'],
        defaultVersion: '1.25.0'
      },
      {
        id: 'scikit-learn',
        label: 'Scikit-learn',
        description: 'Machine Learning',
        detailedDescription: 'Biblioteca de machine learning que proporciona algoritmos de clasificación, regresión, clustering y reducción de dimensionalidad con API consistente.',
        category: 'code-quality',
        versions: ['1.3.0', '1.2.0', '1.1.0'],
        defaultVersion: '1.3.0'
      },
      {
        id: 'matplotlib',
        label: 'Matplotlib',
        description: 'Visualización de datos',
        detailedDescription: 'Biblioteca de visualización que produce gráficos de calidad de publicación en una variedad de formatos y entornos interactivos.',
        category: 'code-quality',
        versions: ['3.8.0', '3.7.0', '3.6.0'],
        defaultVersion: '3.8.0'
      },
      {
        id: 'jupyter',
        label: 'Jupyter Notebook',
        description: 'Entorno interactivo de desarrollo',
        detailedDescription: 'Aplicación web que permite crear y compartir documentos con código ejecutable, ecuaciones, visualizaciones y texto narrativo.',
        category: 'code-quality',
        versions: ['7.0.0', '6.5.0', '6.4.0'],
        defaultVersion: '7.0.0'
      },
      {
        id: 'structlog',
        label: 'Structlog',
        description: 'Logging estructurado',
        detailedDescription: 'Biblioteca de logging que produce logs estructurados de forma consistente, facilitando el parsing y análisis en sistemas de agregación de logs.',
        category: 'observability',
        versions: ['23.2.0', '23.1.0', '22.3.0'],
        defaultVersion: '23.2.0'
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
        id: 'prometheus-client-python',
        label: 'Prometheus Client',
        description: 'Métricas para Prometheus',
        detailedDescription: 'Cliente oficial de Prometheus para Python que permite crear y exponer métricas personalizadas con soporte para multiprocessing.',
        category: 'observability',
        versions: ['0.19.0', '0.18.0', '0.17.0'],
        defaultVersion: '0.19.0'
      },
      {
        id: 'sentry-python',
        label: 'Sentry',
        description: 'Monitoreo de errores',
        detailedDescription: 'SDK de Sentry para Python con integración automática para frameworks populares, captura de contexto detallado y performance monitoring.',
        category: 'observability',
        versions: ['1.38.0', '1.37.0', '1.36.0'],
        defaultVersion: '1.38.0'
      },
      {
        id: 'celery',
        label: 'Celery',
        description: 'Cola de tareas distribuida',
        detailedDescription: 'Sistema de cola de tareas distribuido para procesar trabajos en background con soporte para múltiples brokers (Redis, RabbitMQ) y workers.',
        category: 'messaging',
        versions: ['5.3.0', '5.2.0', '5.1.0'],
        defaultVersion: '5.3.0'
      },
      {
        id: 'kafka-python',
        label: 'Kafka Python',
        description: 'Cliente Kafka para Python',
        detailedDescription: 'Cliente Kafka puro en Python con soporte para producers, consumers, admin operations y configuración avanzada de particiones.',
        category: 'messaging',
        versions: ['2.0.2', '2.0.1', '2.0.0'],
        defaultVersion: '2.0.2'
      },
      {
        id: 'pika-rabbitmq',
        label: 'Pika (RabbitMQ)',
        description: 'Cliente RabbitMQ para Python',
        detailedDescription: 'Cliente AMQP para RabbitMQ con soporte para conexiones síncronas y asíncronas, exchanges, queues y patrones de messaging.',
        category: 'messaging',
        versions: ['1.3.0', '1.2.0', '1.1.0'],
        defaultVersion: '1.3.0'
      },
      {
        id: 'websockets',
        label: 'WebSockets',
        description: 'Implementación WebSocket',
        detailedDescription: 'Biblioteca para implementar clientes y servidores WebSocket con soporte para async/await, extensiones y subprotocolos.',
        category: 'messaging',
        versions: ['12.0', '11.0', '10.4'],
        defaultVersion: '12.0'
      },
      {
        id: 'authlib',
        label: 'Authlib',
        description: 'Biblioteca de autenticación completa',
        detailedDescription: 'Biblioteca completa para OAuth 1.0/2.0, OpenID Connect, JWT, JWS, JWE con soporte para múltiples frameworks web.',
        category: 'security',
        versions: ['1.2.0', '1.1.0', '1.0.0'],
        defaultVersion: '1.2.0'
      },
      {
        id: 'pyjwt',
        label: 'PyJWT',
        description: 'JSON Web Tokens',
        detailedDescription: 'Implementación de JWT para Python con soporte para diferentes algoritmos de firma, validación automática y claims personalizados.',
        category: 'security',
        versions: ['2.8.0', '2.7.0', '2.6.0'],
        defaultVersion: '2.8.0'
      },
      {
        id: 'passlib',
        label: 'Passlib',
        description: 'Hashing de contraseñas',
        detailedDescription: 'Biblioteca completa para hash de contraseñas con soporte para múltiples algoritmos (bcrypt, scrypt, argon2) y migración entre esquemas.',
        category: 'security',
        versions: ['1.7.4', '1.7.3', '1.7.2'],
        defaultVersion: '1.7.4'
      },
      {
        id: 'cryptography',
        label: 'Cryptography',
        description: 'Primitivas criptográficas',
        detailedDescription: 'Biblioteca que proporciona recetas criptográficas y primitivas de bajo nivel con interfaces de alto nivel para casos de uso comunes.',
        category: 'security',
        versions: ['41.0.0', '40.0.0', '39.0.0'],
        defaultVersion: '41.0.0'
      },
      {
        id: 'poetry',
        label: 'Poetry',
        description: 'Gestión de dependencias para Python',
        detailedDescription: 'Herramienta moderna para gestión de dependencias y packaging en Python. Maneja virtual environments automáticamente, resuelve dependencias y permite publicar paquetes de forma sencilla.',
        category: 'deployment',
        versions: ['1.7.0', '1.6.0', '1.5.0'],
        defaultVersion: '1.7.0'
      },
      {
        id: 'pipenv',
        label: 'Pipenv',
        description: 'Gestión de entornos virtuales',
        detailedDescription: 'Herramienta que combina pip y virtualenv para gestionar dependencias y entornos virtuales con archivos Pipfile y lock files.',
        category: 'deployment',
        versions: ['2023.11.0', '2023.10.0', '2023.9.0'],
        defaultVersion: '2023.11.0'
      },
      {
        id: 'docker-python',
        label: 'Docker Optimization',
        description: 'Containerización optimizada',
        detailedDescription: 'Configuración Docker optimizada para Python con multi-stage builds, Alpine Linux, cache de dependencias y imágenes mínimas para producción.',
        category: 'deployment',
        versions: ['3.12-alpine', '3.11-alpine', '3.10-alpine'],
        defaultVersion: '3.12-alpine'
      },
      {
        id: 'gunicorn',
        label: 'Gunicorn',
        description: 'Servidor WSGI para producción',
        detailedDescription: 'Servidor HTTP WSGI para aplicaciones Python con soporte para múltiples workers, configuración flexible y excelente performance en producción.',
        category: 'deployment',
        versions: ['21.2.0', '21.1.0', '21.0.0'],
        defaultVersion: '21.2.0'
      },
      {
        id: 'uvicorn',
        label: 'Uvicorn',
        description: 'Servidor ASGI ultrarrápido',
        detailedDescription: 'Servidor ASGI de alto rendimiento para aplicaciones Python asíncronas como FastAPI, construido sobre uvloop y httptools.',
        category: 'deployment',
        versions: ['0.24.0', '0.23.0', '0.22.0'],
        defaultVersion: '0.24.0'
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