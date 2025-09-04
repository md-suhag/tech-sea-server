import { Types } from "mongoose";

export enum ReactionType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export interface IBlogReaction {
  blog: Types.ObjectId;
  user: Types.ObjectId;
  type: ReactionType;
  createdAt: Date;
  updatedAt: Date;
}
