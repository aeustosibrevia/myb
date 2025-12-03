export class User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  xp: number;
  current_rank_id: number;
  card_token?: string | null;
  is_card_verified: boolean;
}
