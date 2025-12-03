export class Payment {
  id: number;
  user_id: number;
  task_id?: number | null;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  created_at: Date;
}
