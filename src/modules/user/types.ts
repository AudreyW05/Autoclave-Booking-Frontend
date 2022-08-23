export type Role = 'Student' | 'Teacher' | 'Admin';

export interface UserData {
  id: number;
  email: string;
  role: Role;
  isTemporary: boolean;
  isConfirmed: boolean;
  schoolId: number;
}

export type UserPutData = Partial<UserData>;
