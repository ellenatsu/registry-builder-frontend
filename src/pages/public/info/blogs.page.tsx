import React from "react";
import blogData from "../../../data/json/blog.json";
import { Link, useNavigate } from "react-router-dom";

const BlogsPage: React.FC = () => {
  const navigate = useNavigate();
  // Extract latest and top blogs
  const latestBlog = blogData[0]; // Assuming first is the latest
  const topBlogs = blogData.slice(1, 4); // Next 3 blogs for top section
  // const remainingBlogs = blogData.slice(4); // Remaining blogs for grid

  return (
    <div className="bg-base-100">
      {/* Latest Blog */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 m-0 h-[90vh] overflow-hidden">
        <div className="h-[90vh] col-span-2 flex flex-col justify-center items-start bg-black text-white p-8 ">
          <p className="mb-4">Top Blog</p>
          <h2 className="text-4xl font-bold">{latestBlog.title}</h2>

          <div className="mt-6 flex flex-col gap-4">
            <span className="text-md">Written by {latestBlog.author}</span>
            <div className="badge badge-outline mt-2">
              {latestBlog.category}
            </div>
            <div className="text-gray-400 text-sm">{latestBlog.abstract}</div>
            <Link
              to={`/blog/${latestBlog.id}`}
              className="btn btn-accent mt-3"
            >
              Read More
            </Link>
          </div>
        </div>
        <div className="col-span-3">
          <div className="h-full">
            <img
              src={latestBlog.coverImage}
              alt={latestBlog.title}
              className="object-cover h-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 p-8">
        {/* Top Blogs */}
        <div className="">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Popular Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {/* Big Blog Card */}
              <div className="col-span-3">
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  onClick={() =>
                    navigate(`/blog/${topBlogs[0].id}`)
                  }
                >
                  <img
                    src={topBlogs[0].coverImage}
                    alt={topBlogs[0].title}
                    className="w-full h-64 object-cover mb-2"
                  />
                  <div className="p-2 flex flex-col gap-2">
                    <h3 className="text-2xl font-bold">{topBlogs[0].title}</h3>
                    <div className="badge badge-outline">
                      {topBlogs[0].category}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {topBlogs[0].abstract}
                    </div>
                  </div>
                </div>
              </div>
              {/* Small Blog Cards */}
              <div className="col-span-2 flex flex-col gap-2">
                {topBlogs.slice(1).map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    <div className="flex flex-row p-1">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="p-4 flex flex-col gap-1">
                        <h4 className="text-lg font-semibold">
                          {blog.title}{" "}
                          <span className="badge badge-outline">
                            {blog.category}
                          </span>
                        </h4>

                        <div className="text-gray-600 text-xs">
                          {blog.abstract}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blogs by Date */}
        <div className="p-8 mt-2">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogData.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">{blog.title}</h4>
                    <div className="badge badge-outline">{blog.category}</div>
                    <div className="text-gray-600 text-sm">{blog.abstract}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
