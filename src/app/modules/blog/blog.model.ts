import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";
import { createSlug } from "../../utils/createSlug";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

blogSchema.pre("save", async function (next) {
  const baseSlug = createSlug(this.title);

  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await Blog.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }
  this.slug = uniqueSlug;
  next();
});

export const Blog = model<IBlog>("Blog", blogSchema);
