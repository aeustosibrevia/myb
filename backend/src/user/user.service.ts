import { users, ranks } from "../data/data";
import { User } from "./user.model";

export class UserService {
  static getById(user_id: number): User & { rank_name: string } | undefined {
    const user = users.find(u => u.id === user_id);
    if (!user) return undefined;

    const rank = ranks.find(r => r.id === user.current_rank_id);
    return {
      ...user,
      rank_name: rank ? rank.name : "Unknown",
    };
  }
}
