import { JwtPayload } from "jsonwebtoken";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { Blog } from "../blog/blog.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createComment = async (
  payload: Partial<IComment>,
  decodedToken: JwtPayload
) => {
  const session = await Comment.startSession();
  session.startTransaction();

  try {
    const blog = await Blog.findById(payload.blog).session(session);
    if (!blog) throw new AppError(httpStatus.NOT_FOUND, "Blog not found");

    blog.comments += 1;
    await blog.save({ session });

    const newComment = await Comment.create(
      [{ ...payload, user: decodedToken.userId }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newComment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const CommentService = { createComment };
