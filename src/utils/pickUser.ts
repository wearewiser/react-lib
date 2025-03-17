import { User } from "@/models";

export const pickUser = (users: User[]): User => {
  const size = users.length;
  const lucky_winner_id = Math.floor(Math.random() * size);
  const lucky_winner = users[lucky_winner_id];
  return lucky_winner;
};