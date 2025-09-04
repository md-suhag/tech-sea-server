import { Schema, model } from "mongoose";
import { IBlogReaction, ReactionType } from "./blogReaction.interface";

const blogReactionSchema = new Schema<IBlogReaction>(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ReactionType, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
blogReactionSchema.index({ blog: 1, user: 1 }, { unique: true });
export const BlogReaction = model<IBlogReaction>(
  "BlogReaction",
  blogReactionSchema
);
