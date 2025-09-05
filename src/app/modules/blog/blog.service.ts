import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { blogSearchableFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Role } from "../user/user.interface";

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

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  decodedToken: JwtPayload
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }
  if (blog.author.toString() !== decodedToken.userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this blog"
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedBlog;
};
const deleteBlog = async (id: string, decodedToken: JwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  if (
    decodedToken.role !== Role.ADMIN &&
    decodedToken.role !== Role.SUPER_ADMIN &&
    blog.author.toString() !== decodedToken.userId
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this blog"
    );
  }
  await Blog.findByIdAndUpdate(id, { isDeleted: true });
};
export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
