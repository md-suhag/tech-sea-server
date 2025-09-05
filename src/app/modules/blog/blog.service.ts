import { QueryBuilder } from "../../utils/QueryBuilder";
import { blogSearchableFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: Partial<IBlog>) => {
  const blog = await Blog.create(payload);
  return blog;
};

const getAllBlogs = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Blog.find({ isDeleted: false }).populate("author", "name"),
    query
  );

  const allBlogs = queryBuilder
    .search(blogSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    allBlogs.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleBlog = async (slug: string) => {
  const blog = await Blog.findOne({ slug, isDeleted: false }).populate(
    "author",
    "name"
  );

  return blog;
};

export const BlogServices = { createBlog, getAllBlogs, getSingleBlog };
