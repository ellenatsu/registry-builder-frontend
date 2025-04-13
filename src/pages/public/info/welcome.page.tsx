import React from "react";
import FundRightNowLogo from "../../../components/common/FWlogo";

const WelcomePage: React.FC = () => {
  return (
    <div className="px-8 py-10 bg-base-100 text-[#4a2d2b]">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">ABOUT US</h1>
        <p className="text-lg text-[#8c7a6b]">
          Discover our platform, our mission, and how we can support your
          journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Welcome Section */}
        <div className="text-lg leading-relaxed">
          <p className="mb-6">
            At{" "}
            <span className="inline-block">
              <FundRightNowLogo className="text-2xl" />
            </span>
            ,
          </p>
          <p>
            we believe in turning dreams into reality through the power of
            community. Our platform empowers people to create and share
            personalized wishlists, connecting them with friends, family, and
            generous strangers who want to support their goals, needs, and
            special moments.
          </p>
          <p className="mt-4">
            Whether you're celebrating a milestone, navigating life’s
            challenges, or seeking thoughtful support, FundmyWish is here to
            connect you with a caring community. We foster meaningful
            connections and celebrate the joy of giving, creating a space where
            everyone can make a difference—one wish at a time.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="flex flex-col items-center lg:items-start bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left">
            Why Choose{" "}
            <span className="inline-block">
              <FundRightNowLogo className="text-3xl" />
            </span>
            ?
          </h2>
          <ul className="space-y-4 text-lg text-[#4a2d2b]">
            <li>
              <strong>Create and share wishlists effortlessly:</strong> Our user-friendly interface makes it easy to build, customize, and share your wishlist in minutes.
            </li>
            <li>
              <strong>Receive support from those who care:</strong> Connect with friends, family, and even kind strangers to achieve your goals.
            </li>
            <li>
              <strong>Help others achieve their dreams:</strong> Be part of someone else’s success story by contributing to their wishlist.
            </li>
            <li>
              <strong>Start your journey today:</strong> Every wish deserves to be heard, and we’re here to make yours a reality.
            </li>
          </ul>
        </div>
      </div>

      <div className="btn btn-outline btn-primary w-full justify-center">Start your wishlist</div>
    </div>
  );
};

export default WelcomePage;
