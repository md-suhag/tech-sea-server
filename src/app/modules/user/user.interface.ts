export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  isBlocked?: boolean;
  isVerified?: boolean;
  auths: IAuthProvider[];
  createdAt?: Date;
  updatedAt?: Date;
}
