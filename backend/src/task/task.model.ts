export class Task {
  id: number;
  user_id: number;
  title: string;
  description: string;
  deadline: Date;
  created_at: Date;
  difficulty: number; // 1-5
  cost_if_failed: number;
  status: 'pending' | 'completed' | 'failed';
}
