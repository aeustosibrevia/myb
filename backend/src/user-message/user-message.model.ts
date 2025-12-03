export class UserMessage {
  id: number;
  user_id: number;
  task_id?: number | null;
  type: 'motivation' | 'reminder' | 'failure';
  subtype?: string | null;
  message_text: string;
  saved_amount?: number | null;
  created_at: Date;
}
