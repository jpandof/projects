export interface Stack {
  id: string;
  label: string;
  description: string;
  color: string;
}

export const stacks: Stack[] = [
  {
    id: 'react',
    label: 'Frontend React',
    description: 'Modern React frontend development',
    color: 'bg-blue-500'
  },
  {
    id: 'java',
    label: 'Backend Java (Spring)',
    description: 'Enterprise Java backend with Spring',
    color: 'bg-orange-500'
  },
  {
    id: 'node',
    label: 'Backend Node (Nest)',
    description: 'Node.js backend with NestJS',
    color: 'bg-green-500'
  },
  {
    id: 'go',
    label: 'Backend Go (Gin)',
    description: 'High-performance Go backend',
    color: 'bg-cyan-500'
  },
  {
    id: 'python',
    label: 'Data Python (FastAPI)',
    description: 'Python data processing with FastAPI',
    color: 'bg-yellow-500'
  }
];