export interface UserMessage {
  id: number;
  userId: number;
  type: 'advice' | 'motivation' | 'encouragement';
  message: string;
  createdAt: Date;
}
