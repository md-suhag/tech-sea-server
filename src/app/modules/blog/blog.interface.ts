import { Types } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  author: Types.ObjectId;
  isDeleted: boolean;
  likes: number;
  dislikes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}
