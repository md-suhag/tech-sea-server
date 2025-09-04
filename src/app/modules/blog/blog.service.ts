import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: Partial<IBlog>) => {
  const blog = await Blog.create(payload);
  return blog;
};

export const BlogServices = { createBlog };
