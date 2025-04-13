import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import blogData from "../../../data/json/blog.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";


const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogData.find((item) => item.id === id);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  //fetch the markdown file
  useEffect(() => {
    // Fetch the Markdown file dynamically based on the blog ID
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/data/blog/${id}.md`); // Adjust the path to match your setup
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching Markdown file:", error);
        setContent(
          "# Blog not found\nWe couldn't find the requested blog post."
        );
      }
    };

    fetchMarkdown();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto items-center">
      <div className="overflow-hidden mb-2">
        {/* Blog Cover Image */}
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />

        {/* Blog Title and Meta Info */}
        <div className="p-6">
          <h1 className="text-5xl font-extrabold mb-2 text-gray-800">
            {blog.title}
          </h1>
          <div className="flex justify-start ml-3 gap-2 text-gray-600">
              <FontAwesomeIcon icon={faUser} />
              <p className="text-sm">{blog.author}</p>
            </div>
            <div className="flex items-center ml-3  gap-2 text-gray-600">
              <FontAwesomeIcon icon={faCalendar} />
              <p className="text-sm">{blog.date}</p>
            </div>
          </div>
        </div>


      {/* Blog Content */}
      <div className="px-8 flex flex-col items-center">
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
        <div className="btn btn-outline my-4" onClick={()=>navigate("/blog")}>Back to read more blogs</div>
      </div>

    </div>
  );
};

export default BlogDetailPage;
