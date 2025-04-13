import { useNavigate } from "react-router-dom";
import ContactForm from "../../components/form/ContactForm";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { homeTabContent, homeTabs } from "../../constants/textContent";

interface Tab {
  id: string;
  title: string;
  icon: string;
}

export interface TabContentItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

const HomePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<keyof typeof homeTabContent>(
    () => {
      const params = new URLSearchParams(location.search);
      return params.get("tab") || "guide";
    }
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(location.search);
    params.set("tab", tabId);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentTab = params.get("tab");
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location.search, activeTab]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative w-full h-[75vh]"
        style={{
          backgroundImage: `url('/images/new_cover.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-5 text-center text-shadow-lg backdrop-blur-sm">
          <div className="flex flex-col w-full px-6">
            {/* First Line: Centered */}
            <h1 className="mr-auto md:mr-12 text-3xl md:text-6xl font-custom font-bold text-[#fffef6] mb-5 drop-shadow-md">
              Simplify Gifting {"    "}
            </h1>

            {/* Second Line: Slightly to the Right */}
            <h1 className="ml-auto md:ml-12 text-3xl md:text-6xl font-custom font-bold text-[#fffef6] mb-5 drop-shadow-md">
             {"    "}Share the Joy
            </h1>
          </div>

          <button
            className="mt-4  text-white bg-black hover:bg-[#2c1c0b] text-2xl font-semibold rounded-lg shadow-lg relative px-6 py-2"
            onClick={() => navigate("/auth")}
          >
            Create Wishlist
          </button>
          <p className="text-lg md:text-2xl mt-4 text-[#FAF3DD] mb-2">
            Turn Dreams Into Reality. It's easy, transparent, and empowering
          </p>
        </div>
      </div>

      {/* Tabs and Sidebar Section */}
      <div className="relative w-full md:-mt-16 sm:-mt-14">
        <div className="flex ">
          {/* Tabs Navigation and Content */}
          <div className="w-full p-6 overflow-hidden">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-around items-start gap-3 md:gap-4 mb-2 ">
              {homeTabs.map((tab: Tab) => (
                <div
                  key={tab.id}
                  className="text-center relative cursor-pointer"
                  onClick={() => handleTabClick(tab.id)}
                >
                  <div
                    className={`rounded-full flex items-center justify-center border-4 md:w-20 w-16 ${
                      activeTab === tab.id
                        ? "bg-[#e79465] border-[#d88550]"
                        : "bg-[#ffe5d1] border-transparent"
                    }`}
                  >
                    <img
                      src={tab.icon}
                      alt={tab.title}
                      className="bg-transparent rounded-full object-cover"
                    />
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      activeTab === tab.id
                        ? "text-primary font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="w-full overflow-hidden">
              {activeTab === "support" ? (
                <div className="p-6 w-full rounded-lg shadow-lg">
                  <ContactForm />
                </div>
              ) : (
                <div className="w-full p-2 grid grid-cols-1 md:grid-cols-3 gap-x-3">
                  {homeTabContent[activeTab]?.map((article: TabContentItem) => (
                    <div
                      key={article.id}
                      className="card md:bg-base-100 w-full mb-2 image-full md:shadow-lg cursor-pointer"
                      onClick={() => navigate(article.link)}
                    >
                      <figure className="w-full md:h-[35vh] h-[20vh]">
                        <img src={article.image} alt={article.image} className="w-full h-full object-cover" />
                      </figure>
                      <div className="card-body">
                        <p className="text-3xl md:text-xl text-center font-bold text-black mt-5">
                          {article.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Introduction Section */}
      <div className="bg-[#f8f8f8] py-16">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-2xl font-bold text-gray-800">
            Looking to make your wishlist dreams come true?
          </p>
          <p className="text-2xl font-bold text-primary">
            Start fundraising today!
          </p>
          <p className="text-xl text-gray-700">
            Invite your friends and family to contribute directly to your
            wishlist and bring your goals to life.
          </p>
          <p className="text-xl text-gray-700">
            It’s simple, empowering, and stress-free.
          </p>
          <button
            className="btn btn-primary text-white mt-8"
            onClick={() => navigate("/info/guide/tutorial")}
          >
            Follow Guide to Start
          </button>
        </div>
      </div>

      {/* User Reviews Section */}
      <div className="bg-[#d7e1de]">
        <div className="max-w-8xl mx-auto text-center py-10">
          <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>

          {/* Reviews */}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className=""
          >
            {[
              {
                id: 1,
                name: "Adam W.",
                review:
                  "I’ve always struggled to find the perfect gift for my friends. FundMyWish made it so easy—now I just check their wishlist and contribute. It’s a game-changer!",
              },
              {
                id: 2,
                name: "Don L.",
                review:
                  "When I lost my job, I didn’t know how to ask for help. It gave me a way to share my situation without feeling awkward. The support from my friends really lifted me up.",
              },
              {
                id: 3,
                name: "Eric",
                review:
                  "I’m not a tech-savvy person, but creating a wishlist was so simple. I loved being able to add links to specific items—it made everything clear for my family.",
              },
            ].map((review) => (
              <SwiperSlide>
                <div
                  key={review.id}
                  className="flex flex-col items-center justify-center px-10 h-[40vh] mb-3 space-y-5"
                >
                  <div className="text-lg text-gray-800 mt-5 mx-4 text-center font-poppins">
                    <span className="text-xl">"</span> {review.review}{" "}
                    <span className="text-xl">"</span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mt-2">
                    - {review.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <button
            className="btn btn-secondary mt-6"
            onClick={() => navigate("/info/learn-more/user-story")}
          >
            Read More Stories
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
