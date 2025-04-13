import React from "react";
import { useNavigate } from "react-router-dom";

const userStories = [
  {
    id: 1,
    title: "How FundmyWish Helped Sarah Achieve Her Dream",
    author: "Sarah J.",
    date: "2025-01-01",
    abstract:
      "Sarah shares her inspiring journey of using FundmyWish to fundraise for her education and achieve her lifelong dream.",
    coverImage: "/images/user-stories/story1.png",
  },
  {
    id: 2,
    title: "How FundmyWish Saved Mark from picking the wrong gifts",
    author: "Mark T.",
    date: "2025-01-05",
    abstract:
      "Mark tells us how FundmyWish helped him save time and money by allowing him to contribute to his friend's wishlist quick and easily.",
    coverImage: "/images/user-stories/story2.png",
  },
];

const socialMediaReviews = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  image: `/images/reviews/review${index + 1}.png`,
  platform: index % 2 === 0 ? "Facebook" : "Instagram",
}));

const UserStoriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex flex-col items-center"
        style={{
          backgroundImage: `url('/images/user-story-cover.png')`, // Replace with your image path
        }}
      >
        <div className="p-8 mt-6 rounded-lg max-w-4xl mx-auto shadow-lg">
          <div className="text-2xl font-bold mb-6 text-left">
            What Users Say:
          </div>
          <blockquote className="text-lg text-black font-semibold border-l-4 border-primary pl-4 leading-relaxed">
            "FundmyWish has been a game-changer! <br />
            It made it so easy to save time picking gifts for my friends.<br />
            Instead of worrying about gift choices, they could simply contribute to my wishlist. <br />
            It helped me collect enough money for the gifts I really needed and wanted. <br />
            I love how it brings people closer and makes gifting simple!" <br />
          </blockquote>
        </div>
      </div>

      {/* Section 2: User Stories */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto text-center ">
          <h2 className="text-4xl font-bold mb-6">Top User Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userStories.map((story) => (
              <div
                key={story.id}
                className="p-4 bg-white shadow-lg rounded-lg cursor-pointer"
                onClick={() => navigate(`/user-stories/${story.id}`)}
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-bold">{story.title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  By {story.author} | {story.date}
                </p>
                <p className="text-gray-600 mt-2">{story.abstract}</p>
              </div>
            ))}
          </div>
          <div className="max-w-6xl mx-auto flex flex-col items-center mt-4">
            <p className="text-gray-700">
              Discover all our inspiring user stories in the blog section. Learn
              more about their journeys and how FundmyWish has made a
              difference.
            </p>
            <button
              className="btn btn-outline mt-4"
              onClick={() => navigate("/blog")}
            >
              Go to Blog
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Social Media User Reviews */}
      <div className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {socialMediaReviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-white shadow-md rounded-lg"
              >
                <img
                  src={review.image}
                  alt={`User review on ${review.platform}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Posted on {review.platform}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoriesPage;
