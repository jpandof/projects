export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'moderator' | 'expert' | 'member';
    reputation: number;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  replies: number;
  likes: number;
  solved: boolean;
  pinned: boolean;
  locked: boolean;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'waiting-response' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature-request' | 'bug-report' | 'general';
  author: {
    id: string;
    name: string;
    email: string;
  };
  assignee?: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  responses: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    isStaff: boolean;
  }>;
  attachments: Array<{
    id: string;
    filename: string;
    size: number;
    url: string;
  }>;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  subcategory?: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  helpful: number;
  notHelpful: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // minutes
}

export interface CommunityStats {
  totalMembers: number;
  activeMembers: number;
  totalPosts: number;
  totalReplies: number;
  resolvedQuestions: number;
  averageResponseTime: number; // hours
  topContributors: Array<{
    id: string;
    name: string;
    contributions: number;
    reputation: number;
  }>;
}

// Mock data
export const forumCategories = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General questions and discussions about the platform',
    icon: '💬',
    color: 'bg-blue-500'
  },
  {
    id: 'technical',
    name: 'Technical Help',
    description: 'Get help with technical issues and implementation',
    icon: '🔧',
    color: 'bg-green-500'
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Questions about API integration and usage',
    icon: '🔌',
    color: 'bg-purple-500'
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    description: 'Share and learn about development best practices',
    icon: '⭐',
    color: 'bg-yellow-500'
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Official announcements and updates',
    icon: '📢',
    color: 'bg-red-500'
  },
  {
    id: 'feature-requests',
    name: 'Feature Requests',
    description: 'Suggest new features and improvements',
    icon: '💡',
    color: 'bg-orange-500'
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-001',
    title: 'How to integrate payment gateway with React frontend?',
    content: 'I\'m trying to integrate our payment API with a React frontend. What\'s the best approach for handling secure payment flows?',
    author: {
      id: 'user-001',
      name: 'John Developer',
      role: 'member',
      reputation: 245
    },
    category: 'api-integration',
    tags: ['react', 'payments', 'security', 'frontend'],
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    views: 156,
    replies: 8,
    likes: 12,
    solved: true,
    pinned: false,
    locked: false
  },
  {
    id: 'post-002',
    title: 'Best practices for microservices architecture',
    content: 'What are the recommended patterns for building microservices in our banking platform?',
    author: {
      id: 'user-002',
      name: 'Sarah Architect',
      role: 'expert',
      reputation: 892
    },
    category: 'best-practices',
    tags: ['microservices', 'architecture', 'java', 'spring'],
    createdAt: '2024-01-19T15:20:00Z',
    updatedAt: '2024-01-20T09:15:00Z',
    views: 234,
    replies: 15,
    likes: 28,
    solved: false,
    pinned: true,
    locked: false
  },
  {
    id: 'post-003',
    title: 'New API versioning strategy - v3.0 rollout',
    content: 'We\'re implementing a new API versioning strategy. Here\'s what you need to know about the upcoming changes.',
    author: {
      id: 'admin-001',
      name: 'Platform Team',
      role: 'admin',
      reputation: 1500
    },
    category: 'announcements',
    tags: ['api', 'versioning', 'breaking-changes', 'migration'],
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-18T09:00:00Z',
    views: 445,
    replies: 22,
    likes: 35,
    solved: false,
    pinned: true,
    locked: false
  },
  {
    id: 'post-004',
    title: 'Error handling in Node.js microservices',
    content: 'What\'s the recommended approach for centralized error handling across multiple Node.js services?',
    author: {
      id: 'user-003',
      name: 'Mike Backend',
      role: 'member',
      reputation: 156
    },
    category: 'technical',
    tags: ['nodejs', 'error-handling', 'microservices'],
    createdAt: '2024-01-17T11:45:00Z',
    updatedAt: '2024-01-19T16:30:00Z',
    views: 89,
    replies: 6,
    likes: 9,
    solved: true,
    pinned: false,
    locked: false
  },
  {
    id: 'post-005',
    title: 'Request: Real-time notifications for API changes',
    content: 'It would be great to have real-time notifications when APIs we depend on have breaking changes.',
    author: {
      id: 'user-004',
      name: 'Lisa Frontend',
      role: 'member',
      reputation: 78
    },
    category: 'feature-requests',
    tags: ['notifications', 'api-changes', 'real-time'],
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-18T10:15:00Z',
    views: 67,
    replies: 4,
    likes: 18,
    solved: false,
    pinned: false,
    locked: false
  }
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket-001',
    title: 'Unable to authenticate with User Management API',
    description: 'Getting 401 errors when trying to authenticate with the User Management API using OAuth2. The token seems to be valid but still getting unauthorized responses.',
    status: 'in-progress',
    priority: 'high',
    category: 'technical',
    author: {
      id: 'user-005',
      name: 'David Johnson',
      email: 'david.johnson@company.com'
    },
    assignee: {
      id: 'support-001',
      name: 'Alex Support',
      role: 'Senior Support Engineer'
    },
    createdAt: '2024-01-20T08:30:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
    responses: [
      {
        id: 'response-001',
        author: 'Alex Support',
        content: 'Hi David, thanks for reaching out. Can you please share the exact error message and the token you\'re using? Also, please verify that you\'re using the correct scopes.',
        timestamp: '2024-01-20T09:15:00Z',
        isStaff: true
      },
      {
        id: 'response-002',
        author: 'David Johnson',
        content: 'Here\'s the error: "Invalid token scope for requested resource". I\'m using the client_credentials flow with scopes "user:read user:write".',
        timestamp: '2024-01-20T10:30:00Z',
        isStaff: false
      },
      {
        id: 'response-003',
        author: 'Alex Support',
        content: 'I see the issue. The User Management API v2.0 requires the "users:manage" scope instead of separate read/write scopes. Please update your OAuth configuration.',
        timestamp: '2024-01-20T15:45:00Z',
        isStaff: true
      }
    ],
    attachments: [
      {
        id: 'att-001',
        filename: 'error-screenshot.png',
        size: 245760,
        url: '/attachments/error-screenshot.png'
      }
    ]
  },
  {
    id: 'ticket-002',
    title: 'Billing question about API usage limits',
    description: 'I need clarification on our current API usage limits and pricing tiers. We\'re approaching our monthly limit.',
    status: 'waiting-response',
    priority: 'medium',
    category: 'billing',
    author: {
      id: 'user-006',
      name: 'Emma Finance',
      email: 'emma.finance@company.com'
    },
    assignee: {
      id: 'billing-001',
      name: 'Maria Billing',
      role: 'Billing Specialist'
    },
    createdAt: '2024-01-19T14:20:00Z',
    updatedAt: '2024-01-19T16:30:00Z',
    responses: [
      {
        id: 'response-004',
        author: 'Maria Billing',
        content: 'Hi Emma, I\'ve reviewed your account. You\'re currently on the Professional plan with 100K requests/month. You\'ve used 85K so far. Would you like to upgrade to Enterprise for unlimited requests?',
        timestamp: '2024-01-19T16:30:00Z',
        isStaff: true
      }
    ],
    attachments: []
  },
  {
    id: 'ticket-003',
    title: 'Feature request: GraphQL support for Analytics API',
    description: 'Would it be possible to add GraphQL support to the Analytics API? It would help us optimize our data fetching.',
    status: 'open',
    priority: 'low',
    category: 'feature-request',
    author: {
      id: 'user-007',
      name: 'Carlos Data',
      email: 'carlos.data@company.com'
    },
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
    responses: [],
    attachments: []
  }
];

export const mockKnowledgeBase: KnowledgeBaseArticle[] = [
  {
    id: 'kb-001',
    title: 'Getting Started with Banking APIs',
    summary: 'Complete guide to start using our banking APIs, including authentication and basic operations.',
    content: `# Getting Started with Banking APIs

## Overview
Our banking API platform provides secure, reliable access to core banking services. This guide will help you get started with authentication and basic operations.

## Authentication
All APIs use OAuth 2.0 for authentication. Here's how to get started:

1. **Register your application** in the developer portal
2. **Get your client credentials** (client_id and client_secret)
3. **Request an access token** using the client credentials flow
4. **Include the token** in your API requests

## Basic Example
\`\`\`javascript
// Get access token
const tokenResponse = await fetch('https://api.bank.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    scope: 'accounts:read'
  })
});

const { access_token } = await tokenResponse.json();

// Use token in API calls
const accountsResponse = await fetch('https://api.bank.com/core/accounts', {
  headers: { 'Authorization': \`Bearer \${access_token}\` }
});
\`\`\`

## Next Steps
- Explore the [API Catalog](/apis) to see all available services
- Check out our [Postman Collection](https://postman.com/banking-apis)
- Join the [Developer Forum](/community) for questions and discussions`,
    category: 'getting-started',
    tags: ['authentication', 'oauth', 'beginner', 'tutorial'],
    author: 'Platform Team',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    views: 1245,
    helpful: 89,
    notHelpful: 3,
    difficulty: 'beginner',
    estimatedReadTime: 8
  },
  {
    id: 'kb-002',
    title: 'API Rate Limiting and Best Practices',
    summary: 'Understanding rate limits, handling errors, and optimizing API usage for better performance.',
    content: `# API Rate Limiting and Best Practices

## Rate Limits
Our APIs implement rate limiting to ensure fair usage and system stability:

- **Standard tier**: 1,000 requests/hour
- **Professional tier**: 10,000 requests/hour  
- **Enterprise tier**: Unlimited requests

## Handling Rate Limits
When you exceed rate limits, you'll receive a 429 status code:

\`\`\`json
{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Try again in 3600 seconds.",
  "retry_after": 3600
}
\`\`\`

## Best Practices
1. **Implement exponential backoff** for retries
2. **Cache responses** when possible
3. **Use batch operations** for multiple requests
4. **Monitor your usage** through the developer dashboard

## Example Implementation
\`\`\`javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      continue;
    }
    
    return response;
  }
  throw new Error('Max retries exceeded');
}
\`\`\``,
    category: 'best-practices',
    tags: ['rate-limiting', 'performance', 'optimization', 'errors'],
    author: 'API Team',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
    views: 567,
    helpful: 45,
    notHelpful: 2,
    difficulty: 'intermediate',
    estimatedReadTime: 12
  },
  {
    id: 'kb-003',
    title: 'Security Best Practices for Banking APIs',
    summary: 'Essential security practices when working with sensitive banking data and APIs.',
    content: `# Security Best Practices for Banking APIs

## Overview
When working with banking APIs, security is paramount. Follow these practices to ensure your integration is secure.

## Authentication Security
- **Never expose credentials** in client-side code
- **Use environment variables** for sensitive configuration
- **Implement token refresh** mechanisms
- **Validate tokens** on every request

## Data Protection
- **Encrypt sensitive data** in transit and at rest
- **Implement proper logging** without exposing sensitive information
- **Use HTTPS only** for all API communications
- **Validate all inputs** to prevent injection attacks

## Compliance Requirements
- **PCI DSS compliance** for payment data
- **GDPR compliance** for customer data
- **SOX compliance** for financial reporting
- **Regular security audits** and penetration testing

## Code Examples
\`\`\`javascript
// ✅ Good: Secure token handling
const token = process.env.API_TOKEN;
const response = await fetch(apiUrl, {
  headers: { 
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

// ❌ Bad: Exposing credentials
const response = await fetch(apiUrl, {
  headers: { 
    'Authorization': 'Bearer hardcoded-token-123'
  }
});
\`\`\``,
    category: 'security',
    tags: ['security', 'compliance', 'pci-dss', 'gdpr', 'authentication'],
    author: 'Security Team',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    views: 789,
    helpful: 67,
    notHelpful: 1,
    difficulty: 'advanced',
    estimatedReadTime: 15
  },
  {
    id: 'kb-004',
    title: 'Troubleshooting Common API Errors',
    summary: 'Solutions for the most common API errors and how to resolve them quickly.',
    content: `# Troubleshooting Common API Errors

## 401 Unauthorized
**Cause**: Invalid or expired authentication token
**Solution**: 
- Verify your token is valid and not expired
- Check that you're using the correct authentication method
- Ensure your client credentials are correct

## 403 Forbidden  
**Cause**: Valid token but insufficient permissions
**Solution**:
- Check that your token has the required scopes
- Verify your account has access to the requested resource
- Contact support if you believe this is an error

## 429 Rate Limited
**Cause**: Too many requests in a short time period
**Solution**:
- Implement exponential backoff
- Check the Retry-After header
- Consider upgrading your plan for higher limits

## 500 Internal Server Error
**Cause**: Server-side error
**Solution**:
- Check our status page for known issues
- Retry the request after a short delay
- Contact support if the issue persists

## Quick Debugging Checklist
1. ✅ Check API status page
2. ✅ Verify authentication token
3. ✅ Validate request format
4. ✅ Check rate limits
5. ✅ Review error logs`,
    category: 'troubleshooting',
    tags: ['errors', 'debugging', 'troubleshooting', 'http-status'],
    author: 'Support Team',
    createdAt: '2024-01-08T12:00:00Z',
    updatedAt: '2024-01-16T10:30:00Z',
    views: 923,
    helpful: 78,
    notHelpful: 5,
    difficulty: 'beginner',
    estimatedReadTime: 6
  }
];

export const mockCommunityStats: CommunityStats = {
  totalMembers: 2847,
  activeMembers: 456,
  totalPosts: 1234,
  totalReplies: 5678,
  resolvedQuestions: 892,
  averageResponseTime: 4.2,
  topContributors: [
    {
      id: 'user-expert-001',
      name: 'Sarah Architect',
      contributions: 156,
      reputation: 892
    },
    {
      id: 'user-expert-002',
      name: 'Mike Senior Dev',
      contributions: 134,
      reputation: 756
    },
    {
      id: 'user-expert-003',
      name: 'Lisa API Expert',
      contributions: 98,
      reputation: 623
    },
    {
      id: 'user-expert-004',
      name: 'Carlos Security',
      contributions: 87,
      reputation: 567
    }
  ]
};

export const knowledgeBaseCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Basic guides to get you up and running',
    icon: '🚀',
    color: 'bg-blue-500'
  },
  {
    id: 'authentication',
    name: 'Authentication',
    description: 'OAuth, API keys, and security',
    icon: '🔐',
    color: 'bg-green-500'
  },
  {
    id: 'api-reference',
    name: 'API Reference',
    description: 'Detailed API documentation and examples',
    icon: '📚',
    color: 'bg-purple-500'
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    description: 'Recommended patterns and approaches',
    icon: '⭐',
    color: 'bg-yellow-500'
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Common issues and solutions',
    icon: '🔧',
    color: 'bg-red-500'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Security guidelines and compliance',
    icon: '🛡️',
    color: 'bg-orange-500'
  }
];