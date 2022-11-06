export interface UserData {
  id: number;
  fullName: string;
  avatarUrl: string;
  isActive: boolean;
  userName: string;
  email: string,
  status: "Pending" | 'Active',
}
