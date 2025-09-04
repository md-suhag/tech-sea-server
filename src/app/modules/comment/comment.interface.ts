import { Types } from "mongoose";

export interface IComment {
  blog: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
