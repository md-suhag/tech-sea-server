import { Blog } from "../blog/blog.model";
const getBlogStats = async () => {
  const totalBlogPromise = Blog.countDocuments({ isDeleted: false });

  const totalBlogByCategoryPromise = Blog.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  const currentYear = new Date().getFullYear();

  const monthlyBlogStatsPromise = Blog.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lt: new Date(`${currentYear + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
        anyDate: { $first: "$createdAt" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: {
          $dateToString: { format: "%B", date: "$anyDate" },
        },
        count: 1,
      },
    },
    { $sort: { year: 1, month: 1 } },
  ]);

  const [totalBlog, totalBlogByCategory, monthlyBlogStats] = await Promise.all([
    totalBlogPromise,
    totalBlogByCategoryPromise,
    monthlyBlogStatsPromise,
  ]);

  return {
    totalBlog,
    totalBlogByCategory,
    monthlyBlogStats,
  };
};

export const StatsService = {
  getBlogStats,
};
