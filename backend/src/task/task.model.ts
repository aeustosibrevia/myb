export interface Task {
  id: number;
  userId: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}
