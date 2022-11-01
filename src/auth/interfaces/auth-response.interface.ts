import { User } from '../../users/entities';

export interface AuthResponse {
  jwt: string;
  user: User;
}
