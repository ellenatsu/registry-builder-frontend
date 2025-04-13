// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import bannerData from "../../data/json/banner.json";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
  return (
    <>
      <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      } as React.CSSProperties}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-96"
      >
        {bannerData.map((banner) => (
          <SwiperSlide>
            <div>
              <img
                src={banner.coverImage}
                alt={banner.title}
                className="w-full h-full object-cover rounded-lg"
                onClick={()=>navigate(`/event/${banner.id}`)}
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                <h2 className="text-xl font-bold" onClick={()=>navigate(`/event/${banner.id}`)}>{banner.title}</h2>
               
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
