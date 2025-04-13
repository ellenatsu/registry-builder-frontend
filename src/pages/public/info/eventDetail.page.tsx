import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import collaborations from "./../../../data/json/collaborations.json";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const CollaborationDetail = () => {
  const { slug } = useParams();
  const collaboration = collaborations.find((item) => item.slug === slug);
  const [content, setContent] = useState<string>("");

  if (!collaboration) {
    return <div>Offer not found</div>;
  }

  useEffect(() => {
    // Fetch the Markdown file dynamically based on the blog ID
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/data/collaboration/${slug}.md`); // Adjust the path to match your setup
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching Markdown file for collaboration:", error);
        setContent(
          "# Blog not found\nWe couldn't find the requested blog post."
        );
      }
    };

    fetchMarkdown();
  }, [slug]);

  return (
    <div className="container mx-auto">
      <div className="text-center">
        <img
          src={collaboration.coverImage}
          alt={collaboration.title}
          className="w-full h-[50vh] object-cover "
        />
      </div>
      <div className="prose max-w-2xl mx-auto mt-6">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className="w-full text-center mb-3">
        <a
          href={collaboration.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Website
        </a>
      </div>
      <div className="w-full flex justify-center items-center mb-10">
        <div className="bg-gray-100 p-2 rounded-lg shadow-md flex items-center">
          <span className="text-lg font-semibold text-gray-800">
            Code: {collaboration.code}
          </span>
          <div
            onClick={() => {
              navigator.clipboard.writeText(collaboration.code);
              toast.success("Code copied to clipboard!");
            }}
            className="p-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationDetail;
