import React from "react";
import eventData from "../../../data/json/collaborations.json";

import { Link } from "react-router-dom";
import BannerCarousel from "../../../components/container/BannerCarousel";

const EventsPage: React.FC = () => {
  return (
    <div className="p-8 bg-base-200">
       {/* Auto-iterating Gallery */}
       <BannerCarousel />

       {/* All events in grid */}
      <h2 className="text-2xl font-bold mt-8 mb-4">All Collaborations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {eventData.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
              <Link
                to={`/event/${event.id}`}
                className="btn bg-primary text-white rounded-md"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
